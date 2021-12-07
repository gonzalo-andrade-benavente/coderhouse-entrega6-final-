const { Server } = require("socket.io");

class Socket {

    static instancia;

    constructor(http) {
        if (Socket.instancia) {
            return Socket.instancia;
        }

        Socket.instancia = this;
        this.io = new Server(http);
        this.mensajes = [];
        this.usuarios = [];
        this.products = [];
    }

    init() {
        this.io.on('connection', (socket) => {

            socket.emit('init', this.products);

            socket.on('addProduct', data => {
                this.products.push(data);
                this.io.sockets.emit('listenserver', this.products);
            });


        });
    }

}

module.exports = Socket;