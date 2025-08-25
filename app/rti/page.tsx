"use client"

export default function RTIPage() {
  const contacts = [
    {
      name: "Sri Abu Imran",
      designation: "Appellate Authority",
      email: "Jmhidpc2014[at]gmail.com",
      contact: "0651-2912533",
    },
    {
      name: "Sri Hemant Kumar",
      designation: "GM (HR & Admin)",
      email: "Jmhidpc2014[at]gmail.com",
      contact: "0651-2912533",
    }
  ]

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Page Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
        Right to Information (RTI)
      </h1>
      <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        The following officers have been designated to handle RTI applications under JMHIDPCL.
        You may contact them via email or phone for assistance.
      </p>

      {/* Contact Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {contacts.map((person, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 p-6"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-800">{person.name}</h2>
              <p className="text-gray-700">{person.designation}</p>
            </div>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium text-gray-800">📧 Email: </span>
                <a
                  href={`mailto:${person.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {person.email}
                </a>
              </p>
              <p>
                <span className="font-medium text-gray-800">📞 Contact: </span>
                {person.contact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

