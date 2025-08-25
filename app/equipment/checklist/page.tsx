"use client";

import { useState } from "react";

type ChecklistItem = {
  id: number;
  cover: "A" | "B";
  text: string;
};

const checklistData: ChecklistItem[] = [
  { id: 1, cover: "A", text: "Tender Fee & EMD furnished" },
  { id: 2, cover: "A", text: "Documentary evidence for the Constitution of the company" },
  { id: 3, cover: "A", text: "Attested Photocopy of Import license if any" },
  { id: 4, cover: "A", text: "The instruments such as Power of Attorney, Resolution of Board etc." },
  { id: 5, cover: "A", text: "Technical cum Compliance Specification Sheet as per Annexure I" },
  { id: 6, cover: "A", text: "Undertaking as per Annexure IIA & II B" },
  { id: 7, cover: "A", text: "Manufacturer’s Authorization as per Annexure III" },
  { id: 8, cover: "A", text: "Attested copy of all Quality Certificates." },
  { id: 9, cover: "A", text: "Annual Turnover Statement for last 3 financial years (Annexure – IV A & Annexure –IV B)" },
  { id: 10, cover: "A", text: "Performance Statement as per Annexure V" },
  { id: 11, cover: "A", text: "GST Registration Certificate" },
  { id: 12, cover: "A", text: "Undertaking for Embossment of logo as per Annexure VI" },
  { id: 13, cover: "A", text: "Details of Manufacturing Unit as per Annexure VII" },
  { id: 14, cover: "A", text: "List of items quoted with name of Manufacturer as per Annexure VIII" },
  { id: 15, cover: "A", text: "Undertaking on Fraud & Corruption as per Annexure IX" },
  { id: 16, cover: "A", text: "Agreed Terms & Conditions as per Annexure- X" },
  { id: 17, cover: "B", text: "Price Bid as per Annexure XII" },
];

export default function EquipmentIndentChecklist() {
  const [responses, setResponses] = useState<Record<number, { yesNo: string; page: string }>>({});

  const handleChange = (id: number, field: "yesNo" | "page", value: string) => {
    setResponses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
        Checklist – Medical Indent of Equipment
      </h1>

      {/* Cover A */}
      <h2 className="text-xl font-semibold text-blue-700 mb-3">Cover A</h2>
      <div className="overflow-x-auto rounded-lg border bg-white shadow mb-8">
        <table className="w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Sl.</th>
              <th className="p-3 text-left">Action Point</th>
              <th className="p-3 text-center">Yes/No</th>
              <th className="p-3 text-center">Page No.</th>
            </tr>
          </thead>
          <tbody>
            {checklistData
              .filter((item) => item.cover === "A")
              .map((item) => (
                <tr key={item.id} className="border-b hover:bg-blue-50">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.text}</td>
                  <td className="p-3 text-center">
                    <select
                      value={responses[item.id]?.yesNo || ""}
                      onChange={(e) => handleChange(item.id, "yesNo", e.target.value)}
                      className="rounded border px-2 py-1"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="text"
                      value={responses[item.id]?.page || ""}
                      onChange={(e) => handleChange(item.id, "page", e.target.value)}
                      placeholder="Page No."
                      className="w-24 rounded border px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Cover B */}
      <h2 className="text-xl font-semibold text-blue-700 mb-3">Cover B</h2>
      <div className="overflow-x-auto rounded-lg border bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Sl.</th>
              <th className="p-3 text-left">Action Point</th>
              <th className="p-3 text-center">Yes/No</th>
              <th className="p-3 text-center">Page No.</th>
            </tr>
          </thead>
          <tbody>
            {checklistData
              .filter((item) => item.cover === "B")
              .map((item) => (
                <tr key={item.id} className="border-b hover:bg-blue-50">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.text}</td>
                  <td className="p-3 text-center">
                    <select
                      value={responses[item.id]?.yesNo || ""}
                      onChange={(e) => handleChange(item.id, "yesNo", e.target.value)}
                      className="rounded border px-2 py-1"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="text"
                      value={responses[item.id]?.page || ""}
                      onChange={(e) => handleChange(item.id, "page", e.target.value)}
                      placeholder="Page No."
                      className="w-24 rounded border px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
