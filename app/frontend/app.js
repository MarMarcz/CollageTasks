// frontend/app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Frontend Home Page');
});

app.listen(8080, () => {
  console.log('Frontend server running on port 8080');
});

