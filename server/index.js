// server/index.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to SQLite
const dbPath = path.resolve(__dirname, 'contacts.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL
)`);

// GET contacts
app.get('/api/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// POST new contact
app.post('/api/contacts', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) return res.status(400).send('Name and phone are required.');
  
  db.run('INSERT INTO contacts (name, phone) VALUES (?, ?)', [name, phone], function (err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID, name, phone });
  });
});
// UPDATE contact
app.put('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).send('Name and phone are required.');
  }

  const query = 'UPDATE contacts SET name = ?, phone = ? WHERE id = ?';
  db.run(query, [name, phone, id], function (err) {
    if (err) return res.status(500).send(err.message);
    if (this.changes === 0) return res.status(404).send('Contact not found.');

    res.json({ id: Number(id), name, phone });
  });
});

// DELETE contact
app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM contacts WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) return res.status(500).send(err.message);
    if (this.changes === 0) return res.status(404).send('Contact not found.');

    res.status(204).send(); // No Content
  });
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
