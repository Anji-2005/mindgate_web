import React, { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import "./Help.css";

export default function SupportChatWidget({ open, onClose }) {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! I am the Mindgate virtual assistant. How can I help you today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, open]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Thanks for your message! A live support agent will connect with you shortly.",
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  if (!open) return null;

  return (
    <div className="help-chat-widget">
      <div className="help-chat-header">
        <div className="help-chat-title">
          <div className="help-status-dot"></div>
          <span>Mindgate Support</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Close chat">
          <X size={18} />
        </button>
      </div>

      <div className="help-chat-body">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`help-chat-msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form className="help-chat-footer" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button type="submit" aria-label="Send">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
