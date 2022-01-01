const sqlite = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './db/ecommerce.db',
    },
});

class Database {

    static instance;

    constructor() {
        if (Database.instance) {
            return instance;
        }

        Database.instance = sqlite;
        this.instance = Database.instance;
    }
}

module.exports = new Database;