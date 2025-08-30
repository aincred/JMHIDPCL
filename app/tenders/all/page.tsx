"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type TenderRaw = {
  id: string;
  title: string;
  reference: string;
  published: string;
  start_date: string;
  end_date: string;
  file_url?: string;
};

type Tender = TenderRaw & {
  type: "Drug" | "Equipment" | "Consumable" | "Covid-19";
};

export default function PublicAllTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // ✅ format dates nicely
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // ✅ load tenders from Supabase
  useEffect(() => {
    const fetchTenders = async () => {
      const categories: { table: string; type: Tender["type"] }[] = [
        { table: "drug_tenders", type: "Drug" },
        { table: "equipment_tenders", type: "Equipment" },
        { table: "consumable_tenders", type: "Consumable" },
        { table: "covid_tenders", type: "Covid-19" },
      ];

      let all: Tender[] = [];

      for (const { table, type } of categories) {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error loading ${table}:`, error.message);
          continue;
        }
        const mapped = (data as TenderRaw[]).map((t) => ({
          ...t,
          type,
        }));
        all = [...all, ...mapped];
      }

      all.sort(
        (a, b) =>
          new Date(b.published).getTime() - new Date(a.published).getTime()
      );

      setTenders(all);
    };

    fetchTenders();
  }, []);

  // ✅ filter tenders by search
  const filtered = tenders.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.reference.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-900">All Tenders</h1>
        <p className="text-sm text-gray-600">
          Combined records from all categories
        </p>

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
            placeholder="Search by title, reference or type..."
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
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Reference No.</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3 text-center">File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filtered.slice(0, entriesPerPage).map((t, idx) => (
                <tr
                  key={`${t.id}-${t.type}`}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-blue-100 text-blue-800">
                      {t.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {t.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{t.reference}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(t.published)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(t.start_date)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(t.end_date)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {t.file_url ? (
                      <Link
                        href={t.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        View
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-xs">No File</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center px-4 py-6 text-gray-500"
                  >
                    No tenders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-600">
          {filtered.length > 0
            ? `Showing 1 to ${Math.min(
                entriesPerPage,
                filtered.length
              )} of ${filtered.length} entries`
            : "No entries available"}
        </p>
      </div>
    </section>
  );
}
