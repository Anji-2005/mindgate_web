import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import PersonalPage from "./pages/PersonalPage";
import TalkToHumanPage from "./pages/TalkToHumanPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/human" element={<TalkToHumanPage />} />
      </Routes>
    </Router>
  );
}

