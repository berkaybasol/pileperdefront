export type EnglishPageContent = {
  title: string
  description: string
  eyebrow: string
  lead: string
  paragraphs: string[]
  turkishPath: string
  image?: string
}

export type EnglishArticle = EnglishPageContent & {
  category: string
  datePublished: string
  displayDate: string
}

export const englishPages: Record<string, EnglishPageContent> = {
  '': {
    title: 'Bespoke Curtains & Architectural Window Treatments',
    description: 'With over 35 years of experience and 500+ completed projects, Pile Perde creates bespoke curtains, blinds and motorised window treatments in Ankara.',
    eyebrow: 'PILE PERDE · ANKARA',
    lead: 'Tailored window treatments where textile expertise, precise installation and contemporary technology meet.',
    paragraphs: [
      'For over 35 years, Pile Perde has designed and delivered made-to-measure window treatments across 500+ residential, commercial and hospitality projects.',
      'From delicate sheer curtains and full-length decorative drapery to motorised roller shades, wooden Venetian blinds and exterior ZIP screens, every detail is developed around the architecture, daylight and character of the space.',
    ],
    turkishPath: '/',
  },
  about: {
    title: 'About Pile Perde',
    description: 'Discover Pile Perde’s approach to bespoke curtains, premium textiles, motorised systems and professional installation in Ankara.',
    eyebrow: 'CRAFT, MATERIAL & PRECISION',
    lead: 'A specialist window-treatment studio combining over 35 years of textile expertise with a distinctly contemporary approach.',
    paragraphs: [
      'We collaborate with homeowners, interior designers and architects to create tailored solutions for residential and commercial interiors.',
      'Our service covers consultation, material selection, technical specification, accurate measuring, made-to-measure production and professional installation. The result is a coherent scheme designed to perform beautifully for years.',
    ],
    turkishPath: '/hakkimizda',
  },
  contact: {
    title: 'Contact Our Window Treatment Studio',
    description: 'Contact Pile Perde in Çayyolu, Ankara for a consultation, site measure and bespoke curtain or blind specification.',
    eyebrow: 'PLAN YOUR PROJECT',
    lead: 'Visit our Çayyolu showroom or arrange a professional consultation for your home, workplace or hospitality project.',
    paragraphs: [
      'Our team can guide you through fabrics, operating systems, light control and installation details, whether you are furnishing a single room or coordinating a complete project.',
      'Showroom: Prof. Dr. Ahmet Taner Kışlalı Mah., Çankaya, Ankara · Telephone: +90 (312) 241 72 72 · WhatsApp: +90 (533) 512 72 72 · Email: info@pileperde.com.tr',
    ],
    turkishPath: '/iletisim',
  },
  products: {
    title: 'Made-to-Measure Curtains, Blinds & Interior Textiles',
    description: 'Explore bespoke curtains, blinds, motorised window treatments and upholstery fabrics, professionally specified and installed by Pile Perde.',
    eyebrow: 'OUR COLLECTION',
    lead: 'Tailored window treatments designed around the architecture, light and character of your interior.',
    paragraphs: [
      'Our collection brings together sheer curtains, decorative drapery, roller shades, Venetian blinds, motorised systems and specialist upholstery fabrics.',
      'Every scheme is measured, specified and installed by an experienced team, ensuring precise proportions, reliable operation and a considered finish.',
    ],
    turkishPath: '/urunler',
  },
  'products/blinds-and-shades': {
    title: 'Blinds & Shades', description: 'Made-to-measure roller shades, Venetian blinds, vertical blinds and pleated shades for residential and commercial interiors.', eyebrow: 'ARCHITECTURAL LIGHT CONTROL', lead: 'Clean-lined systems that balance daylight, privacy and visual calm.',
    paragraphs: ['Choose from roller shades, zebra shades, pleated shades, vertical blinds and aluminium or wooden Venetian blinds.', 'Each system is tailored to the opening and specified for the required level of glare control, privacy and daily use.'], turkishPath: '/urunler/mekanizmali-perdeler',
  },
  'products/sheer-and-drapery': {
    title: 'Sheer Curtains & Decorative Drapery', description: 'Bespoke sheer curtains and decorative drapery, tailored for elegant residential and hospitality interiors.', eyebrow: 'SOFT WINDOW TREATMENTS', lead: 'Layered textiles that soften daylight and give an interior depth, movement and quiet luxury.',
    paragraphs: ['We pair refined sheer curtains with lined decorative drapery to create a balanced composition for living rooms, bedrooms and hospitality spaces.', 'Fabric weight, fullness, heading style and track specification are considered together for an impeccably tailored result.'], turkishPath: '/urunler/tul-fon-perde',
  },
  'products/upholstery-fabrics': {
    title: 'Upholstery Fabrics', description: 'Premium upholstery fabrics selected for comfort, durability and harmony with your interior scheme.', eyebrow: 'TEXTILE LIBRARY', lead: 'Performance-led fabrics with the colour, handle and durability required for beautifully resolved interiors.',
    paragraphs: ['Our library includes textured weaves, velvets, linens and high-performance upholstery textiles for residential and contract use.', 'We advise on abrasion resistance, lightfastness, maintenance and colour coordination before final selection.'], turkishPath: '/urunler/dosemelik-kumas',
  },
  'products/motorised-window-treatments': {
    title: 'Motorised Window Treatment Systems', description: 'Motorised roller shades, drapery tracks, wooden Venetian blinds, ZIP screens and blackout systems with smart-home integration.', eyebrow: 'EFFORTLESS CONTROL', lead: 'Discreet motorisation for expansive glazing, double-height spaces and refined contemporary interiors.',
    paragraphs: ['Our motorised portfolio includes powered drapery tracks, sunscreen roller shades, blackout roller shades, wooden Venetian blinds, vertical blinds and exterior ZIP screens.', 'Systems can be operated by remote control, wall switch or compatible building automation. Motors, controls and fabric performance are specified as one coordinated solution.'], turkishPath: '/urunler/motorlu-perdeler', image: '/api/public/media/images/d67000cc-c999-4e24-9023-87774b037372/file',
  },
  'products/curtain-accessories': {
    title: 'Curtain Tracks & Accessories', description: 'Premium curtain tracks, poles, holdbacks and finishing accessories for made-to-measure window treatments.', eyebrow: 'THE FINISHING DETAIL', lead: 'Architectural hardware and decorative details selected to complete the scheme with precision.',
    paragraphs: ['Our range covers discreet tracks, decorative poles, holdbacks and specialist fittings for both manual and motorised applications.', 'Every component is chosen for proportion, load, finish and compatibility with the selected treatment.'], turkishPath: '/urunler/perde-aksesuarlari',
  },
  'products/metal-chain-curtains': {
    title: 'Metal Chain Curtains', description: 'Architectural metal chain curtains and room dividers for hospitality, retail and statement interiors.', eyebrow: 'ARCHITECTURAL SURFACES', lead: 'A sculptural, light-responsive solution for zoning, screening and distinctive interior installations.',
    paragraphs: ['Metal chain curtains create permeable divisions while preserving movement, light and visual connection.', 'Custom dimensions and finishes make the system suitable for restaurants, hotels, retail environments and feature installations.'], turkishPath: '/urunler/metal-zincir-perde',
  },
}

export const englishArticles: Record<string, EnglishArticle> = {
  'wooden-venetian-blinds-guide': {
    title: 'Wooden Venetian Blinds: Design, Performance and Specification', description: 'A professional guide to wooden Venetian blinds, including light control, finishes, applications and specification advice.', eyebrow: 'DESIGN GUIDE', lead: 'Natural timber, precise light control and an architectural rhythm make wooden Venetian blinds a compelling choice for considered interiors.',
    paragraphs: ['Wooden Venetian blinds introduce warmth and structure without the visual weight of full-length drapery. Adjustable slats direct daylight while maintaining privacy—particularly valuable in living spaces, home offices and street-facing rooms.', 'The most convincing installations begin with proportion. Slat width, timber tone and headrail finish should respond to the scale of the glazing and surrounding joinery. For wide or hard-to-reach windows, motorised operation provides effortless control.', 'Professional measuring is essential. Recess depth, handle clearance and stacking height all influence whether an inside- or outside-mount installation will deliver the best result.'],
    turkishPath: '/blog/ahsap-jaluzi-perde-nedir-avantajlari-ve-kullanim-alanlari', category: 'Materials & Specification', datePublished: '2026-02-18', displayDate: '18 February 2026',
  },
  'motorised-window-treatments-guide': {
    title: 'A Designer’s Guide to Motorised Window Treatments', description: 'How to specify motorised curtains, sunscreen and blackout roller shades for luxury homes, offices and large glazing.', eyebrow: 'SMART INTERIORS', lead: 'The best motorised window treatments are almost invisible in operation and entirely integrated into the interior architecture.',
    paragraphs: ['Motorisation is especially valuable for expansive glazing, double-height rooms and layered schemes where several treatments need to move together. Powered drapery tracks offer a soft, luxurious finish; motorised sunscreen roller shades manage glare; blackout roller shades create effective room darkening.', 'A successful specification coordinates fabric weight, tube size, motor torque, control protocol and access for maintenance. Early planning also allows pockets, recesses and power supplies to be concealed within the architecture.', 'Control can range from a dedicated remote or wall switch to scheduled scenes within a compatible smart-home or building-management system.'],
    turkishPath: '/blog/motorlu-ve-elektrikli-perde-sistemleri', category: 'Motorisation', datePublished: '2026-02-12', displayDate: '12 February 2026',
  },
  'how-to-choose-living-room-curtains': {
    title: 'How to Choose Curtains for a Living Room', description: 'A designer-led guide to selecting sheer curtains, decorative drapery, tracks and light-control layers for a living room.', eyebrow: 'INTERIOR DESIGN ADVICE', lead: 'Living-room curtains should shape daylight, frame the architecture and support the room’s material palette—without competing for attention.',
    paragraphs: ['Begin with the role of each layer. Sheer curtains filter daylight and soften the view, while lined decorative drapery adds depth, acoustic comfort and evening privacy. In contemporary rooms, a recessed ceiling track can produce a calm, full-height composition.', 'Fabric should be assessed in the actual space. Natural and artificial light can shift colour dramatically, while weight and weave determine how elegantly a curtain falls. Fullness, hem depth and the relationship to furniture are equally important.', 'Where glare or heat gain is significant, a sunscreen roller shade can sit discreetly behind the textile treatment. This layered approach combines technical performance with a warmer residential finish.'],
    turkishPath: '/blog/salon-perde-secimi-nasil-yapilir', category: 'Design Advice', datePublished: '2026-02-06', displayDate: '6 February 2026',
  },
}

export const englishProductCards = [
  ['Blinds & Shades', '/en/products/blinds-and-shades', 'Roller, Venetian, vertical and pleated systems.'],
  ['Sheer Curtains & Drapery', '/en/products/sheer-and-drapery', 'Layered, made-to-measure soft window treatments.'],
  ['Upholstery Fabrics', '/en/products/upholstery-fabrics', 'Refined residential and contract textiles.'],
  ['Motorised Window Treatments', '/en/products/motorised-window-treatments', 'Quiet automation for curtains, shades and blinds.'],
  ['Curtain Accessories', '/en/products/curtain-accessories', 'Tracks, poles, holdbacks and specialist hardware.'],
  ['Metal Chain Curtains', '/en/products/metal-chain-curtains', 'Architectural screening and statement installations.'],
] as const
