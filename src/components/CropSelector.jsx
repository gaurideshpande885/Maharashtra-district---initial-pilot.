// CropSelector.jsx
import { cropOptions } from "../data_adapter/catalogOptions";

export default function CropSelector({ catalog, value, onChange }) {
  const crops = cropOptions(catalog);
  return (
    <div>
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Crop</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Select crop</option>
        {crops.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}