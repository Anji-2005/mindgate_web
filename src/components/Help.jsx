import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SupportChatWidget from "./SupportChatWidget";
import {
  Search,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  MessageCircle,
  FileText,
  CreditCard,
  Shield,
  User,
  X,
  Send,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "./landing/Navbar";
import "./Help.css";

export default function Help() {
  // --- State Management ---
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Ticket Modal States
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketStatus, setTicketStatus] = useState("idle");

  // Chat Widget States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! I am the Mindgate virtual assistant. How can I help you today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  // --- Data: Main FAQs ---
  const faqData = [
    {
      question: "How do I match with a psychologist?",
      answer:
        "After signing up, you'll complete a brief assessment regarding your needs and preferences. Our algorithm will suggest 3-5 licensed professionals best suited for you.",
    },
    {
      question: "Is my data private and confidential?",
      answer:
        "Absolutely. We adhere to strict HIPAA and GDPR compliance. All messages and video sessions are end-to-end encrypted. We do not sell your personal data to third parties.",
    },
    {
      question: "Does insurance cover these sessions?",
      answer:
        "Many of our providers accept major insurance plans. You can filter psychologists by insurance provider in the search tool. We also offer superbills for out-of-network reimbursement.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can pause or cancel your subscription at any time from your 'Account Settings' page. There are no cancellation fees if done 24 hours before your next billing cycle.",
    },
    {
      question: "What if I don't like my therapist?",
      answer:
        "Finding the right fit is crucial. If you feel your current match isn't working, you can switch therapists instantly through your dashboard settings at no extra cost.",
    },
    {
      question: "Are there emergency services available?",
      answer:
        "Mindgate is not an emergency service. If you are in immediate danger, please use the Crisis resources listed at the top of this page or call 911.",
    },
  ];

  // --- Data: Quick Tips (Scrolling) ---
  const quickTips = [
    { q: "Forgot Password?", a: "Click 'Reset' on the login page to get a link." },
    { q: "Video Lagging?", a: "Check your internet or switch to audio-only." },
    { q: "Receipts?", a: "Find all invoices under Billing > History." },
    { q: "Changing Plans", a: "Upgrade/Downgrade anytime in Settings." },
    { q: "Session Time", a: "Standard sessions are 50 minutes long." },
    { q: "Mobile App", a: "Download 'Mindgate' on iOS and Android." },
  ];

  const filteredFaqs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // --- Handlers ---
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setTicketStatus("submitting");
    setTimeout(() => {
      setTicketStatus("success");
    }, 1500);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
    setTimeout(() => setTicketStatus("idle"), 300);
  };

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
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatOpen]);

  return (
    <div className="lp help">
      <div className="lp-bg" />
      <Navbar />

      {/* HERO */}
      <section className="help-hero">
        <div className="lp-container help-hero-inner">
          <motion.div
            className="help-hero-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="help-hero-pill">Support Center</div>

            <h1 className="help-h1">How can we help you?</h1>
            <p className="help-sub">
              Find answers to your questions or get in touch with our support team.
            </p>

            <div className="help-search">
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} />
            </div>

            <div className="help-hero-mini">
              <span className="help-mini-dot" aria-hidden="true" />
              Tip: You can type keywords like <strong>billing</strong>, <strong>privacy</strong>,{" "}
              or <strong>password</strong>.
            </div>
          </motion.div>
        </div>
      </section>

      {/* CRISIS BANNER */}
      <section className="help-crisis">
        <div className="lp-container">
          <motion.div
            className="help-crisis-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="help-crisis-icon">
              <PhoneCall size={20} />
            </div>
            <div className="help-crisis-text">
              <h3>In a crisis?</h3>
              <p>
                If you or someone else is in danger, please call emergency services (911) or the
                Suicide &amp; Crisis Lifeline (988) immediately.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN */}
      <main className="help-main">
        <div className="lp-container">
          {!searchQuery && (
            <>
              {/* QUICK TIPS MARQUEE */}
              <motion.section
                className="help-tips"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <div className="help-tips-head">
                  <div className="help-tips-title">
                    <Lightbulb size={18} />
                    <span>Quick Troubleshooting &amp; Tips</span>
                  </div>
                  <div className="help-tips-hint">Hover to pause</div>
                </div>

                <div className="help-marquee">
                  <div className="help-track">
                    {[...quickTips, ...quickTips].map((tip, idx) => (
                      <div className="help-tipcard" key={idx}>
                        <div className="help-tipq">{tip.q}</div>
                        <div className="help-tipa">{tip.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* TOPICS */}
              <motion.section
                className="help-topics"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
              >
                <div className="help-section-title">Browse topics</div>

                <div className="help-topics-grid">
                  {[
                    {
                      icon: <User size={22} />,
                      title: "Account Settings",
                      desc: "Manage your profile, password, and preferences.",
                    },
                    {
                      icon: <CreditCard size={22} />,
                      title: "Billing & Plans",
                      desc: "Invoices, subscription tiers, and payment methods.",
                    },
                    {
                      icon: <Shield size={22} />,
                      title: "Privacy & Safety",
                      desc: "Learn about encryption, anonymity, and data rights.",
                    },
                    {
                      icon: <FileText size={22} />,
                      title: "Therapy Guide",
                      desc: "Tips for your first session and getting the most out of therapy.",
                    },
                  ].map((t) => (
                    <motion.div
                      key={t.title}
                      className="help-topic"
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 240, damping: 18 }}
                    >
                      <div className="help-topic-ic">{t.icon}</div>
                      <div className="help-topic-t">{t.title}</div>
                      <div className="help-topic-d">{t.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </>
          )}

          {/* FAQ */}
          <motion.section
            className="help-faq"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="help-section-title">
              {searchQuery ? `Results for "${searchQuery}"` : "Frequently Asked Questions"}
            </div>

            <div className="help-faq-list">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item, index) => {
                  const active = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className={`help-faq-item ${active ? "active" : ""}`}
                      onClick={() => toggleFaq(index)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="help-faq-q">
                        <span>{item.question}</span>
                        {active ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>

                      <div className="help-faq-a">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="help-nores">
                  <Search size={44} />
                  <p>No results found. Try adjusting your search or contact support below.</p>
                </div>
              )}
            </div>
          </motion.section>

          {/* CONTACT */}
          <motion.section
            className="help-contact"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="help-contact-card">
              <div className="help-contact-title">Still need help?</div>
              <div className="help-contact-sub">
                Our support team is available Mon–Fri, 9am–6pm EST.
              </div>

              <div className="help-contact-actions">
                <motion.button
                  className="lp-cta help-btn"
                  onClick={() => setIsChatOpen(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <MessageCircle size={18} />
                  Chat with Support
                </motion.button>

                <motion.button
                  className="lp-pillbtn help-btn help-btn--alt"
                  onClick={() => setIsTicketModalOpen(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <FileText size={18} />
                  Submit a Ticket
                </motion.button>
              </div>

              <div className="help-contact-links">
                <Link to="/login">Log in</Link>
                <span>•</span>
                <Link to="/signup">Create account</Link>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* TICKET MODAL */}
      {isTicketModalOpen && (
        <div className="help-modalOverlay" role="dialog" aria-modal="true">
          <motion.div
            className="help-modal"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button className="help-close" onClick={closeTicketModal} aria-label="Close">
              <X size={20} />
            </button>

            {ticketStatus === "success" ? (
              <div className="help-success">
                <CheckCircle size={56} />
                <h3>Ticket Submitted!</h3>
                <p>We&apos;ve received your request. Check your email for a confirmation number.</p>
                <button className="lp-cta" onClick={closeTicketModal}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="help-modalTitle">Submit a Support Ticket</h2>
                <p className="help-modalSub">
                  Describe your issue and we&apos;ll get back to you via email.
                </p>

                <form className="help-form" onSubmit={handleTicketSubmit}>
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" required />

                  <label>Subject</label>
                  <input type="text" placeholder="e.g., Billing Issue" required />

                  <label>Description</label>
                  <textarea placeholder="Tell us more about the problem..." rows="4" required />

                  <button
                    type="submit"
                    className="lp-cta"
                    disabled={ticketStatus === "submitting"}
                    style={{
                      opacity: ticketStatus === "submitting" ? 0.7 : 1,
                      cursor: ticketStatus === "submitting" ? "not-allowed" : "pointer",
                    }}
                  >
                    {ticketStatus === "submitting" ? "Sending..." : "Submit Request"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* CHAT WIDGET */}
      <SupportChatWidget open={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
