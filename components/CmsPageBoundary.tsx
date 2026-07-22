import { CmsPageProvider } from '@/components/CmsPageProvider'
import { getCmsPage } from '@/lib/cmsPage'

export default async function CmsPageBoundary({
  pageKey,
  children,
}: {
  pageKey: string
  children: React.ReactNode
}) {
  const page = await getCmsPage(pageKey)

  return <CmsPageProvider page={page}>{children}</CmsPageProvider>
}
