// index.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Workaround to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

const DATA_FILE = __dirname + '/data.json';

app.use(cors());
app.use(express.json());

const loadData = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
};

const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.get('/api/data', (req, res) => {
  const data = loadData();
  res.json(data);
});

app.post('/api/data', (req, res) => {
  const newItem = req.body;
  const data = loadData();
  data.push(newItem);
  saveData(data);
  res.status(201).json({ message: 'Item added', newItem });
});

app.delete('/api/data', (req, res) => {
  saveData([]);
  res.json({ message: 'All data deleted' });
});

app.listen(port, () => {
  console.log(`🟢 API running at http://localhost:${3000}`)
});
