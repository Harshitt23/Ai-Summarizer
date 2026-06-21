import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GEMINI_API_KEY; // reusing same env var name
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

async function callGroq(prompt) {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5
    })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Groq API error');
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

// Fetch clean article text from any URL using Jina Reader (free, no auth needed)
async function fetchArticle(url) {
  const res = await fetch(`https://r.jina.ai/${url}`, {
    headers: { Accept: 'text/plain' }
  });
  if (!res.ok) throw new Error(`Could not fetch article (${res.status})`);
  return await res.text();
}

function lengthToSentences(length) {
  if (length == 1) return '2-3 sentences';
  if (length == 5) return '6-8 sentences';
  return '4-5 sentences';
}

// ── URL summarization ──────────────────────────────────────────────────────────
app.get('/summarize', async (req, res) => {
  const { url, length = 3 } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const articleText = await fetchArticle(decodeURIComponent(url));
    const sentences = lengthToSentences(length);
    const prompt = `Summarize the following article in ${sentences}. Return only the summary text, no labels or preamble.\n\n${articleText.slice(0, 10000)}`;
    const summary = await callGroq(prompt);
    res.json({ summary });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Article content extraction ─────────────────────────────────────────────────
app.get('/extract', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const article = await fetchArticle(decodeURIComponent(url));
    res.json({ article });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Text summarization ─────────────────────────────────────────────────────────
app.post('/summarize', async (req, res) => {
  const { text, length = 3 } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });
  try {
    const sentences = lengthToSentences(length);
    const prompt = `Summarize the following text in ${sentences}. Return only the summary text, no labels or preamble.\n\n${text.slice(0, 10000)}`;
    const summary = await callGroq(prompt);
    res.json({ summary });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Question & Answer ──────────────────────────────────────────────────────────
app.post('/qa', async (req, res) => {
  const { url, question } = req.body;
  if (!url || !question) return res.status(400).json({ error: 'Missing url or question' });
  try {
    const articleText = await fetchArticle(url);
    const prompt = `Using only the article below, answer this question concisely: "${question}"\n\nArticle:\n${articleText.slice(0, 8000)}`;
    const answer = await callGroq(prompt);
    res.json({ answer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Fact check ────────────────────────────────────────────────────────────────
app.get('/fact-check', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const articleText = await fetchArticle(decodeURIComponent(url));
    const prompt = `Extract 3 key factual claims from this article and assess each one. Return ONLY valid JSON with no markdown fences, in exactly this format:
{"claims":[{"text":"claim text","verdict":"verified","confidence":85}]}
Verdict must be one of: "verified", "unverified", "false". Confidence is 0-100.

Article:
${articleText.slice(0, 6000)}`;
    const raw = await callGroq(prompt);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { claims: [] };
    res.json({ analysis: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Related topics ────────────────────────────────────────────────────────────
app.get('/related', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const articleText = await fetchArticle(decodeURIComponent(url));
    const prompt = `Based on this article, suggest 3 related topics the reader might want to explore. Return ONLY valid JSON with no markdown fences, in exactly this format:
{"related":[{"title":"Topic Title","description":"One sentence about this topic.","similarity":82}]}
Similarity is 0-100.

Article:
${articleText.slice(0, 4000)}`;
    const raw = await callGroq(prompt);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { related: [] };
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
