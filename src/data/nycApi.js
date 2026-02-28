// ─── NYC Real Data API Service ─────────────────────────────────────────────
const NYC_LAT = 40.7128;
const NYC_LON = -74.006;

// ── 1. Air Quality 7-day (Open-Meteo — no API key) ──────────────────────────
export async function fetchAirQuality() {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${NYC_LAT}&longitude=${NYC_LON}` +
    `&hourly=pm10,pm2_5,nitrogen_dioxide,ozone` +
    `&timezone=America%2FNew_York&forecast_days=7`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Air quality fetch failed");
  const data = await res.json();

  const { time, pm10, pm2_5, nitrogen_dioxide, ozone } = data.hourly;
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const dailyMap = {};

  time.forEach((t, i) => {
    const date = new Date(t);
    const key = t.slice(0, 10);
    const dayLabel = days[date.getDay()];
    if (!dailyMap[key]) dailyMap[key] = { day: dayLabel, pm10:[], pm25:[], no2:[], o3:[] };
    if (pm10[i]            != null) dailyMap[key].pm10.push(pm10[i]);
    if (pm2_5[i]           != null) dailyMap[key].pm25.push(pm2_5[i]);
    if (nitrogen_dioxide[i]!= null) dailyMap[key].no2.push(nitrogen_dioxide[i]);
    if (ozone[i]           != null) dailyMap[key].o3.push(ozone[i]);
  });

  const avg = (arr) => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;

  return Object.values(dailyMap).slice(0,7).map(v => ({
    day:  v.day,
    pm25: avg(v.pm25),
    pm10: avg(v.pm10),
    no2:  avg(v.no2),
    o3:   avg(v.o3),
  }));
}

// ── 2. Current AQI ───────────────────────────────────────────────────────────
export async function fetchCurrentAQI() {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${NYC_LAT}&longitude=${NYC_LON}` +
    `&current=european_aqi,pm2_5,pm10,nitrogen_dioxide,ozone` +
    `&timezone=America%2FNew_York`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Current AQI fetch failed");
  const data = await res.json();
  return {
    aqi:  data.current.european_aqi        ?? 0,
    pm25: data.current.pm2_5              ?? 0,
    pm10: data.current.pm10               ?? 0,
    no2:  data.current.nitrogen_dioxide   ?? 0,
    o3:   data.current.ozone              ?? 0,
  };
}

// ── 3. NYC DOT Traffic Speeds ────────────────────────────────────────────────
export async function fetchTrafficSpeeds() {
  const url =
    `https://data.cityofnewyork.us/resource/i4gi-tjb9.json` +
    `?$limit=300&$order=data_as_of+DESC`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Traffic fetch failed");
  const data = await res.json();

  const corridorMap = {};
  data.forEach((row) => {
    const name = row.link_name || "Unknown";
    const speed = parseFloat(row.speed);
    if (!isNaN(speed)) {
      if (!corridorMap[name]) corridorMap[name] = [];
      corridorMap[name].push(speed);
    }
  });

  const avg = (arr) => Math.round(arr.reduce((a,b)=>a+b,0)/arr.length);

  return Object.entries(corridorMap)
    .map(([name, speeds]) => ({ name, avgSpeed: avg(speeds), count: speeds.length }))
    .sort((a,b) => b.count - a.count)
    .slice(0, 5);
}

// ── 4. NYC 311 Incidents — FIXED (no date filter) ────────────────────────────
export async function fetchIncidents() {
  const url =
    `https://data.cityofnewyork.us/resource/erm2-nwe9.json` +
    `?$limit=15&$order=created_date+DESC` +
    `&$select=unique_key,complaint_type,incident_address,borough,created_date,status`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("311 fetch failed");
  const data = await res.json();

  return data.map((row) => {
    const type = mapComplaintType(row.complaint_type);
    const severity = mapSeverity(row.complaint_type);
    const created = new Date(row.created_date);
    const minutesAgo = Math.round((Date.now() - created.getTime()) / 60000);
    const hoursAgo = Math.round(minutesAgo / 60);
    const daysAgo = Math.round(hoursAgo / 24);
    const timeAgo =
      minutesAgo < 60 ? `${minutesAgo}m ago` :
      hoursAgo   < 24 ? `${hoursAgo}h ago`   :
                        `${daysAgo}d ago`;
    return {
      id:       row.unique_key,
      type,
      severity,
      location: row.incident_address
        ? `${row.incident_address}, ${row.borough || "NYC"}`
        : row.borough || "New York City",
      time:     timeAgo,
      status:   row.status === "Closed" ? "resolved" : "active",
    };
  });
}

function mapComplaintType(type = "") {
  const t = type.toLowerCase();
  if (t.includes("noise"))                                 return "Noise";
  if (t.includes("heat") || t.includes("water"))          return "Utility";
  if (t.includes("park") || t.includes("blocked"))        return "Traffic";
  if (t.includes("street light") || t.includes("signal")) return "Traffic";
  if (t.includes("sanit") || t.includes("rodent"))        return "Sanitation";
  if (t.includes("fire") || t.includes("smoke"))          return "Fire";
  if (t.includes("drug") || t.includes("graffiti"))       return "Police";
  return "General";
}

function mapSeverity(type = "") {
  const t = type.toLowerCase();
  if (t.includes("fire") || t.includes("gas") || t.includes("emergency")) return "high";
  if (t.includes("heat") || t.includes("water") || t.includes("noise"))   return "medium";
  return "low";
}

// ── 5. Current Weather ────────────────────────────────────────────────────────
export async function fetchWeather() {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${NYC_LAT}&longitude=${NYC_LON}` +
    `&current=temperature_2m,wind_speed_10m,relative_humidity_2m` +
    `&temperature_unit=fahrenheit&wind_speed_unit=mph` +
    `&timezone=America%2FNew_York`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  const data = await res.json();
  return data.current;
}