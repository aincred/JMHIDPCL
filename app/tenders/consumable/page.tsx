"use client";

import { useEffect, useState } from "react";
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
};

export default function PublicConsumableTenders() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Load tenders from Supabase
  const fetchTenders = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("consumable_tenders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching tenders:", error.message);
      setErrorMsg("Failed to load tenders. Please try again later.");
    } else {
      setTenders(data as Tender[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">
        Consumable Tenders
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
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Loading tenders...
                </td>
              </tr>
            ) : errorMsg ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-red-500">
                  {errorMsg}
                </td>
              </tr>
            ) : tenders.length > 0 ? (
              tenders.map((t, idx) => (
                <tr key={t.id} className="hover:bg-blue-50">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {t.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{t.reference}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(t.published).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(t.start_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(t.end_date).toLocaleDateString()}
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
              ))
            ) : (
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
