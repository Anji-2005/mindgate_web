import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo"; // Handles navigation to "/" on click
import "./PersonalPage.css";

const FloatingRobot = () => (
  <div className="robot-background-layer">
    <motion.div
      className="robot-svg-wrapper"
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="650" height="650" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="120" y1="40" x2="120" y2="25" stroke="#0d3a25" strokeOpacity="0.2" strokeWidth="1.5"/>
        <circle cx="120" cy="22" r="3" fill="#0d3a25" fillOpacity="0.2" />
        <rect x="80" y="40" width="80" height="60" rx="15" fill="#0d3a25" fillOpacity="0.05" stroke="#0d3a25" strokeOpacity="0.2" strokeWidth="1.5"/>
        <circle cx="105" cy="65" r="6" fill="#0d3a25" fillOpacity="0.3" />
        <circle cx="135" cy="65" r="6" fill="#0d3a25" fillOpacity="0.3" />
        <path d="M105 82C105 82 112.5 88 120 88C127.5 88 135 82 135 82" stroke="#0d3a25" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>
        <rect x="75" y="110" width="90" height="75" rx="20" fill="#0d3a25" fillOpacity="0.03" stroke="#0d3a25" strokeOpacity="0.2" strokeWidth="1.5"/>
        <rect x="63" y="118" width="12" height="40" rx="6" fill="#0d3a25" fillOpacity="0.05" stroke="#0d3a25" strokeOpacity="0.1" strokeWidth="1"/>
        <g transform="translate(165, 118) rotate(-35)">
          <rect x="0" y="0" width="12" height="40" rx="6" fill="#0d3a25" fillOpacity="0.1" stroke="#0d3a25" strokeOpacity="0.2" strokeWidth="1.5"/>
        </g>
        <rect x="95" y="185" width="15" height="15" rx="4" fill="#0d3a25" fillOpacity="0.05" stroke="#0d3a25" strokeOpacity="0.15" />
        <rect x="130" y="185" width="15" height="15" rx="4" fill="#0d3a25" fillOpacity="0.05" stroke="#0d3a25" strokeOpacity="0.15" />
      </svg>
    </motion.div>
  </div>
);

export default function PersonalPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="pg">
      <aside className="side">
        {/* Removed back-btn as navigation is now handled by Logo */}
        <div className="sideTop" style={{ padding: "10px 0" }}>
          <Logo />
        </div>
        <div className="divider" />
        <div className="nav-group">
          <button className="sideBtn active">Sessions</button>
          <button className="sideBtn">History</button>
          <button className="sideBtn">Resources</button>
        </div>
        <div className="sideBottom">
          <div className="settings-btn">⚙ Settings</div>
        </div>
      </aside>

      <main className="main">
        <FloatingRobot />
        <div className="topRow">
          <button className="newChat">New Chat +</button>
        </div>

        <div className="chat-container">
          <div className="center-content">
            <h1 className="title">Hi Jit!</h1>
            <p className="subtitle">I’m here with calm support. How are you feeling today?</p>
            <div className="quickRow">
              <button className="quick">Improve my mood?</button>
              <button className="quick">Practice self-care?</button>
              <button className="quick">Build habits?</button>
            </div>
          </div>

          <div className="composer-wrapper">
            <div className="composer">
              <button className="plus">+</button>
              <input 
                className="input" 
                placeholder="Ask Something...." 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
              />
              <button className="send">▶</button>
            </div>
            <div className="tip">Your conversations are private and secure.</div>
          </div>
        </div>
      </main>
    </div>
  );
}

