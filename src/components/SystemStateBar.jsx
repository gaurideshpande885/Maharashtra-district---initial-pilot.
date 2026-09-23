export default function SystemStateBar({ status, district, crop }) {
  const styles = {
    idle:    "bg-gray-100 text-gray-500",
    loading: "bg-yellow-100 text-yellow-700",
    success: "bg-green-100 text-green-700",
    error:   "bg-red-100 text-red-600",
  };
  
  const messages = {
    idle:    "Select district and crop to load intelligence.",
    loading: "Fetching intelligence data...",
    success: `Showing data for ${district} · ${crop}`,
    error:   "Failed to load data. Please try again.",
  };

  return (
    <div className={`rounded-lg px-4 py-2 text-sm font-medium ${styles[status]}`}>
      {status === "loading" && (
        <span className="inline-block animate-spin mr-2">⏳</span>
      )}
      {messages[status]}
    </div>
  );
}