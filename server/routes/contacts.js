const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get all contacts
router.get('/', (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new contact
router.post('/', (req, res) => {
  const { name, phone } = req.body;
  db.run('INSERT INTO contacts (name, phone) VALUES (?, ?)', [name, phone], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, phone });
  });
});

// Search contacts by name
router.get('/search', (req, res) => {
  const query = `%${req.query.q}%`;
  db.all('SELECT * FROM contacts WHERE name LIKE ?', [query], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
