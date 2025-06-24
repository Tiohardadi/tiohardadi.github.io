"use client"

import { allPosts } from "@/.contentlayer/generated"
import { ModeToggle } from "@/components/mode-toggle"
import { BackButton } from "@/components/back-button"
import { PostCard } from "@/components/post-card"
import { Search } from "@/components/search"
import { sortPostsByDate } from "@/lib/utils"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AllPostsPage() {
  const searchParams = useSearchParams()
  const selectedTag = searchParams.get('tag')
  const filteredPosts = selectedTag 
    ? allPosts.filter(post => post.tags?.includes(selectedTag))
    : allPosts
  const sortedPosts = sortPostsByDate(filteredPosts)
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(
      allPosts
        .filter(post => post.tags)
        .flatMap(post => post.tags || [])
    )
  ).sort()

  return (
    <>
      <header>
        <div className="flex items-center justify-between">
          <BackButton />
          <ModeToggle />
        </div>
      </header>

      <div className="py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {selectedTag ? `Posts: ${selectedTag}` : "All Posts"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedTag 
              ? `${sortedPosts.length} posts dengan tag "${selectedTag}"`
              : `Semua artikel dan tulisan (${allPosts.length} posts)`
            }
          </p>
          {selectedTag && (
            <Link href="/posts" className="text-sm hover:underline">
              ← Lihat semua posts
            </Link>
          )}
        </div>

        <div className="mb-8">
          <Search posts={allPosts} />
        </div>

        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tags: {allTags.map((tag, index) => (
                <span key={tag}>
                  <Link 
                    href={`/posts?tag=${encodeURIComponent(tag)}`} 
                    className={`hover:underline ${selectedTag === tag ? 'font-bold' : ''}`}
                  >
                    {tag}
                  </Link>
                  {index < allTags.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}