import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import "./ActiveListenerBookSession.css";

const SESSION_FOCUS_OPTIONS = [
  "General Anxiety",
  "Stress & Burnout",
  "Overthinking",
  "Loneliness",
  "Breakup / Relationship",
  "Family Issues",
  "Academic Pressure",
  "Work Stress",
  "Confidence / Self-esteem",
  "Grief & Loss",
  "Sleep Issues",
  "Anger / Frustration",
  "Just need to vent",
  "Other",
];

const makeWeek = (startDate = new Date()) => {
  const d = new Date(startDate);
  d.setHours(0, 0, 0, 0);
  const days = [];
  for (let i = 0; i < 5; i++) {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    days.push(x);
  }
  return days;
};

const fmtDow = (date) => date.toLocaleDateString(undefined, { weekday: "short" });
const fmtDay = (date) => String(date.getDate()).padStart(2, "0");
const fmtMon = (date) => date.toLocaleDateString(undefined, { month: "short" });

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

export default function ActiveListenerBookSession() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const listenerFromState = location.state?.listener;

  const listener = listenerFromState || {
    id: id || "l1",
    name: "Aanya Sen",
    title: "Active Listener • Trained Volunteer",
    rating: 4.9,
    tags: ["Anxiety", "Loneliness", "Relationships"],
    about:
      "I’m here to listen without judgment. We can talk through what you’re feeling and help you feel lighter, calmer, and heard.",
    price: 25.0,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
  };

  const weekDays = useMemo(() => makeWeek(new Date()), []);
  const [step, setStep] = useState(1);

  const [selectedDate, setSelectedDate] = useState(weekDays[0]);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  const [focus, setFocus] = useState("General Anxiety");
  const [notes, setNotes] = useState("");

  const platformFee = 1.0;
  const total = Number((listener.price + platformFee).toFixed(2));

  const [cardNumber, setCardNumber] = useState("");
  const [mmYY, setMmYY] = useState("");
  const [cvc, setCvc] = useState("");

  // ✅ ADDED (VIDEO CALL LOGIC) — minimal, does not affect existing UI
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [roomId, setRoomId] = useState(null);

  const dateLabel = useMemo(() => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, [selectedDate]);

  const confirmBooking = () => {
    // ✅ ADDED: generate roomId + enable Join button
    const generatedRoomId = `listener-${Date.now()}`;
    setRoomId(generatedRoomId);
    setBookingConfirmed(true);

    alert(
      `✅ Booking Confirmed!\n\nListener: ${listener.name}\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}\nFocus: ${focus}\nTotal: $${total}`
    );
  };

  return (
    <div className="albs-page">
      <Navbar />

      <div className="albs-wrap">
        <div className="albs-top">
          <div className="albs-breadcrumb">
            <span className="albs-muted">Home</span>
            <span className="albs-sep">›</span>
            <span className="albs-muted">Active Listeners</span>
            <span className="albs-sep">›</span>
            <span className="albs-strong">Booking Session</span>
          </div>

          <h1 className="albs-title">Book a Session</h1>
          <p className="albs-subtitle">Connect with an active listener for support and clarity.</p>
        </div>

        <div className="albs-grid">
          <aside className="albs-profileCard">
            <div className="albs-profileTop">
              <div className="albs-avatarRing">
                <img className="albs-avatar" src={listener.avatar} alt={listener.name} />
              </div>

              <div className="albs-name">{listener.name}</div>
              <div className="albs-role">{listener.title}</div>

              <div className="albs-tags">
                {listener.tags.map((t) => (
                  <span key={t} className="albs-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="albs-about">
              <div className="albs-aboutTitle">About</div>
              <p className="albs-aboutText">{listener.about}</p>
            </div>

            <div className="albs-priceRow">
              <div className="albs-duration">
                <span className="albs-dot" />
                <span>50 min session</span>
              </div>
              <div className="albs-price">${listener.price.toFixed(2)}</div>
            </div>
          </aside>

          <section className="albs-mainCard">
            <div className="albs-steps">
              <div className={`albs-step ${step === 1 ? "is-active" : step > 1 ? "is-done" : ""}`}>
                <div className="albs-stepDot">1</div>
                <div className="albs-stepLabel">Time</div>
              </div>
              <div className="albs-stepLine" />
              <div className={`albs-step ${step === 2 ? "is-active" : step > 2 ? "is-done" : ""}`}>
                <div className="albs-stepDot">2</div>
                <div className="albs-stepLabel">Details</div>
              </div>
              <div className="albs-stepLine" />
              <div className={`albs-step ${step === 3 ? "is-active" : ""}`}>
                <div className="albs-stepDot">3</div>
                <div className="albs-stepLabel">Payment</div>
              </div>
            </div>

            {/* Time */}
            <div className="albs-block">
              <div className="albs-blockTitle">Select a Date &amp; Time</div>

              <div className="albs-dateStrip">
                {weekDays.map((d) => {
                  const isActive = d.toDateString() === selectedDate.toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      className={`albs-datePill ${isActive ? "is-active" : ""}`}
                      onClick={() => setSelectedDate(d)}
                      type="button"
                    >
                      <div className="albs-dateDow">{fmtDow(d)}</div>
                      <div className="albs-dateNum">{fmtDay(d)}</div>
                      <div className="albs-dateMon">{fmtMon(d)}</div>
                    </button>
                  );
                })}
              </div>

              <div className="albs-timeGrid">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    className={`albs-timeSlot ${selectedTime === t ? "is-active" : ""}`}
                    onClick={() => setSelectedTime(t)}
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="albs-miniHint">
                Selected: <b>{dateLabel}</b> at <b>{selectedTime}</b>
              </div>

              <div className="albs-actionsRow">
                <button className="albs-btn albs-btnGhost" type="button" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button className="albs-btn albs-btnPrimary" type="button" onClick={() => setStep(2)}>
                  Continue
                </button>
              </div>
            </div>

            {/* Details */}
            <div className={`albs-block ${step < 2 ? "is-disabled" : ""}`}>
              <div className="albs-blockTitle">Session Focus</div>

              <div className="albs-field">
                <div className="albs-fieldLabel">What would you like to discuss?</div>
                <div className="albs-selectWrap">
                  <select
                    className="albs-select"
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
                  <span className="albs-chevron">▾</span>
                </div>
              </div>

              <div className="albs-field">
                <div className="albs-fieldLabel">Additional Notes (Optional)</div>
                <textarea
                  className="albs-textarea"
                  placeholder="Anything specific you want them to know beforehand..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={step < 2}
                />
              </div>

              <div className="albs-actionsRow">
                <button className="albs-btn albs-btnGhost" type="button" onClick={() => setStep(1)}>
                  Back
                </button>
                <button className="albs-btn albs-btnPrimary" type="button" onClick={() => setStep(3)}>
                  Continue
                </button>
              </div>
            </div>

            {/* Payment */}
            <div className={`albs-block ${step < 3 ? "is-disabled" : ""}`}>
              <div className="albs-blockTitle">Payment Details</div>

              <div className="albs-paymentBox">
                <div className="albs-payRow">
                  <span>Session with {listener.name}</span>
                  <b>${listener.price.toFixed(2)}</b>
                </div>
                <div className="albs-payRow">
                  <span className="albs-muted">Platform Fee</span>
                  <b className="albs-muted">${platformFee.toFixed(2)}</b>
                </div>
                <div className="albs-payDivider" />
                <div className="albs-payRow">
                  <span className="albs-totalLabel">Total</span>
                  <b className="albs-total">${total.toFixed(2)}</b>
                </div>
              </div>

              <div className="albs-cardForm">
                <input
                  className="albs-input"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  disabled={step < 3}
                />
                <div className="albs-cardRow">
                  <input
                    className="albs-input"
                    placeholder="MM / YY"
                    value={mmYY}
                    onChange={(e) => setMmYY(e.target.value)}
                    disabled={step < 3}
                  />
                  <input
                    className="albs-input"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    disabled={step < 3}
                  />
                </div>
              </div>

              <div className="albs-actionsRow">
                <button className="albs-btn albs-btnGhost" type="button" onClick={() => setStep(2)}>
                  Back
                </button>

                <button className="albs-btn albs-btnPrimary" type="button" onClick={confirmBooking}>
                  Confirm Booking →
                </button>

                {bookingConfirmed && (
                  <button
                    className="albs-btn albs-btnPrimary"
                    style={{ marginLeft: "12px" }}
                    type="button"
                    onClick={() => navigate(`/listener-call/${roomId}`)}
                  >
                    Join Call
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

