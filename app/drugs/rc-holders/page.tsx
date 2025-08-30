"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type RCHolder = {
  id: string;
  indent_no: string;
  item: string;
  dosage: string;
  pack_size: string;
  l1_rate: string;
  bidder: string;
};

export default function PublicRCHolders() {
  const [holders, setHolders] = useState<RCHolder[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Fetch from Supabase
  const fetchHolders = async () => {
    const { data, error } = await supabase
      .from("rc_holders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching holders:", error.message);
    } else {
      setHolders(data || []);
    }
  };

  useEffect(() => {
    fetchHolders();
  }, []);

  // Search filter
  const filtered = holders.filter(
    (h) =>
      h.item.toLowerCase().includes(search.toLowerCase()) ||
      h.dosage.toLowerCase().includes(search.toLowerCase()) ||
      h.bidder.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">List of RC Holders</h2>
      <p className="text-gray-600 mb-6">
        Approved RC Holders — search by Item, Dosage, or Bidder.
      </p>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
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
          <span className="text-sm text-gray-600">entries</span>
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
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-600 text-white text-sm uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Sl. No.</th>
              <th className="px-4 py-3">Indent Sl. No.</th>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Dosage form & Strength</th>
              <th className="px-4 py-3">Pack Size</th>
              <th className="px-4 py-3">L-1 Rate (₹)</th>
              <th className="px-4 py-3">Bidder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.slice(0, entriesPerPage).map((h, idx) => (
              <tr key={h.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">{h.indent_no}</td>
                <td className="px-4 py-3 font-medium">{h.item}</td>
                <td className="px-4 py-3">{h.dosage}</td>
                <td className="px-4 py-3">{h.pack_size}</td>
                <td className="px-4 py-3">{h.l1_rate}</td>
                <td className="px-4 py-3">{h.bidder}</td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                  No RC Holders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-600 mt-4">
        Showing {filtered.length > 0 ? 1 : 0} to{" "}
        {Math.min(entriesPerPage, filtered.length)} of {filtered.length} entries
      </p>
    </section>
  );
}
