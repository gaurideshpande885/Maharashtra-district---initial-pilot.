import { useState, useEffect } from "react";
import DistrictSelector from "./components/DistrictSelector";
import CropSelector from "./components/CropSelector";
import DataDisplayPanel from "./components/DataDisplayPanel";
import SimulationPanel from "./components/SimulationPanel";
import SystemStateBar from "./components/SystemStateBar";
import CropAreaPieChart from "./components/CropAreaPieChart";
import { useCatalog } from "./data_adapter/useCatalog";

const ESTATES = [
  { id: "maharashtra", label: "Maharashtra" },
  { id: "mp", label: "Madhya Pradesh" },
];

export default function App() {
  const [district, setDistrict] = useState("");
  const [crop, setCrop] = useState("");
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [estate, setEstate] = useState("maharashtra"); // "maharashtra" or "mp"

  const { catalog, error: catalogError, retry: retryCatalog } = useCatalog(estate);

  // Districts differ between states, so clear the old selections when the state changes
  const handleEstateChange = (newEstate) => {
    setEstate(newEstate);
    setDistrict("");
    setCrop("");
  };

  useEffect(() => {
    if (!district || !crop) {
      setStatus("idle");
      setData(null);
      return;
    }

    let cancelled = false; // ignore answers that arrive after the selection changed

    setStatus("loading");
    setData(null);

    const fetchUnifiedIntelligence = async () => {
      try {
        const API_BASE = import.meta.env.VITE_AQIAIC_BASE_URL;

        const queryParams = new URLSearchParams({
          crop: crop.toLowerCase(),
          region: district,
          state: estate,
          per_service: "1",
        });

        const response = await fetch(`${API_BASE}/intelligence/unified?${queryParams}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) {
          throw new Error(`${response.status} ${await response.text()}`);
        }

        const payload = await response.json();
        if (cancelled) return;

        setData(payload);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        console.error("Connection Error:", err.message);
        setStatus("error");
      }
    };

    fetchUnifiedIntelligence();

    return () => {
      cancelled = true;
    };
  }, [district, crop, estate]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-green-700">AIAIC District Intelligence Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">
          Agricultural Intelligence - {ESTATES.find((e) => e.id === estate)?.label}
        </p>
      </div>

      {/* Catalog error, with retry */}
      {catalogError && (
        <div className="max-w-5xl mx-auto mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm text-red-600">Could not load crop/district list: {catalogError}</p>
          <button onClick={retryCatalog} className="text-sm font-medium text-red-700 underline">
            Retry
          </button>
        </div>
      )}

      {/* Backend's own "not farmer-ready" warning */}
      {status === "success" && data?.market?.[0]?.uncalibrated_warning && (
        <div className="max-w-5xl mx-auto mb-4 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <p className="text-sm font-semibold text-yellow-800">
            ⚠️ Needs to be approved by agronomists before in use.
          </p>
          <p className="text-xs text-yellow-700 mt-1">{data.market[0].uncalibrated_warning}</p>
        </div>
      )}

      {/* Selectors */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-5 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">State</label>
            <select
              value={estate}
              onChange={(e) => handleEstateChange(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {ESTATES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <DistrictSelector value={district} onChange={setDistrict} catalog={catalog} />
          <CropSelector value={crop} onChange={setCrop} catalog={catalog} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-4">
        <SystemStateBar status={status} district={district} crop={crop} />
      </div>

      {status === "loading" && (
        <div className="max-w-5xl mx-auto flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent" />
        </div>
      )}

      {status === "success" && (
        <div className="max-w-5xl mx-auto flex flex-col gap-5">
          <DataDisplayPanel data={data} crop={crop} />
          <SimulationPanel data={data} />
          <CropAreaPieChart data={data} />
        </div>
      )}

      {status === "idle" && (
        <div className="max-w-5xl mx-auto text-center py-16">
          <p className="text-lg font-medium text-gray-400">
            Select district and crop above to load district intelligence
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="max-w-5xl mx-auto text-center py-16">
          <p className="text-lg font-medium text-red-400">
            Could not load data. Please try a different selection.
          </p>
        </div>
      )}
    </div>
  );
}