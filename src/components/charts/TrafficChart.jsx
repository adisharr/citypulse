import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { fetchTrafficSpeeds } from "../../data/nycApi";
import "./TrafficChart.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const speed = payload[0]?.value;
  const condition = speed >= 40 ? "Free Flow" : speed >= 25 ? "Moderate" : speed >= 10 ? "Slow" : "Congested";
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__label">{label}</div>
      <div className="chart-tooltip__row">
        <span style={{ color: payload[0]?.fill }}>Avg Speed</span>
        <span>{speed} mph</span>
      </div>
      <div className="chart-tooltip__row">
        <span style={{ color: "#8BA3C7" }}>Condition</span>
        <span>{condition}</span>
      </div>
    </div>
  );
};

function speedColor(speed) {
  if (speed >= 40) return "#39FF9E";
  if (speed >= 25) return "#00D4FF";
  if (speed >= 10) return "#FFB347";
  return "#FF4D6A";
}

export default function TrafficChart() {
  const [data, setData]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const [updated, setUpdated] = useState(null);

  useEffect(() => {
    const load = () => {
      fetchTrafficSpeeds()
        .then(d => {
          // Shorten corridor names for display
          const cleaned = d.map(row => ({
            name: row.name.length > 22 ? row.name.slice(0, 22) + "…" : row.name,
            speed: row.avgSpeed,
          }));
          setData(cleaned);
          setUpdated(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
          setLoading(false);
        })
        .catch(e => { setError(e.message); setLoading(false); });
    };
    load();
    const id = setInterval(load, 3 * 60 * 1000); // refresh every 3 min
    return () => clearInterval(id);
  }, []);

  return (
    <div className="traffic-chart card" style={{ animationDelay: "200ms" }}>
      <div className="traffic-chart__header">
        <div>
          <div className="traffic-chart__title">NYC Traffic Speeds</div>
          <div className="traffic-chart__subtitle">
            Live DOT sensor data · top corridors{updated ? ` · updated ${updated}` : ""}
          </div>
        </div>
        <div className="badge badge-cyan">Live</div>
      </div>

      {loading && <div className="chart-loading">Fetching NYC DOT traffic sensors…</div>}
      {error   && <div className="chart-error">⚠ {error}</div>}
      {!loading && !error && (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 60 }} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,130,190,0.1)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#4A6080", fontSize: 9, fontFamily: "DM Mono" }}
                axisLine={false} tickLine={false}
                angle={-35} textAnchor="end" interval={0}
              />
              <YAxis
                tick={{ fill: "#4A6080", fontSize: 10, fontFamily: "DM Mono" }}
                axisLine={false} tickLine={false}
                label={{ value: "mph", position: "insideTop", offset: -4, fill: "#4A6080", fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,130,190,0.05)" }} />
              <Bar dataKey="speed" radius={[4,4,0,0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={speedColor(entry.speed)} opacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="traffic-chart__legend">
            {[["#39FF9E","Free Flow (40+)"],["#00D4FF","Moderate (25-40)"],["#FFB347","Slow (10-25)"],["#FF4D6A","Congested (<10)"]].map(([c,l]) => (
              <div key={l} className="traffic-chart__legend-item">
                <span style={{ background: c, width: 8, height: 8, borderRadius: "50%", display:"inline-block", boxShadow:`0 0 5px ${c}` }} />
                <span>{l}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
