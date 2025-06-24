import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { BackButton } from "@/components/back-button";
import { Comments } from "@/components/comments";
import { formatDate, calculateReadingTime } from "@/lib/utils";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <>
      <header>
        <div className="flex items-center justify-between">
          <BackButton />
          <ModeToggle />
        </div>
      </header>
      <article className="py-6 prose dark:prose-invert max-w-none">
        <h1 className="mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 not-prose">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>•</span>
          <span>{calculateReadingTime(post.body.raw)} min read</span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 not-prose">
            Tags: {post.tags.join(", ")}
          </div>
        )}

        <div className="text-justify">
          {post.description && (
            <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
              {post.description}
            </p>
          )}
          <hr className="my-4" />
          <Mdx code={post.body.code} />
        </div>
      </article>

        <div className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-700">
          <Comments />
        </div>
    </>
  );
}
