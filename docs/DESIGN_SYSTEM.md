# CityPulse Design System

A purpose-built design system for data-dense, real-time dashboard interfaces.

---

## Philosophy

**Data-first aesthetics.** Every visual decision serves legibility of complex information.
- Dark backgrounds reduce eye strain during extended monitoring
- Monospaced font for data values (precise character spacing, no layout jitter)
- High-contrast accent colors encode meaning (cyan = primary, green = good, amber = warning, red = alert)
- Generous negative space in dense layouts to prevent cognitive overload

---

## Figma Tokens → CSS Variables Mapping

| Figma Token         | CSS Variable              | Value        |
|---------------------|---------------------------|--------------|
| bg/deep             | --color-bg-deep           | #080C10      |
| bg/surface          | --color-bg-surface        | #111827      |
| bg/elevated         | --color-bg-elevated       | #1A2232      |
| text/primary        | --color-text-primary      | #E8EFF9      |
| text/secondary      | --color-text-secondary    | #8BA3C7      |
| text/muted          | --color-text-muted        | #4A6080      |
| accent/cyan         | --color-cyan              | #00D4FF      |
| accent/green        | --color-green             | #39FF9E      |
| accent/amber        | --color-amber             | #FFB347      |
| accent/red          | --color-red               | #FF4D6A      |
| accent/purple       | --color-purple            | #A78BFA      |

---

## Component Inventory

### KpiCard
- **Purpose**: Surface a single high-level metric
- **Props**: `metric` (id, label, value, unit, delta, trend, color, icon, description), `index`
- **States**: default, hover, animated-in
- **Variants**: 4 accent colors (cyan, green, amber, red)

### TrafficChart
- **Purpose**: Show volume trends over time across corridors
- **Type**: Area chart (Recharts) — stacked area with gradient fills
- **Data**: `trafficData` (12 hourly snapshots × 3 corridors)

### AirQualityChart
- **Purpose**: Compare daily pollutant levels
- **Type**: Grouped bar chart
- **Data**: `airQualityData` (7 days × 4 pollutants)

### EnergyChart
- **Purpose**: Show proportional load by sector
- **Type**: Donut / pie chart with center KPI
- **Data**: `energyData` (5 sectors)

### DensityMap
- **Purpose**: Encode geographic population intensity
- **Type**: 8×8 CSS grid with opacity + color encoding
- **Interaction**: Hover tooltip per cell

### IncidentsFeed
- **Purpose**: Show real-time event stream with status
- **States per item**: active (pulsing dot), resolved (dimmed)
- **Severity encoding**: red/amber/green badges

### DistrictTable
- **Purpose**: Compare metrics across neighborhoods
- **Features**: Inline progress bars with color-coded thresholds

---

## Spacing System

```
Base unit: 4px

--space-1:  4px   (tight inline gaps)
--space-2:  8px   (icon to label)
--space-3:  12px  (list item padding)
--space-4:  16px  (card internal padding unit)
--space-5:  20px  (section headers)
--space-6:  24px  (card padding)
--space-8:  32px  (between cards)
--space-10: 40px  
--space-12: 48px  (section spacing)
--space-16: 64px  (page-level margins)
```

---

## Motion Principles

1. **Entrance animations**: All cards use `fadeInUp` with staggered `animation-delay`
2. **Count-up numbers**: KPI values count from 0 on mount — draws attention, communicates freshness
3. **Hover states**: Border + shadow elevation only (no layout shifts)
4. **Pulse indicator**: Header live dot pulses via `pulse-glow` keyframes
5. **Score bars**: Width transition on mount (1s ease-out) to visualize relative scores

```
Durations:
--duration-fast:   150ms  (hover state transitions)
--duration-base:   250ms  (interactive feedback)
--duration-slow:   400ms  (entrance)
--duration-slower: 700ms  (primary card entrance)
```

---

## Responsive Grid

```
≥1440px: 4-col KPIs | 2-col charts | 2:1 table+donut
≥1200px: 2-col KPIs | stacked 2:1
≥768px:  2-col KPIs | all single column
<480px:  1-col everything
```
