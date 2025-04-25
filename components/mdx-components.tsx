import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import remarkGfm from 'remark-gfm'

const components = {
  Image,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code, { remarkPlugins: [remarkGfm] })

  return <Component components={components} />
}
