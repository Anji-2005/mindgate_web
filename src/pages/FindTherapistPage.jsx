import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/landing/Navbar"; // use your existing navbar
import "./FindTherapistPage.css";

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins, PhD",
    title: "Clinical Psychologist • Licensed",
    price: 150,
    mode: "Video Visit",
    next: "Next: Tue, 10am",
    rating: 4.8,
    tags: ["Anxiety", "Depression", "CBT"],
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 2,
    name: "Dr. Michael Chen, PsyD",
    title: "Child & Adolescent Psychologist • Licensed",
    price: 180,
    mode: "In-Person",
    next: "Next: In 2 weeks",
    rating: 5.0,
    tags: ["Adolescents", "Family Therapy", "ADHD"],
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez, PhD",
    title: "Neuropsychologist • Licensed",
    price: 200,
    mode: "Video Visit",
    next: "Next: Tomorrow",
    rating: 4.7,
    tags: ["Trauma", "PTSD", "Evaluations"],
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
  },
];

function Stars({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const total = 5;

  return (
    <div className="ft-stars" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const cls =
          idx <= full ? "full" : half && idx === full + 1 ? "half" : "empty";
        return <span key={idx} className={`ft-star ${cls}`} />;
      })}
      <span className="ft-rating">({value.toFixed(1)})</span>
    </div>
  );
}

export default function FindTherapistPage() {
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("Clinical Psychologist");
  const [priceMin, setPriceMin] = useState(50);
  const [priceMax, setPriceMax] = useState(300);
  const [availability, setAvailability] = useState("Available Today");
  const [sort, setSort] = useState("Relevance");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...DOCTORS];

    // very light demo filtering to keep UI consistent
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(s) ||
          d.title.toLowerCase().includes(s) ||
          d.tags.some((t) => t.toLowerCase().includes(s))
      );
    }
    list = list.filter((d) => d.price >= priceMin && d.price <= priceMax);

    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    if (sort === "Rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [q, priceMin, priceMax, sort]);

  const totalShown = 124; // mimic mock
  const totalPages = 8;

  return (
    <div className="ft">

      <div className="ft-bg" />

      <Navbar />

      <main className="ft-wrap">
        {/* Header */}
        <section className="ft-header">
          <h1>Find your Licensed Psychologist</h1>
          <p>Connect with professional mental health experts tailored to your needs.</p>

          <div className="ft-searchbar">
            <div className="ft-input ft-input--q">
              <span className="ft-ico">⌕</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, specialty, or keyword..."
              />
            </div>

            <div className="ft-input ft-input--city">
              <span className="ft-ico">⌂</span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City or Zip Code"
              />
            </div>

            <button className="ft-btn ft-btn--primary" type="button">
              Search
            </button>
          </div>
        </section>

        {/* Grid */}
        <section className="ft-grid">
          {/* Filters */}
          <aside className="ft-filters">
            <div className="ft-card ft-filterbox">
              <div className="ft-filtertitle">Specific Type</div>
              <label className="ft-radio">
                <input
                  type="radio"
                  name="type"
                  checked={type === "Clinical Psychologist"}
                  onChange={() => setType("Clinical Psychologist")}
                />
                <span>Clinical Psychologist</span>
              </label>
              <label className="ft-radio">
                <input
                  type="radio"
                  name="type"
                  checked={type === "Adolescent Psychologist"}
                  onChange={() => setType("Adolescent Psychologist")}
                />
                <span>Adolescent Psychologist</span>
              </label>
              <label className="ft-radio">
                <input
                  type="radio"
                  name="type"
                  checked={type === "Corporate Psychologist"}
                  onChange={() => setType("Corporate Psychologist")}
                />
                <span>Corporate Psychologist</span>
              </label>
            </div>

            <div className="ft-card ft-filterbox">
              <div className="ft-filtertitle">Price Range</div>

              <div className="ft-sliderrow">
                <input
                  type="range"
                  min={50}
                  max={300}
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                />
                <input
                  type="range"
                  min={50}
                  max={300}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                />
              </div>

              <div className="ft-minmax">
                <div className="ft-minmaxbox">
                  <div className="ft-minmaxlbl">Min</div>
                  <div className="ft-minmaxval">${priceMin}</div>
                </div>
                <div className="ft-minmaxbox">
                  <div className="ft-minmaxlbl">Max</div>
                  <div className="ft-minmaxval">${priceMax}</div>
                </div>
              </div>
            </div>

            <div className="ft-card ft-filterbox">
              <div className="ft-filtertitle">Availability</div>
              <label className="ft-radio">
                <input
                  type="radio"
                  name="avail"
                  checked={availability === "Available Today"}
                  onChange={() => setAvailability("Available Today")}
                />
                <span>Available Today</span>
              </label>
              <label className="ft-radio">
                <input
                  type="radio"
                  name="avail"
                  checked={availability === "Next 3 Days"}
                  onChange={() => setAvailability("Next 3 Days")}
                />
                <span>Next 3 Days</span>
              </label>
              <label className="ft-radio">
                <input
                  type="radio"
                  name="avail"
                  checked={availability === "Next Week"}
                  onChange={() => setAvailability("Next Week")}
                />
                <span>Next Week</span>
              </label>
            </div>
          </aside>

          {/* Results */}
          <section className="ft-results">
            <div className="ft-resultshead">
              <div className="ft-resultsmeta">
                Showing <b>{totalShown}</b> Licensed Psychologists
              </div>

              <div className="ft-sort">
                <span>Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option>Relevance</option>
                  <option>Rating</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="ft-list">
              {filtered.map((d) => (
                <article key={d.id} className="ft-card ft-doctor">
                  <div className="ft-doctorL">
                    <img className="ft-avatar" src={d.avatar} alt={d.name} />
                    <div className="ft-docinfo">
                      <div className="ft-docname">{d.name}</div>
                      <div className="ft-doctitle">{d.title}</div>
                      <Stars value={d.rating} />

                      <div className="ft-tags">
                        {d.tags.map((t) => (
                          <span key={t} className="ft-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ft-doctorR">
                    <div className="ft-price">
                      <span className="ft-priceval">${d.price}</span>
                      <span className="ft-pricesuf">/ session</span>
                    </div>

                    <div className="ft-bullets">
                      <div className="ft-bullet">
                        <span className="ft-dot" />
                        {d.mode}
                      </div>
                      <div className="ft-bullet">
                        <span className="ft-dot" />
                        {d.next}
                      </div>
                    </div>

                    <div className="ft-actions">
                      <button
                        className="ft-btn ft-btn--primary"
                        onClick={() =>
                          navigate(`/book-session/${d.id}`, { state: { therapist: d } })
                        }
                      >
                        Book Now
                      </button>
                      <button className="ft-btn ft-btn--ghost">View Profile</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="ft-pagination">
              <button
                className="ft-pagebtn"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ‹
              </button>

              {[1, 2, 3, "…", 8].map((x) =>
                x === "…" ? (
                  <span key="dots" className="ft-dots">
                    …
                  </span>
                ) : (
                  <button
                    key={x}
                    className={`ft-pagebtn ${page === x ? "active" : ""}`}
                    onClick={() => setPage(x)}
                  >
                    {x}
                  </button>
                )
              )}

              <button
                className="ft-pagebtn"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                ›
              </button>
            </div>
          </section>
        </section>
      </main>

      {/* Footer similar to mock */}
      <footer className="ft-footer">
        <div className="ft-footerwrap">
          <div className="ft-footercol">
            <div className="ft-footbrand">Mindgate</div>
            <div className="ft-foottext">
              Making mental health support accessible, affordable, and easy for everyone.
            </div>
          </div>

          <div className="ft-footercol">
            <div className="ft-foothead">For Patients</div>
            <a className="ft-footlink" href="#">
              Search Psychologists
            </a>
            <a className="ft-footlink" href="#">
              Mental Health Resources
            </a>
            <a className="ft-footlink" href="#">
              FAQ
            </a>
          </div>

          <div className="ft-footercol">
            <div className="ft-foothead">For Psychologists</div>
            <a className="ft-footlink" href="#">
              Join Our Network
            </a>
            <a className="ft-footlink" href="#">
              Professional Login
            </a>
            <a className="ft-footlink" href="#">
              Success Stories
            </a>
          </div>

          <div className="ft-footercol">
            <div className="ft-foothead">Contact</div>
            <div className="ft-foottext">support@mindgate.com</div>
            <div className="ft-foottext">+1 (555) 123-4567</div>
          </div>
        </div>

        <div className="ft-footbottom">
          <span>© 2026 MindGate. All rights reserved.</span>
          <div className="ft-footmini">
            <a href="#" className="ft-footlink">
              Privacy
            </a>
            <a href="#" className="ft-footlink">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
