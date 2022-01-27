const { ProductoModel } = require('../models/Producto');

const postProducto = async (producto) => {
    let prd;

    try {
        prd = await ProductoModel.create(producto);
    } catch (err) {
        console.log(err);
    }

    return prd;
}

const getProductos = async () => {
    let prd;

    try {
        prd = await ProductoModel.find({});
    } catch (err) {
        console.log(err);
    }

    return prd;
}

module.exports = {
    postProducto
    , getProductos
}