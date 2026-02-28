import { useState, useEffect } from "react";
import "./styles/global.css";
import Header from "./components/layout/Header";
import KpiCard from "./components/cards/KpiCard";
import TrafficChart from "./components/charts/TrafficChart";
import AirQualityChart from "./components/charts/AirQualityChart";
import EnergyChart from "./components/charts/EnergyChart";
import IncidentsFeed from "./components/cards/IncidentsFeed";
import DensityMap from "./components/cards/DensityMap";
import DistrictTable from "./components/cards/DistrictTable";
import { fetchCurrentAQI, fetchWeather, fetchTrafficSpeeds } from "./data/nycApi";
import { energyData } from "./data/mockData";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [kpis, setKpis] = useState([
    { id: "traffic",   label: "Avg Traffic Speed", value: "—",  unit: "mph",    delta: "live", trend: "neutral", color: "cyan",  icon: "🚗", description: "Average speed across NYC DOT corridors" },
    { id: "air",       label: "Air Quality Index",  value: "—",  unit: "AQI",    delta: "live", trend: "up",      color: "green", icon: "🌿", description: "European AQI · Open-Meteo NYC" },
    { id: "temp",      label: "Temperature",        value: "—",  unit: "°F",     delta: "live", trend: "neutral", color: "amber", icon: "🌡️", description: "Current NYC temperature" },
    { id: "incidents", label: "Wind Speed",         value: "—",  unit: "mph",    delta: "live", trend: "neutral", color: "purple",icon: "💨", description: "Current NYC wind speed" },
  ]);

  useEffect(() => {
    async function loadKpis() {
      try {
        const [aqi, weather, traffic] = await Promise.allSettled([
          fetchCurrentAQI(),
          fetchWeather(),
          fetchTrafficSpeeds(),
        ]);

        setKpis(prev => {
          const next = [...prev];

          // Traffic avg speed
          if (traffic.status === "fulfilled" && traffic.value.length) {
            const avgSpeed = Math.round(
              traffic.value.reduce((s, c) => s + c.avgSpeed, 0) / traffic.value.length
            );
            next[0] = { ...next[0], value: String(avgSpeed) };
          }

          // AQI
          if (aqi.status === "fulfilled") {
            const a = aqi.value.aqi;
            const label = a <= 20 ? "Good" : a <= 40 ? "Fair" : a <= 60 ? "Moderate" : "Poor";
            next[1] = { ...next[1], value: String(a), delta: label, description: `PM2.5: ${aqi.value.pm25} · NO₂: ${aqi.value.no2} µg/m³` };
          }

          // Weather temp
          if (weather.status === "fulfilled") {
            next[2] = { ...next[2], value: String(Math.round(weather.value.temperature_2m)), description: `Humidity: ${weather.value.relative_humidity_2m}%` };
            next[3] = { ...next[3], value: String(Math.round(weather.value.wind_speed_10m)) };
          }

          return next;
        });
      } catch (e) {
        console.error("KPI load error", e);
      }
    }

    loadKpis();
    const id = setInterval(loadKpis, 5 * 60 * 1000); // refresh every 5min
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app noise bg-grid">
      <div className="glow-orb" style={{ width: 500, height: 500, top: -100, left: -100, background: "rgba(0,212,255,0.04)" }} />
      <div className="glow-orb" style={{ width: 400, height: 400, bottom: 0, right: -80, background: "rgba(167,139,250,0.04)" }} />

      <Header city="New York City" activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app__main">
        <section className="app__kpis">
          {kpis.map((m, i) => <KpiCard key={m.id} metric={m} index={i} />)}
        </section>

        {activeTab === "Overview" && (
          <>
            <section className="app__grid app__grid--1-1">
              <TrafficChart />
              <AirQualityChart />
            </section>
            <section className="app__grid app__grid--2-1">
              <DistrictTable />
              <EnergyChart />
            </section>
            <section className="app__grid app__grid--1-1">
              <IncidentsFeed />
              <DensityMap />
            </section>
          </>
        )}
        {activeTab === "Traffic" && (
          <section className="app__grid app__grid--1-1">
            <TrafficChart />
            <DistrictTable />
          </section>
        )}
        {activeTab === "Air Quality" && (
          <section className="app__grid app__grid--1-1">
            <AirQualityChart />
            <DensityMap />
          </section>
        )}
        {activeTab === "Energy" && (
          <section className="app__grid app__grid--1-1">
            <EnergyChart />
            <DistrictTable />
          </section>
        )}
        {activeTab === "Safety" && (
          <section className="app__grid app__grid--1-1">
            <IncidentsFeed />
            <DensityMap />
          </section>
        )}
      </main>

      <footer className="app__footer">
        <span>CityPulse · New York City · Live Data</span>
        <span>Open-Meteo · NYC Open Data · DOT Traffic Sensors</span>
      </footer>
    </div>
  );
}
