export default function SimulationPanel({ data }) {
  const storage = data?.storage?.[0];
  const sim = storage?.supporting_evidence?.illustrative_storage_scenario;
  if (!sim) return null;

  const referenceMandi = storage?.supporting_evidence?.representative_mandi || "an unspecified reference mandi";
  const requestedRegion = storage?.subject?.region || "your district";

  return (
    <div className="bg-white p-5 rounded-xl border border-purple-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Sell-Now vs Store — Simulation
        </h3>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
          ILLUSTRATIVE
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-3">
        Recommendation: <strong>{sim.recommendation.replace("_", " ")}</strong>
      </p>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-gray-400">Best</p>
          <p className="font-bold text-gray-800">₹{sim.best_case.value}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Average</p>
          <p className="font-bold text-gray-800">₹{sim.average_case.value}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Worst</p>
          <p className="font-bold text-gray-800">₹{sim.worst_case.value}</p>
        </div>
      </div>

      <p className="text-xs text-purple-700 mt-3">{sim.note}</p>
      <p className="text-xs text-gray-400 mt-2">
        Price shown is from {referenceMandi} (reference mandi), not {requestedRegion}'s own price.
      </p>
    </div>
  );
}