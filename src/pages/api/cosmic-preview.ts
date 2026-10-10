import type { APIRoute } from 'astro'
import { createBucketClient } from '@cosmicjs/sdk'

export const GET: APIRoute = async ({ url, redirect }) => {
  const objectId = url.searchParams.get('object_id')
  const previewToken = url.searchParams.get('preview_token')
  if (!objectId || !previewToken) {
    return new Response(JSON.stringify({ error: 'object_id and preview_token are required' }), { status: 400 })
  }
  const cosmic = createBucketClient({
    bucketSlug: import.meta.env.COSMIC_BUCKET_SLUG || import.meta.env.PUBLIC_COSMIC_BUCKET_SLUG,
    readKey: import.meta.env.COSMIC_READ_KEY,
    previewToken,
  })
  try {
    const { object } = await cosmic.objects.findOne({ id: objectId }).props(['id', 'slug', 'type']).status('any')
    if (!object?.slug) {
      return new Response(JSON.stringify({ error: 'Object not found' }), { status: 404 })
    }
    const path = object.type ? `/${object.type}/${object.slug}` : `/${object.slug}`
    return redirect(`${path}?preview_token=${encodeURIComponent(previewToken)}`)
  } catch {
    return new Response(JSON.stringify({ error: 'Object not found' }), { status: 404 })
  }
}
