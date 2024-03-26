require('dotenv').config();
const express = require('express');
const pool = require('./database/db');
const app = express();
const cors = require('cors');

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());

//Cors security check Ups
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))


//select data from todo , all data in it
app.get('/', async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todos');
        res.json(todos.rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Server Error');
    }
});

//insert values to database from the form 
app.post('/add', async (req, res) => {
    try {
        const { task } = req.body;
        // Insert data from todoData object into the todos table
        await pool.query('INSERT INTO todos (task) VALUES ($1)', [task]);
        res.status(201).send('Todo added successfully.');
    } catch (err) {
        console.error('Error adding todo', err);
        res.status(500).send('Server Error');
    }
});

//delete based on id 
app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM todos WHERE id = ($1)', [id]);
        res.status(201).send('Todo deleted successfully.');
    } catch (err) {
        console.error('Error deleting todo', err);
        res.status(500).send('Server Error');
    }
});

//localhost port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});