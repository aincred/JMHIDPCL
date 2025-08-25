"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type GallerySection = {
  id: number;
  title: string;
  images: { name: string; url: string }[];
};

export default function PublicGallery() {
  const [gallery, setGallery] = useState<GallerySection[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("gallery_sections");
    if (saved) setGallery(JSON.parse(saved));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-12 text-blue-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Image Gallery
      </motion.h1>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {section.images.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                  onClick={() => setLightbox(img.url)}
                >
                  <Image
                    src={img.url}
                    alt={img.name}
                    width={500}
                    height={350}
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
