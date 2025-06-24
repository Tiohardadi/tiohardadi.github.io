import { Post } from "@/.contentlayer/generated"

export const POSTS_PER_PAGE = 5

export function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function paginatePosts(posts: Post[], page: number = 1): {
  posts: Post[]
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
} {
  const sortedPosts = sortPostsByDate(posts)
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  const startIndex = (page - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex)

  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  }
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}