import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN off — /api/revalidate invalidates Next's page cache immediately on
  // publish, and we don't want to wait ~15s for Sanity's CDN to catch up.
  useCdn: false,
  perspective: 'published',
})
