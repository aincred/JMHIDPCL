"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Tender = {
  id: number;
  title: string;
  reference: string;
  published: string;
  start: string;
  end: string;
  fileUrl?: string;
};

export default function PublicCovidTenders() {
  const [tenders, setTenders] = useState<Tender[]>([]);

  // Load tenders from localStorage (later can switch to API/db)
  useEffect(() => {
    const saved = localStorage.getItem("covid_tenders");
    if (saved) {
      setTenders(JSON.parse(saved));
    }
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">
        Covid-19 Tenders
      </h2>
      <p className="text-gray-600 mb-6">Latest published tenders</p>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-600 text-white text-sm uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">S.no.</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Start</th>
              <th className="px-4 py-3">End</th>
              <th className="px-4 py-3 text-center">File</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tenders.map((t, idx) => (
              <tr key={t.id} className="hover:bg-blue-50">
                <td className="px-4 py-3">{idx + 1}</td>
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

            {tenders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center px-4 py-6 text-gray-500"
                >
                  No tenders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
