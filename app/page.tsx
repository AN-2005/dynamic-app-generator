"use client";

import { useState } from "react";
import config from "../config/app.json";
import FormRenderer from "../components/FormRenderer";
import TableRenderer from "../components/TableRenderer";
import CSVUploader from "../components/CSVUploader";
import Toast from "../components/Toast";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Toast message={message} />

      <h1 className="text-3xl font-bold mb-6 text-center">
        Dynamic App Generator
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <CSVUploader
          onUploadSuccess={() => {
            setRefresh(!refresh);
            showMessage("CSV Uploaded Successfully");
          }}
        />

        {config.pages.map((page, i) => {
          if (page.type === "form") {
            return (
              <FormRenderer
                key={i}
                config={page}
                onSubmitSuccess={() => {
                  setRefresh(!refresh);
                  showMessage("Data Saved Successfully");
                }}
              />
            );
          }

          if (page.type === "table") {
            return (
              <TableRenderer
                key={i + (refresh ? 1 : 0)}
                collection={page.collection}
              />
            );
          }

          return <p key={i}>Unknown component</p>;
        })}
      </div>
    </div>
  );
}