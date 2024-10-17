const express = require('express');
const router = express.Router();
const db = require('./config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM utters', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching utters' });
    } else {
      res.json(results);
    }
  });
});

router.post('/create', (req, res) => {
  console.log(req.body);
  const { title, responseType, bubbles } = req.body;

  if (!title || !responseType || bubbles.length === 0) {
    return res.status(400).json({ error: 'title, responseType, and bubbles are required' });
  }

  const responseTypeValue = responseType?.value || responseType;

  db.query(
    'INSERT INTO utters (title, responseType, bubbles, utter_name, response) VALUES (?, ?, ?, ?, ?)',
    [title, responseType, JSON.stringify(bubbles), title, responseType],
    (err, result) => {
      if (err) {
        console.error('Erro no banco:', err);
        res.status(500).json({ error: 'Error inserting response' });
      } else {
        res.status(201).json({ message: 'Response created', id: result.insertId });
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, responseType, bubbles } = req.body;

  if (!title || !responseType || bubbles.length === 0) {
    return res.status(400).json({ error: 'title, responseType, and bubbles are required' });
  }

  const responseTypeValue = responseType?.value || responseType;

  db.query(
    'UPDATE utters SET title = ?, responseType = ?, bubbles = ? WHERE id = ?',
    [title, responseTypeValue, JSON.stringify(bubbles), id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error updating response' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Response not found' });
      } else {
        res.json({ message: 'Response updated' });
      }
    }
  );
});

module.exports = router;