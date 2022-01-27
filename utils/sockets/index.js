const faker = require('faker');
const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denomrmalize = normalizr.denormalize;
const schema = normalizr.schema;

const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
    comenter: user
});
const article = new schema.Entity('articles', {
    author:  user,
    comments: [comment]
});

const posts = new schema.Entity('posts', {
    posts: [article]
}); 

const { Server } = require("socket.io");

const database = require('../../config/db');
const db = database.instance;

const databaseSqlite = require('../../config/sqliteDb');
const sqliteDb = databaseSqlite.instance;

const { postProducto, getProductos } = require('../../services/productos'); 
const { postMensaje, getMensajes } = require('../../services/mensajes');
const { fake } = require('faker');

class Socket {

    static instancia;

    constructor(http) {
        if (Socket.instancia) {
            return Socket.instancia;
        }

        Socket.instancia = this;
        this.io = new Server(http);
        /*
        this.messages = [];
        this.users = [];
        this.products = [];
        */
    }

    init() {

        try {

            this.io.on('connection', async (socket) => {
                
                //const products = await db.from('products');
                const products = await getProductos(); 
                socket.emit('init', products);
    
                socket.on('addProduct', async data => {
                    //console.log(`addProduct`);
                    //this.products.push(data);
                    await postProducto(data);
                    //await db.from('products').insert(data); 
                    
                    //const products = await db.from('products');
                    const products = await getProductos();
                    this.io.sockets.emit('listenserver', products);
                });

                socket.on('addUser', async user => {
                    //console.log(`addUser`);
                    //this.users.push(user);
                    //const messages = await sqliteDb.from('messages');
                    const messages = await getMensajes();
                    const originalData = {
                        id: 1,
                        posts: messages
                    };

                    const normalizedData = normalize(originalData, posts);
                    
                    //this.io.sockets.emit('listenServerMessages', messages);
                    this.io.sockets.emit('listenServerMessages', normalizedData);
                })

                socket.on('addMessage', async message => {
                    //console.log(`addMessage`, message);
                    const newMessage = {
                        timestamp: message.timestamp,
                        mensaje: message.mensaje,
                        autor: {
                            id: message.usuario,
                            nombre: faker.name.firstName(),
                            apellido: faker.name.lastName(),
                            edad: faker.datatype.number(50),
                            alias: faker.name.suffix(),
                            avatar: faker.image.imageUrl()
                        }, 
                        fecha: message.fecha
                    }
                    await postMensaje(newMessage);
                    //await sqliteDb.from('messages').insert(message); 
                    //const messages = await sqliteDb.from('messages');
                    const messages = await getMensajes();
                    const originalData = {
                        id: 1,
                        posts: messages
                    };
                    const normalizedData = normalize(originalData, posts);
                    //this.io.sockets.emit('listenServerMessages', messages);
                    this.io.sockets.emit('listenServerMessages', normalizedData);
                })
    
    
            });

        }
        catch (err) {
            console.log(err);
        }
        
    }

}

module.exports = Socket;