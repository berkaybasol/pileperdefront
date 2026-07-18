'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EnglishFooter from '@/components/EnglishFooter'

type SiteShellProps = {
  children: React.ReactNode
}

const SiteShell = ({ children }: SiteShellProps) => {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const isEnglish = pathname === '/en' || pathname?.startsWith('/en/')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {children}
      {isEnglish ? <EnglishFooter /> : <Footer />}
    </>
  )
}

export default SiteShell
