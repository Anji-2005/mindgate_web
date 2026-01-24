
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const hoverLink = {
    rest: { y: 0, opacity: 0.88 },
    hover: { y: -1, opacity: 1 },
  };

  const goToAI = (e) => {

    if (e) e.preventDefault();
    setIsOpen(false);
    navigate("/personal");
  };

  const goToHuman = (e) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    navigate("/talk-to-human");
  };

  const menuItems = [
    { label: "Talk to AI", onClick: goToAI },
    { label: "Talk to Human", onClick: goToHuman },
    { label: "Help", onClick: () => navigate("/help") },
    { label: "About", onClick: () => navigate("/about") },
  ];


  return (
    <header className="lp-nav">
      <div className="lp-nav-inner">
        <motion.div
          className="lp-brand"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}

          style={{ cursor: "pointer", whiteSpace: "nowrap" }}
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}

        >
          MIND <span style={{ color: "#0f6a37" }}>GATE</span>
        </motion.div>


        {/* Desktop Links */}
        <nav className="lp-nav-links desktop-only">
          {menuItems.map((item, idx) => (
            <motion.a
              key={idx}
              className="lp-nav-link"
              href="#"
              variants={hoverLink}
              initial="rest"
              whileHover="hover"
              onClick={(e) => {
                e.preventDefault();
                item.onClick();
              }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="lp-nav-actions desktop-only">

          <motion.button
            className="lp-linkbtn"
            onClick={() => navigate("/login")}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
          >
            Login
          </motion.button>

          <motion.button
            className="lp-pillbtn"
            onClick={() => navigate("/signup")}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
          >
            Sign Up
          </motion.button>
        </div>


        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-drawer-inner">
              {menuItems.map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="mobile-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    item.onClick();
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="mobile-drawer-actions">
                <button
                  className="lp-linkbtn"
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="lp-pillbtn"
                  onClick={() => {
                    navigate("/signup");
                    setIsOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}


