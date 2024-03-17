const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', // or your PostgreSQL server's host
    database: 'test',
    password: 'muscle$$090',
    port: 5432, // or your PostgreSQL server's port
});

module.exports = pool;
