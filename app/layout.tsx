import Link from "next/link"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"

export const metadata = {
  title: "Hi, I’m Tio!",
  description: "Personal Blog",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-[#161928] text-slate-900 dark:text-slate-50`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="max-w-3xl mx-auto py-10 px-4">
            <main>
              {children}
              <div className="text-center">Copyright 2025 Tio Hardadi Somantri</div>
            </main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
