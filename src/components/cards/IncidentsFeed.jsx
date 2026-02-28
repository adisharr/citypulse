import { useState, useEffect } from "react";
import { fetchIncidents } from "../../data/nycApi";
import "./IncidentsFeed.css";

const SEVERITY_COLORS = { high: "red", medium: "amber", low: "green" };
const TYPE_ICONS = {
  Traffic: "🚗", Medical: "🚑", Fire: "🔥", Police: "🚔",
  Utility: "⚡", Noise: "🔊", Sanitation: "🗑️", General: "📍",
};

export default function IncidentsFeed() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const load = () => {
      fetchIncidents()
        .then(d => { setIncidents(d); setLoading(false); })
        .catch(e => { setError(e.message); setLoading(false); });
    };
    load();
    const id = setInterval(load, 60000); // refresh every minute
    return () => clearInterval(id);
  }, []);

  const active = incidents.filter(i => i.status === "active").length;

  return (
    <div className="incidents card" style={{ animationDelay: "400ms" }}>
      <div className="incidents__header">
        <div>
          <div className="incidents__title">NYC 311 Incidents</div>
          <div className="incidents__subtitle">Live service requests · last 6 hours</div>
        </div>
        {!loading && <div className="badge badge-down">{active} active</div>}
      </div>

      {loading && <div className="chart-loading">Fetching NYC 311 data…</div>}
      {error   && <div className="chart-error">⚠ {error}</div>}

      {!loading && !error && (
        <div className="incidents__list">
          {incidents.map((item) => {
            const color = SEVERITY_COLORS[item.severity];
            return (
              <div key={item.id} className={`incident ${item.status === "resolved" ? "incident--resolved" : ""}`}>
                <div className="incident__icon">{TYPE_ICONS[item.type] || "📍"}</div>
                <div className="incident__body">
                  <div className="incident__top">
                    <span className="incident__type">{item.type}</span>
                    <span className={`badge ${color === "red" ? "badge-down" : color === "amber" ? "badge-amber" : "badge-up"}`}>
                      {item.severity}
                    </span>
                  </div>
                  <div className="incident__location">{item.location}</div>
                </div>
                <div className="incident__meta">
                  <div className="incident__time">{item.time}</div>
                  <div className={`incident__status incident__status--${item.status}`}>
                    <span className="incident__status-dot" />
                    {item.status}
                  </div>
                </div>
              </div>
            );
          })}
          {incidents.length === 0 && (
            <div className="chart-loading">No recent incidents found</div>
          )}
        </div>
      )}
    </div>
  );
}
