"use client";

import { useState } from "react";
import config from "../config/app.json";
import FormRenderer from "../components/FormRenderer";
import TableRenderer from "../components/TableRenderer";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Dynamic App Generator (Config Driven)
      </h1>

      {config.pages.map((page, i) => {
        if (page.type === "form") {
          return (
            <FormRenderer
              key={i}
              config={page}
              onSubmitSuccess={() => setRefresh(!refresh)}
            />
          );
        }

        if (page.type === "table") {
          return (
            <TableRenderer
              key={i + "-" + refresh}
              collection={page.collection}
            />
          );
        }

        return <p key={i}>Unknown component</p>;
      })}
    </div>
  );
}