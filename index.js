const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const app = express();
const AdvancedOptions = { useNewUrlParser: true, useUnifiedTopology: true} ;
const { mongoDb } = require('./config/index');
const server = http.createServer(app);
const Socket = require('./utils/sockets');
const socket = new Socket(server);
const { config } = require('./config');

//const database = require('./config/db');
//const db = database.instance;

//const databaseSqlite = require('./config/sqliteDb');
//const sqliteDb = databaseSqlite.instance;

const PORT = config.port;

require('./config/mongoDb');

// Cookies
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${mongoDb.user}:${mongoDb.password}@${mongoDb.host}/${mongoDb.database}?retryWrites=true&w=majority`,
        mongoOptions: AdvancedOptions
    }),
    secret: 'shhhhh',
    resave:  false,
    saveUninitialized: {
        maxAge: 300000
    }
}));

// MDW
app.use(cors(config.cors));

// MDW Setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));


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