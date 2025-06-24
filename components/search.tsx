"use client"

import { useState, useMemo } from "react"
import { Post } from "@/.contentlayer/generated"
import Link from "next/link"

interface SearchProps {
  posts: Post[]
}

export function Search({ posts }: SearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return []
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)
  }, [posts, query])

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Cari posts..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(e.target.value.length > 0)
        }}
        onFocus={() => setIsOpen(query.length > 0)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
      />

      {isOpen && filteredPosts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-black dark:border-white rounded shadow-lg z-50">
          {filteredPosts.map((post) => (
            <Link key={post._id} href={post.slug}>
              <div className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-600 last:border-b-0">
                <div className="text-sm font-medium">{post.title}</div>
                {post.description && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {post.description}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}