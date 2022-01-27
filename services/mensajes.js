const { MensajeModel } = require('../models/Mensaje');

const postMensaje = async (mensaje) => {
    let msg;

    try {
        msg = await MensajeModel.create(mensaje);
    } catch (err) {
        console.log(err);
    }

    return msg;
}

const getMensajes = async () => {
    let msg;

    try {
        msg = await MensajeModel.find({});
    } catch (err) {
        console.log(err);
    }

    return msg;
}

module.exports = {
    postMensaje
    , getMensajes
}