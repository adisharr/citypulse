import { useCurrentTime, usePulse } from "../../hooks/useData";
import "./Header.css";

export default function Header({ city, activeTab, onTabChange }) {
  const time = useCurrentTime();
  const pulse = usePulse(4000);

  const fmt = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const fmtDate = (d) =>
    d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" });

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <div className={`header__dot ${pulse ? "header__dot--pulse" : ""}`} />
          <span className="header__brand">CITY<span>PULSE</span></span>
        </div>
        <div className="header__city">{city}</div>
      </div>

      <div className="header__center">
        <div className="header__nav">
          {["Overview", "Traffic", "Air Quality", "Energy", "Safety"].map((item) => (
            <button
              key={item}
              className={`header__nav-item ${activeTab === item ? "header__nav-item--active" : ""}`}
              onClick={() => onTabChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="header__right">
        <div className="header__time-block">
          <div className="header__time">{fmt(time)}</div>
          <div className="header__date">{fmtDate(time)}</div>
        </div>
        <div className="header__status">
          <span className="header__status-dot" />
          <span>LIVE</span>
        </div>
      </div>
    </header>
  );
}
