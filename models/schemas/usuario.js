const Joi = require('joi');

let usuario = Joi.string();
let contrasenia = Joi.string();

const usuarioSchema = {
    usuario,
    contrasenia
}

module.exports = {
    usuarioSchema
}