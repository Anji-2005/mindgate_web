import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import "./TherapistBookSession.css";

const SESSION_FOCUS_OPTIONS = [
  "General Anxiety",
  "Stress & Burnout",
  "Panic Attacks",
  "Overthinking",
  "Low Self-esteem",
  "Relationship Issues",
  "Family Conflicts",
  "Academic Pressure",
  "Work/Career Guidance",
  "Loneliness",
  "Grief & Loss",
  "Anger Management",
  "Sleep Issues",
  "Social Anxiety",
  "Motivation & Productivity",
  "Self-care Planning",
  "Other",
];

const makeWeek = (startDate = new Date()) => {
  const d = new Date(startDate);
  d.setHours(0, 0, 0, 0);

  // Align to today (not Monday). We want a simple "next 5 days" strip like the design.
  const days = [];
  for (let i = 0; i < 5; i++) {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    days.push(x);
  }
  return days;
};

const fmtDow = (date) =>
  date.toLocaleDateString(undefined, { weekday: "short" }); // Mon
const fmtDay = (date) => String(date.getDate()).padStart(2, "0"); // 12
const fmtMon = (date) =>
  date.toLocaleDateString(undefined, { month: "short" }); // Oct

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

export default function TherapistBookSession() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Therapist can come from navigation state (recommended)
  const therapistFromState = location.state?.therapist;

  // fallback therapist (if user refreshes page and state is lost)
  const therapist = therapistFromState || {
    id: id || "t1",
    name: "Sarah Jenkins",
    title: "Intern Psychologist • Empathetic Listener",
    rating: 4.8,
    reviews: 56,
    tags: ["Anxiety", "Stress", "Relationships"],
    about:
      "I am currently completing my masters in clinical psychology. I offer a safe, non-judgmental space to talk about whatever is weighing on your mind. I believe in the healing power of being truly heard.",
    price: 45.0,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
  };

  const weekDays = useMemo(() => makeWeek(new Date()), []);
  const [step, setStep] = useState(1); // 1 Time, 2 Details, 3 Payment

  const [selectedDate, setSelectedDate] = useState(weekDays[0]);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  const [focus, setFocus] = useState("General Anxiety");
  const [notes, setNotes] = useState("");

  const platformFee = 2.0;
  const total = Number((therapist.price + platformFee).toFixed(2));

  // Payment inputs (UI only)
  const [cardNumber, setCardNumber] = useState("");
  const [mmYY, setMmYY] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    // If user already chose a therapist somewhere, keep title consistent
    document.title = "Book a Session • MindGate";
  }, []);

  const canGoDetails = Boolean(selectedDate && selectedTime);
  const canGoPayment = Boolean(focus);

  const confirmBooking = () => {
    // UI-only: you will replace with API call later
    alert(
      `✅ Booking Confirmed!\n\nTherapist: ${therapist.name}\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}\nFocus: ${focus}\nTotal: $${total}`
    );
    // navigate("/dashboard"); // if you have a dashboard route
  };

  const dateLabel = useMemo(() => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, [selectedDate]);

  return (
    <div className="bs-page">
      <Navbar />

      <div className="bs-wrap">
        <div className="bs-top">
          <div className="bs-breadcrumb">
            <span className="bs-crumb-muted">Home</span>
            <span className="bs-crumb-sep">›</span>
            <span className="bs-crumb-muted">Listeners</span>
            <span className="bs-crumb-sep">›</span>
            <span className="bs-crumb-strong">Booking Session</span>
          </div>

          <h1 className="bs-title">Book a Session</h1>
          <p className="bs-subtitle">
            Connect with an empathetic listener for guidance and support.
          </p>
        </div>

        <div className="bs-grid">
          {/* LEFT PROFILE CARD */}
          <aside className="bs-profileCard">
            <div className="bs-profileTop">
              <div className="bs-avatarRing">
                <img className="bs-avatar" src={therapist.avatar} alt={therapist.name} />
              </div>

              <div className="bs-name">{therapist.name}</div>
              <div className="bs-role">{therapist.title}</div>

              <div className="bs-ratingRow">
                <span className="bs-stars">★★★★★</span>
                <span className="bs-rating">
                  {therapist.rating.toFixed(1)}{" "}
                  <span className="bs-ratingMuted">({therapist.reviews})</span>
                </span>
              </div>

              <div className="bs-tags">
                {therapist.tags.map((t) => (
                  <span key={t} className="bs-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bs-about">
              <div className="bs-aboutTitle">About {therapist.name.split(" ")[0]}</div>
              <p className="bs-aboutText">{therapist.about}</p>
            </div>

            <div className="bs-priceRow">
              <div className="bs-duration">
                <span className="bs-clock" />
                <span>50 min session</span>
              </div>
              <div className="bs-price">${therapist.price.toFixed(2)}</div>
            </div>
          </aside>

          {/* RIGHT MAIN CARD */}
          <section className="bs-mainCard">
            {/* Steps */}
            <div className="bs-steps">
              <div className={`bs-step ${step === 1 ? "is-active" : step > 1 ? "is-done" : ""}`}>
                <div className="bs-stepDot">1</div>
                <div className="bs-stepLabel">Time</div>
              </div>
              <div className="bs-stepLine" />
              <div className={`bs-step ${step === 2 ? "is-active" : step > 2 ? "is-done" : ""}`}>
                <div className="bs-stepDot">2</div>
                <div className="bs-stepLabel">Details</div>
              </div>
              <div className="bs-stepLine" />
              <div className={`bs-step ${step === 3 ? "is-active" : ""}`}>
                <div className="bs-stepDot">3</div>
                <div className="bs-stepLabel">Payment</div>
              </div>
            </div>

            {/* STEP 1: TIME */}
            <div className="bs-block">
              <div className="bs-blockTitle">
                <span className="bs-iconCalendar" />
                Select a Date &amp; Time
              </div>

              <div className="bs-dateStrip">
                {weekDays.map((d) => {
                  const isActive =
                    selectedDate &&
                    d.toDateString() === selectedDate.toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      className={`bs-datePill ${isActive ? "is-active" : ""}`}
                      onClick={() => setSelectedDate(d)}
                      type="button"
                    >
                      <div className="bs-dateDow">{fmtDow(d)}</div>
                      <div className="bs-dateNum">{fmtDay(d)}</div>
                      <div className="bs-dateMon">{fmtMon(d)}</div>
                    </button>
                  );
                })}
              </div>

              <div className="bs-timeGrid">
                {TIME_SLOTS.map((t) => {
                  const isActive = selectedTime === t;
                  return (
                    <button
                      key={t}
                      className={`bs-timeSlot ${isActive ? "is-active" : ""}`}
                      onClick={() => setSelectedTime(t)}
                      type="button"
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              <div className="bs-miniHint">
                Selected: <b>{dateLabel}</b> at <b>{selectedTime}</b>
              </div>

              <div className="bs-actionsRow">
                <button
                  type="button"
                  className="bs-btn bs-btnGhost"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="bs-btn bs-btnPrimary"
                  disabled={!canGoDetails}
                  onClick={() => setStep(2)}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* STEP 2: DETAILS */}
            <div className={`bs-block ${step < 2 ? "is-disabled" : ""}`}>
              <div className="bs-blockTitle">
                <span className="bs-iconList" />
                Session Focus
              </div>

              <div className="bs-field">
                <div className="bs-fieldLabel">What would you like to discuss?</div>

                <div className="bs-selectWrap">
                  <select
                    className="bs-select"
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                    disabled={step < 2}
                  >
                    {SESSION_FOCUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="bs-selectChevron">▾</span>
                </div>
              </div>

              <div className="bs-field">
                <div className="bs-fieldLabel">Additional Notes (Optional)</div>
                <textarea
                  className="bs-textarea"
                  placeholder="Anything specific you want them to know beforehand..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={step < 2}
                />
              </div>

              <div className="bs-actionsRow">
                <button
                  type="button"
                  className="bs-btn bs-btnGhost"
                  onClick={() => setStep(1)}
                  disabled={step < 2}
                >
                  Back
                </button>

                <button
                  type="button"
                  className="bs-btn bs-btnPrimary"
                  disabled={!canGoPayment || step < 2}
                  onClick={() => setStep(3)}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* STEP 3: PAYMENT */}
            <div className={`bs-block ${step < 3 ? "is-disabled" : ""}`}>
              <div className="bs-blockTitle">
                <span className="bs-iconCard" />
                Payment Details
              </div>

              <div className="bs-paymentBox">
                <div className="bs-payRow">
                  <span>Session with {therapist.name}</span>
                  <b>${therapist.price.toFixed(2)}</b>
                </div>
                <div className="bs-payRow">
                  <span className="bs-muted">Platform Fee</span>
                  <b className="bs-muted">${platformFee.toFixed(2)}</b>
                </div>
                <div className="bs-payDivider" />
                <div className="bs-payRow">
                  <span className="bs-totalLabel">Total</span>
                  <b className="bs-total">${total.toFixed(2)}</b>
                </div>
              </div>

              <div className="bs-cardForm">
                <input
                  className="bs-input"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  disabled={step < 3}
                />
                <div className="bs-cardRow">
                  <input
                    className="bs-input"
                    placeholder="MM / YY"
                    value={mmYY}
                    onChange={(e) => setMmYY(e.target.value)}
                    disabled={step < 3}
                  />
                  <input
                    className="bs-input"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    disabled={step < 3}
                  />
                </div>
              </div>

              <div className="bs-actionsRow">
                <button
                  type="button"
                  className="bs-btn bs-btnGhost"
                  onClick={() => setStep(2)}
                  disabled={step < 3}
                >
                  Back
                </button>

                <button
                  type="button"
                  className="bs-btn bs-btnPrimary"
                  onClick={confirmBooking}
                  disabled={step < 3}
                >
                  Confirm Booking →
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className="bs-footer">
          <span>© 2023 MindGate. All rights reserved</span>
          <div className="bs-footerLinks">
            <button className="bs-linkBtn" type="button">Privacy Policy</button>
            <button className="bs-linkBtn" type="button">Terms of Service</button>
            <button className="bs-linkBtn" type="button">Support</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
