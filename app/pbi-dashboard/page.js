"use client";

import { useState } from "react";
import { FiBarChart2 } from "react-icons/fi"; // BI-like icon

export default function PBIDashboard() {
  const [showReport, setShowReport] = useState(false);

  const reportUrl =
    "https://app.powerbi.com/reportEmbed?reportId=fec84d00-7af1-49b1-8852-c956823f379c&autoAuth=true&ctid=2898c5cb-a11c-4f00-8f42-60a9047336f1";

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col p-10 items-start">

      <button
        onClick={() => setShowReport(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition"
      >
        <FiBarChart2 size={18} />
        Open Power BI Report
      </button>

      {showReport && (
        <iframe
          src={reportUrl}
          allowFullScreen
          className="mt-6 w-full h-[80vh] border border-gray-300 rounded-md"
        ></iframe>
      )}
    </div>
  );
}
