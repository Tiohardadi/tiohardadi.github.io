import { allPosts, allProjects } from "@/.contentlayer/generated";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";
import { Search } from "@/components/search";
import { paginatePosts } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <header>
        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </header>
      <div className="flex flex-col sm:flex-row mb-[60px]">
        <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
          <img
            className="object-fill max-w-[130px] sm:max-w-[175px]"
            src="/avatar.png"
            alt="avatar"
          />
        </div>
        <div className="sm:ml-4">
          <div className="text-2xl font-bold text-center sm:text-left">Hi, I'm Tio!</div>
          <div className="text-sm mt-2 text-justify">
            Hello from my little corner of the web! I'm Tio, a programmer in
            Indonesia who's always learning. Join me in this space where I share
            my tech journey and embrace the joy of learning together. Let's keep
            it simple, casual, and enjoy the coding ride!
          </div>
          <div className="flex items-center justify-center sm:justify-start text-sm mt-2">
            <div className="mr-4">Find me on</div>

            
            <a href="https://www.linkedin.com/in/tiohardadi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="max-w-[22px] mr-4"
                src="/linkedinIcon.png"
                alt="LinkedIn Icon"
              />
            </a>

            
            <a href="https://github.com/Tiohardadi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="max-w-[22px] mr-4"
                src="/githubIcon.png"
                alt="GitHub Icon"
              />
            </a>

            <a href="mailto:tio@example.com">
              <img
                className="max-w-[22px] mr-4"
                src="/mailIcon.png"
                alt="Email Icon"
              />
            </a>

            
            <a href="https://www.instagram.com/tiohardadis"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="max-w-[22px] mr-4"
                src="/instagramIcon.png"
                alt="Instagram Icon"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="mb-[80px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">My Posts</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {allPosts.length} posts total
          </div>
        </div>

        <div className="mb-6">
          <Search posts={allPosts} />
        </div>

        <div className="flex flex-col gap-6">
          {paginatePosts(allPosts, 1).posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <Pagination 
          currentPage={1} 
          totalPages={paginatePosts(allPosts, 1).totalPages}
        />
        
        <div className="text-center mt-6">
          <Link href="/posts" className="text-sm hover:underline">
            Lihat semua posts →
          </Link>
        </div>
      </div>

      <div className="mb-[80px]">
        <div className="text-2xl font-bold mb-6">My Projects</div>
        {allProjects.map((project) => (
          <article key={project._id} className="mb-2 flex items-start">
            <span className="text-gray-400 mr-2">•</span>
            {project.sourceCodeUrl ? (
              <a href={project.sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {project.title}
              </a>
            ) : (
              <Link href={project.slug}>
                <div className="hover:underline">{project.title}</div>
              </Link>
            )}
          </article>
        ))}
      </div>
    </>
  );
}