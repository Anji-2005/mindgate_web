import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    // Redirect to home after animation finishes
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onFinish]);

  // Logo parts variants
  const partVariants = {
    initialTL: { x: -150, y: -150, opacity: 0, scale: 0.8 },
    initialTR: { x: 150, y: -150, opacity: 0, scale: 0.8 },
    initialBL: { x: -150, y: 150, opacity: 0, scale: 0.8 },
    initialBR: { x: 150, y: 150, opacity: 0, scale: 0.8 },
    animate: { x: 0, y: 0, opacity: 1, scale: 1 },
  };

  return (
    <motion.div 
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="splash-content">
        {/* Roaming Greenish Background Blobs */}
        <motion.div 
          className="splash-blob blob-1"
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="splash-blob blob-2"
          animate={{ x: [100, -100, 100], y: [50, -50, 50], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        <motion.div 
          className="logo-animation"
          initial={{ y: 0, opacity: 0, scale: 0.8 }}
          animate={{ y: [0, -10, 0], opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* The logo image requested */}
          <motion.img 
            src="/mainlogo.png" 
            alt="Mindgate Logo"
            className="splash-logo-img"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          />
        </motion.div>

        <motion.div 
          className="splash-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <h1 className="splash-name">MIND<span>GATE</span></h1>
          <div className="splash-motto-wrap">
            <p>Minds connected, hearts protected.</p>
            <p className="moto-label">Our moto.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
