import { getSiteSearchDocuments } from '@/lib/siteSearch'

export const revalidate = 300

export async function GET() {
  const documents = await getSiteSearchDocuments()

  return Response.json(documents, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
