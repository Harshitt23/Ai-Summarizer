import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5000;
const MERCURY_API = 'https://mercury.postlight.com/parser?url=';
const MERCURY_API_KEY = process.env.MERCURY_API_KEY || '';

app.use(cors());
app.use(express.json());

app.post('/extract', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Missing url' });
  }
  try {
    const mercuryRes = await fetch(`${MERCURY_API}${encodeURIComponent(url)}`, {
      headers: MERCURY_API_KEY ? { 'x-api-key': MERCURY_API_KEY } : {}
    });
    if (!mercuryRes.ok) {
      return res.status(mercuryRes.status).json({ error: 'Failed to fetch article content' });
    }
    const data = await mercuryRes.json();
    // Remove HTML tags from content
    const text = data.content ? data.content.replace(/<[^>]+>/g, '') : '';
    res.json({ text });
  } catch (e) {
    res.status(500).json({ error: 'Server error', details: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Extractor backend running on http://localhost:${PORT}`);
}); 