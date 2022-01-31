const mongoose = require('mongoose');
const { mongoDb } = require('./index');

const MONGO_ATLAS_URI = `mongodb+srv://${mongoDb.user}:${mongoDb.password}@${mongoDb.host}/${mongoDb.database}?retryWrites=true&w=majority`;
//const MONGO_ATLAS_URI = `mongodb://${mongoDb.user}:${mongoDb.password}@${mongoDb.host}/${mongoDb.database}?retryWrites=true&w=majority`;

let connection;

( async () => {

    try {
        connection = await mongoose.connect(MONGO_ATLAS_URI);
        console.log('MongoDb connected!');
    } catch (err) {
        console.log(err);
    }

})();

module.exports = { mongoDb, MONGO_ATLAS_URI }

