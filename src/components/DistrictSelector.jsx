// DistrictSelector.jsx: the state's districts, as AIAIC lists them (current names).
export default function DistrictSelector({ options = [], value, onChange }) {
  return (
    <div>
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">District</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Select district</option>
        {options.map((d) => (
          <option key={d.key} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}
