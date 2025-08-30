"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
};

export default function EquipmentTenderViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch tender by ID
  useEffect(() => {
    const fetchTender = async () => {
      const { data, error } = await supabase
        .from("equipment_tenders")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error("Fetch error:", error.message);
      } else {
        setTender(data as Tender);
      }
      setLoading(false);
    };

    if (id) fetchTender();
  }, [id]);

  if (loading) {
    return (
      <section className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading tender details...</p>
      </section>
    );
  }

  if (!tender) {
    return (
      <section className="p-6 bg-gray-50 min-h-screen">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-gray-600">Tender not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-800">Equipment Tender Details</h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Tender Title: </span>
            {tender.title}
          </p>
          <p>
            <span className="font-semibold">Tender Reference No.: </span>
            {tender.reference}
          </p>
          <p>
            <span className="font-semibold">Published Date: </span>
            {tender.published}
          </p>
          <p>
            <span className="font-semibold">Tender Start Date: </span>
            {tender.start_date}
          </p>
          <p>
            <span className="font-semibold">Tender End Date: </span>
            {tender.end_date}
          </p>
        </div>

        {/* 📄 PDF Attachment */}
        {tender.file_url && (
          <div className="space-y-3">
            <a
              href={tender.file_url}
              download={tender.file_name}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Download Attachment
            </a>

            {/* Embedded PDF Preview */}
            <div className="mt-4 border rounded-lg overflow-hidden">
              <embed
                src={tender.file_url}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
