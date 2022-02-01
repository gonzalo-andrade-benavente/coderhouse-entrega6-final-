const { Schema, model } = require('mongoose');

const { usuarioSchema } = require('./schemas/usuario');

const UsuarioSchema = new Schema(usuarioSchema);

const UsuarioModel = new model('Usuarios', UsuarioSchema);

module.exports = {
    UsuarioModel
}