// LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import "./LandingPage.css";

import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Footer from "../components/landing/Footer";

import AnimatedBackground from "../components/AnimatedBackground";


import aiImg from "../assets/ai.jpg";
import humanImg from "../assets/human.jpg";
import communityImg from "../assets/community.png";

export default function LandingPage() {
  const navigate = useNavigate();


  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="lp">
      <AnimatedBackground />

      <Navbar />

      <main className="lp-main">
        <Hero />



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

                    onClick={() => handleNavigate("/personal")}

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

                    onClick={() => handleNavigate("/talk-to-human")}

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

                <div className="lp-row-cta lp-row-cta--split">
                  <motion.button
                    className="lp-cta"

                    onClick={() => handleNavigate("/find-therapist")}

                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    Find Therapist →
                  </motion.button>

                  <motion.button
                    className="lp-cta"

                    onClick={() => handleNavigate("/find-active-listener")}

                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    Find Active Listener →
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
