import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import "./LandingPage.css";

import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Footer from "../components/landing/Footer";

import aiImg from "../assets/ai.jpg";
import humanImg from "../assets/human.jpg";
import communityImg from "../assets/community.png";

export default function LandingPage() {
  const navigate = useNavigate();

  /* ========= Optimized: Scroll + Mouse background motion (RAF + proper cleanup) ========= */
  useEffect(() => {
    const root = document.documentElement;

    let latestEvent = null;
    let rafId = null;

    const update = () => {
      rafId = null;

      const y = window.scrollY || 0;

      const mouseX = latestEvent
        ? (latestEvent.clientX / window.innerWidth - 0.5) * 40
        : 0;

      const mouseY = latestEvent
        ? (latestEvent.clientY / window.innerHeight - 0.5) * 40
        : 0;

      const bgx = Math.sin(y * 0.002) * 30 + mouseX;
      const bgy = Math.cos(y * 0.002) * 20 + mouseY;
      const rot = (y * 0.04) % 360;

      root.style.setProperty("--bgx", `${bgx.toFixed(2)}px`);
      root.style.setProperty("--bgy", `${bgy.toFixed(2)}px`);
      root.style.setProperty("--bgrot", `${rot.toFixed(2)}deg`);
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    const onMouseMove = (e) => {
      latestEvent = e;
      requestUpdate();
    };

    const onScroll = () => {
      requestUpdate();
    };

    requestUpdate();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="lp">
      <div className="lp-bg" />

      <Navbar />

      <main className="lp-main">
        <Hero />

        {/* Decorative mint shapes in background */}
        <div className="lp-ornaments" aria-hidden="true">
          {/* top-left cluster */}
          <div className="lp-ornament lp-ornament--tl">
            <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="30" height="30" rx="8" fill="#dcfce7" />
              <path d="M70 2 L76 20 L94 20 L80 30 L86 48 L70 38 L54 48 L60 30 L46 20 L64 20 Z" fill="#dcfce7" />
              <path d="M18 64 A18 18 0 0 1 54 64" stroke="#dcfce7" strokeWidth="8" fill="none" />
            </svg>
          </div>

          {/* right side mid cluster */}
          <div className="lp-ornament lp-ornament--rm">
            <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
              <polygon points="70,14 92,26 96,50 80,66 56,60 48,38" fill="#dcfce7" />
              <rect x="8" y="26" width="28" height="28" rx="12" fill="#dcfce7" />
            </svg>
          </div>

          {/* bottom-left cluster */}
          <div className="lp-ornament lp-ornament--bl">
            <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="18" width="34" height="34" rx="10" fill="#dcfce7" />
              <path d="M76 12 L82 28 L100 28 L86 38 L92 56 L76 46 L60 56 L66 38 L52 28 L70 28 Z" fill="#dcfce7" />
            </svg>
          </div>

          {/* extra scattered shapes to enrich the background */}
          <div className="lp-ornament lp-ornament--tr">
            <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="26" r="14" fill="#dcfce7" />
              <polygon points="74,18 94,26 98,46 82,60 62,54 56,36" fill="#dcfce7" />
            </svg>
          </div>

          <div className="lp-ornament lp-ornament--bm">
            <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="30" width="26" height="26" rx="12" fill="#dcfce7" />
              <circle cx="86" cy="40" r="12" fill="#dcfce7" />
            </svg>
          </div>
        </div>

        {/* SUPPORT SECTIONS */}
        <section className="lp-support" id="support">
          <div className="lp-container lp-support-grid">
            {/* AI SECTION */}
            <motion.div
              className="lp-row"
              initial={{ opacity: 0, x: -160 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                className="lp-illus-card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="lp-illus-title">
                  Thoughtful AI guidance for your mental well-being.
                </div>
                <div className="lp-illus-media">
                  <img src={aiImg} className="lp-illus-img" alt="AI guidance" />
                </div>
              </motion.div>

              <div className="lp-row-text">
                <p className="lp-p">
                  Based on your needs, it gently checks in, offers community
                  support, or helps you connect with a human professional.
                </p>

                <div className="lp-row-cta">
                  <motion.button
                    className="lp-cta"
                    onClick={() => navigate("/personal")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    Talk to AI →
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* HUMAN SECTION */}
            <motion.div
              className="lp-row"
              initial={{ opacity: 0, x: 160 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            >
              <motion.div
                className="lp-illus-card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="lp-illus-title">
                  When you’re ready, a real person is here for you.
                </div>
                <div className="lp-illus-media">
                  <img src={humanImg} className="lp-illus-img" alt="Human support" />
                </div>
              </motion.div>

              <div className="lp-row-text">
                <p className="lp-p">
                  Speak with a qualified mental health professional who understands
                  nuance and listens deeply to your journey.
                </p>

                <div className="lp-row-cta">
                  <motion.button
                    className="lp-cta"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    onClick={() => navigate("/human")}
                  >
                    Talk to a Human →
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* COMMUNITY SECTION */}
            <motion.div
              className="lp-row"
              initial={{ opacity: 0, x: -160 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <motion.div
                className="lp-illus-card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="lp-illus-title">
                  Join moderated group sessions that feel safe and supportive.
                </div>
                <div className="lp-illus-media">
                  <img
                    src={communityImg}
                    className="lp-illus-img"
                    alt="Community support"
                  />
                </div>
              </motion.div>

              <div className="lp-row-text">
                <p className="lp-p">
                  Join moderated group sessions where people come together to listen and share.
                  <br />
                  Connect with others facing similar challenges in a calm, respectful environment.
                  <br />
                  A supportive starting point that reminds you you’re not alone.
                </p>

                <div className="lp-row-cta">
                  <motion.button
                    className="lp-cta"
                    onClick={() => navigate("/community")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    Explore →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="lp-footer-pad">
          <div className="lp-container">
            <div className="lp-footer-bar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
