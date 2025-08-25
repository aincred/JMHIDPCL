"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Link2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-700 to-cyan-500 text-white text-center py-24 px-6 md:px-16 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg"
        >
          Jharkhand Medical & Health Infrastructure
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg max-w-2xl mx-auto mb-6"
        >
          Ensuring timely procurement, distribution, and availability of medical
          supplies for better healthcare across Jharkhand.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/About/overview">
  <Button className="bg-white text-cyan-700 hover:bg-gray-100 shadow-lg px-6 py-2 rounded-full">
    Learn More
  </Button>
</Link>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 md:px-16 bg-white">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Text */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl text-black font-bold mb-6 border-l-4 border-cyan-600 pl-3">
              Overview
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
             Jharkhand Medical and Health Infrastructure Development and Procurement Corporation Limited 
             (JMHIDPCL) was established in 2013 at Ranchi Jharkhand, under the aegis of Department of Health,
              Medical Education and Family Welfare, Government of Jharkhand and was entrusted with the functions of procurement, 
              storage, distribution of medicines surgical goods medical equipment / instrument and insecticides for the health care
               institutions under Govt. of Jharkhand.(GoJ)
            </p>
            <p className="text-gray-600 leading-relaxed">
             With the changes in the healthcare arena there was a felt need of developing new as well as upgrading
              the existing functioning and processes of Department of Health, Medical Education and Family Welfare, 
              Government of Jharkhand, and consequently develop an institution supported with necessary infrastructure to
               make the system responsive to meet the objectives of the universal health coverage. With the view to match 
               the changing demands and pace of development in the sector, Jharkhand Medical and Health Infrastructure Development
                and Procurement Corporation Limited (JMHIDPCL) was established as an autonomous
              body and was incorporated under company’s act 1956 as a public undertaking on 24th May 2013.
            </p>
            <p className="text-gray-600 leading-relaxed">
             Government of Jharkhand (GoJ) is committed to provide timely and 
             effective Health Care Services to the people of Jharkhand...
            </p>
          </motion.div>

          {/* Profiles */}
          <motion.div
  className="grid gap-10 md:grid-cols-1 lg:grid-cols-2"
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  <div className="text-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition bg-white">
    <Image
      src="/shree_ajoy.jpeg"
      alt="Ajoy Kumar Singh"
      width={220}
      height={220}
      className="rounded-lg mx-auto object-cover"
    />
    <h3 className="mt-4 text-black font-bold">Shri AJOY KUMAR SINGH, I.A.S.</h3>
    <p className="text-sm text-gray-600">ADDITIONAL CHIEF SECRETARY, Health, GoJ</p>
  </div>

  <div className="text-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition bg-white">
    <Image
      src="/shre_abu_imran.jpg"
      alt="Abu Imran"
      width={220}
      height={220}
      className="rounded-lg mx-auto object-cover"
    />
    <h3 className="mt-4 text-black font-bold">Shri Abu Imran, I.A.S.</h3>
    <p className="text-sm text-gray-600">Managing Director (JMHIDPCL)</p>
  </div>
</motion.div>

        </div>
      </section>

      {/* Info Section */}
      <section id="info" className="py-20 px-6 md:px-16 bg-gradient-to-b from-gray-100 to-white">
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Notifications */}
          <Card className="shadow-lg hover:shadow-2xl transition">
            <CardHeader className="bg-cyan-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-500 text-sm">No new notifications...</p>
            </CardContent>
          </Card>

          {/* Important Links */}
          <Card className="shadow-lg hover:shadow-2xl transition">
            <CardHeader className="bg-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Link2 className="w-5 h-5" /> Important Links
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2 text-sm text-blue-600">
                <li><a href="https://www.mohfw.gov.in" target="_blank" className="hover:underline">Ministry of Health</a></li>
                <li><a href="https://jrhms.jharkhand.gov.in" target="_blank" className="hover:underline">National Health Mission</a></li>
                <li><a href="https://eprocure.gov.in" target="_blank" className="hover:underline">eProcurement System</a></li>
                <li><a href="https://jharkhand.gov.in" target="_blank" className="hover:underline">Jharkhand State Portal</a></li>
              </ul>
            </CardContent>
          </Card>

          {/* Misc Info */}
          <Card className="shadow-lg hover:shadow-2xl transition">
            <CardHeader className="bg-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" /> Miscellaneous
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-500 text-sm">No information available...</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact + Map */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-6 text-cyan-700">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>JMHIDPCL</strong><br />
              Maternal & Child Hospital Building<br />
              RCH Campus, Namkum, Ranchi, Jharkhand, India
            </p>
            <p className="mt-4 space-y-2">
              <span className="block">📞 0651-2912533</span>
              <span className="block">📧 jmhidpc2014@gmail.com</span>
              <span className="block">
                🌐 <a href="http://www.jmhidpcl.jharkhand.gov.in" className="text-blue-600 hover:underline">
                  www.jmhidpcl.jharkhand.gov.in
                </a>
              </span>
            </p>
          </div>

          {/* Map */}
          <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg">
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

        </motion.div>
      </section>
    </div>
  )
}
