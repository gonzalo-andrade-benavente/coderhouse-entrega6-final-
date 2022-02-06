const { UsuarioModel } = require('../models/Usuario');

const postUsuario = async (user) => {
    let usr;

    try {
        prd = await UsuarioModel.create(user);
    } catch (err) {
        console.log(err);
    }

    return usr;
}

const getUsuario = async (username) => {
    let usr;

    try {
        usr = await UsuarioModel.findOne({ username });
    } catch (err) {
        console.log(err);
    }

    return usr;
}

module.exports = {
    postUsuario,
    getUsuario
}