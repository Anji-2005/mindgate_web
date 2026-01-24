import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Menu, X, Plus, Send, Settings, History, Library, MessageSquare } from "lucide-react";
import Logo from "../components/Logo";
import AnimatedBackground from "../components/AnimatedBackground";
import "./PersonalPage.css";

export default function PersonalPage() {
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`pg ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <AnimatedBackground />
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`side ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sideTop">

          <Logo />
        </div>
        <div className="divider" />
        <div className="nav-group">

          <button className="sideBtn active">
            <MessageSquare size={18} /> Sessions
          </button>
          <button className="sideBtn">
            <History size={18} /> History
          </button>
          <button className="sideBtn">
            <Library size={18} /> Resources
          </button>
        </div>
        <div className="sideBottom">
          <div className="settings-btn" onClick={() => navigate("/settings")}>
            <Settings size={18} /> Settings
          </div>
        </div>
      </aside>

      {isSidebarOpen && <div className="side-overlay" onClick={() => setIsSidebarOpen(false)} />}

      <main className="main">
        <div className="topRow">
          <button className="newChat"><Plus size={18} /> New Chat</button>

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

              <button className="plus"><Plus size={20} /></button>

              <input 
                className="input" 
                placeholder="Ask Something...." 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
              />

              <button className="send"><Send size={20} /></button>

            </div>
            <div className="tip">Your conversations are private and secure.</div>
          </div>
        </div>
      </main>
    </div>
  );
}

