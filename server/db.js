const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db');

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL
    )
  `);
});

module.exports = db;
