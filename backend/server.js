import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Health check route
 */
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

/**
 * Explain Code Route
 */
app.post('/explain', async (req, res) => {
  try {
    const { code } = req.body;

    // Validation
    if (!code || code.trim() === "") {
      return res.status(400).json({ error: "Code is required" });
    }

    const apiKey = "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"; 
    console.log("API KEY:", process.env.OPENROUTER_API_KEY);

    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful coding tutor. Explain code in simple terms step by step."
          },
          {
            role: "user",
            content: `Explain this code clearly:\n\n${code}`
          }
        ]
      })
    });

    const data = await response.json();

    // Debug log (very useful if something breaks)
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));

    const explanation = data?.choices?.[0]?.message?.content;

    if (!explanation) {
      return res.json({ explanation: "No explanation returned from AI" });
    }

    res.json({ explanation });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});