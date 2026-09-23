# AIAIC District Intelligence Dashboard

A real-data agricultural intelligence dashboard built for the AIAIC/AQAIC Live Farm-to-Table
District Intelligence & Execution Integration project.

**Pilot district:** Nashik, Maharashtra
**Pilot commodities:** Soybean, Rice

## What this shows

For a selected district and crop, the dashboard displays:

- **Yield Signal** — district crop yield (DES / MoSPI)
- **Mandi Price** — real daily mandi prices with mandi-level comparison (Agmarknet)
- **Water Stress** — groundwater extraction stage (GSDA)
- **Crop Area Share** — real crop-area breakdown for the district (DES)
- **Sell-Now vs Store Simulation** — an illustrative scenario built on real price/MSP/storage-cost data

Every card shows its data source. The dashboard also displays the backend's own
`uncalibrated_warning`: **this is a working demo on real data, not farmer-ready advice.**
Thresholds have not yet been reviewed by an agronomist or agricultural economist.

## Tech stack

- React + Vite
- Tailwind CSS
- Recharts (for the pie chart)

## Project structure:
src/
components/
CropSelector.jsx
DistrictSelector.jsx
DataDisplayPanel.jsx
CropAreaPieChart.jsx
SimulationPanel.jsx
SystemStateBar.jsx
data_adapter/
useCatalog.js
catalogOptions.js
App.jsx

## Backend

Connects to a live backend (Hemanth's API) via:

- `GET /catalog?state=maharashtra` — dynamic crop/district dropdown options
- `GET /intelligence/unified?crop=&region=&state=&per_service=1` — unified real-data response

## Data sources currently integrated (see AIAIC_DATASET_REGISTER_V1 for full list)

| Layer | Source | Status |
|---|---|---|
| Market | Agmarknet daily prices | VERIFIED |
| Water | GSDA groundwater assessment | VERIFIED |
| Agriculture | DES district crop APY | VERIFIED |
| Weather | Open-Meteo (interim stand-in for IMD) | PARTIALLY VERIFIED |
| Soil, Insurance, eNAM, FPO, Consumer | — | Not yet acquired |

## Known limitations

- Water/CGWB data is a district-wide average and does not reflect taluka-level variation
  (some Nashik talukas are individually water-critical even though the district reads "safe").
- Weather data is an interim stand-in for the official IMD feed.
- The Sell-Now vs Store simulation uses a real reference mandi price from outside Nashik
  (APMC Amarawati) and an assumed spoilage rate — it is explicitly illustrative, not a
  farmer-ready recommendation.
- Soil, crop insurance, eNAM, FPO/aggregator, and consumer-facing data are not yet available.

## Team

- **Riddhi** — Application, Frontend, Data Integration
- **Hemanth** — Backend, Data Engineering, API
- **Kaushalendra** — CI/CD, VM, System Integration
- **Gauri** — District Intelligence & Farm-to-Table Intelligence

## Status

First live demo slice complete: **Nashik → Soybean → Real Yield → Real Water → Real Mandi Price**,
with source attribution and uncalibrated-data warnings visible in the UI.
