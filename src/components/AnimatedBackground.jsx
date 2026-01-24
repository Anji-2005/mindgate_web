import { motion, useScroll, useTransform } from "framer-motion";

import bgImage from "../assets/abstractbg.png";


export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();


  // Subtle scroll-based parallax
  const scrollY1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scrollY3 = useTransform(scrollYProgress, [0, 1], [0, 80]);


  return (
    <div
      style={{
        position: "fixed",
        inset: 0,

        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#f6fbf7", // Site base color
      }}
    >
      {/* Static Base Image Layer */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1,
          filter: "none",
        }}
      />

      {/* Animated Blob 1 - Top Leftish */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-15, 25, -15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          left: "-10%",
          top: "-5%",
          y: scrollY1,
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.45,
          background: "radial-gradient(circle, rgba(15,106,55,0.15) 0%, rgba(22,163,74,0.08) 50%, transparent 70%)",
        }}
      />

      {/* Animated Blob 2 - Bottom Rightish */}
      <motion.div
        animate={{
          x: [20, -30, 20],
          y: [30, -20, 30],
          scale: [1.02, 1, 1.02],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          right: "-15%",
          bottom: "5%",
          y: scrollY2,
          borderRadius: "50%",
          filter: "blur(90px)",
          opacity: 0.4,
          background: "radial-gradient(circle, rgba(215,242,228,0.8) 0%, rgba(15,106,55,0.12) 60%, transparent 75%)",
        }}
      />

      {/* Animated Blob 3 - Mid Center Accent */}
      <motion.div
        animate={{
          x: [-40, 40, -40],
          y: [40, -40, 40],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          left: "30%",
          top: "40%",
          y: scrollY3,
          borderRadius: "50%",
          filter: "blur(100px)",
          background: "radial-gradient(circle, rgba(15,106,55,0.2) 0%, transparent 65%)",

        }}
      />
    </div>
  );
}
