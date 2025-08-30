// admin\tenders\equipment\
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

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

export default function EquipmentTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // form state
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [published, setPublished] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);

  const router = useRouter();

  // 🔹 Fetch tenders
  const fetchTenders = async () => {
    const { data, error } = await supabase
      .from("equipment_tenders")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error("Fetch error:", error.message);
    else setTenders(data as Tender[]);
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  // 🔹 Add tender
  const handleAddTender = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reference || !published || !startDate || !endDate) return;

    setAdding(true);

    let fileUrl = "";
    let fileName = "";

    if (file) {
      fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("equipment_tenders")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        setAdding(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("equipment_tenders")
        .getPublicUrl(fileName);

      fileUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("equipment_tenders").insert([
      {
        title,
        reference,
        published,
        start_date: startDate,
        end_date: endDate,
        file_url: fileUrl,
        file_name: fileName,
      },
    ]);

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      fetchTenders();
      setTitle("");
      setReference("");
      setPublished("");
      setStartDate("");
      setEndDate("");
      setFile(null);
    }

    setAdding(false);
  };

  // 🔹 Delete
  const handleDelete = async (id: number, fileName?: string) => {
    if (!confirm("Are you sure?")) return;

    if (fileName) {
      const { error: storageError } = await supabase.storage
        .from("equipment_tenders")
        .remove([fileName]);
      if (storageError)
        console.error("Storage delete error:", storageError.message);
    }

    const { error: dbError } = await supabase
      .from("equipment_tenders")
      .delete()
      .eq("id", id);

    if (dbError) console.error("DB delete error:", dbError.message);
    else fetchTenders();
  };

  // 🔹 Filter
  const filtered = tenders.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.reference.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold text-blue-800">Equipment Tenders</h1>

        {/* Upload Form */}
        <form
          onSubmit={handleAddTender}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-6 rounded-lg bg-gray-50"
        >
          <input
            type="text"
            placeholder="Tender title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Reference No."
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border rounded px-3 py-2"
          />
          <button
            type="submit"
            disabled={adding}
            className="col-span-3 bg-blue-600 text-white py-2 rounded-lg"
          >
            {adding ? (
              <Loader2 className="animate-spin h-5 w-5 mx-auto" />
            ) : (
              "Add Tender"
            )}
          </button>
        </form>

        {/* Search + Entries */}
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-1/3"
          />
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border px-3 py-2 rounded"
          >
            <option value={5}>5 entries</option>
            <option value={10}>10 entries</option>
            <option value={20}>20 entries</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">S.no.</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Reference</th>
              <th className="px-4 py-2">Published</th>
              <th className="px-4 py-2">Start</th>
              <th className="px-4 py-2">End</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, entriesPerPage).map((t, idx) => (
              <tr key={t.id} className="border-b">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{t.title}</td>
                <td className="px-4 py-2">{t.reference}</td>
                <td className="px-4 py-2">{t.published}</td>
                <td className="px-4 py-2">{t.start_date}</td>
                <td className="px-4 py-2">{t.end_date}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <Link
                    href={`/admin/tenders/equipment/${t.id}`}
                    className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    View
                  </Link>
                  {t.file_url && (
                    <a
                      href={t.file_url}
                      target="_blank"
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      PDF
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(t.id, t.file_name)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
