const { db } = require('./index');

const mysql = require('knex')({
    client: 'mysql2',
    connection: {
      ...db
    },
    pool: { min:0 , max: 7},
});

// Patrón Singleton

class Database {
    static instance;

    constructor() {
        if (Database.instance) {
            return instance;
        }

        Database.instance = mysql;
        this.instance = Database.instance;
    }

}

module.exports = new Database;

