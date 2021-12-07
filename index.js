const { engine } = require('express-handlebars');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const Socket = require('./utils/sockets');
const socket = new Socket(server);

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static("./public"));

// Routes
app.use( '/', require('./routes') );

// Template
app.engine( 'handlebars', engine() );
app.set( 'view engine', 'handlebars' );
app.set( 'views', __dirname + '/views' );

socket.init();

server.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});