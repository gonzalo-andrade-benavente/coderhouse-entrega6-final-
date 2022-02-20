const { engine } = require('express-handlebars');
const cluster = require('cluster');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require('express');
const http = require('http');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();
const AdvancedOptions = { useNewUrlParser: true, useUnifiedTopology: true} ;
const server = http.createServer(app);

const { getUsuario } = require('./services/usuarios');
const Socket = require('./utils/sockets');
const socket = new Socket(server);
const { config } = require('./config');

//const database = require('./config/db');
//const db = database.instance;

//const databaseSqlite = require('./config/sqliteDb');
//const sqliteDb = databaseSqlite.instance;

const PORT = config.port;

const { MONGO_ATLAS_URI  } = require('./config/mongoDb');
const res = require('express/lib/response');
const req = require('express/lib/request');

// Cookies
app.use(cookieParser(config.secret));
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_ATLAS_URI,
        mongoOptions: AdvancedOptions
    }),
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    expires: config.maxAge,
    cookie: {
        expires: config.maxAge, // 1 minute
        secure: false,
        httpOnly: false
    }
}));

// MDW
app.use(cors(config.cors));

// MDW Setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use('login', new localStrategy( async (username, password, done) => {
    const user = await getUsuario(username);
   
    if (!user) return done(null, false);

    // Cambiar para comparar con bcrypt.
    //if (user.password !== password) return done(null, false);
    if (!bcrypt.compareSync(password, user.password)) return done(null, false);

    return done(null, user);

}));

passport.serializeUser( (user, done) => {
    done(null, user.username);
});

passport.deserializeUser( async (username, done) => {
    const user = await getUsuario(username);
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use( '/', require('./routes') );

socket.init();

if (config.cluster && cluster.isMaster) {
    if (cluster.isMaster) {
        console.log(`Master pid ${process.pid} `);
        for(let i = 0; i < config.numCpus; i++) {
            cluster.fork();
        }
    }
} else {
    console.log(`Worker pid ${process.pid} `);
    server.listen(PORT, () => {
        if (config.cluster) {
            console.log(`Server running in port ${PORT} in cluster mode PID ${process.pid}`);
        } else {
            console.log(`Server running in port ${PORT} in fork mode PID ${process.pid}`);
        }    
    });
}

