import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metal Zincir Perde - Dekoratif Seperatörler ',
  description: 'Metal zincir perde ile modern ve endüstriyel tasarım. Restoran, cafe, ofis için ideal. Dayanıklı ve şık. Ankara\'da profesyonel montaj.',
  keywords: 'metal zincir perde, metal perde seperatör, dekoratif seperatör, oda bölücü, alan bölücü perde, zincir seperatör, ankara metal perde, pile perde',
  alternates: {
    canonical: 'https://pileperde.com.tr/urunler/metal-zincir-perde'
  },
  openGraph: {
    title: 'Metal Zincir Perde - Dekoratif Seperatörler ',
    description: 'Metal zincir perde seperatörler ile ev ve işyerinizde lüks, dekoratif iç mekan çözümleri.',
    images: ['/api/public/media/images/ac0a3aee-b553-4521-ae13-386cb302e723/file']
  }
}

export default function MetalZincirPerdeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
