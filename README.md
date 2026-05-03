 # ZakatIQ 🌙
### AI-Powered Islamic Finance Companion
> *"Turning your bank into a trusted partner in your customers' faith journey."*

Built for the **Islamic Bank Innovation Challenge** using **vibe coding only** — no manual code writing, fully AI-generated.

---

## 📌 Overview

**ZakatIQ** is a web application that helps Muslim banking customers:

- Calculate their annual **Zakat** obligation instantly
- Get **AI-powered Sharia compliance advice** on investments and financial decisions
- **Distribute Zakat** to verified charitable causes directly through the bank

---

## ✨ Features

### 🧮 Smart Zakat Calculator
- Input savings, investments, gold, and debts
- Auto-calculates Nisab threshold (85g gold = AED 28,050)
- Applies the 2.5% Zakat rate on zakatable wealth
- Real-time result with full breakdown

### 🤖 AI Sharia Advisor
- Live AI chat powered by the **Claude API** (Anthropic)
- Answers any Islamic finance question instantly
- Gives clear verdicts: ✅ Permissible / ⚠️ Requires Caution / ❌ Not Permissible
- Pre-loaded quick-tap questions for common queries
- Cites Quran/Hadith references where relevant

### 💛 Zakat Distribution Hub
- 6 Sharia-verified charitable causes
- One-tap donation flow branded to your bank
- Shows your calculated Zakat balance ready to distribute

---

## 🗂️ Project Files

| File | Description |
|------|-------------|
| `ZakatIQ-App.html` | ⭐ Standalone app — just double-click to run |
| `App.jsx` | React version — use with Vite |
| `ZakatIQ-PitchDeck.html` | Competition pitch deck (7 slides) |
| `README.md` | This file |

---

## 🚀 How to Run

### Option A — Instant (No Setup)
```
Just double-click ZakatIQ-App.html
Opens in any browser. Done.
```

### Option B — React / Vite (Local Dev)
```bash
# 1. Create project
cd your-project-folder
npm create vite@latest . -- --template react

# 2. Install dependencies
npm install

# 3. Replace src/App.jsx with the ZakatIQ App.jsx file

# 4. Run
npm run dev
```
Open **http://localhost:5173**

### Option C — Deploy Live (For Competition Demo)
```
1. Push to GitHub
2. Go to vercel.com → Import project
3. Click Deploy
4. Share the live URL with judges
```

---

## 🔑 API Key Setup (AI Advisor)

The AI Advisor tab requires a free **Anthropic API key**.

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up (free) → Create an API key
3. In the app, open the **AI Advisor** tab
4. Paste your key in the gold banner → click **Save Key**

> Your key is stored locally in your browser. It is never sent anywhere except directly to the Anthropic API.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS (standalone) / React + Vite (JSX) |
| Styling | Custom CSS with CSS Variables, Google Fonts |
| AI Engine | Claude API by Anthropic (`claude-sonnet-4-20250514`) |
| Fonts | Cormorant Garamond + DM Sans |
| Deployment | Vercel (recommended) |

---

## 📐 Islamic Finance Logic

```
Nisab Threshold  = 85 grams of gold × AED 330/g = AED 28,050
Zakatable Wealth = Total Assets − Debts
Zakat Due        = Zakatable Wealth × 2.5%  (only if ≥ Nisab)
```

---

## 🏗️ Project Structure (React version)

```
ZakatIQ/
├── public/
├── src/
│   └── App.jsx          ← Main application component
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 💡 How It Was Built

This project was built entirely using **vibe coding** — describing features in plain English to an AI, which generated all the code automatically. No manual code writing was involved.

**Vibe coding workflow:**
1. Describe each screen in natural language
2. AI generates the complete component
3. Connect the Claude API for the live Sharia advisor
4. Deploy with one click on Vercel

---

## 🏆 Competition Notes

This project was created for the **Islamic Bank Innovation Challenge**.

**Why ZakatIQ wins:**
- Unique to Islamic banking — cannot be replicated by competitors
- Combines AI + Zakat + Sharia compliance in one seamless app
- Real working prototype — not just a concept or slideshow
- Addresses a genuine pain point for 1.8 billion Muslims globally
- Demonstrates vibe coding as a real, production-capable methodology

---

## 🌍 Impact Potential

- **$600B+** in Zakat goes uncollected or miscalculated globally each year
- **68%** of Muslim banking customers find Sharia-compliance rules confusing
- **0** banks currently offer a real-time AI Sharia advisor in their app

ZakatIQ solves all three.

---


---
<img width="1789" height="1031" alt="Screenshot 2026-05-03 at 11 07 08 AM" src="https://github.com/user-attachments/assets/fcc5ec32-c972-4366-b4aa-acba4c245463" />
---
<img width="1789" height="1030" alt="Screenshot 2026-05-03 at 11 07 20 AM" src="https://github.com/user-attachments/assets/afc05748-a865-44ac-ae6d-4181658fc159" />
---
<img width="1789" height="1031" alt="Screenshot 2026-05-03 at 11 07 34 AM" src="https://github.com/user-attachments/assets/01e46fb0-212d-4c3c-a043-68cd1f728cfd" />
---
<img width="1785" height="1027" alt="Screenshot 2026-05-03 at 11 07 49 AM" src="https://github.com/user-attachments/assets/6ad9abad-f779-4d7e-b8ce-a3280caf3971" />
---

## 📄 License

Built for internal bank innovation competition. All rights reserved.

---

<div align="center">
  <strong>ZakatIQ</strong> — Where faith meets finance. 🌙
</div>
