const { Pool } = require('pg')

const pool = new Pool({
    user: `${process.env.USERNAME}`,
    host: `${process.env.HOST}`, // or your PostgreSQL server's host
    database: 'test',
    password: `${process.env.PASSWORD}`,
    port: process.env.DBPORT, // or your PostgreSQL server's port
});

module.exports = pool;
