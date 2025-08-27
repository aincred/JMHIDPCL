"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type TenderRaw = {
  id: number;
  title: string;
  reference: string;
  published: string;
  start: string;
  end: string;
  fileUrl?: string;
};

type Tender = TenderRaw & {
  type: "Drug" | "Equipment" | "Consumable" | "Covid-19";
};

export default function PublicAllTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadTenders = <T extends TenderRaw>(
      key: string,
      type: Tender["type"]
    ): Tender[] => {
      const data = localStorage.getItem(key);
      if (!data) return [];
      try {
        const parsed: T[] = JSON.parse(data);
        return parsed.map((t) => ({ ...t, type }));
      } catch {
        return [];
      }
    };

    const allTenders: Tender[] = [
      ...loadTenders<TenderRaw>("drug_tenders", "Drug"),
      ...loadTenders<TenderRaw>("equipment_tenders", "Equipment"),
      ...loadTenders<TenderRaw>("consumable_tenders", "Consumable"),
      ...loadTenders<TenderRaw>("covid_tenders", "Covid-19"),
    ];

    allTenders.sort(
      (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
    );

    setTenders(allTenders);
  }, []);

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
                  <td className="px-4 py-3 text-gray-600">{t.type}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {t.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{t.reference}</td>
                  <td className="px-4 py-3 text-gray-600">{t.published}</td>
                  <td className="px-4 py-3 text-gray-600">{t.start}</td>
                  <td className="px-4 py-3 text-gray-600">{t.end}</td>
                  <td className="px-4 py-3 text-center">
                    {t.fileUrl ? (
                      <Link
                        href={t.fileUrl}
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
          Showing {filtered.length > 0 ? 1 : 0} to{" "}
          {Math.min(entriesPerPage, filtered.length)} of {filtered.length} entries
        </p>
      </div>
    </section>
  );
}
