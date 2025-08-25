// app/component/ConditionalLayout.tsx
"use client"

import { usePathname } from "next/navigation"
import Header from "@/app/component/Header"
import Footer from "@/app/component/Footer"

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="p-6">{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  )
}
