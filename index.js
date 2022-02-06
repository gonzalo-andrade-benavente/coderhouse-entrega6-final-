const { engine } = require('express-handlebars');
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
        //maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
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
//app.use(express.static("./public"));


/*
( async () => {
    try {
        await db.schema.createTableIfNotExists('products', table => {
            table.increments('id').primary(),
            table.string('title'),
            table.float('price'),
            table.string('thumbnail'),
            table.boolean('delete')
        }); 
    } catch (err) {
        console.log(err);
    }
})();

( async () => {
    try {
        await sqliteDb.schema.createTableIfNotExists('messages', table => {
            table.increments('id').primary(),
            table.string('user'),
            table.string('time'),
            table.string('msg')
        }); 
    } catch (err) {
        console.log(err);
    }
})();
*/

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

// Template
//app.engine( 'handlebars', engine() );
//app.set( 'view engine', 'handlebars' );
//app.set( 'views', __dirname + '/views' );

socket.init();

server.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});