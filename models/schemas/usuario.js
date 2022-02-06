const Joi = require('joi');

let username = Joi.string();
let password = Joi.string();

const usuarioSchema = {
    username,
    password
}

module.exports = {
    usuarioSchema
}