import { Metadata } from 'next'
import { turkishLocaleAlternates } from '@/lib/siteLocales'

export const metadata: Metadata = {
  title: 'Blog - Perde Dekorasyon Tavsiyeleri',
  description: 'Perde modelleri, dekorasyon önerileri ve ev tekstili hakkında uzman tavsiyeleri. Ankara Pile Perde blog yazıları ile evinize ilham alın.',
  keywords: 'perde blogu, dekorasyon blogu, perde tavsiyeleri, ev tekstili, iç mimari, ankara dekorasyon',
  alternates: turkishLocaleAlternates('/blog'),
  openGraph: {
    title: 'Blog - Perde Dekorasyon Tavsiyeleri Ankara',
    description: 'Perde modelleri, dekorasyon önerileri ve ev tekstili hakkında uzman tavsiyeleri.',
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file']
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
