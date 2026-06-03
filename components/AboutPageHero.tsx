'use client'

import { useEffect, useState } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string | null
  timestamp: string
}

type CmsSection = {
  sectionKey: string
  contentJson: string | null
  enabled: boolean
}

type CmsPage = {
  sections: CmsSection[]
}

type AboutHeroContent = {
  eyebrow: string
  title: string
  description: string
}

const fallbackHero: AboutHeroContent = {
  eyebrow: 'KURUMSAL',
  title: 'Hakkımızda',
  description: '35 yıllık tecrübemizle yanınızdayız',
}

const AboutPageHero = () => {
  const [hero, setHero] = useState(fallbackHero)

  useEffect(() => {
    const loadHero = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/public/cms/pages/about`)
        if (!response.ok) {
          return
        }

        const body = await response.json() as ApiResponse<CmsPage>
        const section = body.data.sections.find((item) => item.sectionKey === 'about.main' && item.enabled)
        if (!section?.contentJson) {
          return
        }

        const parsed = JSON.parse(section.contentJson) as { hero?: Partial<AboutHeroContent> }
        setHero({
          eyebrow: parsed.hero?.eyebrow || fallbackHero.eyebrow,
          title: parsed.hero?.title || fallbackHero.title,
          description: parsed.hero?.description || fallbackHero.description,
        })
      } catch {
      }
    }

    void loadHero()
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>
      <div className="relative container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span className="w-12 h-[1px] bg-gray-700"></span>
              <span className="uppercase tracking-[0.2em] font-light">{hero.eyebrow}</span>
              <span className="w-12 h-[1px] bg-gray-700"></span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extralight text-white mb-4">{hero.title}</h1>
          <p className="text-gray-400 font-light text-base">{hero.description}</p>
        </div>
      </div>
    </section>
  )
}

export default AboutPageHero
