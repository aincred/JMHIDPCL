"use client"

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Page Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
        Contact Us
      </h1>
      <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        Feel free to reach out to JMHIDPCL at our office, via phone, or email for any inquiries.
      </p>

      {/* Contact Info Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 mb-10">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">JMHIDPCL</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Maternal & Child Hospital Building <br />
          RCH Campus, Namkum <br />
          Ranchi, Jharkhand, India
        </p>

        <div className="space-y-4 text-sm">
          <p>
            <span className="font-medium text-gray-800">📞 Phone: </span>
            <a
              href="tel:+9191xxxxxxxx"
              className="text-blue-600 hover:underline"
            >
              +91 91xxxxxxxx
            </a>
          </p>
          <p>
            <span className="font-medium text-gray-800">📧 Email: </span>
            <a
              href="mailto:info@jmhidpcl.com"
              className="text-blue-600 hover:underline"
            >
              info@jmhidpcl.com
            </a>
          </p>
          <p>
            <span className="font-medium text-gray-800">🌐 Website: </span>
            <a
              href="https://www.jmhidpcl.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              www.jmhidpcl.com
            </a>
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg border border-blue-800">
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
    </main>
  )
}
