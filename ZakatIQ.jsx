import { useState, useEffect, useRef } from "react";

const GOLD_NISAB_GRAMS = 85;
const GOLD_PRICE_AED = 330; // approx per gram
const NISAB_AED = GOLD_NISAB_GRAMS * GOLD_PRICE_AED;
const ZAKAT_RATE = 0.025;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --gold-dim: #8B6F2E;
    --ink: #0D0D0D;
    --parchment: #FAF7F0;
    --cream: #F3EDD8;
    --sage: #2A3B35;
    --sage-light: #3D5A50;
    --muted: #8A8070;
    --white: #FFFFFF;
    --error: #C0392B;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--ink);
    color: var(--parchment);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(160deg, #0D0D0D 0%, #1A1508 50%, #0D1410 100%);
    position: relative;
  }

  .app::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(42,59,53,0.3) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  /* GEOMETRIC PATTERN OVERLAY */
  .pattern-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0.03;
    background-image: repeating-linear-gradient(
      45deg,
      var(--gold) 0, var(--gold) 1px,
      transparent 0, transparent 50%
    );
    background-size: 30px 30px;
    pointer-events: none;
    z-index: 0;
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to bottom, rgba(13,13,13,0.95), transparent);
    backdrop-filter: blur(8px);
  }

  .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 2px;
  }

  .logo span {
    color: var(--parchment);
    font-style: italic;
  }

  .nav-tabs {
    display: flex;
    gap: 4px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(201,168,76,0.15);
    border-radius: 40px;
    padding: 4px;
  }

  .nav-tab {
    background: none;
    border: none;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 36px;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.3px;
  }

  .nav-tab:hover { color: var(--parchment); }

  .nav-tab.active {
    background: var(--gold);
    color: var(--ink);
    font-weight: 600;
  }

  /* HERO */
  .hero {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 120px 40px 80px;
  }

  .arabic-motif {
    font-size: 48px;
    color: var(--gold);
    opacity: 0.6;
    margin-bottom: 24px;
    animation: float 4s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .hero-eyebrow {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
    font-weight: 500;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 8vw, 96px);
    font-weight: 300;
    line-height: 1.0;
    color: var(--parchment);
    margin-bottom: 8px;
  }

  .hero-title em {
    color: var(--gold);
    font-style: italic;
  }

  .hero-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 2.5vw, 28px);
    font-weight: 300;
    color: var(--muted);
    margin-bottom: 48px;
    font-style: italic;
    max-width: 600px;
  }

  .hero-cta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--gold), var(--gold-dim));
    color: var(--ink);
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 16px 36px;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .btn-primary:hover::before { left: 100%; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.3); }

  .btn-secondary {
    background: transparent;
    color: var(--parchment);
    border: 1px solid rgba(201,168,76,0.3);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    padding: 16px 36px;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    border-color: var(--gold);
    color: var(--gold);
    transform: translateY(-2px);
  }

  /* STATS ROW */
  .stats-row {
    display: flex;
    gap: 1px;
    margin-top: 80px;
    background: rgba(201,168,76,0.15);
    border-radius: 8px;
    overflow: hidden;
  }

  .stat-item {
    flex: 1;
    padding: 28px 32px;
    background: rgba(255,255,255,0.02);
    text-align: center;
  }

  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 600;
    color: var(--gold);
    display: block;
  }

  .stat-label {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 4px;
  }

  /* SECTIONS */
  .section {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 40px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-tag {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid rgba(201,168,76,0.3);
    padding: 6px 16px;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.1;
  }

  .section-title em { color: var(--gold); font-style: italic; }

  /* ZAKAT CALCULATOR */
  .calc-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.15);
    border-radius: 12px;
    overflow: hidden;
  }

  .calc-header {
    background: linear-gradient(135deg, rgba(201,168,76,0.1), rgba(42,59,53,0.2));
    padding: 32px 40px;
    border-bottom: 1px solid rgba(201,168,76,0.1);
  }

  .calc-header h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 400;
    color: var(--parchment);
  }

  .nisab-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 4px;
    padding: 6px 14px;
    margin-top: 8px;
    font-size: 12px;
    color: var(--gold-light);
  }

  .calc-body { padding: 40px; }

  .input-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 32px;
  }

  .input-group { display: flex; flex-direction: column; gap: 8px; }

  .input-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 500;
  }

  .input-field {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(201,168,76,0.15);
    border-radius: 6px;
    padding: 14px 16px;
    color: var(--parchment);
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    transition: all 0.2s ease;
    outline: none;
  }

  .input-field:focus {
    border-color: var(--gold);
    background: rgba(201,168,76,0.05);
  }

  .input-field::placeholder { color: rgba(138,128,112,0.5); }

  .slider-container { display: flex; flex-direction: column; gap: 8px; }

  .slider-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    color: var(--gold);
  }

  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: rgba(201,168,76,0.2);
    border-radius: 2px;
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--gold);
    cursor: pointer;
    box-shadow: 0 0 10px rgba(201,168,76,0.4);
  }

  /* RESULT PANEL */
  .result-panel {
    background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(42,59,53,0.15));
    border: 1px solid rgba(201,168,76,0.25);
    border-radius: 10px;
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }

  .result-label {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .result-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 600;
    color: var(--gold);
    line-height: 1;
  }

  .result-amount span { font-size: 22px; font-weight: 300; margin-right: 6px; }

  .result-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
  }

  .status-due {
    background: rgba(201,168,76,0.15);
    color: var(--gold-light);
    border: 1px solid rgba(201,168,76,0.3);
  }

  .status-not-due {
    background: rgba(42,59,53,0.4);
    color: #7FB89A;
    border: 1px solid rgba(127,184,154,0.3);
  }

  .breakdown {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .breakdown-item {
    flex: 1;
    min-width: 150px;
    background: rgba(255,255,255,0.03);
    border-radius: 8px;
    padding: 16px 20px;
  }

  .breakdown-item .label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
  .breakdown-item .value { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--parchment); margin-top: 4px; }

  /* AI CHAT */
  .chat-container {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(201,168,76,0.15);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 600px;
  }

  .chat-header {
    background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(42,59,53,0.2));
    padding: 24px 32px;
    border-bottom: 1px solid rgba(201,168,76,0.1);
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .ai-avatar {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, var(--gold), var(--gold-dim));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    scrollbar-width: thin;
    scrollbar-color: rgba(201,168,76,0.2) transparent;
  }

  .message {
    display: flex;
    gap: 12px;
    max-width: 85%;
    animation: messageIn 0.3s ease;
  }

  @keyframes messageIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .message.user { align-self: flex-end; flex-direction: row-reverse; }

  .msg-bubble {
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.6;
  }

  .message.ai .msg-bubble {
    background: rgba(42,59,53,0.4);
    border: 1px solid rgba(201,168,76,0.1);
    color: var(--parchment);
    border-top-left-radius: 4px;
  }

  .message.user .msg-bubble {
    background: linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.1));
    border: 1px solid rgba(201,168,76,0.25);
    color: var(--parchment);
    border-top-right-radius: 4px;
  }

  .msg-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    align-self: flex-start;
    margin-top: 4px;
  }

  .msg-avatar.ai-av { background: linear-gradient(135deg, var(--gold), var(--gold-dim)); }
  .msg-avatar.user-av { background: rgba(255,255,255,0.08); color: var(--parchment); }

  .typing-indicator {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 14px 18px;
  }

  .typing-dot {
    width: 7px;
    height: 7px;
    background: var(--gold);
    border-radius: 50%;
    animation: typingPulse 1.2s ease-in-out infinite;
  }

  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typingPulse {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1); }
  }

  .chat-input-area {
    padding: 20px 24px;
    border-top: 1px solid rgba(201,168,76,0.1);
    display: flex;
    gap: 12px;
    background: rgba(0,0,0,0.2);
  }

  .chat-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(201,168,76,0.15);
    border-radius: 8px;
    padding: 12px 16px;
    color: var(--parchment);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    resize: none;
    transition: border-color 0.2s;
  }

  .chat-input:focus { border-color: var(--gold); }
  .chat-input::placeholder { color: rgba(138,128,112,0.5); }

  .send-btn {
    background: var(--gold);
    border: none;
    border-radius: 8px;
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .send-btn:hover { background: var(--gold-light); transform: scale(1.05); }
  .send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  .quick-questions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 12px 24px 0;
  }

  .quick-q {
    background: transparent;
    border: 1px solid rgba(201,168,76,0.2);
    color: var(--muted);
    font-size: 12px;
    padding: 6px 14px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'DM Sans', sans-serif;
  }

  .quick-q:hover { border-color: var(--gold); color: var(--gold); }

  /* COMPLIANCE CHECKER */
  .compliance-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
  }

  .compliance-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.1);
    border-radius: 10px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .compliance-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: var(--gold);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  .compliance-card:hover::before,
  .compliance-card.selected::before { transform: scaleY(1); }

  .compliance-card:hover,
  .compliance-card.selected {
    border-color: rgba(201,168,76,0.3);
    background: rgba(201,168,76,0.05);
  }

  .compliance-icon { font-size: 28px; margin-bottom: 12px; }
  .compliance-name { font-size: 15px; font-weight: 500; color: var(--parchment); margin-bottom: 4px; }
  .compliance-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

  /* DONATE */
  .charity-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .charity-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.12);
    border-radius: 10px;
    padding: 28px 20px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .charity-card:hover {
    border-color: rgba(201,168,76,0.3);
    background: rgba(201,168,76,0.05);
    transform: translateY(-4px);
  }

  .charity-icon { font-size: 36px; margin-bottom: 12px; }
  .charity-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--parchment); margin-bottom: 6px; }
  .charity-desc { font-size: 11px; color: var(--muted); margin-bottom: 16px; line-height: 1.5; }
  .charity-verified {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: #7FB89A;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* DIVIDER */
  .ornate-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 20px 0;
    color: rgba(201,168,76,0.3);
    font-size: 18px;
  }

  .ornate-divider::before,
  .ornate-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent);
  }

  /* TOAST */
  .toast {
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: var(--sage);
    border: 1px solid rgba(201,168,76,0.3);
    color: var(--parchment);
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 1000;
    animation: toastIn 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @keyframes toastIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .nav { padding: 16px 20px; }
    .nav-tabs { display: none; }
    .input-grid { grid-template-columns: 1fr; }
    .compliance-grid { grid-template-columns: 1fr; }
    .charity-grid { grid-template-columns: 1fr; }
    .stats-row { flex-direction: column; }
    .section { padding: 60px 20px; }
    .calc-body { padding: 24px 20px; }
  }
`;

const QUICK_QUESTIONS = [
  "Is my savings account Halal?",
  "Can I invest in Tesla stock?",
  "Are crypto investments permissible?",
  "What is Riba and how to avoid it?"
];

const CHARITIES = [
  { icon: "🕌", name: "Masjid Al Noor Fund", desc: "Supporting mosque construction across underserved communities", region: "UAE & GCC" },
  { icon: "🍽️", name: "Iftar for All", desc: "Providing meals to families in need during Ramadan and beyond", region: "South Asia" },
  { icon: "📚", name: "Islamic Education Trust", desc: "Funding Islamic schools and scholarships for orphaned children", region: "Africa" },
  { icon: "💧", name: "Clean Water Initiative", desc: "Building wells and water infrastructure in rural communities", region: "Yemen" },
  { icon: "🏥", name: "Al-Shifa Medical Fund", desc: "Free medical care for underprivileged Muslim families", region: "Global" },
  { icon: "🌱", name: "Sadaqah Jariyah Projects", desc: "Enduring charity projects that give ongoing rewards", region: "Worldwide" },
];

export default function ZakatIQ() {
  const [tab, setTab] = useState("home");
  const [savings, setSavings] = useState(50000);
  const [gold, setGold] = useState(0);
  const [investments, setInvestments] = useState(20000);
  const [debts, setDebts] = useState(5000);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "As-salamu alaykum! I'm your Sharia Finance Advisor, powered by AI. Ask me anything about Islamic finance, Zakat, Halal investments, or Riba — I'm here to help you make decisions aligned with your faith. 🌙"
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [toast, setToast] = useState(null);
  const messagesEndRef = useRef(null);

  const totalAssets = savings + (gold * GOLD_PRICE_AED) + investments;
  const zakatable = Math.max(0, totalAssets - debts);
  const zakatDue = zakatable >= NISAB_AED ? zakatable * ZAKAT_RATE : 0;
  const isZakatDue = zakatable >= NISAB_AED;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const sendMessage = async (text) => {
    const userText = text || inputMsg.trim();
    if (!userText || isTyping) return;
    setInputMsg("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are ZakatIQ — a knowledgeable and warm Islamic finance advisor embedded in an Islamic bank's app. 
          You help Muslim customers with: Zakat calculations, Halal vs Haram investments, understanding Riba (interest), Sharia-compliant banking products, and general Islamic personal finance.
          Always be respectful, cite Quran/Hadith references when appropriate (briefly), and give practical actionable advice.
          Format responses clearly with line breaks. Keep answers concise but complete (3-6 sentences usually).
          When asked about a specific investment or product, give a clear verdict: ✅ Permissible, ⚠️ Requires Caution, or ❌ Not Permissible — followed by brief reasoning.
          Never give a generic non-answer. Always provide your best Islamic finance guidance.`,
          messages: newMessages.map(m => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.content
          }))
        })
      });

      const data = await response.json();
      const reply = data.content?.map(c => c.text || "").join("") || "I'm sorry, I couldn't process that request. Please try again.";
      setMessages(prev => [...prev, { role: "ai", content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", content: "I'm having trouble connecting right now. Please check your connection and try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="pattern-overlay" />

        {/* NAV */}
        <nav className="nav">
          <div className="logo">Zakat<span>IQ</span></div>
          <div className="nav-tabs">
            {[["home","Home"],["calculator","Calculator"],["advisor","AI Advisor"],["donate","Donate"]].map(([key, label]) => (
              <button key={key} className={`nav-tab ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}>
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* HOME */}
        {tab === "home" && (
          <section className="hero">
            <div className="arabic-motif">☽</div>
            <p className="hero-eyebrow">Islamic Finance — Reimagined</p>
            <h1 className="hero-title">Your <em>Zakat.</em><br />Your <em>Faith.</em><br />Simplified.</h1>
            <p className="hero-subtitle">The first AI-powered Islamic finance companion — built for Muslims, by your bank.</p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => setTab("calculator")}>Calculate My Zakat</button>
              <button className="btn-secondary" onClick={() => setTab("advisor")}>Ask AI Advisor</button>
            </div>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-num">2.5%</span>
                <span className="stat-label">Zakat Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">85g</span>
                <span className="stat-label">Gold Nisab</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">AI</span>
                <span className="stat-label">Sharia Advisor</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">6+</span>
                <span className="stat-label">Verified Causes</span>
              </div>
            </div>
          </section>
        )}

        {/* CALCULATOR */}
        {tab === "calculator" && (
          <div className="section">
            <div className="section-header">
              <span className="section-tag">Zakat Calculator</span>
              <h2 className="section-title">Know What You <em>Owe</em></h2>
            </div>
            <div className="calc-card">
              <div className="calc-header">
                <h3>Annual Zakat Assessment</h3>
                <div className="nisab-badge">
                  ✦ Nisab Threshold: AED {NISAB_AED.toLocaleString()} ({GOLD_NISAB_GRAMS}g gold)
                </div>
              </div>
              <div className="calc-body">
                <div className="input-grid">
                  <div className="input-group">
                    <label className="input-label">Savings & Cash (AED)</label>
                    <input className="input-field" type="number" value={savings} onChange={e => setSavings(+e.target.value || 0)} placeholder="0" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Investments (AED)</label>
                    <input className="input-field" type="number" value={investments} onChange={e => setInvestments(+e.target.value || 0)} placeholder="0" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Debts Owed (AED)</label>
                    <input className="input-field" type="number" value={debts} onChange={e => setDebts(+e.target.value || 0)} placeholder="0" />
                  </div>
                  <div className="input-group slider-container">
                    <label className="input-label">Gold Owned (grams)</label>
                    <span className="slider-value">{gold}g = AED {(gold * GOLD_PRICE_AED).toLocaleString()}</span>
                    <input type="range" min="0" max="500" value={gold} onChange={e => setGold(+e.target.value)} />
                  </div>
                </div>

                <div className="ornate-divider">✦</div>

                <div className="result-panel">
                  <div>
                    <p className="result-label">Zakat Due This Year</p>
                    <div className="result-amount">
                      <span>AED</span>{zakatDue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                    <div style={{marginTop: 12}}>
                      {isZakatDue
                        ? <span className="result-status status-due">● Zakat is Due</span>
                        : <span className="result-status status-not-due">✓ Below Nisab — Not Due</span>
                      }
                    </div>
                  </div>
                  {isZakatDue && (
                    <button className="btn-primary" onClick={() => setTab("donate")}>
                      Pay Zakat Now →
                    </button>
                  )}
                </div>

                <div className="breakdown">
                  <div className="breakdown-item">
                    <div className="label">Total Assets</div>
                    <div className="value">AED {totalAssets.toLocaleString()}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="label">Less Debts</div>
                    <div className="value">AED {debts.toLocaleString()}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="label">Zakatable Wealth</div>
                    <div className="value">AED {zakatable.toLocaleString()}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="label">Rate Applied</div>
                    <div className="value">{isZakatDue ? "2.5%" : "—"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI ADVISOR */}
        {tab === "advisor" && (
          <div className="section">
            <div className="section-header">
              <span className="section-tag">AI Sharia Advisor</span>
              <h2 className="section-title">Your <em>Halal</em> Finance Guide</h2>
            </div>
            <div className="chat-container">
              <div className="chat-header">
                <div className="ai-avatar">🌙</div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 15}}>ZakatIQ Sharia Advisor</div>
                  <div style={{fontSize: 12, color: "var(--gold)", marginTop: 2}}>● Online — Powered by AI</div>
                </div>
              </div>
              <div className="quick-questions">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button key={i} className="quick-q" onClick={() => sendMessage(q)}>{q}</button>
                ))}
              </div>
              <div className="chat-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`message ${msg.role}`}>
                    <div className={`msg-avatar ${msg.role === "ai" ? "ai-av" : "user-av"}`}>
                      {msg.role === "ai" ? "🌙" : "👤"}
                    </div>
                    <div className="msg-bubble" style={{whiteSpace: "pre-wrap"}}>{msg.content}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message ai">
                    <div className="msg-avatar ai-av">🌙</div>
                    <div className="msg-bubble">
                      <div className="typing-indicator">
                        <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="chat-input-area">
                <textarea
                  className="chat-input"
                  rows={1}
                  placeholder="Ask about Halal investments, Riba, Zakat rules..."
                  value={inputMsg}
                  onChange={e => setInputMsg(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                />
                <button className="send-btn" onClick={() => sendMessage()} disabled={isTyping || !inputMsg.trim()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DONATE */}
        {tab === "donate" && (
          <div className="section">
            <div className="section-header">
              <span className="section-tag">Zakat Distribution</span>
              <h2 className="section-title">Give with <em>Purpose</em></h2>
              <p style={{color: "var(--muted)", marginTop: 12, fontSize: 15}}>
                All causes are Sharia-verified. Your Zakat goes directly to those in need.
              </p>
            </div>

            {zakatDue > 0 && (
              <div className="result-panel" style={{marginBottom: 32}}>
                <div>
                  <p className="result-label">Your Zakat Balance</p>
                  <div className="result-amount"><span>AED</span>{zakatDue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
                <div style={{textAlign: "right"}}>
                  <p style={{fontSize: 12, color: "var(--muted)", marginBottom: 8}}>Ready to distribute</p>
                  <button className="btn-primary" onClick={() => showToast("✓ Zakat payment initiated — JazakAllah Khayran!")}>
                    Pay All Now
                  </button>
                </div>
              </div>
            )}

            <div className="charity-grid">
              {CHARITIES.map((c, i) => (
                <div key={i} className="charity-card" onClick={() => showToast(`✓ Donation to ${c.name} initiated!`)}>
                  <div className="charity-icon">{c.icon}</div>
                  <div className="charity-name">{c.name}</div>
                  <div className="charity-desc">{c.desc}</div>
                  <div className="charity-verified">✓ Sharia Verified · {c.region}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {toast && <div className="toast"><span>✓</span>{toast}</div>}
      </div>
    </>
  );
}
