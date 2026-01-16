import React, { useState } from "react";
import { Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/landing/Navbar";
import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="lp auth">
      {/* same dynamic background layer as landing */}
      <div className="lp-bg" />

      {/* ✅ your navbar */}
      <Navbar />

      <main className="auth-main">
        <div className="auth-container">
          <motion.div
            className="auth-grid"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* LEFT: hero / image card (matches your support-card vibe) */}
            <motion.aside
              className="auth-hero"
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <motion.div
                className="auth-hero-card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="auth-hero-title">
                  Your journey to mental wellness starts here.
                </div>

                <div className="auth-hero-media">
                  <img
                    src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=1200&auto=format&fit=crop"
                    alt="Calm interior"
                    className="auth-hero-img"
                  />
                </div>

                <div className="auth-hero-copy">
                  Connect with licensed psychologists and find your peace of mind.
                </div>
              </motion.div>

              {/* tiny “feature chips” for extra polish */}
              <div className="auth-chips" aria-hidden="true">
                <div className="auth-chip">Private</div>
                <div className="auth-chip">Supportive</div>
                <div className="auth-chip">Human-first</div>
              </div>
            </motion.aside>

            {/* RIGHT: form */}
            <motion.section
              className="auth-form"
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            >
              <div className="auth-form-inner">
                <div className="auth-header">
                  <h1 className="auth-h1">Welcome Back</h1>
                  <p className="auth-sub">
                    Please enter your details to access your dashboard.
                  </p>
                </div>

                <form
                  className="auth-form-fields"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // keep logic intact — add auth later
                    // example: navigate("/personal");
                  }}
                >
                  <div className="auth-field">
                    <label className="auth-label">Email or Username</label>
                    <input
                      className="auth-input"
                      type="text"
                      placeholder="example@email.com"
                      autoComplete="username"
                    />
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Password</label>

                    <div className="auth-password">
                      <input
                        className="auth-input auth-input--pw"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />

                      <button
                        type="button"
                        className="auth-eye"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <Eye size={18} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="auth-forgot"
                      onClick={() => {
                        // keep placeholder; wire later
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    className="lp-cta auth-submit"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    Log In →
                  </motion.button>

                  <div className="auth-divider">
                    <span>Or continue with</span>
                  </div>

                  <motion.button
                    type="button"
                    className="auth-google"
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    onClick={() => {
                      // plug your google auth here later
                    }}
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt=""
                      aria-hidden="true"
                    />
                    Continue with Google
                  </motion.button>

                  <p className="auth-footer">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="auth-link">
                      Sign Up
                    </Link>
                  </p>

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
