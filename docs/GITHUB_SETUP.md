# 🚀 How to Push CityPulse to GitHub

Follow these steps to get the project on GitHub in ~5 minutes.

---

## Step 1 — Create a GitHub repo

1. Go to https://github.com/new
2. Name it: `citypulse`
3. Set to **Public** (so portfolio reviewers can see it)
4. **Do NOT** check "Add a README" (we already have one)
5. Click **Create repository**

---

## Step 2 — Initialize git and push

Open your terminal in the `citypulse/` folder:

```bash
cd citypulse

# Install dependencies first
npm install

# Initialize git
git init
git add .
git commit -m "feat: initial CityPulse dashboard — KPIs, charts, incident feed, design system"

# Add your GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/citypulse.git

# Push
git branch -M main
git push -u origin main
```

---

## Step 3 — Deploy to Vercel (free, takes 2 minutes)

1. Go to https://vercel.com → **Add New Project**
2. Import your `citypulse` GitHub repo
3. Framework preset: **Vite** (auto-detected)
4. Click **Deploy**

You'll get a live URL like `https://citypulse-aditi.vercel.app` — include this in your portfolio and your email to John!

---

## Step 4 — Polish your repo profile

Add these to your GitHub repo (Settings → About):
- **Description**: Smart urban data dashboard built with React, Recharts, and a custom CSS design system
- **Topics**: `react` `dashboard` `data-visualization` `recharts` `ui-ux` `design-system` `vite`
- **Website**: Your Vercel URL

---

## Commit Message Conventions Used

```
feat: add [feature]
fix:  fix [bug]
docs: update documentation
style: design/CSS changes
refactor: code restructure
```

---

## Recommended Next Commits

```bash
# After you add more features:
git add .
git commit -m "feat: add district drill-down modal"
git commit -m "feat: connect OpenWeatherMap AQI API"
git commit -m "style: add light theme variant"
git push
```
