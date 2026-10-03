# REVIEW_PACKET: AIAIC District Intelligence Dashboard (prototype)

**Owner:** Gauri Deshpande. **State:** DRAFT, prepared in Hemanth's review of 2026-10-02 for Gauri to check, edit
and sign. The April 2026 packet described mock adapters (`Mahesadapter`, `deep_adapter`) that no longer exist; it
is replaced.

## 1. Entry point

- `index.html` → `src/main.jsx` → `src/App.jsx`. Run: `npm run dev`. Tests: `npm test`.
- Configuration: `.env` (not committed) with `VITE_AIAIC_API`, the AIAIC server address (see `.env.example`).

## 2. Core flow (input → output)

1. **State → district.** `GET /places/districts?state=`: the state's districts, by AIAIC's closed list.
2. **District → crop.** `GET /places/crops?state=&district=`: the crops AIAIC offers for that district, in its
   order (Nashik: onion, maize, soybean, wheat, …).
3. **District + crop → answers.** `GET /view/unified?crop=&region=&state=&lang=en`: market, water, crop,
   storage and weather answers, each with AIAIC's summary.
4. The panels show each answer with its source, date and staleness:
   - `DataDisplayPanel`: harvest, best mandi price, water stress, and the taluka warning;
   - `SimulationPanel`: sell or store; a fixed band is shown as the single price it is;
   - `CropAreaPieChart`: the district's crop area (DES).

All of it is in `src/data_adapter/aiaicApi.js` (calls) and the four components. Nothing is computed in the browser.

## 3. What was built

- Live AIAIC data only, from one server. The district-synced crop list comes from AIAIC.
- Source, date and freshness on every card. The uncalibrated warning is shown.
- The fixed-band rule, with a test on a real recorded AIAIC answer (Nashik onion, 2026-10-02) and a defect
  control: removing the rule makes the test fail.

## 4. What is intentionally not here

- No intelligence logic of its own (district KPIs are specified in `AIAIC_DATASET_REGISTER_V1_NASHIK.csv` and
  `DISTRICT_KPI_CATALOGUE_V1_NASHIK.csv`, and built in AIAIC's backend).
- No farmer data and no personal data.
- Not the farmer or admin application.

## 5. Risks and open questions

- The four AIAIC limitations listed in the README (mandi day, water card, storage wording, missing onion
  production).
- Whether this prototype is kept (see `GAURI_ROLE_AND_NEXT_TASK_2026-10-02.md`) or its views move into AIAIC.

## 6. Evidence

- `npm test`: 3 passed (2026-10-02). `npm run build` succeeds. `eslint src` reports no problems.
- A browser run against the local AIAIC API, Maharashtra → Nashik → Onion: districts loaded, the crop list was
  Nashik's, the answers were shown, and the store card showed the single price with the fixed-band note (screenshot
  in the review folder).
