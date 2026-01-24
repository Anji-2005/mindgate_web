import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
=======
>>>>>>> origin/main

import LandingPage from "./pages/LandingPage";
import PersonalPage from "./pages/PersonalPage";
import TalkToHumanPage from "./pages/TalktoHumanPage";
import SettingsPage from "./pages/SettingsPage";
import FindTherapistPage from "./pages/FindTherapistPage";
import TherapistBookSession from "./pages/TherapistBookSession";
import FindActiveListenerPage from "./pages/FindActiveListenerPage";
import ActiveListenerBookSession from "./pages/ActiveListenerBookSession";
import PsychologistCall from "./pages/PsychologistCall";
import ListenerCall from "./pages/ListenerCall";

// Tejas pages (inside components folder)
import Help from "./components/Help.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import About from "./components/About.jsx";
<<<<<<< HEAD
import SplashScreen from "./components/SplashScreen.jsx";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      <div className="App-container">
        <AnimatePresence mode="wait">
          {showSplash && (
            <SplashScreen onFinish={() => setShowSplash(false)} />
          )}
        </AnimatePresence>

        {!showSplash && (
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth & info (Tejas) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />

            {/* Your pages */}
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/talk-to-human" element={<TalkToHumanPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/find-therapist" element={<FindTherapistPage />} />
            <Route path="/book-session/:id" element={<TherapistBookSession />} />
            <Route
              path="/find-active-listener"
              element={<FindActiveListenerPage />}
            />
            <Route
              path="/active-listener-book-session/:id"
              element={<ActiveListenerBookSession />}
            />
            <Route path="/psychologist-call/:roomId" element={<PsychologistCall />} />
            <Route path="/listener-call/:roomId" element={<ListenerCall />} />
          </Routes>
        )}
=======

export default function App() {
  return (
    <Router>
      <div className="App-container">
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth & info (Tejas) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />

          {/* Your pages */}
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/talk-to-human" element={<TalkToHumanPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/find-therapist" element={<FindTherapistPage />} />
          <Route path="/book-session/:id" element={<TherapistBookSession />} />
          <Route
            path="/find-active-listener"
            element={<FindActiveListenerPage />}
          />
          <Route
            path="/active-listener-book-session/:id"
            element={<ActiveListenerBookSession />}
          />
          <Route path="/psychologist-call/:roomId" element={<PsychologistCall />} />
          <Route path="/listener-call/:roomId" element={<ListenerCall />} />
        </Routes>
>>>>>>> origin/main
      </div>
    </Router>
  );
}
