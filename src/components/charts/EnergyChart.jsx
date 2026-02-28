import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { energyData } from "../../data/mockData";
import "./EnergyChart.css";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, fill } = payload[0].payload;
  const total = energyData.reduce((s, d) => s + d.value, 0);
  return (
    <div className="chart-tooltip">
      <div style={{ color: fill }} className="chart-tooltip__label">{name}</div>
      <div className="chart-tooltip__row">
        <span>{value} MW</span>
        <span>{((value / total) * 100).toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default function EnergyChart() {
  const total = energyData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="energy-chart card" style={{ animationDelay: "350ms" }}>
      <div className="energy-chart__title">Energy by Sector</div>
      <div className="energy-chart__subtitle">Current grid load · {total.toLocaleString()} MW total</div>

      <div className="energy-chart__body">
        <div className="energy-chart__donut">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={energyData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {energyData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="energy-chart__center">
            <div className="energy-chart__total">{(total / 1000).toFixed(1)}</div>
            <div className="energy-chart__total-label">GW</div>
          </div>
        </div>

        <div className="energy-chart__legend">
          {energyData.map((d) => {
            const pct = ((d.value / total) * 100).toFixed(0);
            return (
              <div key={d.name} className="energy-chart__legend-row">
                <div className="energy-chart__legend-left">
                  <span className="energy-chart__legend-dot" style={{ background: d.fill, boxShadow: `0 0 6px ${d.fill}` }} />
                  <span>{d.name}</span>
                </div>
                <div className="energy-chart__legend-right">
                  <span>{d.value}</span>
                  <span className="energy-chart__legend-pct">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
