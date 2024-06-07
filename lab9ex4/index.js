const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
app.use(express.json());

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

app.post('/messages', (req, res) => {
  const { message } = req.body;
  redisClient.rpush('messages', message, (err, reply) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(`Message added with ID: ${reply}`);
  });
});

app.get('/messages', (req, res) => {
  redisClient.lrange('messages', 0, -1, (err, messages) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(messages);
  });
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});