// app\admin\tenders\covid
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Tender = {
  id: string;
  title: string;
  reference: string;
  published: string;
  start: string;
  end: string;
  file_url?: string;
};

export default function CovidTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // form states
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [published, setPublished] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  // Fetch tenders from Supabase
  const fetchTenders = async () => {
    const { data, error } = await supabase.from("covid_tenders").select("*").order("published", { ascending: false });
    if (error) console.error(error);
    else setTenders(data || []);
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  // Handle Add Tender
  const handleAddTender = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reference || !published || !start || !end) return;

    let file_url: string | undefined;
    if (file) {
      const { data, error } = await supabase.storage.from("covid_tenders").upload(`covid/${Date.now()}-${file.name}`, file);
      if (error) {
        console.error(error);
        return;
      }
      const { data: urlData } = supabase.storage.from("covid_tenders").getPublicUrl(data.path);
      file_url = urlData.publicUrl;
    }

    const { error } = await supabase.from("covid_tenders").insert([
      { title, reference, published, start, end, file_url },
    ]);
    if (error) {
      console.error(error);
      return;
    }

    // refresh list
    fetchTenders();

    // clear form
    setTitle(""); setReference(""); setPublished(""); setStart(""); setEnd(""); setFile(null);
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    await supabase.from("covid_tenders").delete().eq("id", id);
    fetchTenders();
  };

  // Filter
  const filtered = tenders.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.reference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">Covid-19 Tenders</h1>
        <p className="text-sm text-gray-600">All Records</p>

        {/* Upload Form */}
        <form onSubmit={handleAddTender} className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-6 rounded-lg bg-gray-50">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded px-3 py-2" />
          <input type="text" placeholder="Reference" value={reference} onChange={(e) => setReference(e.target.value)} className="border rounded px-3 py-2" />
          <input type="date" value={published} onChange={(e) => setPublished(e.target.value)} className="border rounded px-3 py-2" />
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="border rounded px-3 py-2" />
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="border rounded px-3 py-2" />
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button type="submit" className="md:col-span-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Tender</button>
        </form>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <label className="mr-2">Show</label>
            <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} className="border rounded px-2 py-1">
              {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded px-3 py-1" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3">S.no.</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, entriesPerPage).map((t, idx) => (
                <tr key={t.id} className="hover:bg-blue-50">
                  <td className="px-4 py-3">{idx+1}</td>
                  <td className="px-4 py-3">{t.title}</td>
                  <td className="px-4 py-3">{t.reference}</td>
                  <td className="px-4 py-3">{t.published}</td>
                  <td className="px-4 py-3">{t.start}</td>
                  <td className="px-4 py-3">{t.end}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    {t.file_url && (
                      <Link href={t.file_url} target="_blank" className="px-3 py-1 text-xs bg-green-500 text-white rounded">View</Link>
                    )}
                    <button onClick={() => handleDelete(t.id)} className="px-3 py-1 text-xs bg-red-500 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center px-4 py-6 text-gray-500">No tenders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600">
          {filtered.length > 0
            ? `Showing 1 to ${Math.min(entriesPerPage, filtered.length)} of ${filtered.length} entries`
            : "No entries to show"}
        </p>
      </div>
    </section>
  );
}
