"use client";

import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"; // Make sure this exists

// ---------- Types ----------
type Tender = {
  id: number;
  title: string;
  published: string;
  start: string;
  end: string;
  type: string;
};

type GalleryImage = {
  id: number;
  name: string;
  url: string;
};

type GallerySection = {
  id: number;
  title: string;
  images: GalleryImage[];
};

// Supabase row type
type GallerySectionRow = {
  id: number;
  title: string;
  gallery_images: GalleryImage[];
};

// ---------- Component ----------
export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [gallery, setGallery] = useState<GallerySection[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load tenders from localStorage
    const all: Tender[] = [];
    const loadTenders = (key: string, type: string) => {
      const data = localStorage.getItem(key);
      if (data) {
        all.push(
          ...JSON.parse(data).map((t: Omit<Tender, "type">) => ({
            ...t,
            type,
          }))
        );
      }
    };
    loadTenders("drug_tenders", "Drug");
    loadTenders("equipment_tenders", "Equipment");
    loadTenders("consumable_tenders", "Consumable");
    loadTenders("covid_tenders", "Covid-19");
    setTenders(all);

    // Fetch gallery sections from Supabase
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const { data: sections, error } = await supabase
          .from("gallery_sections")
          .select(`
            id,
            title,
            gallery_images(id, name, url)
          `);

        if (error) throw error;

        if (sections) {
          setGallery(
            (sections as GallerySectionRow[]).map((s) => ({
              id: s.id,
              title: s.title,
              images: s.gallery_images || [],
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Search */}
      <div className="flex items-center gap-3 mb-10">
        <input
          type="text"
          placeholder="Search tenders, gallery..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/80 backdrop-blur"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl hover:opacity-90 flex items-center gap-2 shadow-lg transition-all"
        >
          <Search size={18} /> Search
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 border-t-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-600">Total Tenders</h3>
          <p className="mt-4 text-5xl font-extrabold text-yellow-600">{tenders.length}</p>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 border-t-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-600">Gallery Images</h3>
          <p className="mt-4 text-5xl font-extrabold text-green-600">
            {gallery.reduce((acc, g) => acc + g.images.length, 0)}
          </p>
        </div>
      </div>

      {/* Tenders */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-12">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">📑 Recent Tenders</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-sm font-medium text-gray-600">
              <th className="p-3 border">S.no.</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Published</th>
              <th className="p-3 border">Start</th>
              <th className="p-3 border">End</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {tenders.slice(0, 5).map((t, idx) => (
              <tr key={t.id} className="text-sm hover:bg-gray-50 transition-colors">
                <td className="p-3 border-b">{idx + 1}</td>
                <td className="p-3 border-b">{t.title}</td>
                <td className="p-3 border-b">{t.type}</td>
                <td className="p-3 border-b">{t.published}</td>
                <td className="p-3 border-b">{t.start}</td>
                <td className="p-3 border-b">{t.end}</td>
                <td className="p-3 border-b">
                  <Link
                    href={`/admin/tenders/${t.type.toLowerCase()}/view/${t.id}`}
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    <Eye size={16} className="mr-1" /> View
                  </Link>
                </td>
              </tr>
            ))}
            {tenders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-500">
                  No tenders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Gallery */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">🖼️ Gallery</h3>
        {loading ? (
          <p className="text-gray-500">Loading images...</p>
        ) : gallery.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery
              .flatMap((section) => section.images.slice(0, 4))
              .map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border hover:shadow-xl transition">
                  <Image
                    src={img.url}
                    alt={img.name}
                    width={200}
                    height={112}
                    className="w-full h-32 object-cover"
                  />
                  <p className="text-xs text-center text-gray-600 p-2 bg-gray-50">{img.name}</p>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500">No images available</p>
        )}
      </div>
    </div>
  );
}
