require('dotenv').config();
const yarg = require('yargs');
const numCPUs = require('os').cpus().length;

const options = {
    alias: {
        p: 'puerto' ,
        f: 'fork' ,
        c: 'cluster' ,
    }
}

const procArgv = yarg(process.argv.slice(2)).alias(options.alias).argv;

const config = {
    dev: process.env.NODE_ENV !== 'production',
    //port: process.env.PORT || 8080,
    port: procArgv.puerto || 8081 , 
    cors: process.env.CORS ,
    secret: process.env.SECRET ,
    maxAge: parseInt(process.env.MAXAGE) ,
    fork: procArgv.fork ,
    cluster: procArgv.cluster ,
    numCpus: numCPUs ,
}

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}

const mongoDb = {
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    host: process.env.MONGODB_HOST,
    database: process.env.MONGODB_DATABASE,
}



module.exports = { config, db, mongoDb };