const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE cars (id INTEGER PRIMARY KEY AUTOINCREMENT, make TEXT, model TEXT, year INTEGER)");

  // Optional: Insert some initial data
  db.run("INSERT INTO cars (make, model, year) VALUES ('Toyota', 'Corolla', 2020)");
  db.run("INSERT INTO cars (make, model, year) VALUES ('Honda', 'Civic', 2019)");
});

app.get('/cars', (req, res) => {
  db.all("SELECT * FROM cars", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

app.post('/addCar', (req, res) => {
  const { make, model, year } = req.body;
  const query = "INSERT INTO cars (make, model, year) VALUES (?, ?, ?)";
  db.run(query, [make, model, year], function(err) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json({ message: 'Car added successfully', id: this.lastID });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
