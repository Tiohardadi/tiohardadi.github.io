"use client"

import { useTheme } from "next-themes"
import Link from "next/link"

export function BackButton() {
  const { setTheme, theme } = useTheme()
  return (
    <Link
      href="/"
      className="border rounded-md w-6 h-6 flex items-center justify-center">
      <span className="sr-only">Back</span>
      <svg fill="currentColor" className="w-4 h-4" version="1.1" viewBox="0 0 512 512" >
        <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
      </svg>
    </Link>
  )
}
