"use client";

import { useState } from "react";

export default function FormRenderer({ config, onSubmitSuccess }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/data/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({});
    setLoading(false);

    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Add User</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {config.fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(e, field.name)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}