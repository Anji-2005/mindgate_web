import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import "./TalktoHumanPage.css";

export default function TalkToHuman() {
  const navigate = useNavigate();

  /* ========= Mouse + Scroll Background Motion ========= */
  useEffect(() => {
    const root = document.documentElement;

    const handleMotion = (e) => {
      const y = window.scrollY || 0;
      const mouseX = e ? (e.clientX / window.innerWidth - 0.5) * 40 : 0;
      const mouseY = e ? (e.clientY / window.innerHeight - 0.5) * 40 : 0;

      const bgx = Math.sin(y * 0.002) * 30 + mouseX;
      const bgy = Math.cos(y * 0.002) * 20 + mouseY;
      const rot = (y * 0.04) % 360;

      root.style.setProperty("--bgx", `${bgx.toFixed(2)}px`);
      root.style.setProperty("--bgy", `${bgy.toFixed(2)}px`);
      root.style.setProperty("--bgrot", `${rot.toFixed(2)}deg`);
    };

    handleMotion();
    window.addEventListener("scroll", handleMotion, { passive: true });
    window.addEventListener("mousemove", handleMotion);
    
    return () => {
      window.removeEventListener("scroll", handleMotion);
      window.removeEventListener("mousemove", handleMotion);
    };
  }, []);

  const supportTypes = [
    {
      title: "Active Listening Support",
      description: "Talk with trained listeners anytime.",
      icon: "👤",
    },
    {
      title: "Empathetic Listener",
      description: "Guided support from psychology interns.",
      icon: "👤",
    },
    {
      title: "Professional Psychologist (Licensed)",
      description: "One-on-one sessions with certified experts.",
      icon: "💼",
    },
  ];

  return (
    <div className="tth-wrapper">
      {/* Dynamic Background Layer */}
      <div className="tth-bg" />
      
      <Navbar />
      
      <main className="tth-main">
        {/* Hero Section with Motion Reveal */}
        <section className="tth-hero">
          <div className="tth-container">
            <motion.div 
              className="tth-hero-content"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Connect with Compassion: Talk to a Human</h1>
              <p>
                Our dedicated team is here to provide you with the emotional support 
                you need. Choose your path to healing and connection today.
              </p>
              <div className="tth-hero-btns">
                <button className="btn-outline">Explore Support Options</button>
                <button className="btn-filled">Begin Your Journey</button>
              </div>
              <div className="tth-stats">
                <span><strong>2.5k+</strong> Join thousands seeking support</span>
                <span><strong>5.0★</strong> Rated 4.9/5 by users</span>
              </div>
            </motion.div>
            
            {/* Animated Graphic */}
            <motion.div 
              className="tth-hero-graphic"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="abstract-shape shape-1"></div>
              <div className="abstract-shape shape-2"></div>
              <div className="abstract-shape shape-3"></div>
            </motion.div>
          </div>
        </section>

        {/* Support Selection Grid with staggered reveal */}
        <section className="tth-support-selection">
          <div className="tth-container-grid">
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              Choose Your Support Type
            </motion.h2>
            
            <div className="tth-grid">
              {supportTypes.map((type, index) => (
                <motion.div 
                  key={index} 
                  className="support-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="card-icon">{type.icon}</div>
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
