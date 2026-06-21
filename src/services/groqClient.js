const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

export async function callGroq(prompt) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Groq API error');
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

export async function fetchArticle(url) {
  const res = await fetch(`https://r.jina.ai/${url}`, {
    headers: { Accept: 'text/plain' },
  });
  if (!res.ok) throw new Error(`Could not fetch article (${res.status})`);
  return await res.text();
}

export function lengthToSentences(length) {
  if (length == 1) return '2-3 sentences';
  if (length == 5) return '6-8 sentences';
  return '4-5 sentences';
}
