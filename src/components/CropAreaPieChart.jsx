// CropAreaPieChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#16a34a", "#2563eb", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];

export default function CropAreaPieChart({ data }) {
  const crops = data?.crop?.[0]?.supporting_evidence?.district_crop_apy?.crops || [];

  // Combine same crop across seasons, keep only crops with area > 0
  const byCrop = {};
  crops.forEach((c) => {
    if (c.area_lakh_ha > 0) {
      byCrop[c.crop] = (byCrop[c.crop] || 0) + c.area_lakh_ha;
    }
  });
  const chartData = Object.entries(byCrop).map(([crop, area]) => ({ name: crop, value: area }));

  if (chartData.length === 0) return null;

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
        Crop Area Share — Nashik (lakh ha)
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={90} label>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 mt-2">Source: DES / MoSPI district crop APY 2024-25 (VERIFIED)</p>
    </div>
  );
}