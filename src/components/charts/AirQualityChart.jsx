import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchAirQuality } from "../../data/nycApi";
import "./AirQualityChart.css";

const AQI_COLORS = { pm25: "#39FF9E", pm10: "#00D4FF", no2: "#FFB347", o3: "#A78BFA" };

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__label">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="chart-tooltip__row">
          <span style={{ color: p.fill }}>{p.dataKey.toUpperCase()}</span>
          <span>{p.value} µg/m³</span>
        </div>
      ))}
    </div>
  );
};

export default function AirQualityChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAirQuality()
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return (
    <div className="aq-chart card" style={{ animationDelay: "300ms" }}>
      <div className="aq-chart__header">
        <div>
          <div className="aq-chart__title">Air Quality</div>
          <div className="aq-chart__subtitle">7-day NYC forecast · µg/m³ · Open-Meteo</div>
        </div>
        <div className="badge badge-up">Live</div>
      </div>

      <div className="aq-chart__legend">
        {Object.entries(AQI_COLORS).map(([k, v]) => (
          <div key={k} className="aq-chart__legend-item">
            <span style={{ background: v }} className="aq-chart__legend-dot" />
            <span>{k.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {loading && <div className="chart-loading">Fetching NYC air quality data…</div>}
      {error   && <div className="chart-error">⚠ {error}</div>}
      {!loading && !error && (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barGap={2} barSize={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,130,190,0.1)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#4A6080", fontSize: 10, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#4A6080", fontSize: 10, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,130,190,0.05)" }} />
            {Object.entries(AQI_COLORS).map(([key, color]) => (
              <Bar key={key} dataKey={key} fill={color} radius={[2,2,0,0]} opacity={0.85} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
