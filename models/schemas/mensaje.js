const Joi = require('joi');

let timestamp = Joi.number();
let mensaje = Joi.string();
let fecha = Joi.string();
let autor = Joi.object();
let usuario = Joi.string();

const mensajeSchema = {
    timestamp
    , autor
    , mensaje
    , fecha
    , usuario
}

module.exports = {
    mensajeSchema
}