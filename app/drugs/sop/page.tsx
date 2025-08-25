"use client";

import { useMemo, useState } from "react";

// ---- Dataset ----
const drugSOP = [
  { srNo: 1, action: "Receiving of indent with specification and fund.", timeFrame: "1–2 days", responsibility: "Procurement cell" },
  { srNo: 2, action: "Preparing of Tender document as per specification and editing terms and condition by editing and updating the format of Tender already designed and it is the computer or system.", timeFrame: "3–5 days", responsibility: "Procurement cell" },
  { srNo: 3, action: "Approval of Tender document to upload on portal.", timeFrame: "2–3 days", responsibility: "Procurement cell" },
  { srNo: 4, action: "Pre-bid meeting, discussion correction and issuing corrigendum.", timeFrame: "Max. 10 days from starting date of publication of bid", responsibility: "Procurement cell" },
  { srNo: 5, action: "Technical bid opening / evaluation / Demo report", timeFrame: "Technical bid opening 22nd day (Entire process) max. 10 days", responsibility: "Evaluation Committee" },
  { srNo: 6, action: "Financial bid opening / analyses / final L1", timeFrame: "Max. 4–5 days", responsibility: "Procurement cell" },
  { srNo: 7, action: "L1 Bidder asked for LOA", timeFrame: "1–2 days", responsibility: "Procurement cell" },
  { srNo: 8, action: "After receiving LOA, PO issued", timeFrame: "2–3 days", responsibility: "Procurement cell" },
  { srNo: 9, action: "Bidders who are not qualified for L1 rate contract, EMD to be returned immediately.", timeFrame: "2–3 days", responsibility: "Procurement cell" },
  { srNo: 10, action: "For purchases of scheduled medicines for supply by PSU and medicines valued below Rs 15,000 from GeM, PO is issued after approval only.", timeFrame: "2–3 days", responsibility: "Procurement cell" },
];

export default function DrugSOPPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return drugSOP.filter(
      (r) =>
        !t ||
        r.action.toLowerCase().includes(t) ||
        r.responsibility.toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
        Drug SOP – Standard Operating Procedure of Procurement
      </h1>

      {/* Search */}
      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by action or responsibility..."
          className="w-full sm:w-96 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Sr. No.</th>
              <th className="p-3 text-left">Action Points</th>
              <th className="p-3 text-left">Time Frame</th>
              <th className="p-3 text-left">Responsibility</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.srNo} className="border-b hover:bg-blue-50">
                <td className="p-3">{r.srNo}</td>
                <td className="p-3">{r.action}</td>
                <td className="p-3">{r.timeFrame}</td>
                <td className="p-3">{r.responsibility}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
