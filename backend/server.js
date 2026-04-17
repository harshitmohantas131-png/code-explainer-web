const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// health route
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// AI route
app.post('/explain', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const prompt = `
Explain the following code in simple terms.
Also mention what it does step by step.

Code:
${code}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || "No explanation available";

    res.json({ explanation: reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});