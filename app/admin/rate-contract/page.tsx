"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type ItemwiseRC = {
  id: string;
  indent_no: string;
  item: string;
  dosage: string;
  pack_size: string;
  l1_rate: string;
  bidder: string;
};

export default function ItemwiseRCPage() {
  const [contracts, setContracts] = useState<ItemwiseRC[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Form states
  const [indentNo, setIndentNo] = useState("");
  const [item, setItem] = useState("");
  const [dosage, setDosage] = useState("");
  const [packSize, setPackSize] = useState("");
  const [l1Rate, setL1Rate] = useState("");
  const [bidder, setBidder] = useState("");

  // Fetch from Supabase
  const fetchContracts = async () => {
    const { data, error } = await supabase
      .from("itemwise_rc")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contracts:", error.message);
    } else {
      setContracts(data || []);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  // Add Contract
  const handleAddContract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!indentNo || !item || !dosage || !packSize || !l1Rate || !bidder) return;

    const { data, error } = await supabase
      .from("itemwise_rc")
      .insert([
        {
          indent_no: indentNo,
          item,
          dosage,
          pack_size: packSize,
          l1_rate: l1Rate,
          bidder,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting contract:", error.message);
    } else if (data) {
      setContracts([data[0], ...contracts]); // update state
      setIndentNo("");
      setItem("");
      setDosage("");
      setPackSize("");
      setL1Rate("");
      setBidder("");
    }
  };

  // Delete Contract
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("itemwise_rc").delete().eq("id", id);
    if (error) {
      console.error("Error deleting contract:", error.message);
    } else {
      setContracts(contracts.filter((c) => c.id !== id));
    }
  };

  // Search
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

        {/* Add Form */}
        <form
          onSubmit={handleAddContract}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-6 rounded-lg bg-gray-50"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">
              Indent Sl. No.
            </label>
            <input
              type="text"
              value={indentNo}
              onChange={(e) => setIndentNo(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Item</label>
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Dosage & Strength
            </label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Pack Size</label>
            <input
              type="text"
              value={packSize}
              onChange={(e) => setPackSize(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">L-1 Rate (₹)</label>
            <input
              type="text"
              value={l1Rate}
              onChange={(e) => setL1Rate(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Bidder / RC Holder
            </label>
            <input
              type="text"
              value={bidder}
              onChange={(e) => setBidder(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Itemwise RC
            </button>
          </div>
        </form>

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
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filtered.slice(0, entriesPerPage).map((c, idx) => (
                <tr
                  key={c.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 text-gray-700">{c.indent_no}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.item}</td>
                  <td className="px-4 py-3 text-gray-600">{c.dosage}</td>
                  <td className="px-4 py-3 text-gray-600">{c.pack_size}</td>
                  <td className="px-4 py-3 text-gray-600">{c.l1_rate}</td>
                  <td className="px-4 py-3 text-gray-600">{c.bidder}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center px-4 py-6 text-gray-500"
                  >
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
