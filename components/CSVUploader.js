"use client";

import { useState } from "react";

export default function CSVUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      
      return;
    }

    const text = await file.text();
    const rows = text.split("\n").map((row) => row.split(","));

    const headers = rows[0];
    const data = rows.slice(1);

    for (let row of data) {
      if (row.length < headers.length) continue;

      const obj = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = row[i]?.trim();
      });

      await fetch("/api/data/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
    }

    
    if (onUploadSuccess) onUploadSuccess();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Import CSV</h2>

      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv"
        id="fileUpload"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Custom button */}
      <label
        htmlFor="fileUpload"
        className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded inline-block"
      >
        Choose File
      </label>

      {/* File name display */}
      <span className="ml-3 text-gray-600">
        {file ? file.name : "No file selected"}
      </span>

      <div className="mt-4">
        <button
          onClick={handleUpload}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Upload CSV
        </button>
      </div>
    </div>
  );
}