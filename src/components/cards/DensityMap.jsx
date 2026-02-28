import { densityGrid } from "../../data/mockData";
import "./DensityMap.css";

export default function DensityMap() {
  const max = Math.max(...densityGrid.flat());

  return (
    <div className="density card" style={{ animationDelay: "450ms" }}>
      <div className="density__header">
        <div>
          <div className="density__title">Population Density</div>
          <div className="density__subtitle">Grid heatmap · intensity per zone</div>
        </div>
      </div>

      <div className="density__grid">
        {densityGrid.map((row, ri) =>
          row.map((val, ci) => {
            const intensity = val / max;
            return (
              <div
                key={`${ri}-${ci}`}
                className="density__cell"
                title={`Zone [${ri},${ci}]: ${val}`}
                style={{
                  opacity: 0.15 + intensity * 0.85,
                  background: intensity > 0.75
                    ? "var(--color-cyan)"
                    : intensity > 0.5
                    ? "var(--color-purple)"
                    : intensity > 0.25
                    ? "var(--color-amber)"
                    : "var(--color-text-muted)",
                  boxShadow: intensity > 0.8 ? `0 0 8px var(--color-cyan-glow)` : "none",
                }}
              />
            );
          })
        )}
      </div>

      <div className="density__scale">
        <span>Low</span>
        <div className="density__scale-bar" />
        <span>High</span>
      </div>
    </div>
  );
}
