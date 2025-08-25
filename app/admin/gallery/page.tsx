"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Trash2, PlusCircle, Loader2 } from "lucide-react";

type GallerySection = {
  id: number;
  title: string;
  images: { name: string; url: string }[];
};

export default function GalleryDashboard() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [gallery, setGallery] = useState<GallerySection[]>([]);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Load saved gallery
  useEffect(() => {
    const saved = localStorage.getItem("gallery_sections");
    if (saved) setGallery(JSON.parse(saved));
  }, []);

  // Save helper
  const saveToLocal = (data: GallerySection[]) => {
    localStorage.setItem("gallery_sections", JSON.stringify(data));
    setGallery(data);
  };

  // Simulate loading effect
  const simulateLoading = async (callback: () => void) => {
    setLoading(true);
    setTimeout(() => {
      callback();
      setLoading(false);
    }, 1200);
  };

  // Convert File → base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Upload new section
  const handleUpload = async () => {
    if (!title || !files) return;

    simulateLoading(async () => {
      const newImages = await Promise.all(
        Array.from(files).map(async (file) => ({
          name: file.name,
          url: await fileToBase64(file),
        }))
      );

      const newSection: GallerySection = {
        id: Date.now(),
        title,
        images: newImages,
      };

      saveToLocal([...gallery, newSection]);
      setTitle("");
      setFiles(null);
    });
  };

  // Update section (add images)
  const handleUpdate = async (id: number) => {
    if (!files) return;

    simulateLoading(async () => {
      const newImages = await Promise.all(
        Array.from(files).map(async (file) => ({
          name: file.name,
          url: await fileToBase64(file),
        }))
      );

      const updated = gallery.map((section) =>
        section.id === id
          ? { ...section, images: [...section.images, ...newImages] }
          : section
      );

      saveToLocal(updated);
      setFiles(null);
      setUpdateId(null);
    });
  };

  // Delete section
  const handleDeleteSection = (id: number) => {
    const updated = gallery.filter((s) => s.id !== id);
    saveToLocal(updated);
  };

  // Delete image
  const handleDeleteImage = (sectionId: number, imgIndex: number) => {
    const updated = gallery.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            images: section.images.filter((_, idx) => idx !== imgIndex),
          }
        : section
    );
    saveToLocal(updated);
  };

  return (
    <section className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-2">
          📸 Gallery Management
        </h1>
        <p className="text-gray-500 mb-8">
          Manage sections of your image gallery with ease.
        </p>

        {/* Upload New Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <input
            type="text"
            placeholder="Enter section title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="flex-1 border p-2 rounded-lg cursor-pointer shadow-sm"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" /> Upload Section
              </>
            )}
          </button>
        </div>

        {/* Section List */}
        <div className="grid gap-8">
          {gallery.map((section) => (
            <div
              key={section.id}
              className="bg-gray-50 border rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {section.title}
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setUpdateId(section.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    <PlusCircle className="w-4 h-4" /> Update
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" /> Delete
                  </button>
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {section.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group overflow-hidden rounded-lg shadow-sm"
                  >
                    {img.url.startsWith("data:") ? (
                      // Base64 image
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img.url}
                        alt={img.name}
                        className="h-36 w-full object-cover rounded-lg transform group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      // Normal URL image
                      <Image
                        src={img.url}
                        alt={img.name}
                        width={300}
                        height={200}
                        className="h-36 w-full object-cover rounded-lg transform group-hover:scale-105 transition duration-300"
                      />
                    )}
                    <button
                      onClick={() => handleDeleteImage(section.id, idx)}
                      className="absolute top-2 right-2 bg-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Update Images */}
              {updateId === section.id && (
                <div className="mt-5 flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFiles(e.target.files)}
                    className="flex-1 border p-2 rounded-lg cursor-pointer shadow-sm"
                  />
                  <button
                    onClick={() => handleUpdate(section.id)}
                    disabled={loading}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
