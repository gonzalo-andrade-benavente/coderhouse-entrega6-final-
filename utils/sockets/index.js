const { Server } = require("socket.io");

const database = require('../../config/db');
const db = database.instance;

const databaseSqlite = require('../../config/sqliteDb');
const sqliteDb = databaseSqlite.instance;

class Socket {

    static instancia;

    constructor(http) {
        if (Socket.instancia) {
            return Socket.instancia;
        }

        Socket.instancia = this;
        this.io = new Server(http);
        this.messages = [];
        this.users = [];
        this.products = [];
    }

    init() {

        try {

            this.io.on('connection', async (socket) => {

                const dateConnectd = new Date();
                
                //console.log(`User connected at ${dateConnectd}`);
                const products = await db.from('products');
                socket.emit('init', products);
    
                socket.on('addProduct', async data => {
                    //console.log(`addProduct`);
                    this.products.push(data);
                    await db.from('products').insert(data); 
                    const products = await db.from('products');
                    this.io.sockets.emit('listenserver', products);
                });

                socket.on('addUser', async user => {
                    //console.log(`addUser`);
                    this.users.push(user);
                    const messages = await sqliteDb.from('messages');
                    this.io.sockets.emit('listenServerMessages', messages);
                })

                socket.on('addMessage', async message => {
                    //console.log(`addMessage`, message);
                    await sqliteDb.from('messages').insert(message); 
                    const messages = await sqliteDb.from('messages');
                    this.io.sockets.emit('listenServerMessages', messages);
                })
    
    
            });

        }
        catch (err) {
            console.log(err);
        }
        
    }

}

module.exports = Socket;