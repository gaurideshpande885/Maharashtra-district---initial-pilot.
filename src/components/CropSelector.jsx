// CropSelector.jsx: the crops AIAIC offers for the chosen district, in its order (grown or traded there).
export default function CropSelector({ options = [], value, onChange, disabled = false }) {
  return (
    <div>
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Crop</label>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
      >
        <option value="">{disabled ? "Choose a district first" : "Select crop"}</option>
        {options.map((c) => (
          <option key={c.key} value={c.key}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
