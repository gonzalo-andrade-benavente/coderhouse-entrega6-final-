require('dotenv').config();


const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 8080,
    cors: process.env.CORS,
}

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}



module.exports = { config, db };