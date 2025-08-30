"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Tender = {
  id: number;
  title: string;
  reference: string;
  published: string;
  start: string;
  end: string;
  file_url?: string;
  file_name?: string;
};

export default function TenderViewPage() {
  const { id } = useParams(); // ✅ dynamic id
  const router = useRouter();
  const [tender, setTender] = useState<Tender | null>(null);

  // 🔹 Fetch tender inline inside useEffect
  useEffect(() => {
    const fetchTender = async () => {
      const { data, error } = await supabase
        .from("drug_tenders")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Fetch error:", error.message);
      } else {
        setTender(data as Tender);
      }
    };

    if (id) fetchTender();
  }, [id]);

  if (!tender) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading tender details...
      </div>
    );
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">{tender.title}</h1>
        <p className="text-sm text-gray-600">
          Reference No: {tender.reference}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Published:</span> {tender.published}
          </p>
          <p>
            <span className="font-medium">Start Date:</span> {tender.start}
          </p>
          <p>
            <span className="font-medium">End Date:</span> {tender.end}
          </p>
        </div>

        {tender.file_url && (
          <div className="mt-6 space-y-4">
            <a
              href={tender.file_url}
              download
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Download PDF
            </a>

            <div className="border rounded-lg h-[600px]">
              <iframe
                src={tender.file_url}
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
