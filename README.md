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
