// app\admin\tenders\all
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Tender = {
  id: number;
  title: string;
  reference: string;
  published: string;
  start_date: string;
  end_date: string;
  file_url?: string;
  file_name?: string;
  type: "Drug" | "Equipment" | "Consumable" | "Covid-19";
};

// DB rows are same as Tender, except without the "type" field
type TenderRow = Omit<Tender, "type">;

export default function AllTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const router = useRouter();

  // 🔹 Fetch all tenders from Supabase
  const fetchAllTenders = async () => {
    try {
      const tables: { key: string; type: Tender["type"] }[] = [
        { key: "drug_tenders", type: "Drug" },
        { key: "equipment_tenders", type: "Equipment" },
        { key: "consumable_tenders", type: "Consumable" },
        { key: "covid_tenders", type: "Covid-19" },
      ];

      const allData: Tender[] = [];

      for (const { key, type } of tables) {
        // no generic args → avoids TS 2558 error
        const { data, error } = await supabase.from(key).select("*");

        if (error) {
          console.error(`Error fetching ${key}:`, error.message);
        } else if (data) {
          // cast result to TenderRow[] safely
          const typed: Tender[] = (data as TenderRow[]).map((t) => ({
            ...t,
            type,
          }));
          allData.push(...typed);
        }
      }

      // sort by published date desc
      allData.sort(
        (a, b) =>
          new Date(b.published).getTime() - new Date(a.published).getTime()
      );

      setTenders(allData);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAllTenders();
  }, []);

  const filtered = tenders.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.reference.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">All Tenders</h1>
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
                <th className="px-4 py-3 text-center">Actions</th>
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
                  <td className="px-4 py-3 text-gray-600">{t.start_date}</td>
                  <td className="px-4 py-3 text-gray-600">{t.end_date}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <Link
                      href={`/admin/tenders/${t.type.toLowerCase()}/${t.id}`}
                      className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      View
                    </Link>
                    {t.file_url && (
                      <a
                        href={t.file_url}
                        target="_blank"
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        PDF
                      </a>
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

        <p className="text-sm text-gray-600">
          Showing {filtered.length > 0 ? 1 : 0} to{" "}
          {Math.min(entriesPerPage, filtered.length)} of {filtered.length}{" "}
          entries
        </p>
      </div>
    </section>
  );
}
