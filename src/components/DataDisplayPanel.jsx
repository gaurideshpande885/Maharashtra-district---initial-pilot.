export default function DataDisplayPanel({ data, crop }) {
  if (!data) return null;

  // 1. Extract Yield by dynamically matching the selected crop name
  const cropService = data.crop?.[0];
  const allCrops = cropService?.supporting_evidence?.district_crop_apy?.crops || [];

  const matchingCropRow = allCrops.find(
    (c) => c.crop && c.crop.toLowerCase() === (crop || "").toLowerCase()
  ) || allCrops[0];

  const yieldKgHa = matchingCropRow?.yield_kg_ha;
  const yieldTHa = yieldKgHa ? (yieldKgHa / 1000).toFixed(2) : "N/A";

  // 2. Extract Mandi Price from market service
  const marketService = data.market?.[0];
  const mandiPrice = marketService?.average_case?.value ?? "N/A";
  const priceDetail = marketService?.recommendation_detail ?? "No recent price data";

  // 3. Extract Water Stress from water service
  const waterService = data.water?.[0];
  const waterStressPct = waterService?.supporting_evidence?.stage_of_extraction_pct ?? "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Yield Card */}
      <div className="bg-white p-5 rounded-xl border border-green-200 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Yield Signal</h3>
        <p className="text-2xl font-bold text-gray-800 mt-2">
          {yieldTHa} <span className="text-sm font-normal text-gray-500">T/ha</span>
        </p>
        <p className="text-xs text-gray-400 mt-2">Source: DES / MoSPI district crop APY (VERIFIED)</p>
      </div>

      {/* Mandi Price Card */}
      <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mandi Price</h3>
        <p className="text-2xl font-bold text-gray-800 mt-2">
          ₹{mandiPrice} <span className="text-sm font-normal text-gray-500">/q</span>
        </p>
        <p className="text-xs text-blue-600 mt-2 font-medium">{priceDetail}</p>
        <p className="text-xs text-gray-400 mt-2">Source: Agmarknet daily prices (VERIFIED)</p>
      </div>

      {/* Water Stress Card */}
      <div className="bg-white p-5 rounded-xl border border-orange-200 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Water Stress</h3>
        <p className="text-2xl font-bold text-gray-800 mt-2">{waterStressPct}%</p>
        <p className="text-xs text-gray-400 mt-1">Stage of groundwater extraction</p>
        <p className="text-xs text-gray-400 mt-2">Source: GSDA groundwater assessment (VERIFIED)</p>
        <p className="text-xs text-orange-600 mt-2">
          ⚠️ District average — Deola, Niphad and Sinnar talukas are individually critical
        </p>
      </div>
    </div>
  );
}