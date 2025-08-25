// components/Footer.tsx
"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-gray-200 mt-8">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-blue-800">
        {/* Left - Logo & Info */}
        <div className="md:col-span-1">
          <Image
            src="/jh-logo.png"
            alt="Jharkhand Logo"
            width={200}   // set width
            height={64}   // set height
            className="h-16 w-auto mb-4"
            priority      // ensures it loads quickly
          />
          <p className="text-sm leading-relaxed">
            Jharkhand Medical & Health Infrastructure Development & Procurement
            Corporation Ltd. (JMHIDPCL) is committed to ensuring efficient
            procurement and distribution of drugs, equipment, and medical
            supplies across the state.
          </p>
        </div>

        {/* Middle - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="/About/overview" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Tenders</a></li>
            <li><a href="/gallery" className="hover:underline">Gallery</a></li>
            <li><a href="/rti" className="hover:underline">RTI</a></li>
          </ul>
        </div>

        {/* Right - Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 text-blue-300" />
              MCH Building, RCH Campus, Namkum, Ranchi - 834010
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-300" />
              0651-2912533
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-300" />
              jmhidpc2014[at]gmail[dot]com
            </li>
          </ul>
        </div>

        {/* Map Section */}
        <div className="w-100 h-60 md:h-52 rounded-xl overflow-hidden shadow-lg border border-blue-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.195951142898!2d85.36949121497372!3d23.344914384790712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e32769d74efb%3A0x69831098b2fddace!2sJMHIDPCL!5e0!3m2!1sen!2sin!4v1626182461425!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-950 text-gray-400 text-xs py-4 px-6 text-center">
        © {new Date().getFullYear()} Jharkhand Medical & Health Infrastructure
        Development & Procurement Corporation Ltd. | All Rights Reserved
      </div>
    </footer>
  );
}



// "use client";

// import { Mail, Phone, MapPin } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-blue-900 text-gray-200 mt-8">
//       {/* Top Section */}
//       <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-blue-800">
//         {/* Left - Logo & Info */}
//         <div className="flex flex-col items-start">
//           <img
//             src="/jh-logo.png"
//             alt="Jharkhand Logo"
//             className="h-16 w-auto mb-3"
//           />
//           <p className="text-sm leading-relaxed">
//             Jharkhand Medical & Health Infrastructure Development & Procurement
//             Corporation Ltd. (JMHIDPCL) is committed to ensuring the efficient
//             procurement and distribution of drugs, equipment, and medical
//             supplies across the state.
//           </p>
//         </div>

//         {/* Middle - Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <a href="#" className="hover:underline">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 About Us
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Tenders
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Gallery
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 RTI
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Right - Contact */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
//           <ul className="space-y-3 text-sm">
//             <li className="flex items-start gap-2">
//               <MapPin className="w-4 h-4 mt-1" />
//               MCH Building, RCH Campus, Namkum, Ranchi - 834010
//             </li>
//             <li className="flex items-center gap-2">
//               <Phone className="w-4 h-4" />
//               0651-2912533
//             </li>
//             <li className="flex items-center gap-2">
//               <Mail className="w-4 h-4" />
//              jmhidpc2014[at]gmail[dot]com
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-blue-950 text-gray-400 text-xs py-3 px-6 text-center">
//         © {new Date().getFullYear()} Jharkhand Medical & Health Infrastructure
//         Development & Procurement Corporation Ltd. | All Rights Reserved
//       </div>
//     </footer>
//   );
// }
