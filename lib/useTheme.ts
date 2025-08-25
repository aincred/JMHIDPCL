// lib/useTheme.ts
"use client"
import { useEffect, useState } from "react"

export default function useTheme() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return { theme, toggleTheme }
}
