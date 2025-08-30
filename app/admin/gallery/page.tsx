"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Trash2, PlusCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// ---------- Types ----------
type GalleryImage = {
  id?: number;
  name: string;
  url: string;
};

type GallerySection = {
  id: number;
  title: string;
  images: GalleryImage[];
};

// DB row types (matching your Supabase tables)
type GalleryImageRow = {
  id: number;
  name: string;
  url: string;
  section_id: number;
};

type GallerySectionRow = {
  id: number;
  title: string;
  gallery_images: GalleryImageRow[];
};

export default function GalleryDashboard() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [gallery, setGallery] = useState<GallerySection[]>([]);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch gallery from DB
  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const { data: sections, error } = await supabase
        .from("gallery_sections")
        .select(`
          id,
          title,
          gallery_images(id, name, url, section_id)
        `);

      if (error) throw error;

      if (sections) {
        setGallery(
          (sections as GallerySectionRow[]).map((s) => ({
            id: s.id,
            title: s.title,
            images: s.gallery_images.map((img) => ({
              id: img.id,
              name: img.name,
              url: img.url,
            })),
          }))
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Fetch gallery error:", err);
        alert("Failed to fetch gallery: " + err.message);
      } else {
        console.error("Unknown error:", err);
        alert("Failed to fetch gallery: " + JSON.stringify(err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Upload files to Supabase storage
  const uploadFiles = async (files: FileList, folder: string) => {
    const uploaded: GalleryImage[] = [];

    for (const file of Array.from(files)) {
      const filePath = `${folder}/${Date.now()}-${file.name}`;
      console.log("Uploading file:", file.name, "to path:", filePath);

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error("Failed to get public URL for " + filePath);
      }

      uploaded.push({ name: file.name, url: urlData.publicUrl });
    }

    return uploaded;
  };

  // Add new section
  const handleUpload = async () => {
    if (!title || !files) {
      alert("Please enter a title and select images.");
      return;
    }

    setLoading(true);
    try {
      const uploadedImages = await uploadFiles(files, title);

      const { data: section, error } = await supabase
        .from("gallery_sections")
        .insert([{ title }])
        .select("*")
        .single<GallerySectionRow>();

      if (error) throw error;

      if (section) {
        const { error: imagesError } = await supabase
          .from("gallery_images")
          .insert(
            uploadedImages.map((img) => ({
              ...img,
              section_id: section.id,
            }))
          );
        if (imagesError) throw imagesError;
      }

      setTitle("");
      setFiles(null);
      fetchGallery();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Upload section error:", err);
        alert("Upload failed: " + err.message);
      } else {
        console.error("Unknown error:", err);
        alert("Upload failed: " + JSON.stringify(err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Update section (add images)
  const handleUpdate = async (id: number) => {
    if (!files) {
      alert("Please select images to add.");
      return;
    }
    setLoading(true);

    try {
      const uploadedImages = await uploadFiles(files, id.toString());

      const { error: imagesError } = await supabase
        .from("gallery_images")
        .insert(
          uploadedImages.map((img) => ({
            ...img,
            section_id: id,
          }))
        );
      if (imagesError) throw imagesError;

      setFiles(null);
      setUpdateId(null);
      fetchGallery();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Update section error:", err);
        alert("Update failed: " + err.message);
      } else {
        console.error("Unknown error:", err);
        alert("Update failed: " + JSON.stringify(err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete section
  const handleDeleteSection = async (id: number) => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    setLoading(true);

    try {
      const section = gallery.find((s) => s.id === id);
      if (section) {
        const paths = section.images.map((img) =>
          img.url.split("/storage/v1/object/public/gallery-images/")[1]
        );
        await supabase.storage.from("gallery-images").remove(paths);
      }

      await supabase.from("gallery_sections").delete().eq("id", id);
      fetchGallery();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Delete section error:", err);
        alert("Delete section failed: " + err.message);
      } else {
        console.error("Unknown error:", err);
        alert("Delete section failed: " + JSON.stringify(err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete single image
  const handleDeleteImage = async (
    sectionId: number,
    imageId: number,
    imageUrl: string
  ) => {
    if (!confirm("Delete this image?")) return;
    setLoading(true);

    try {
      const path = imageUrl.split(
        "/storage/v1/object/public/gallery-images/"
      )[1];
      await supabase.storage.from("gallery-images").remove([path]);
      await supabase.from("gallery_images").delete().eq("id", imageId);
      fetchGallery();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Delete image error:", err);
        alert("Delete image failed: " + err.message);
      } else {
        console.error("Unknown error:", err);
        alert("Delete image failed: " + JSON.stringify(err));
      }
    } finally {
      setLoading(false);
    }
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
                {section.images.map((img) => (
                  <div
                    key={img.id}
                    className="relative group overflow-hidden rounded-lg shadow-sm"
                  >
                    <Image
                      src={img.url}
                      alt={img.name}
                      width={300}
                      height={200}
                      className="h-36 w-full object-cover rounded-lg transform group-hover:scale-105 transition duration-300"
                    />
                    <button
                      onClick={() =>
                        handleDeleteImage(section.id, img.id!, img.url)
                      }
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
