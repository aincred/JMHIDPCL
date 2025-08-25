"use client";

import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const navItems = [
    { label: "Home", href: "/" },

    {
      label: "About Us",
      children: [
        { label: "Overview", href: "/About/overview" },
        { label: "From MD Desk", href: "/About/md-desk" },
        { label: "Board of Directors", href: "/About/board-of-directors" },
        // { label: "Memorandum of Association", href: "/About/moa" },
        { label: "Memorandum of Association", href: "/moa.pdf" },
        { label: "Our Team", href: "/About/our-team" },
        { label: "Organogram", href: "/About/organogram" },
      ],
    },

    {
      label: "e-aushadhi",
      children: [
        { label: "Overview", href: "/e-aushadhi/overview" },
        { label: "Link of E-Aushadhi", href: "https://eaushadhijh.dcservices.in/IMCS/hissso/loginLogin.imcs" },
      ],
    },

    {
      label: "Drugs",
      children: [
        { label: "The Procurement process", href: "/drugs/procurement" },
        { label: "Essential Drug list", href: "/Essential-Drug-List-Jharkhand.pdf" },
        //  { label: "Essential Drug list", href: "/drugs/edl" },
        // { label: "Terms & Condition of Drug Procurment", href: "/drugs/terms" },
         { label: "Terms & Condition of Drug Procurment", href: "/Term_and_Condition_for_Drugs.pdf" },
        { label: "Itemwise Rate Contract", href: "/drugs/rate-contract" },
        { label: "List of RC Holders", href: "/drugs/rc-holders" },
        { label: "SOP", href: "/drugs/sop" },
      ],
    },

    {
      label: "Equipment",
      children: [
        { label: "The Procurement process", href: "/equipment/procurement" },
        // { label: "Terms & Condition of Procurment of Equipment", href: "/equipment/terms" },
        { label: "Terms & Condition of Procurment of Equipment", href: "/Term_and_Condition_of_procurment_equipments.pdf" },
        { label: "Check list Medical Indent of Equipment", href: "/equipment/checklist" },
        // { label: "Acceptance of Tender", href: "/equipment/tender-acceptance" },
         { label: "Acceptance of Tender", href: "/acceptance_of_tender.pdf" },
        // { label: "Recent PO", href: "/equipment/recent-po" },
        { label: "Recent PO", href: "/recent_po_equipments.pdf" },
        { label: "Black listed firm/Debarred firm", href: "/equipment/blacklist" },
      ],
    },

    {
      label: "Logistics & Supply Chain",
      children: [
        { label: "Introduction", href: "/logistics/introduction" },
        // { label: "SOP", href: "/logistics/sop" },
        { label: "SOP", href: "/sop_logistics-qc.jpg" },
        { label: "Item wise rate contract", href: "/logistics/rate-contract" },
        { label: "Contact Details of Functioneries", href: "/logistics/contact" },
      ],
    },

    {
      label: "Quality Control",
      children: [
        { label: "Introduction", href: "/qc/introduction" },
        // { label: "Testing as the Drugs and cosmetic act 1940", href: "/qc/testing" },
        { label: "Testing as the Drugs and cosmetic act 1940", href: "/Drugs_and_Cosmetics_Act_1940.pdf" },
        // { label: "Process of quality Control", href: "/qc/process" },
         { label: "Process of quality Control", href: "/Flow-Chart-QC.pdf" },
        { label: "Other Important information", href: "/qc/info" },
        { label: "Contact Details of Functioneries", href: "/qc/contact" },
      ],
    },

    {
      label: "Tenders",
      children: [
        { label: "Drug", href: "/tenders/drug" },
        { label: "Equipment", href: "/tenders/equipment" },
        { label: "Consumable", href: "/tenders/consumable" },
        { label: "Covid -19", href: "/tenders/covid" },
        { label: "All Tenders", href: "/tenders/all" },
      ],
    },

    { label: "Gallery", href: "/gallery" },
    { label: "RTI", href: "/rti" },

    {
      label: "Downloads",
      children: [
        { label: "EDL 2021", href: "/EDL_2021.pdf" },
        { label: "EDL 2020", href: "/EDL_2020.pdf" },
        { label: "Agreement Format for Drugs", href: "/Drug_Agrement_Format.pdf" },
        { label: "Agreement Format for Equipment", href: "/equipment_Form_of_Agrement.pdf" },
        { label: "Bank Gurantee Format", href: "/Bid_Security_Form.pdf" },
        { label: "Others Format", href: "/downloads/others" },
      ],
    },

    { label: "Login", href: "/login" },
  ];

  return (
    <header className="w-full shadow-md sticky top-0 z-50">
      {/* Accessibility & Contact Bar */}
      <div className="bg-gray-900 text-gray-200 text-xs flex justify-between px-6 py-1">
        <a href="#main" className="hover:underline">
          Skip to Main Content
        </a>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <button className="hover:underline">+A</button>
            <button className="hover:underline">A</button>
            <button className="hover:underline">-A</button>
          </div>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex items-center justify-between px-6 py-2 bg-white border-b">
        <Image src="/jh-logo.png" alt="Logo" width={100} height={100} className="h-20 w-auto" />
        <div className="text-center max-w-3xl">
          <h1 className="text-xl md:text-2xl font-bold text-blue-900 leading-snug uppercase">
            Jharkhand Medical & Health Infrastructure Development & 
            Procurement Corporation Ltd.
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            MCH Building, RCH Campus, Namkum, Ranchi - 834010
          </p>
        </div>
       <Image src="/jmh-logo.jpg" alt="Logo" width={60} height={60} className="h-20 w-auto" />
      </div>

      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white border-t border-blue-800">
        <div className="max-w-7xl mx-auto flex w-full items-center justify-between">
          {/* Desktop Menu */}
          <ul className="hidden md:flex flex-1">
            {navItems
              .filter((item) => item.label !== "Login")
              .map((item, i) => (
                <li
                  key={i}
                  className="relative text-center border-r border-blue-800 group"
                >
                  {item.children ? (
                    <>
                      {/* Parent is now clickable */}
                      <Link
                        href={item.children[0].href}
                        className="w-full px-4 py-3 flex items-center justify-center gap-1 hover:bg-blue-800 transition"
                      >
                        {item.label}
                        <ChevronDown className="w-4 h-4 inline-block" />
                      </Link>

                      {/* Dropdown - flush to parent (no gap) */}
                      <ul className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg border border-gray-200 min-w-[220px] z-50">
                        {item.children.map((child, j) => (
                          <li
                            key={j}
                            className="px-4 py-2 hover:bg-blue-50 hover:text-blue-800 cursor-pointer"
                          >
                            <Link href={child.href}>{child.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className="px-4 py-3 flex items-center justify-center hover:bg-blue-800 transition"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
          </ul>

          {/* Login Button */}
          <div className="hidden md:block ml-4">
            <Link
              href="/login"
              className="px-4 py-2 bg-white text-blue-900 font-semibold rounded hover:bg-blue-100 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-3"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-blue-800 px-4 py-3">
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <li key={i} className="border-b border-blue-700 py-2">
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === i ? null : i)
                        }
                        className="flex justify-between w-full text-left"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === i && (
                        <ul className="pl-4 mt-2 flex flex-col gap-1 text-sm text-gray-200">
                          {item.children.map((child, j) => (
                            <li
                              key={j}
                              className="hover:underline cursor-pointer"
                            >
                              <Link href={child.href}>{child.label}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href || ""}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
