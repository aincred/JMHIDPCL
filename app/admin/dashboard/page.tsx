"use client";

import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react"; // ✅ Removed Trash2
import Link from "next/link";
import Image from "next/image"; // ✅ Added

type Certificate = {
  id: number;        // internal ID
  certNo: string;    // Certificate No.
  certName: string;  // Certificate Name
  issuedDate: string; // Issued Date
  file?: string;     // File Link (base64 or url)
};

type Tender = {
  id: number;
  title: string;
  published: string;
  start: string;
  end: string;
  type: string;
};

type GallerySection = {
  id: number;
  title: string;
  images: { name: string; url: string }[];
};

type DownloadFile = {
  id: number;
  title: string;
  link: string;
};

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [gallery, setGallery] = useState<GallerySection[]>([]);
  const [downloads, setDownloads] = useState<DownloadFile[]>([]);

  useEffect(() => {
    // Certificates
    const certs = localStorage.getItem("certificates");
    if (certs) setCertificates(JSON.parse(certs));

    // Tenders (merge all categories)
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

    // Gallery
    const gal = localStorage.getItem("gallery_sections");
    if (gal) setGallery(JSON.parse(gal));

    // Downloads
    const dls = localStorage.getItem("downloads");
    if (dls) setDownloads(JSON.parse(dls));
  }, []);

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Search */}
      <div className="flex items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Search tenders, certificates, downloads..."
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6 border-t-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-600">Certificates</h3>
          <p className="mt-3 text-4xl font-extrabold text-blue-700">
            {certificates.length}
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-600">Tenders</h3>
          <p className="mt-3 text-4xl font-extrabold text-yellow-600">
            {tenders.length}
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-600">Gallery Images</h3>
          <p className="mt-3 text-4xl font-extrabold text-green-600">
            {gallery.reduce((acc, g) => acc + g.images.length, 0)}
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6 border-t-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-600">Downloads</h3>
          <p className="mt-3 text-4xl font-extrabold text-purple-600">
            {downloads.length}
          </p>
        </div>
      </div>

      {/* Certificates */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          📜 Certificates
        </h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-sm font-medium text-gray-600">
              <th className="p-3 border">S.no.</th>
              <th className="p-3 border">Certificate No.</th>
              <th className="p-3 border">Certificate Name</th>
              <th className="p-3 border">Issued Date</th>
              <th className="p-3 border">File</th>
            </tr>
          </thead>
          <tbody>
            {certificates.slice(0, 5).map((c, idx) => (
              <tr key={c.id} className="text-sm hover:bg-gray-50 transition-colors">
                <td className="p-3 border-b">{idx + 1}</td>
                <td className="p-3 border-b">{c.certNo}</td>
                <td className="p-3 border-b">{c.certName}</td>
                <td className="p-3 border-b">{c.issuedDate}</td>
                <td className="p-3 border-b">
                  {c.file ? (
                    <a href={c.file} target="_blank" className="text-blue-600 hover:underline">
                      View File
                    </a>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
            {certificates.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No certificates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tenders */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          📑 Recent Tenders
        </h3>
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
                    className="inline-flex items-center text-blue-600 hover:underline mr-3"
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
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">🖼️ Gallery</h3>
        {gallery.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery
              .flatMap((section) => section.images.slice(0, 4))
              .map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden border hover:shadow-lg transition"
                >
                  <Image
                    src={img.url}
                    alt={img.name}
                    width={200}
                    height={112}
                    className="w-full h-28 object-cover"
                  />
                  <p className="text-xs text-center text-gray-600 p-1">
                    {img.name}
                  </p>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500">No images available</p>
        )}
      </div>

      {/* Downloads */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          📥 Downloads
        </h3>
        <ul className="list-disc list-inside space-y-2 text-blue-600">
          {downloads.slice(0, 5).map((f) => (
            <li key={f.id}>
              <a href={f.link} className="hover:underline">
                {f.title}
              </a>
            </li>
          ))}
          {downloads.length === 0 && (
            <p className="text-gray-500">No downloads available</p>
          )}
        </ul>
      </div>
    </div>
  );
}
