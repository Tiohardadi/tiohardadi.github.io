"use client"

import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export function Pagination({ currentPage, totalPages, basePath = "" }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath || "/" : `${basePath}/page/${currentPage - 1}`}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          ← Previous
        </Link>
      )}

      {/* Page Numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage
        const href = page === 1 ? basePath || "/" : `${basePath}/page/${page}`
        
        return (
          <Link
            key={page}
            href={href}
            className={`px-3 py-2 border rounded-md transition-colors ${
              isActive
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {page}
          </Link>
        )
      })}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}/page/${currentPage + 1}`}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Next →
        </Link>
      )}
    </div>
  )
}