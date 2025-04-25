import { allPosts, allProjects } from "@/.contentlayer/generated";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <>
      <header>
        <div className="flex justify-end">
          <></>
          <ModeToggle />
        </div>
      </header>
      <div className="flex mb-[60px]">
        <div>
          <img
            className="object-fill max-w-[175px]"
            src="/avatar.png"
            alt="avatar"
          />
        </div>
        <div>
          <div className="text-2xl font-bold">Hi, I’m Tio!</div>
          <div className="text-sm mt-2 text-justify">
            Hello from my little corner of the web! I'm Tio, a programmer in
            Indonesia who's always learning. Join me in this space where I share
            my tech journey and embrace the joy of learning together. Let's keep
            it simple, casual, and enjoy the coding ride!
          </div>
          <div className="flex items-center text-sm mt-2">
            <div className="mr-4">Find me on</div>

            <a
              href="https://www.linkedin.com/in/tiohardadi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="max-w-[22px] mr-4"
                src="/linkedinIcon.png"
                alt="LinkedIn Icon"
              />
            </a>

            <a
              href="https://github.com/Tiohardadi"
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

            <a
              href="https://www.instagram.com/tiohardadis"
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
        <div className="text-2xl font-bold mb-6">My Post</div>

        <div className="flex flex-col gap-6">
          {allPosts.map((post) => (
            <div
              key={post._id}
              className="border-2 border-black dark:border-white rounded p-4 shadow-[2px_3px_0_0_#000] dark:shadow-[2px_3px_0_0_#FFF]"
            >
              {post.thumbnail && (
                <img
                  src={"/" + post.thumbnail}
                  alt={post.title}
                  className="w-full max-h-48 object-cover rounded mb-3"
                />
              )}

              <Link href={post.slug}>
                <h3 className="text-lg font-bold hover:underline mb-1">
                  {post.title}
                </h3>
              </Link>

              {post.description && (
                <p className="text-sm mb-3">{post.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[80px]">
        <div className="text-2xl font-bold mb-6">My Projects</div>
        {allProjects.map((project) => (
          <article key={project._id}>
            {project.sourceCodeUrl ? (
              <a
                href={project.sourceCodeUrl}
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
