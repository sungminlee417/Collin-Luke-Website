import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlForImage(source: Image) {
  return builder.image(source).auto('format').fit('max')
}

/**
 * Sanity loader for Next Image.
 *
 *   <Image src={urlForImage(img).url()} loader={sanityLoader} sizes="100vw" ... />
 *
 * Next generates a srcset like `_next/image?url=...&w=640 640w, ...` — but with
 * this loader in place, each entry in the srcset asks Sanity's CDN for a
 * *width-specific* JPEG/WebP/AVIF directly, so a 375px mobile viewport downloads
 * ~50KB instead of a 2000px image scaled down.
 */
export const sanityLoader = ({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) => {
  // src is a full cdn.sanity.io URL from urlForImage — strip any preset w/q and
  // reapply based on what Next's srcset is asking for.
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality ?? 80))
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  return url.toString()
}
