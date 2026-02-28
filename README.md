# 🌆 CityPulse — Smart Urban Data Dashboard

> A production-grade React dashboard for real-time urban intelligence, built to visualize city-scale data across traffic, air quality, energy consumption, and public safety.

![CityPulse Dashboard](./docs/preview.png)
*Live dashboard with animated KPIs, multi-corridor traffic charts, and real-time incident feed*

---

## ✨ Features

- **4 animated KPI cards** with live count-up animations and mini sparklines
- **Traffic volume chart** — 24-hour area chart across 3 city corridors (Recharts)
- **Air quality breakdown** — 7-day grouped bar chart with PM2.5, PM10, NO₂, O₃
- **Energy sector donut** — current grid load by residential / commercial / industrial / transport
- **Population density heatmap** — 8×8 zone grid with color-intensity encoding
- **Real-time incident feed** — police, medical, fire, utility events with live status dots
- **District overview table** — per-neighborhood AQI, traffic, and safety score bars
- **Live clock + pulse indicator** in the header
- **Responsive layout** — adapts to 1440px → 768px → 480px

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Charts | Recharts 2 |
| Styling | Vanilla CSS with custom design tokens |
| Fonts | Syne (display) + DM Mono (data/UI) |
| State | React hooks (useState, useEffect, useCallback) |
| Data | Mock data with simulated live refresh |

---

## 🎨 Design System

The full token system lives in `src/styles/tokens.css`.

### Color Palette
```css
--color-cyan:   #00D4FF  /* Primary accent — traffic, data */
--color-green:  #39FF9E  /* Positive / safe states */
--color-amber:  #FFB347  /* Warning / energy */
--color-red:    #FF4D6A  /* Alerts / incidents */
--color-purple: #A78BFA  /* Secondary data series */

/* Backgrounds (dark scale) */
--color-bg-deep:     #080C10
--color-bg-base:     #0D1117
--color-bg-surface:  #111827
--color-bg-elevated: #1A2232
```

### Typography
```css
--font-display: 'Syne'     /* Headers, KPI values, card titles */
--font-mono:    'DM Mono'  /* Data values, timestamps, labels */
```

### Spacing Scale
4px base unit: `--space-1` (4px) → `--space-16` (64px)

### Component Variants
- **Badges**: `.badge-up`, `.badge-down`, `.badge-cyan`, `.badge-amber`
- **Cards**: `.card` base with hover state transitions
- **Score bars**: Inline width-animated progress bars

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/citypulse.git
cd citypulse

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
citypulse/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx          # Sticky nav with live clock
│   │   │   └── Header.css
│   │   ├── cards/
│   │   │   ├── KpiCard.jsx         # Animated metric cards
│   │   │   ├── IncidentsFeed.jsx   # Live incident list
│   │   │   ├── DensityMap.jsx      # Population heatmap grid
│   │   │   └── DistrictTable.jsx   # Neighborhood stats table
│   │   └── charts/
│   │       ├── TrafficChart.jsx    # 24h area chart
│   │       ├── AirQualityChart.jsx # 7-day bar chart
│   │       └── EnergyChart.jsx     # Donut / pie chart
│   ├── data/
│   │   └── mockData.js             # All mock urban datasets
│   ├── hooks/
│   │   └── useData.js              # useLiveData, useCountUp, usePulse
│   ├── styles/
│   │   ├── tokens.css              # Design system tokens
│   │   └── global.css              # Base styles, animations, utilities
│   ├── App.jsx                     # Root layout and composition
│   ├── App.css                     # Responsive grid system
│   └── main.jsx                    # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🗺 User Journey

The dashboard follows a **macro → micro** information hierarchy:

1. **Header** — City identity, navigation, live status, and current time (always in view)
2. **KPI row** — 4 top-level health metrics give an instant city pulse
3. **Traffic + Air Quality** — Two primary time-series charts for trend analysis
4. **District table + Energy** — Cross-sectional breakdown for operational decisions
5. **Incidents + Density** — Ground-level situational awareness and geographic context

---

## 📊 Data Architecture

Mock data is centralized in `src/data/mockData.js` and structured for easy replacement with a real API:

```js
// Drop-in API swap example
// Before (mock):
import { trafficData } from "../data/mockData";

// After (real API):
const { data: trafficData } = useSWR("/api/v1/traffic/24h", fetcher);
```

Custom hooks in `src/hooks/useData.js` abstract data concerns:
- `useLiveData(initial, updateFn, interval)` — simulates polling
- `useCountUp(target, duration, delay)` — animated number reveal
- `usePulse(interval)` — periodic UI pulse for live indicators

---

## ♿ Accessibility

- Color is never the only indicator — badges always include text labels
- Chart tooltips are keyboard-navigable via Recharts defaults
- Contrast ratios meet WCAG AA for all primary text on background combinations
- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<table>` with proper `<th>` scope
- `aria-label` and `title` attributes on interactive elements

---

## 🔮 Roadmap / Extensions

- [ ] Swap mock data for real open city APIs (OpenWeatherMap AQI, HERE Traffic)
- [ ] Add Mapbox GL JS choropleth map layer
- [ ] Drill-down modal per district with full metric history
- [ ] Dark/light theme toggle
- [ ] Export dashboard as PDF report
- [ ] Alert rule engine with toast notifications

---

