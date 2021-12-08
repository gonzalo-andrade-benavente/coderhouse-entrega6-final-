const { Server } = require("socket.io");

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

            this.io.on('connection', (socket) => {

                const dateConnectd = new Date();
                
                console.log(`User connected at ${dateConnectd}`);

                socket.emit('init', this.products);
    
                socket.on('addProduct', data => {
                    console.log(`addProduct`);
                    this.products.push(data);
                    this.io.sockets.emit('listenserver', this.products);
                });

                socket.on('addUser', user => {
                    console.log(`addUser`);
                    this.users.push(user);
                    this.io.sockets.emit('listenServerMessages', this.messages);
                })

                socket.on('addMessage', message => {
                    console.log(`addMessage`, message);
                    this.messages.push(message);
                    this.io.sockets.emit('listenServerMessages', this.messages);
                })
    
    
            });

        }
        catch (err) {
            console.log(err);
        }
        
    }

}

module.exports = Socket;