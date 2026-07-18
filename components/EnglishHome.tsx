import About from '@/components/About'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Corporate from '@/components/Corporate'
import FAQ from '@/components/FAQ'
import Hero from '@/components/Hero'
import Models from '@/components/Models'
import Products from '@/components/Products'
import Testimonials from '@/components/Testimonials'
import { englishPages, englishProductCards } from '@/lib/englishContent'
import type { CatalogItem, ProductSectionCopy } from '@/lib/catalogContent'

const productItems: CatalogItem[] = englishProductCards.map(([title, href, description, image], index) => ({
  id: index + 1,
  title,
  href,
  description,
  image,
  enabled: true,
}))

const productCopy: ProductSectionCopy = {
  heroTitle: 'Products',
  heroSubtitle: 'Made-to-measure curtains, blinds and interior textiles',
  sectionEyebrow: 'OUR COLLECTIONS',
  sectionTitle: 'Curtains, Blinds & Interior Textiles',
  sectionDescription: 'Made-to-measure solutions specified for the proportions, daylight and practical requirements of each interior.',
}

const designKeys = [
  'curtain-designs/classic-and-ornate',
  'curtain-designs/contemporary',
  'curtain-designs/curtain-pole',
  'curtain-designs/cross-over',
  'curtain-designs/balloon',
  'curtain-designs/roman-blinds',
  'curtain-designs/double-height-spaces',
  'curtain-designs/string-curtains',
  'curtain-designs/children-rooms',
  'curtain-designs/canopy-curtains',
  'curtain-designs/loft-windows',
  'curtain-designs/conservatories',
]

const designItems: CatalogItem[] = designKeys.map((key, index) => ({
  id: index + 1,
  title: englishPages[key].title,
  description: englishPages[key].lead,
  image: englishPages[key].image!,
  href: `/en/${key}`,
  enabled: true,
}))

const commercialKeys = [
  'commercial/bespoke-projects',
  'commercial/restaurants-and-cafes',
  'commercial/healthcare',
  'commercial/offices',
  'commercial/hotels',
]

const commercialItems: CatalogItem[] = commercialKeys.map((key, index) => ({
  id: index + 1,
  title: englishPages[key].title,
  description: englishPages[key].lead,
  image: englishPages[key].image!,
  href: `/en/${key}`,
  enabled: true,
  badge: 'Commercial',
}))

export default function EnglishHome() {
  return (
    <>
      <Hero locale="en" />
      <Products initialItems={productItems} initialCopy={productCopy} loadCms={false} />
      <Models locale="en" initialItems={designItems} loadCms={false} />
      <Corporate locale="en" initialItems={commercialItems} loadCms={false} />
      <About locale="en" />
      <Testimonials locale="en" />
      <Blog locale="en" />
      <FAQ locale="en" />
      <Contact locale="en" />
    </>
  )
}
