// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import ConditionalLayout from "@/app/component/ConditionalLayout"

export const metadata: Metadata = {
  title: "JMHIDPCL",
  description: "Official website",
  icons: {
    icon: "/jmh-logo.jpg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* ✅ Always wrap children inside <html> and <body> */}
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
