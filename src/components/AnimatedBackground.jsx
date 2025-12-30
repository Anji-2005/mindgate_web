import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();

  // Keep motion subtle so it stays calm + on-brand
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "12%"]);
  const y1 = useTransform(scrollYProgress, [0, 1], ["-12%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["70%", "52%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "28%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#eef7f3", // your base mint
      }}
    >
      {/* Blob 1 */}
      <motion.div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          left: x1,
          top: y1,
          rotate: rot,
          borderRadius: "50%",
          filter: "blur(60px)",
          opacity: 0.55,
          background:
            "radial-gradient(circle at 30% 30%, rgba(215,242,228,1) 0%, rgba(15,106,55,0.22) 55%, rgba(238,247,243,0) 70%)",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          left: x2,
          top: y2,
          rotate: rot,
          borderRadius: "50%",
          filter: "blur(70px)",
          opacity: 0.45,
          background:
            "radial-gradient(circle at 60% 40%, rgba(231,246,238,1) 0%, rgba(15,106,55,0.18) 55%, rgba(238,247,243,0) 72%)",
        }}
      />

      {/* Deep green accent (very subtle) */}
      <motion.div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          left: "35%",
          top: "60%",
          rotate: rot,
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.22,
          background:
            "radial-gradient(circle at 50% 50%, rgba(15,106,55,0.28) 0%, rgba(15,106,55,0.08) 45%, rgba(238,247,243,0) 70%)",
        }}
      />
    </div>
  );
}
