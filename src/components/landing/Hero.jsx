import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SupportChatWidget from "../SupportChatWidget";

export default function Hero() {
  const navigate = useNavigate();
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <section className="lp-hero">
      <div className="lp-container">
        <div className="lp-hero-grid">
          {/* LEFT */}
          <motion.div
            className="lp-hero-left"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="lp-powered">• Powered by AI</div>

            <motion.div
              className="lp-badge"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
            >
              Designed to guide you
              <br />
              toward the support you deserve.
            </motion.div>

            <div className="lp-h1-wrap">
              <h1 className="lp-h1 lp-h1-3d">
                Explore the ways we
                <br />
                support your mental
                <br />
                wellbeing
              </h1>
            </div>

            <p className="lp-sub">Coming soon: A calm companion for your mind.</p>

            {/* OPTIONAL HERO CTA (extra dynamic feeling) */}
            <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <motion.button
                className="lp-cta"
                onClick={() => navigate("/personal")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              >
                Start with AI →
              </motion.button>

              <motion.button
                className="lp-pillbtn"
                onClick={() => navigate("/talk-to-human")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              >
                Talk to Human →
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT SIDE - MINDGATE LOGO DROP-ON-FLOOR ANIMATION */}
          <div className="lp-hero-right">
            <motion.div
              className="lp-logo-container"
              initial={{ y: -260, scaleY: 0.9, scaleX: 1.05, opacity: 0 }}
              animate={{
                // Drop from above, hit the floor, then bounce a few times
                y: [-260, 0, -36, 0, -14, 0],
                scaleY: [0.9, 1.02, 0.92, 1.01, 0.97, 1],
                scaleX: [1.05, 0.98, 1.05, 0.99, 1.02, 1],
                rotate: [0, 0, -4, 3, -2, 0],
                opacity: 1
              }}
              transition={{
                duration: 1.6,
                ease: "easeOut",
                times: [0, 0.55, 0.72, 0.86, 0.94, 1],
                repeat: Infinity,
                repeatDelay: 3.5
              }}
            >
              <motion.img
                src="/mainlogo.png"
                alt="Mindgate Logo"
                className="lp-hero-logo"
                whileHover={{
                  scale: 1.08,
                  rotate: 4,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
              />

              {/* Ground shadow effect */}
              <motion.div
                className="lp-logo-shadow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  // Shadow quickly appears and squashes on impact
                  scaleX: [0, 1.4, 1.1, 1.2, 1.1, 1],
                  scaleY: [0, 0.5, 0.7, 0.6, 0.7, 0.8],
                  opacity: [0, 0.7, 0.4, 0.45, 0.4, 0.35]
                }}
                transition={{
                  duration: 1.6,
                  ease: "easeOut",
                  times: [0, 0.55, 0.72, 0.86, 0.94, 1]
                }}
              />

              {/* Soft floor strip the logo lands on */}
              <motion.div
                className="lp-logo-floor"
                initial={{ scaleX: 0.4, opacity: 0 }}
                animate={{
                  scaleX: [0.4, 1.1, 0.95, 1],
                  opacity: [0, 0.6, 0.7, 0.6]
                }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              />
            </motion.div>
          </div>

          {/* FLOATING BUTTONS */}
          <div className="lp-float">
            <motion.button
              className="lp-float-btn"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              aria-label="Settings"
              onClick={() => navigate("/settings")}
            >
              ☼
            </motion.button>

            <motion.button
              className="lp-float-owl"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              aria-label="Start chat"
              onClick={() => navigate("/personal")}
            >
              <span className="lp-owl-eye" />
              <span className="lp-owl-eye" />
            </motion.button>

            <motion.button
              className="lp-float-btn"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              aria-label="Book active listener"
              onClick={() => setSupportOpen(true)}
            >
              ✦
            </motion.button>
          </div>
        </div>
      </div>
      <SupportChatWidget open={supportOpen} onClose={() => setSupportOpen(false)} />
    </section>
  );
}
