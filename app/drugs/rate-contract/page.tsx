
"use client";

import { useState, useEffect } from "react";

type ItemwiseRC = {
  id: number;
  indentNo: string;
  item: string;
  dosage: string;
  packSize: string;
  l1Rate: string;
  bidder: string;
};

export default function PublicItemwiseRC() {
  const [contracts, setContracts] = useState<ItemwiseRC[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("itemwise_rc");
    if (saved) {
      setContracts(JSON.parse(saved));
    }
  }, []);

  // Filter for search
  const filtered = contracts.filter(
    (c) =>
      c.item.toLowerCase().includes(search.toLowerCase()) ||
      c.bidder.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">Itemwise Rate Contract</h1>
        <p className="text-sm text-gray-600">Search by Item or Bidder...</p>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">entries per page</span>
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-600 text-white text-sm uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3">Sl. No.</th>
                <th className="px-4 py-3">Indent Sl. No.</th>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Dosage form & Strength</th>
                <th className="px-4 py-3">Pack Size</th>
                <th className="px-4 py-3">L-1 Rate (₹)</th>
                <th className="px-4 py-3">Bidder / RC Holder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filtered.slice(0, entriesPerPage).map((c, idx) => (
                <tr
                  key={c.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 text-gray-700">{c.indentNo}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.item}</td>
                  <td className="px-4 py-3 text-gray-600">{c.dosage}</td>
                  <td className="px-4 py-3 text-gray-600">{c.packSize}</td>
                  <td className="px-4 py-3 text-gray-600">{c.l1Rate}</td>
                  <td className="px-4 py-3 text-gray-600">{c.bidder}</td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-600">
          Showing {filtered.length > 0 ? 1 : 0} to{" "}
          {Math.min(entriesPerPage, filtered.length)} of {filtered.length} entries
        </p>
      </div>
    </section>
  );
}
