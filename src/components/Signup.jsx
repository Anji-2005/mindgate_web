import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ShieldCheck, Star } from "lucide-react";

import Navbar from "./landing/Navbar";
import "./Signup.css";

export default function Signup() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="lp auth">
      <div className="lp-bg" />
      <Navbar />

      <main className="auth-main">
        <div className="auth-container">
          <motion.div
            className="auth-grid auth-grid--signup"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* LEFT: Hero / Testimonial */}
            <motion.aside
              className="auth-hero"
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <motion.div
                className="signup-hero-card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="signup-hero-pill">Private • Secure • Calm</div>

                <h2 className="signup-hero-h2">
                  Find balance{" "}
                  <span className="signup-hero-accent">in a chaotic world.</span>
                </h2>

                <p className="signup-hero-p">
                  Join thousands of users connecting with licensed psychologists
                  in a safe, secure, and private environment.
                </p>

                <div className="signup-testimonial">
                  <div className="signup-stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>

                  <p className="signup-quote">
                    “Within two weeks of signing up, I matched with a therapist
                    who truly understands my anxiety. The platform is intuitive
                    and calming.”
                  </p>

                  <div className="signup-user">
                    <img
                      src="https://i.pravatar.cc/150?u=sarah"
                      alt="Member avatar"
                    />
                    <div>
                      <strong>Sarah Jenkins</strong>
                      <span>Member since 2025</span>
                    </div>
                  </div>
                </div>

                <div className="signup-hero-footer">
                  <button type="button" onClick={() => navigate("/help")}>
                    Privacy Policy
                  </button>
                  <button type="button" onClick={() => navigate("/help")}>
                    Terms of Service
                  </button>
                </div>
              </motion.div>

              <div className="auth-chips" aria-hidden="true">
                <div className="auth-chip">Guided onboarding</div>
                <div className="auth-chip">Verified pros</div>
                <div className="auth-chip">Community support</div>
              </div>
            </motion.aside>

            {/* RIGHT: Form */}
            <motion.section
              className="auth-form"
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            >
              <div className="auth-form-inner">
                <div className="auth-header">
                  <h1 className="auth-h1">Create your account</h1>
                  <p className="auth-sub">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                      Log in
                    </Link>
                  </p>
                </div>

                <div className="signup-social">
                  <motion.button
                    type="button"
                    className="auth-google"
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt=""
                      aria-hidden="true"
                    />
                    Google
                  </motion.button>

                  <motion.button
                    type="button"
                    className="signup-apple"
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                      alt=""
                      aria-hidden="true"
                    />
                    Apple
                  </motion.button>
                </div>

                <div className="auth-divider">
                  <span>Or continue with</span>
                </div>

                <form
                  className="auth-form-fields"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // keep placeholder; wire signup later
                  }}
                >
                  <div className="auth-field">
                    <label className="auth-label">Full Name</label>
                    <div className="signup-inputWrap">
                      <input
                        className="auth-input signup-input"
                        type="text"
                        placeholder="e.g. Jane Doe"
                        autoComplete="name"
                      />
                      <User size={18} className="signup-icon" />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Email address</label>
                    <div className="signup-inputWrap">
                      <input
                        className="auth-input signup-input"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                      <Mail size={18} className="signup-icon" />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Password</label>
                    <div className="signup-inputWrap">
                      <input
                        className="auth-input signup-input"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                      <Lock size={18} className="signup-icon" />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Confirm Password</label>
                    <div className="signup-inputWrap">
                      <input
                        className="auth-input signup-input"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                      <ShieldCheck size={18} className="signup-icon" />
                    </div>
                  </div>

                  <label className="signup-terms">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span>
                      I agree to the <strong>Terms of Service</strong> and
                      acknowledge the <strong>Privacy Policy</strong>.
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    className="lp-cta auth-submit"
                    disabled={!agreed}
                    whileHover={agreed ? { scale: 1.05, y: -2 } : undefined}
                    whileTap={agreed ? { scale: 0.97 } : undefined}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    style={{
                      opacity: agreed ? 1 : 0.6,
                      cursor: agreed ? "pointer" : "not-allowed",
                    }}
                  >
                    Create Account →
                  </motion.button>

                  <div className="signup-secure">
                    <ShieldCheck size={14} />
                    <span>256-bit SSL Secure Encryption</span>
                  </div>

                  <button
                    type="button"
                    className="auth-backhome"
                    onClick={() => navigate("/")}
                  >
                    ← Back to home
                  </button>
                </form>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
