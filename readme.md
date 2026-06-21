# AI Summarizer

An open-source article summarizer that transforms lengthy articles into clear, concise summaries — powered by **Groq** (Llama 3.3) and **Jina AI Reader**.

---

## Tech Stack

- **React 18** — UI
- **Redux Toolkit + RTK Query** — state management & API calls
- **Tailwind CSS** — styling
- **Groq API** — AI summarization & features (Llama 3.3 70B)
- **Jina AI Reader** — article content extraction from URLs
- **MyMemory API** — translation
- **Express.js** — local backend proxy

---

## Features

- **URL Summarization** — paste any article URL and get an AI-generated summary
- **Text Summarization** — paste raw text directly for instant summarization
- **PDF Upload** — upload a PDF file for summarization
- **Summary Length Control** — choose Short, Medium, or Detailed output
- **Reading Time Analysis** — see time saved vs. reading the full article
- **Keyword Extraction** — auto-extracted key terms from the summary
- **Export Options** — download your summary as TXT, HTML, Word, or JSON
- **Dark Mode** — system-aware dark/light toggle
- **History** — past summaries saved in localStorage
- **AI Features Panel:**
  - Question & Answer — ask anything about the article
  - Translation — summarize in 12 languages
  - Fact Check — verify key claims from the article
  - Related Topics — discover what to read next

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- A free [Groq API key](https://console.groq.com) (takes 2 minutes, no credit card)

### 1. Clone the repo

```bash
git clone https://github.com/Harshitt23/Ai-Summarizer.git
cd Ai-Summarizer
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd extractor-backend
npm install
```

### 4. Add your Groq API key

Create `extractor-backend/.env`:

```
GEMINI_API_KEY=gsk_your_groq_key_here
```

Get your free key at **console.groq.com** → API Keys → Create API Key

### 5. Run the project (two terminals)

**Terminal 1 — backend:**
```bash
cd extractor-backend
npm start
```

**Terminal 2 — frontend:**
```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## How It Works

```
Browser → Express Backend (localhost:5000)
               ↓
    Jina AI Reader (URL → clean article text)
               +
    Groq API / Llama 3.3 (text → summary / QA / fact-check)
               +
    MyMemory API (translation)
```

- **Jina AI Reader** (`r.jina.ai`) extracts clean readable text from any URL for free with no API key required.
- **Groq** runs Llama 3.3 70B inference at high speed on their free tier (14,400 requests/day).
- **MyMemory** handles translation across 12 languages for free.

---

## Environment Variables

| File | Variable | Description |
|---|---|---|
| `extractor-backend/.env` | `GEMINI_API_KEY` | Your Groq API key (`gsk_...`) |

No frontend environment variables are required.

---

## Project Structure

```
Ai-Summarizer/
├── src/
│   ├── components/        # React components
│   ├── services/          # RTK Query API slices
│   └── assets/            # SVG icons
├── extractor-backend/     # Express backend (Groq + Jina proxy)
│   ├── server.js
│   └── .env               # Your Groq API key goes here
├── public/
└── package.json
```
