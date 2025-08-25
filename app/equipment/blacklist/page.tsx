"use client";

import { useState } from "react";

type Firm = {
  slNo: number;
  name: string;
  reason: string;
  period: string;
};

const initialFirms: Firm[] = [
  { slNo: 1, name: "ABC Pharma Pvt. Ltd.", reason: "Supplying substandard drugs", period: "2022–2025" },
  { slNo: 2, name: "XYZ Biotech Ltd.", reason: "Non-compliance with contract terms", period: "2023–2026" },
  { slNo: 3, name: "MediCare Suppliers", reason: "Blacklisted for fraudulent documents", period: "2021–2024" },
  // 👉 Add more firms as per your blacklist data
];

export default function BlacklistedFirmsPage() {
  const [firms] = useState<Firm[]>(initialFirms); // ✅ no unused setter

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-red-800 mb-6">
        Blacklisted / Debarred Firms
      </h1>
      <p className="text-gray-600 mb-6">
        This section lists firms debarred/blacklisted by JMHIDPCL due to policy violations, quality issues, or fraud.
      </p>

      <div className="overflow-x-auto rounded-lg border bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-red-800 text-white">
            <tr>
              <th className="p-3 text-left">Sl. No.</th>
              <th className="p-3 text-left">Firm Name</th>
              <th className="p-3 text-left">Reason for Blacklisting</th>
              <th className="p-3 text-left">Debarred Period</th>
            </tr>
          </thead>
          <tbody>
            {firms.map((firm) => (
              <tr key={firm.slNo} className="border-b hover:bg-red-50">
                <td className="p-3">{firm.slNo}</td>
                <td className="p-3 font-medium">{firm.name}</td>
                <td className="p-3">{firm.reason}</td>
                <td className="p-3">{firm.period}</td>
              </tr>
            ))}

            {firms.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No blacklisted firms currently.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
