// ─── CityPulse Mock Data ───────────────────────────────────────────────────

export const CITY_NAME = "New Vega City";
export const LAST_UPDATED = new Date().toISOString();

// ── KPI Metrics ──────────────────────────────────────────────────────────────
export const kpiMetrics = [
  {
    id: "traffic",
    label: "Traffic Flow",
    value: "84,203",
    unit: "vehicles/hr",
    delta: "+3.2%",
    trend: "up",
    color: "cyan",
    icon: "🚗",
    description: "Active vehicles across monitored corridors",
  },
  {
    id: "air",
    label: "Air Quality Index",
    value: "42",
    unit: "AQI",
    delta: "-8.1%",
    trend: "up",
    color: "green",
    icon: "🌿",
    description: "Good – PM2.5 levels within safe range",
  },
  {
    id: "energy",
    label: "Grid Load",
    value: "4.7",
    unit: "GW",
    delta: "+1.4%",
    trend: "neutral",
    color: "amber",
    icon: "⚡",
    description: "Current citywide electricity consumption",
  },
  {
    id: "incidents",
    label: "Active Incidents",
    value: "17",
    unit: "events",
    delta: "-23%",
    trend: "up",
    color: "red",
    icon: "🚨",
    description: "Police, fire, and medical dispatch events",
  },
];

// ── Traffic Volume (24h) ──────────────────────────────────────────────────────
export const trafficData = [
  { time: "00:00", north: 1200, south: 980,  east: 760  },
  { time: "02:00", north: 820,  south: 640,  east: 510  },
  { time: "04:00", north: 590,  south: 420,  east: 380  },
  { time: "06:00", north: 3400, south: 2100, east: 1800 },
  { time: "08:00", north: 8900, south: 7200, east: 6400 },
  { time: "10:00", north: 6700, south: 5400, east: 4800 },
  { time: "12:00", north: 7100, south: 6200, east: 5500 },
  { time: "14:00", north: 6400, south: 5100, east: 4600 },
  { time: "16:00", north: 9200, south: 8100, east: 7300 },
  { time: "18:00", north: 8400, south: 7600, east: 6900 },
  { time: "20:00", north: 5200, south: 4300, east: 3800 },
  { time: "22:00", north: 2800, south: 2100, east: 1600 },
];

// ── Air Quality (7-day) ───────────────────────────────────────────────────────
export const airQualityData = [
  { day: "Mon", pm25: 18, pm10: 35, no2: 28, o3: 45 },
  { day: "Tue", pm25: 22, pm10: 41, no2: 32, o3: 51 },
  { day: "Wed", pm25: 31, pm10: 58, no2: 45, o3: 63 },
  { day: "Thu", pm25: 25, pm10: 47, no2: 38, o3: 55 },
  { day: "Fri", pm25: 19, pm10: 36, no2: 29, o3: 42 },
  { day: "Sat", pm25: 14, pm10: 28, no2: 21, o3: 38 },
  { day: "Sun", pm25: 11, pm10: 22, no2: 18, o3: 33 },
];

// ── Energy by Sector ──────────────────────────────────────────────────────────
export const energyData = [
  { name: "Residential", value: 1680, fill: "#00D4FF" },
  { name: "Commercial",  value: 1420, fill: "#FFB347" },
  { name: "Industrial",  value: 980,  fill: "#39FF9E" },
  { name: "Transport",   value: 440,  fill: "#A78BFA" },
  { name: "Municipal",   value: 180,  fill: "#FF4D6A" },
];

// ── Population Density (grid heatmap 8x8) ────────────────────────────────────
export const densityGrid = [
  [12, 18, 28, 45, 52, 38, 21, 9],
  [15, 32, 61, 88, 94, 72, 41, 18],
  [20, 48, 79, 100, 97, 85, 55, 26],
  [18, 41, 72, 91, 88, 76, 48, 22],
  [14, 35, 58, 74, 79, 65, 40, 17],
  [10, 24, 42, 58, 63, 51, 31, 13],
  [7,  16, 28, 38, 42, 34, 20, 8 ],
  [4,  9,  15, 21, 24, 19, 11, 5 ],
];

// ── Recent Incidents ──────────────────────────────────────────────────────────
export const incidents = [
  { id: 1, type: "Traffic",   severity: "medium", location: "5th Ave & 34th St",  time: "2 min ago",  status: "active"   },
  { id: 2, type: "Medical",   severity: "high",   location: "Central Park N",      time: "5 min ago",  status: "active"   },
  { id: 3, type: "Fire",      severity: "low",    location: "Brooklyn Bridge Rd",  time: "12 min ago", status: "resolved" },
  { id: 4, type: "Traffic",   severity: "low",    location: "Hudson Pkwy Tunnel",  time: "18 min ago", status: "resolved" },
  { id: 5, type: "Utility",   severity: "medium", location: "Lower East Side",     time: "24 min ago", status: "active"   },
  { id: 6, type: "Police",    severity: "high",   location: "Times Square",        time: "31 min ago", status: "resolved" },
];

// ── District Stats ────────────────────────────────────────────────────────────
export const districts = [
  { name: "Downtown Core",   population: 284000, aqi: 48, trafficScore: 62, safetyScore: 71 },
  { name: "Harbor District", population: 142000, aqi: 35, trafficScore: 44, safetyScore: 88 },
  { name: "Midtown East",    population: 198000, aqi: 55, trafficScore: 79, safetyScore: 75 },
  { name: "Westside",        population: 167000, aqi: 29, trafficScore: 38, safetyScore: 92 },
  { name: "Northgate",       population: 89000,  aqi: 22, trafficScore: 28, safetyScore: 95 },
];
