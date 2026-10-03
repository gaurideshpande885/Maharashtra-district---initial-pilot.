# AIAIC District Intelligence Dashboard (prototype)

A React prototype that shows AIAIC's real answers for one district and crop, with their sources: harvest (DES),
mandi price (Agmarknet), water stress (CGWB), sell or store, and the district's crop area.

**Owner:** Gauri Deshpande, District Intelligence + Farm-to-Table Intelligence (AIAIC/AQAIC).
**Pilot district:** Nashik, Maharashtra. **Pilot commodities:** onion, soybean, tur (team decision, 2026-09-26).
**Status:** a prototype for reviewing intelligence. It is not the farmer or admin application, which is AIAIC's.
It computes nothing itself: every figure is AIAIC's, with its source and date.

## Run

```bash
npm ci                    # or npm install the first time after a dependency change
cp .env.example .env      # then set VITE_AIAIC_API to the AIAIC server you were given
npm run dev
npm test                  # vitest
```

## What it reads (one server, `VITE_AIAIC_API`)

| Route | Used for |
|---|---|
| `GET /places/districts?state=` | the state's districts (current official names) |
| `GET /places/crops?state=&district=` | the crops AIAIC offers for THAT district, in its order, each with why it is listed |
| `GET /view/unified?crop=&region=&state=&lang=en` | every service's answer plus its summary: action, confidence, key numbers, sources, and which ranges are fixed bands |

`src/data_adapter/aiaicApi.js` is the only file that calls the server.

## Rules this prototype keeps

- Every card names its source and date. Stale data is said to be stale.
- A range AIAIC marks as a fixed band (`fixed_band`, e.g. ±2% around one price) is never shown as "a better day /
  a weaker day". Only the price is shown (`src/test/the_store_panel_never_shows_a_fixed_band_as_a_range.test.jsx`).
- No hardcoded fallback lists. No mock data. No server address in the repository.

## Known limitations (what AIAIC itself shows today for Nashik onion)

- No onion production figure: DES 2024-25 has no onion row for Nashik.
- The mandi card can name a mandi far from Nashik when the newest price day is thin (AIAIC backlog item 32).
- The water card's district figure hides critical talukas (Niphad, Sinnar). Two assessments disagree on Deola
  (AIAIC backlog item 36).
- The store card says "no storage available" where Nashik has 15 active registered warehouses (AIAIC backlog
  item 37).
- No arrivals, soil, insurance, FPO, processing or consumer data yet (see the dataset register).

## Team

- **Gauri:** district and farm-to-table intelligence: what the evidence means for each stakeholder, the dataset
  register, the KPI catalogue, domain validation.
- **Riddhi:** the application and its screens.
- **Hemanth:** the backend, data and API.
- **Kaushlendra:** CI/CD, VM and integration.
- **Aryan:** ML price forecast.
