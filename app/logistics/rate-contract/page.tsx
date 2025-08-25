// app/drugs/item-wise-rate-contract/page.tsx
"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type RateContract = {
  slNo: number
  indentSlNo: number
  item: string
  dosage: string
  packSize: string
  l1Rate: string
  bidder: string
}

const data: RateContract[] = [
  { slNo: 1, indentSlNo: 1, item: "Acetazolamide", dosage: "Tablet 250 mg", packSize: "(1x10) x10 tabs", l1Rate: "1.37", bidder: "Medipol" },
  { slNo: 2, indentSlNo: 3, item: "Adrenaline", dosage: "Injection 1mg/ml 1ml. ample.", packSize: "ampoule", l1Rate: "2.92", bidder: "HIMALAYA MEDITEK PVT LTD" },
  { slNo: 3, indentSlNo: 4, item: "Albendazole", dosage: "Oral liquid 200 mg/5ml", packSize: "10 ml bottle", l1Rate: "4.7", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 4, indentSlNo: 5, item: "Albendazole", dosage: "Tablet 400mg.", packSize: "(1x10) x10 tabs", l1Rate: "1.6", bidder: "Healers" },
  { slNo: 5, indentSlNo: 6, item: "Allopurinol", dosage: "Tablet 100mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.68", bidder: "CMG Biotech" },
  { slNo: 6, indentSlNo: 7, item: "Allopurinol", dosage: "Tablet 300mg", packSize: "(1x10) x10 tabs", l1Rate: "1.89", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 7, indentSlNo: 8, item: "Amiodarone", dosage: "Tablet 100 mg", packSize: "(1x10) x10 tabs", l1Rate: "1.84", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 8, indentSlNo: 9, item: "Amiodarone", dosage: "Tablet 200 mg", packSize: "(1x10) x10 tabs", l1Rate: "3.19", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 9, indentSlNo: 10, item: "Amitriptyline", dosage: "Tablet 25 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.24", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 10, indentSlNo: 12, item: "Amlodipine", dosage: "Tablet 2.5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.17", bidder: "JACKSON LABORATORIES PVT LTD and CMG Biotech" },
  // ... continue filling with your list
]

export default function ItemWiseRateContractPage() {
  const [search, setSearch] = useState("")

  const filteredData = data.filter((d) =>
    d.item.toLowerCase().includes(search.toLowerCase()) ||
    d.dosage.toLowerCase().includes(search.toLowerCase()) ||
    d.bidder.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card className="m-6 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Item Wise Rate Contract</CardTitle>
        <Input
          placeholder="Search by item, dosage, or bidder..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2"
        />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto max-h-[600px] overflow-y-scroll">
          <Table>
            <TableCaption>A list of approved rate contracts.</TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Sl. No.</TableHead>
                <TableHead>Indent Sl. No.</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Dosage form and strength</TableHead>
                <TableHead>Pack Size</TableHead>
                <TableHead>L-1 Rate</TableHead>
                <TableHead>Bidder Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.slNo}>
                  <TableCell>{row.slNo}</TableCell>
                  <TableCell>{row.indentSlNo}</TableCell>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>{row.dosage}</TableCell>
                  <TableCell>{row.packSize}</TableCell>
                  <TableCell>{row.l1Rate}</TableCell>
                  <TableCell>{row.bidder}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
