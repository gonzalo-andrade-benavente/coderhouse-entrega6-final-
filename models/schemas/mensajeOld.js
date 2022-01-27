const Joi = require('joi');

let timestamp = Joi.number();
let usuario = Joi.string();
let mensaje = Joi.string();
let fecha = Joi.string();

const mensajeSchema = {
    timestamp
    , usuario
    , mensaje
    , fecha
}

module.exports = {
    mensajeSchema
}