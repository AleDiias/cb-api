const express = require('express');
const router = express.Router();
const db = require('./config/db');

router.get('/intents', (req, res) => {
  db.query('SELECT * FROM intents', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching intents' });
    } else {
      res.json(results);
    }
  });
});

router.post('/intents', (req, res) => {
  const { intent_name, question } = req.body;

  if (!intent_name || !question) {
    return res.status(400).json({ error: 'intent_name and question are required' });
  }

  db.query(
    'INSERT INTO intents (intent_name, question) VALUES (?, ?)',
    [intent_name, question],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error inserting intent' });
      } else {
        res.status(201).json({ message: 'Intent created', id: result.insertId });
      }
    }
  );
});

router.put('/intents/:id', (req, res) => {
  const { id } = req.params;
  const { intent_name, question } = req.body;

  if (!intent_name || !question) {
    return res.status(400).json({ error: 'intent_name and question are required' });
  }

  db.query(
    'UPDATE intents SET intent_name = ?, question = ? WHERE id = ?',
    [intent_name, question, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error updating intent' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Intent not found' });
      } else {
        res.json({ message: 'Intent updated' });
      }
    }
  );
});

module.exports = router;