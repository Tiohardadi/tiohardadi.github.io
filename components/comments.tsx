"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export function Comments() {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.async = true
    script.crossOrigin = "anonymous"
    
    script.setAttribute("data-repo", "Tiohardadi/tiohardadi.github.io")
    script.setAttribute("data-repo-id", "R_kgDOIAGJEg")
    script.setAttribute("data-category", "General")
    script.setAttribute("data-category-id", "DIC_kwDOIAGJEs4Cr6BH")
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "bottom")
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light")
    script.setAttribute("data-lang", "id")

    ref.current.appendChild(script)
  }, [theme, mounted])

  if (!mounted) return null

  return <div ref={ref} />
}