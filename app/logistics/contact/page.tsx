// app/contact/page.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Contact = {
  sn: number
  name: string
  designation: string
  phone: string
}

const contacts: Contact[] = [
  { sn: 1, name: "Mr. Wilson Peter", designation: "Data Entry Operator", phone: "7992453218" },
]

export default function ContactPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Contact Details of Functionaries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="px-4 py-2 text-left border">S/N</th>
                <th className="px-4 py-2 text-left border">Name</th>
                <th className="px-4 py-2 text-left border">Designation</th>
                <th className="px-4 py-2 text-left border">Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.sn} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{c.sn}</td>
                  <td className="px-4 py-2 border">{c.name}</td>
                  <td className="px-4 py-2 border">{c.designation}</td>
                  <td className="px-4 py-2 border text-blue-600 font-semibold">
                    <a href={`tel:${c.phone}`}>{c.phone}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
