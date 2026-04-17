# Code Explainer AI

## Problem

I often copy code from the internet but struggle to understand how it works. This tool helps me quickly understand any code by generating simple explanations.

## Solution

Users can paste code and get a clear AI-generated explanation instantly.

## Tech Stack

* Node.js
* Express
* OpenRouter API
* HTML, JavaScript

## How AI is Used

The backend sends user code to OpenRouter API and receives an explanation.

## API Endpoint

POST /explain
Request:
{
"code": "your code here"
}

Response:
{
"explanation": "AI explanation"
}

## Live Links

Frontend: (add after deploy)
Backend: (add after deploy)

## What I Didn’t Build

* Syntax highlighting
* Multi-language detection
* Code execution

## Cost Consideration

Each request uses tokens (~500 tokens per request).
Scaling to 100 users/day ≈ 50,000 tokens.

## Setup Instructions

1. Clone repo
2. Add .env
3. Run backend
4. Open frontend

## Future Improvements

* Better UI
* Support multiple languages
* Save history
