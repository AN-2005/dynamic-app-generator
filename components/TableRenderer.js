"use client";

import { useEffect, useState } from "react";

export default function TableRenderer({ collection }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/data/${collection}`);
        const result = await res.json();
        setData(result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collection]);

  // 🔍 Filter data
  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  // 📤 Export CSV
  const exportCSV = () => {
    if (!data.length) {
      alert("No data to export");
      return;
    }

    const headers = Object.keys(data[0]);

    const rows = data.map((row) =>
      headers.map((h) => `"${row[h] ?? ""}"`).join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Saved Data</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4 w-full rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📤 Export */}
      <button
        onClick={exportCSV}
        className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Export CSV
      </button>

      {/* 📊 Table */}
      {filteredData.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(filteredData[0]).map((key) => (
                <th key={key} className="border p-2 text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {Object.values(row).map((val, j) => (
                  <td key={j} className="border p-2">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}