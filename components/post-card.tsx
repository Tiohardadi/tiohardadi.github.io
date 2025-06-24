import Link from "next/link"
import { Post } from "@/.contentlayer/generated"
import { formatDate, calculateReadingTime } from "@/lib/utils"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const readingTime = calculateReadingTime(post.body.raw)
  
  return (
    <article className="border-2 border-black dark:border-white rounded p-4 shadow-[2px_3px_0_0_#000] dark:shadow-[2px_3px_0_0_#FFF] hover:shadow-[4px_5px_0_0_#000] dark:hover:shadow-[4px_5px_0_0_#FFF] transition-all duration-200">
      {post.thumbnail && (
        <img
          src={"/" + post.thumbnail}
          alt={post.title}
          className="w-full max-h-48 object-cover rounded mb-3"
        />
      )}

      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
        <time dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <span>•</span>
        <span>{readingTime} min read</span>
      </div>

      <Link href={post.slug}>
        <h3 className="text-lg font-bold hover:underline mb-2 line-clamp-2">
          {post.title}
        </h3>
      </Link>

      {post.description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-3">
          {post.description}
        </p>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          {post.tags.map((tag, index) => (
            <span key={tag}>
              <Link href={`/posts?tag=${encodeURIComponent(tag)}`} className="hover:underline">
                {tag}
              </Link>
              {index < (post.tags?.length || 0) - 1 && " • "}
            </span>
          ))}
        </div>
      )}

      <Link 
        href={post.slug}
        className="inline-flex items-center text-sm font-medium hover:underline"
      >
        Baca selengkapnya
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  )
}