const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
    user: 'dbuser',
    host: 'my-postgres',
    database: 'mydb',
    password: 'secretpassword',
    port: 5432,
});

// Pobieranie wszystkich osób
app.get('/people', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM people');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Pobieranie osoby o konkretnym ID
app.get('/people/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM people WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Person not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Obliczanie średniej wieku
app.get('/average', async (req, res) => {
    try {
        const result = await pool.query('SELECT AVG(age) AS avg_age FROM people');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});

