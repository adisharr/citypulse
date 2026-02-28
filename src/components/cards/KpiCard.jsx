import { useCountUp } from "../../hooks/useData";
import "./KpiCard.css";

export default function KpiCard({ metric, index }) {
  const numericValue = parseFloat(metric.value.replace(/[^0-9.]/g, ""));
  const counted = useCountUp(numericValue, 1400, index * 120);

  // Re-format with original separators
  const displayValue = metric.value.includes(",")
    ? counted.toLocaleString()
    : String(counted);

  const colorMap = {
    cyan: "var(--color-cyan)",
    green: "var(--color-green)",
    amber: "var(--color-amber)",
    red: "var(--color-red)",
  };
  const accentColor = colorMap[metric.color] || "var(--color-cyan)";

  return (
    <div
      className="kpi-card card"
      style={{
        "--accent": accentColor,
        "--accent-dim": `var(--color-${metric.color}-dim)`,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Accent bar */}
      <div className="kpi-card__bar" />

      <div className="kpi-card__top">
        <div className="kpi-card__icon">{metric.icon}</div>
        <div className={`badge ${metric.trend === "up" ? "badge-up" : metric.trend === "down" ? "badge-down" : "badge-cyan"}`}>
          {metric.delta}
        </div>
      </div>

      <div className="kpi-card__value">
        {displayValue}
        <span className="kpi-card__unit">{metric.unit}</span>
      </div>

      <div className="kpi-card__label">{metric.label}</div>
      <div className="kpi-card__desc">{metric.description}</div>

      {/* Sparkline placeholder bar */}
      <div className="kpi-card__spark">
        {Array.from({ length: 12 }).map((_, i) => {
          const h = 20 + Math.random() * 80;
          return (
            <div
              key={i}
              className="kpi-card__spark-bar"
              style={{ height: `${h}%`, animationDelay: `${i * 60 + index * 120}ms` }}
            />
          );
        })}
      </div>
    </div>
  );
}
