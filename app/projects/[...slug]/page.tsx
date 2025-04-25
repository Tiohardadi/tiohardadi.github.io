import { notFound } from "next/navigation"
import { allProjects } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"
import { BackButton } from "@/components/back-button"
import { ModeToggle } from "@/components/mode-toggle"

interface projectProps {
  params: {
    slug: string[]
  }
}

async function getprojectFromParams(params: projectProps["params"]) {
  const slug = params?.slug?.join("/")
  const project = allProjects.find((project) => project.slugAsParams === slug)

  if (!project) {
    null
  }

  return project
}

export async function generateMetadata({
  params,
}: projectProps): Promise<Metadata> {
  const project = await getprojectFromParams(params)

  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export async function generateStaticParams(): Promise<projectProps["params"][]> {
  return allProjects.map((project) => ({
    slug: project.slugAsParams.split("/"),
  }))
}

export default async function projectPage({ params }: projectProps) {
  const project = await getprojectFromParams(params)

  if (!project) {
    notFound()
  }

  return (
    <>
    <header>
      <div className="flex items-center justify-between">
        <BackButton/>
        <ModeToggle />
      </div>
    </header>
    <article className="py-6 prose dark:prose-invert max-w-none">
      <h1 className="mb-2">{project.title}</h1>
      <div className="text-justify">
        {project.description && (
          <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
            {project.description}
          </p>
        )}
        <hr className="my-4" />
        <Mdx code={project.body.code} />
      </div>
    </article>
    </>
  )
}
