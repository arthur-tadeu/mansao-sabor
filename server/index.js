const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database(path.join(__dirname, 'maromba.db'));

app.use(cors());
app.use(express.json());

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    avatar TEXT,
    content TEXT,
    likes TEXT,
    replies INTEGER,
    time TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed initial data if empty
const count = db.prepare('SELECT COUNT(*) as count FROM threads').get().count;
if (count === 0) {
  const insert = db.prepare('INSERT INTO threads (author, avatar, content, likes, replies, time) VALUES (?, ?, ?, ?, ?, ?)');
  insert.run('Toguro', 'https://i.pravatar.cc/150?u=toguro', 'O shape inexplicável não vem do descanso, vem da luta. Quem tá focado hoje?', '24.5k', 842, '2h');
  insert.run('Mansão Maromba', 'https://i.pravatar.cc/150?u=mansao', 'Acabou de chegar o lote novo de Maçã Verde. O estoque tá voando! 🔥', '12.1k', 156, '5h');
}

// Routes
app.get('/api/threads', (req, res) => {
  const threads = db.prepare('SELECT * FROM threads ORDER BY created_at DESC').all();
  res.json(threads);
});

app.post('/api/threads', (req, res) => {
  const { author, avatar, content, likes, replies, time } = req.body;
  const insert = db.prepare('INSERT INTO threads (author, avatar, content, likes, replies, time) VALUES (?, ?, ?, ?, ?, ?)');
  const result = insert.run(author, avatar, content, likes, replies, time);
  res.json({ id: result.lastInsertRowid, ...req.body });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Maromba rodando na porta ${PORT}`);
});
