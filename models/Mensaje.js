const { Schema, model } = require('mongoose');

const { mensajeSchema } = require('./schemas/mensaje');

const MensajeSchema = new Schema(mensajeSchema);

const MensajeModel = new model('Mensajes', MensajeSchema);

module.exports = {
    MensajeModel
}