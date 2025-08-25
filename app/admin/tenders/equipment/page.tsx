"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Tender = {
  id: number;
  title: string;
  reference: string;
  published: string;
  start: string;
  end: string;
  fileUrl?: string; // PDF attachment
};

export default function EquipmentTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Upload form states
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [published, setPublished] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  // Load tenders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("equipment_tenders");
    if (saved) {
      setTenders(JSON.parse(saved));
    }
  }, []);

  // Save tenders to localStorage whenever tenders change
  useEffect(() => {
    if (tenders.length > 0) {
      localStorage.setItem("equipment_tenders", JSON.stringify(tenders));
    }
  }, [tenders]);

  // Handle upload
  const handleAddTender = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reference || !published || !start || !end) return;

    let fileUrl = "";
    if (file) {
      fileUrl = URL.createObjectURL(file); // Temporary blob URL
    }

    const newTender: Tender = {
      id: Date.now(),
      title,
      reference,
      published,
      start,
      end,
      fileUrl,
    };

    setTenders([newTender, ...tenders]);
    setTitle("");
    setReference("");
    setPublished("");
    setStart("");
    setEnd("");
    setFile(null);
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setTenders(tenders.filter((t) => t.id !== id));
  };

  // Filtered tenders
  const filtered = tenders.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.reference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Equipment Tenders</h1>
        <p className="text-sm text-gray-600">All Records</p>

        {/* Upload Form */}
        <form
          onSubmit={handleAddTender}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-6 rounded-lg bg-gray-50"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Tender title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Reference No.</label>
            <input
              type="text"
              placeholder="Reference No."
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Published Date</label>
            <input
              type="date"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">PDF File</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Tender
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
                <th className="px-4 py-3">S.no.</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Reference No.</th>
                <th className="px-4 py-3">Published Date</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">End Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filtered.slice(0, entriesPerPage).map((t, idx) => (
                <tr key={t.id} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{t.title}</td>
                  <td className="px-4 py-3 text-gray-600">{t.reference}</td>
                  <td className="px-4 py-3 text-gray-600">{t.published}</td>
                  <td className="px-4 py-3 text-gray-600">{t.start}</td>
                  <td className="px-4 py-3 text-gray-600">{t.end}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <Link
                      href={`/admin/tenders/equipment/view/${t.id}`}
                      className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                    No tenders found.
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
