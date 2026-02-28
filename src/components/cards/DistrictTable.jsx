import { districts } from "../../data/mockData";
import "./DistrictTable.css";

function ScoreBar({ value, color }) {
  return (
    <div className="score-bar">
      <div
        className="score-bar__fill"
        style={{ width: `${value}%`, background: `var(--color-${color})` }}
      />
    </div>
  );
}

export default function DistrictTable() {
  return (
    <div className="district-table card" style={{ animationDelay: "500ms" }}>
      <div className="district-table__header">
        <div className="district-table__title">District Overview</div>
        <div className="district-table__subtitle">Live metrics by neighborhood</div>
      </div>

      <table className="dt">
        <thead>
          <tr>
            <th>District</th>
            <th>Population</th>
            <th>AQI</th>
            <th>Traffic</th>
            <th>Safety</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((d) => (
            <tr key={d.name}>
              <td className="dt__name">{d.name}</td>
              <td>{d.population.toLocaleString()}</td>
              <td>
                <div className="dt__score">
                  <span>{d.aqi}</span>
                  <ScoreBar value={d.aqi} color={d.aqi > 50 ? "amber" : "green"} />
                </div>
              </td>
              <td>
                <div className="dt__score">
                  <span>{d.trafficScore}</span>
                  <ScoreBar value={d.trafficScore} color={d.trafficScore > 70 ? "red" : "cyan"} />
                </div>
              </td>
              <td>
                <div className="dt__score">
                  <span>{d.safetyScore}</span>
                  <ScoreBar value={d.safetyScore} color="green" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
