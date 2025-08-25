// app/quality-control/page.tsx
"use client"

import { ShieldCheck, Package, AlertTriangle, Ban } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QualityControlPage() {
  const steps = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
      title: "Testing as per the Drugs & Cosmetics Act 1940",
      desc: "Drugs Inspector draws the samples from all depots of the corporation and ensures compliance with statutory provisions.",
    },
    {
      icon: <Package className="h-8 w-8 text-blue-600" />,
      title: "Receipt of Drugs",
      desc: "After receipt of drugs at JMHIDPCL, another checkpoint is followed to verify quality before distribution.",
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-yellow-600" />,
      title: "Inspection of Supplies",
      desc: "Food & Drugs Control Inspectors also draw samples from supplies made to Health Institutions.",
    },
    {
      icon: <Ban className="h-8 w-8 text-red-600" />,
      title: "Action on Substandard Reports",
      desc: "Based on reports, recovery or replacement is initiated, and officers are informed. Debarring process is followed, and names are published online.",
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-xl rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-indigo-700">
            Quality Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex-shrink-0">{step.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
