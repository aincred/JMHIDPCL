// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { supabase } from "@/lib/supabaseClient";

// // ---------- Types ----------
// type GalleryImage = {
//   id?: number;
//   name: string;
//   url: string;
// };

// type GallerySection = {
//   id: number;
//   title: string;
//   images: GalleryImage[];
// };

// type GallerySectionRow = {
//   id: number;
//   title: string;
//   gallery_images: {
//     id: number;
//     name: string;
//     url: string;
//     section_id: number;
//   }[];
// };

// export default function PublicGalleryPage() {
//   const [gallery, setGallery] = useState<GallerySection[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const fetchGallery = async () => {
//     setLoading(true);
//     try {
//       const { data: sections, error } = await supabase
//         .from("gallery_sections")
//         .select(`
//           id,
//           title,
//           gallery_images(id, name, url, section_id)
//         `);

//       if (error) throw error;

//       if (sections) {
//         setGallery(
//           (sections as GallerySectionRow[]).map((s) => ({
//             id: s.id,
//             title: s.title,
//             images: s.gallery_images.map((img) => ({
//               id: img.id,
//               name: img.name,
//               url: img.url,
//             })),
//           }))
//         );
//       }
//     } catch (err: unknown) {
//       console.error("Fetch gallery error:", err);
//       alert("Failed to fetch gallery");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-gray-600">
//         Loading gallery...
//       </div>
//     );
//   }

//   return (
//     <section className="p-8 min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">
//           📸 Our Gallery
//         </h1>

//         <div className="space-y-12">
//           {gallery.map((section) => (
//             <div key={section.id}>
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 {section.title}
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                 {section.images.map((img) => (
//                   <div
//                     key={img.id}
//                     className="relative overflow-hidden rounded-lg shadow-sm"
//                   >
//                     <Image
//                       src={img.url}
//                       alt={img.name}
//                       width={300}
//                       height={200}
//                       className="h-52 w-full object-cover rounded-lg transform hover:scale-105 transition duration-300"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

// ---------- Types ----------
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

type GallerySectionRow = {
  id: number;
  title: string;
  gallery_images: GalleryImage[];
};

export default function PublicGallery() {
  const [gallery, setGallery] = useState<GallerySection[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch gallery on mount
  useEffect(() => {
    fetchGallery();
  }, []);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Fetch gallery sections and images from Supabase
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
            images: s.gallery_images,
          }))
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Failed to fetch gallery:", err.message);
      } else {
        console.error("Failed to fetch gallery:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-700 font-semibold text-xl">
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-extrabold text-center mb-12 text-blue-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Image Gallery
      </motion.h1>

      {/* Gallery Sections */}
      <div className="space-y-16">
        {gallery.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-l-4 border-blue-600 pl-3">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {section.images.map((img) => (
                <motion.div
                  key={img.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                  onClick={() => setLightbox(img.url)}
                >
                  <Image
                    src={img.url}
                    alt={img.name}
                    width={500}
                    height={350}
                    loading="lazy"
                    className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-start p-4">
                    <p className="text-white text-sm font-medium">View Full Image</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Full view"
                width={900}
                height={600}
                className="rounded-2xl shadow-xl max-h-[80vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
