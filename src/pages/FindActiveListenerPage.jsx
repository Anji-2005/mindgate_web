import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import "./FindActiveListenerPage.css";

const LISTENERS = [
  {
    id: 1,
    name: "Aanya Sen",
    title: "Active Listener • Trained Volunteer",
    price: 25,
    mode: "Video / Chat",
    next: "Next: Today, 7pm",
    rating: 4.9,
    tags: ["Anxiety", "Breakup", "Loneliness"],
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    title: "Active Listener • Peer Support",
    price: 20,
    mode: "Chat",
    next: "Next: Tomorrow",
    rating: 4.7,
    tags: ["Stress", "Overthinking", "College Life"],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 3,
    name: "Nandini Roy",
    title: "Active Listener • Empathetic Support",
    price: 30,
    mode: "Video",
    next: "Next: Sat, 6pm",
    rating: 4.8,
    tags: ["Relationships", "Family", "Confidence"],
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
  },
];

function Stars({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const total = 5;

  return (
    <div className="fa-stars" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const cls =
          idx <= full ? "full" : half && idx === full + 1 ? "half" : "empty";
        return <span key={idx} className={`fa-star ${cls}`} />;
      })}
      <span className="fa-rating">({value.toFixed(1)})</span>
    </div>
  );
}

export default function FindActiveListenerPage() {
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [availability, setAvailability] = useState("Available Today");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100);
  const [sort, setSort] = useState("Relevance");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...LISTENERS];

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

  const totalShown = 86;
  const totalPages = 6;

  return (
    <div className="fa">

      <div className="fa-bg" />

      <Navbar />

      <main className="fa-wrap">
        <section className="fa-header">
          <h1>Find your Active Listener</h1>
          <p>Talk to a trained listener for calm, supportive guidance—anytime you need.</p>

          <div className="fa-searchbar">
            <div className="fa-input fa-input--q">
              <span className="fa-ico">⌕</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, specialty, or keyword..."
              />
            </div>

            <div className="fa-input fa-input--city">
              <span className="fa-ico">⌂</span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (optional)"
              />
            </div>

            <button className="fa-btn fa-btn--primary" type="button">
              Search
            </button>
          </div>
        </section>

        <section className="fa-grid">
          <aside className="fa-filters">
            <div className="fa-card fa-filterbox">
              <div className="fa-filtertitle">Price Range</div>

              <div className="fa-sliderrow">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                />
              </div>

              <div className="fa-minmax">
                <div className="fa-minmaxbox">
                  <div className="fa-minmaxlbl">Min</div>
                  <div className="fa-minmaxval">${priceMin}</div>
                </div>
                <div className="fa-minmaxbox">
                  <div className="fa-minmaxlbl">Max</div>
                  <div className="fa-minmaxval">${priceMax}</div>
                </div>
              </div>
            </div>

            <div className="fa-card fa-filterbox">
              <div className="fa-filtertitle">Availability</div>
              <label className="fa-radio">
                <input
                  type="radio"
                  name="avail"
                  checked={availability === "Available Today"}
                  onChange={() => setAvailability("Available Today")}
                />
                <span>Available Today</span>
              </label>
              <label className="fa-radio">
                <input
                  type="radio"
                  name="avail"
                  checked={availability === "Next 3 Days"}
                  onChange={() => setAvailability("Next 3 Days")}
                />
                <span>Next 3 Days</span>
              </label>
              <label className="fa-radio">
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

          <section className="fa-results">
            <div className="fa-resultshead">
              <div className="fa-resultsmeta">
                Showing <b>{totalShown}</b> Active Listeners
              </div>

              <div className="fa-sort">
                <span>Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option>Relevance</option>
                  <option>Rating</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="fa-list">
              {filtered.map((d) => (
                <article key={d.id} className="fa-card fa-listener">
                  <div className="fa-listenerL">
                    <img className="fa-avatar" src={d.avatar} alt={d.name} />
                    <div className="fa-docinfo">
                      <div className="fa-docname">{d.name}</div>
                      <div className="fa-doctitle">{d.title}</div>
                      <Stars value={d.rating} />

                      <div className="fa-tags">
                        {d.tags.map((t) => (
                          <span key={t} className="fa-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="fa-listenerR">
                    <div className="fa-price">
                      <span className="fa-priceval">${d.price}</span>
                      <span className="fa-pricesuf">/ session</span>
                    </div>

                    <div className="fa-bullets">
                      <div className="fa-bullet">
                        <span className="fa-dot" />
                        {d.mode}
                      </div>
                      <div className="fa-bullet">
                        <span className="fa-dot" />
                        {d.next}
                      </div>
                    </div>

                    <div className="fa-actions">
                      <button
                        className="fa-btn fa-btn--primary"
                        onClick={() =>
                          navigate(`/active-listener-book-session/${d.id}`, {
                            state: { listener: d },
                          })
                        }
                      >
                        Book Now
                      </button>
                      <button className="fa-btn fa-btn--ghost">View Profile</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="fa-pagination">
              <button
                className="fa-pagebtn"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ‹
              </button>

              {[1, 2, 3, "…", totalPages].map((x) =>
                x === "…" ? (
                  <span key="dots" className="fa-dots">
                    …
                  </span>
                ) : (
                  <button
                    key={x}
                    className={`fa-pagebtn ${page === x ? "active" : ""}`}
                    onClick={() => setPage(x)}
                  >
                    {x}
                  </button>
                )
              )}

              <button
                className="fa-pagebtn"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                ›
              </button>
            </div>
          </section>
        </section>
      </main>

      <footer className="fa-footer">
        <div className="fa-footbottom">
          <span>© 2026 MindGate. All rights reserved.</span>
          <div className="fa-footmini">
            <a href="#" className="fa-footlink">
              Privacy
            </a>
            <a href="#" className="fa-footlink">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
