const { Schema, model } = require('mongoose');

const { productoSchema } = require('./schemas/producto');

const ProductoSchema = new Schema(productoSchema);

const ProductoModel = new model('Productos', ProductoSchema);

module.exports = {
    ProductoModel
}