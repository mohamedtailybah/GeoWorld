# Geo World — Atlas

A pocket world atlas PWA: 195 countries with physical geography, languages,
religions, currencies, flags, a dashboard, a coordinate map, and a geography
quiz game.

## Features

- **Explore** — search and filter all 195 countries by continent, with flags
  and full detail cards (capital, area, population, coordinates, language,
  religion, currency, terrain, climate).
- **Dashboard** — population/area breakdowns by continent and top-10
  rankings.
- **Map** — every country plotted at its capital's coordinates.
- **Game** — a geography quiz with six modes:
  - Flag → Country
  - Country → Flag
  - City (capital) → Country
  - Country → City (capital)
  - Which country has the larger population?
  - Which country is larger by area?

  Score, streak, and best-streak are tracked live as you play.

Flags are loaded from [flagcdn.com](https://flagcdn.com) at runtime, so an
internet connection is needed the first time each flag is shown (they're
cached by the service worker afterward for offline use).

## Running locally

This is a plain static site — no build step. From this folder, run any
static file server, e.g.:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Publishing to GitHub Pages

This repo is already set up for GitHub Pages in two ways — pick whichever
you prefer.

### Option A — GitHub Actions (auto-deploy on every push, recommended)

A workflow is already included at `.github/workflows/deploy.yml`. To turn it
on:

1. Push this repo to GitHub (see below if you haven't yet).
2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push a commit to `main` (or click **Run workflow** on the *Deploy to
   GitHub Pages* workflow under the **Actions** tab).
5. Your site will be published at:
   `https://<your-username>.github.io/<repo-name>/`

Every future push to `main` redeploys automatically.

### Option B — Deploy from a branch (simplest, no Actions)

1. Push this repo to GitHub.
2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a
   branch**.
4. Pick the `main` branch and the `/ (root)` folder, then **Save**.
5. Your site will be published at the same URL shown above within a minute
   or two.

### First time pushing this project to GitHub

```bash
cd geoworld
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Note: all asset paths in this project (`app.js`, `data.js`, `manifest.json`,
icons) are relative, and a `.nojekyll` file is included, so the site works
correctly whether it's served from the repo root or from a project
sub-path like `/<repo-name>/`.
