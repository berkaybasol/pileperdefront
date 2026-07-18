export type EnglishPageContent = {
  title: string
  seoTitle: string
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
    seoTitle: 'Bespoke Curtains & Blinds for Ankara Interiors',
    description: 'Discover bespoke curtains, blinds and motorised window treatments in Ankara, professionally specified and installed by Pile Perde for over 35 years.',
    eyebrow: 'PILE PERDE · ANKARA',
    lead: 'Tailored window treatments where textile expertise, precise installation and contemporary technology meet.',
    paragraphs: [
      'For over 35 years, Pile Perde has designed and delivered made-to-measure window treatments across 500+ residential, commercial and hospitality projects.',
      'From delicate sheer curtains and full-length decorative curtains to motorised roller blinds, wooden Venetian blinds and external ZIP screens, every detail is developed around the architecture, daylight and character of the space.',
    ],
    turkishPath: '/',
  },
  about: {
    title: 'About Pile Perde',
    seoTitle: 'About Our Window Treatment Studio in Ankara',
    description: 'Meet Pile Perde, an Ankara window treatment studio with over 35 years of expertise in bespoke curtains, premium textiles and motorised systems.',
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
    seoTitle: 'Contact Pile Perde in Çayyolu, Ankara',
    description: 'Visit Pile Perde in Çayyolu, Ankara or arrange a consultation, professional site measure and specification for bespoke curtains and blinds today.',
    eyebrow: 'PLAN YOUR PROJECT',
    lead: 'Visit our Çayyolu showroom or arrange a professional consultation for your home, workplace or hospitality project.',
    paragraphs: [
      'Our team can guide you through fabrics, operating systems, light control and installation details, whether you are furnishing a single room or coordinating a complete project.',
      'Showroom: Prof. Dr. Ahmet Taner Kışlalı Mah., Bangabandhu Boulevard No:94 H, 06810 Çayyolu, Çankaya, Ankara · Telephone: +90 (312) 241 72 72 · WhatsApp: +90 (533) 512 72 72 · Email: info@pileperde.com.tr',
    ],
    turkishPath: '/iletisim',
  },
  products: {
    title: 'Made-to-Measure Curtains, Blinds & Interior Textiles',
    seoTitle: 'Made-to-Measure Curtains, Blinds & Textiles',
    description: 'Explore made-to-measure curtains, blinds, motorised systems and upholstery fabrics, professionally specified and installed by Pile Perde in Ankara.',
    eyebrow: 'OUR COLLECTION',
    lead: 'Tailored window treatments designed around the architecture, light and character of your interior.',
    paragraphs: [
      'Our collection brings together sheer curtains, decorative curtains, roller blinds, Venetian blinds, motorised systems and specialist upholstery fabrics.',
      'Every scheme is measured, specified and installed by an experienced team, ensuring precise proportions, reliable operation and a considered finish.',
    ],
    turkishPath: '/urunler',
  },
  'products/blinds-and-shades': {
    title: 'Made-to-Measure Blinds', seoTitle: 'Made-to-Measure Blinds for Ankara Interiors', description: 'Made-to-measure roller, Venetian, vertical, zebra and pleated blinds for residential and commercial interiors, professionally installed in Ankara.', eyebrow: 'ARCHITECTURAL LIGHT CONTROL', lead: 'Clean-lined blind systems that balance daylight, privacy and visual calm.',
    paragraphs: ['Choose from roller blinds, zebra blinds, pleated blinds, vertical blinds and aluminium or wooden Venetian blinds.', 'Each system is tailored to the opening and specified for the required level of glare control, privacy and daily use.'], turkishPath: '/urunler/mekanizmali-perdeler',
  },
  'products/sheer-and-drapery': {
    title: 'Sheer Curtains & Decorative Curtains', seoTitle: 'Bespoke Sheer Curtains & Drapes in Ankara', description: 'Bespoke sheer curtains and decorative drapes, designed with the right fullness, heading and track system for refined residential and hospitality interiors.', eyebrow: 'SOFT WINDOW TREATMENTS', lead: 'Layered textiles that soften daylight and give an interior depth, movement and quiet luxury.',
    paragraphs: ['We pair refined sheer curtains with lined decorative curtains to create a balanced composition for living rooms, bedrooms and hospitality spaces.', 'Fabric weight, fullness, heading style and track specification are considered together for an impeccably tailored result.'], turkishPath: '/urunler/tul-fon-perde',
  },
  'products/upholstery-fabrics': {
    title: 'Upholstery Fabrics', seoTitle: 'Premium Upholstery Fabrics for Interiors', description: 'Explore premium upholstery fabrics for residential and contract interiors, selected for colour, handle, durability, lightfastness and practical maintenance.', eyebrow: 'TEXTILE LIBRARY', lead: 'Performance-led fabrics with the colour, handle and durability required for beautifully resolved interiors.',
    paragraphs: ['Our library includes textured weaves, velvets, linens and high-performance upholstery textiles for residential and contract use.', 'We advise on abrasion resistance, lightfastness, maintenance and colour coordination before final selection.'], turkishPath: '/urunler/dosemelik-kumas',
  },
  'products/motorised-window-treatments': {
    title: 'Motorised Window Treatment Systems', seoTitle: 'Motorised Curtains & Blinds in Ankara', description: 'Specify motorised curtains, roller blinds, wooden Venetian blinds and external ZIP screens with discreet controls and compatible smart-home integration.', eyebrow: 'EFFORTLESS CONTROL', lead: 'Discreet motorisation for expansive glazing, double-height spaces and refined contemporary interiors.',
    paragraphs: ['Our motorised portfolio includes powered curtain tracks, sunscreen roller blinds, blackout roller blinds, wooden Venetian blinds, vertical blinds and external ZIP screens.', 'Systems can be operated by remote control, wall switch or compatible building automation. Motors, controls and fabric performance are specified as one coordinated solution.'], turkishPath: '/urunler/motorlu-perdeler', image: '/api/public/media/images/d67000cc-c999-4e24-9023-87774b037372/file',
  },
  'products/curtain-accessories': {
    title: 'Curtain Tracks & Accessories', seoTitle: 'Curtain Tracks, Poles & Accessories for Interiors', description: 'Discover curtain tracks, poles, holdbacks, decorative trims and specialist fittings selected for manual and motorised made-to-measure window treatments.', eyebrow: 'THE FINISHING DETAIL', lead: 'Architectural hardware and decorative details selected to complete the scheme with precision.',
    paragraphs: ['Our range covers discreet tracks, decorative poles, holdbacks and specialist fittings for both manual and motorised applications.', 'Every component is chosen for proportion, load, finish and compatibility with the selected treatment.'], turkishPath: '/urunler/perde-aksesuarlari',
  },
  'products/metal-chain-curtains': {
    title: 'Metal Chain Curtains', seoTitle: 'Metal Chain Curtains for Architectural Interiors', description: 'Architectural metal chain curtains and made-to-measure room dividers for zoning, screening and feature installations in hospitality and retail interiors.', eyebrow: 'ARCHITECTURAL SURFACES', lead: 'A sculptural, light-responsive solution for zoning, screening and distinctive interior installations.',
    paragraphs: ['Metal chain curtains create permeable divisions while preserving movement, light and visual connection.', 'Custom dimensions and finishes make the system suitable for restaurants, hotels, retail environments and feature installations.'], turkishPath: '/urunler/metal-zincir-perde',
  },
}

type EnglishCatalogSeed = {
  key: string
  turkishPath: string
  title: string
  summary: string
  group: 'blind' | 'curtain' | 'fabric' | 'motorised' | 'accessory' | 'design' | 'commercial' | 'utility'
  seoTitle?: string
}

const englishImageByTurkishPath: Record<string, string> = {
  '/model-perdeler/klasik-ve-avangart-perde': '/api/public/media/images/df6a191d-3db6-4645-a083-f71422f49200/file',
  '/model-perdeler/modern-perde': '/api/public/media/images/8c0da342-dfe5-422c-8ef5-6279fd76976e/file',
  '/model-perdeler/rustikli-perde': '/api/public/media/images/4b0f28ee-b79d-44e0-880d-5aec64bb13e3/file',
  '/model-perdeler/kruvaze-perde': '/api/public/media/images/fa4be5de-409b-407c-adc6-44df3d5c712b/file',
  '/model-perdeler/balon-perde': '/api/public/media/images/0d960ab5-7767-41f7-86e2-674315fa8cfd/file',
  '/model-perdeler/katlamali-perde': '/api/public/media/images/2e01e3a6-79a2-4b09-87f3-48350370e150/file',
  '/model-perdeler/yuksek-tavanli-galeri-perde': '/api/public/media/images/334ad8c7-98e2-411c-98e9-d3c74c5a8973/file',
  '/model-perdeler/ip-perde': '/api/public/media/images/2e807ac8-7507-4d23-94d9-6ac4d56705af/file',
  '/model-perdeler/cocuk-perde': '/api/public/media/images/92d067f9-f14e-45da-89fb-901f775d61b3/file',
  '/model-perdeler/cibinlik-perde': '/api/public/media/images/66a8d307-6542-437e-9781-8626f3f2067e/file',
  '/model-perdeler/cati-kati-perde': '/api/public/media/images/a45da14d-05a8-4732-9bdb-ccd38d587dda/file',
  '/model-perdeler/kis-bahcesi-perde': '/api/public/media/images/3f3e07b0-8d36-4b49-8b21-1f0f4d439d90/file',
  '/kurumsal-urunler/ozel-proje-perdeleri': '/api/public/media/images/cddc7f70-53b5-4df0-bd2e-1a8511c17fd7/file',
  '/kurumsal-urunler/cafe-restoran-perdeleri': '/api/public/media/images/bcf0aa06-5687-4d2b-816a-a609e5517cab/file',
  '/kurumsal-urunler/hastane-perdeleri': '/api/public/media/images/7bbbe77b-6a2c-45a2-9f6f-04e4441a0b33/file',
  '/kurumsal-urunler/ofis-perdeleri': '/api/public/media/images/e6a92fda-f300-41ce-a547-47cf59cc6359/file',
  '/kurumsal-urunler/otel-perdeleri': '/api/public/media/images/eedb0f17-492a-4831-a507-593e32c7680b/file',
}

const groupCopy: Record<EnglishCatalogSeed['group'], { eyebrow: string; secondParagraph: string }> = {
  blind: {
    eyebrow: 'MADE-TO-MEASURE BLINDS',
    secondParagraph: 'The system is measured and specified for the opening, with light control, privacy, proportions and everyday operation considered together.',
  },
  curtain: {
    eyebrow: 'BESPOKE CURTAINS',
    secondParagraph: 'Fabric weight, fullness, heading, lining and track specification are coordinated to create a balanced, made-to-measure result.',
  },
  fabric: {
    eyebrow: 'INTERIOR TEXTILES',
    secondParagraph: 'Colour, handle, composition, durability and care requirements are reviewed against the intended residential or contract application.',
  },
  motorised: {
    eyebrow: 'MOTORISED SYSTEMS',
    secondParagraph: 'The treatment, motor, controls and installation requirements are planned as one coordinated system for reliable and discreet operation.',
  },
  accessory: {
    eyebrow: 'FINISHING DETAILS',
    secondParagraph: 'Scale, finish, load and compatibility with the selected curtain treatment are considered before the final specification is agreed.',
  },
  design: {
    eyebrow: 'CURTAIN DESIGN',
    secondParagraph: 'Proportion, material, daylight and the architecture of the room guide the final composition, which is measured and made for the individual interior.',
  },
  commercial: {
    eyebrow: 'CONTRACT WINDOW TREATMENTS',
    secondParagraph: 'Pile Perde supports the project from survey and material selection through technical specification, made-to-measure production and professional installation.',
  },
  utility: {
    eyebrow: 'PILE PERDE',
    secondParagraph: 'The information on this page forms part of Pile Perde’s service for clients in Ankara and is presented in clear, practical language.',
  },
}

const englishCatalogSeeds: EnglishCatalogSeed[] = [
  { key: 'products/blinds/venetian-blinds', turkishPath: '/urunler/mekanizmali-perdeler/jaluzi-perde', title: 'Venetian Blinds', summary: 'Adjustable slatted blinds offering precise control of daylight, privacy and outward views.', group: 'blind' },
  { key: 'products/blinds/venetian-blinds/aluminium', turkishPath: '/urunler/mekanizmali-perdeler/jaluzi-perde/aluminyum-jaluzi-perde', title: 'Aluminium Venetian Blinds', summary: 'Slim, durable aluminium Venetian blinds for clean-lined residential and commercial interiors.', group: 'blind' },
  { key: 'products/blinds/venetian-blinds/wooden', turkishPath: '/urunler/mekanizmali-perdeler/jaluzi-perde/ahsap-jaluzi-perde', title: 'Wooden Venetian Blinds', summary: 'Made-to-measure wooden Venetian blinds combining natural warmth with adjustable light control.', group: 'blind' },
  { key: 'products/blinds/venetian-blinds/leather', turkishPath: '/urunler/mekanizmali-perdeler/jaluzi-perde/deri-jaluzi-perde', title: 'Leather Venetian Blinds', summary: 'Distinctive leather-finished Venetian blinds for interiors requiring a rich, tailored material expression.', group: 'blind' },
  { key: 'products/blinds/roller-blinds', turkishPath: '/urunler/mekanizmali-perdeler/stor-perde', title: 'Roller Blinds', summary: 'Versatile made-to-measure roller blinds for privacy, glare management and understated light control.', group: 'blind' },
  { key: 'products/blinds/roller-blinds/sunscreen', turkishPath: '/urunler/mekanizmali-perdeler/stor-perde/screen-perde', title: 'Sunscreen Roller Blinds', summary: 'Screen-fabric roller blinds that manage glare while retaining a degree of outward visibility.', group: 'blind' },
  { key: 'products/blinds/roller-blinds/sheer', turkishPath: '/urunler/mekanizmali-perdeler/stor-perde/tul-stor-perde', title: 'Sheer Roller Blinds', summary: 'Light-filtering sheer roller blinds for softened daylight and a refined, minimal window treatment.', group: 'blind' },
  { key: 'products/blinds/roller-blinds/blackout', turkishPath: '/urunler/mekanizmali-perdeler/stor-perde/karartma-stor-perde', title: 'Blackout Roller Blinds', summary: 'Room-darkening roller blinds specified for bedrooms, media rooms and light-sensitive interiors.', group: 'blind' },
  { key: 'products/blinds/roller-blinds/patterned', turkishPath: '/urunler/mekanizmali-perdeler/stor-perde/desenli-stor-perde', title: 'Patterned Roller Blinds', summary: 'Patterned roller blinds that combine practical shading with a considered decorative surface.', group: 'blind' },
  { key: 'products/blinds/vertical-blinds', turkishPath: '/urunler/mekanizmali-perdeler/dikey-perde', title: 'Vertical Blinds', summary: 'Vertical blinds for wide glazing, offices and interiors requiring flexible control of light and privacy.', group: 'blind' },
  { key: 'products/blinds/zebra-blinds', turkishPath: '/urunler/mekanizmali-perdeler/zebra-perde', title: 'Zebra Blinds', summary: 'Dual-layer zebra blinds with alternating sheer and opaque bands for adjustable privacy and daylight.', group: 'blind' },
  { key: 'products/blinds/balcony-glazing-blinds', turkishPath: '/urunler/mekanizmali-perdeler/cam-balkon-perdeleri', title: 'Balcony Glazing Blinds', summary: 'Compact blind solutions designed around the movement and proportions of glazed balcony systems.', group: 'blind' },
  { key: 'products/blinds/pleated-blinds', turkishPath: '/urunler/mekanizmali-perdeler/plise-perde', title: 'Pleated Blinds', summary: 'Neat pleated blinds suited to compact openings, shaped glazing and contemporary interiors.', group: 'blind' },
  { key: 'products/blinds/bamboo-blinds', turkishPath: '/urunler/mekanizmali-perdeler/bambu-perde', title: 'Bamboo Blinds', summary: 'Natural bamboo blinds bringing texture, warmth and softly filtered daylight to relaxed interiors.', group: 'blind' },
  { key: 'products/blinds/silhouette-vision-blinds', turkishPath: '/urunler/mekanizmali-perdeler/silhouette-vision-perde', title: 'Silhouette & Vision Blinds', summary: 'Layered blind systems combining translucent fabrics with adjustable vanes for nuanced light control.', group: 'blind' },

  { key: 'products/curtains/modern-decorative-curtains', turkishPath: '/urunler/tul-fon-perde/modern-fon-perde', title: 'Modern Decorative Curtains', summary: 'Full-length decorative curtains with restrained detailing for contemporary residential interiors.', group: 'curtain' },
  { key: 'products/curtains/classic-decorative-curtains', turkishPath: '/urunler/tul-fon-perde/klasik-fon-perde', title: 'Classic Decorative Curtains', summary: 'Tailored decorative curtains with considered fullness and detailing for classic interior schemes.', group: 'curtain' },
  { key: 'products/curtains/linen-curtains', turkishPath: '/urunler/tul-fon-perde/keten-fon-perde', title: 'Linen Decorative Curtains', summary: 'Linen and linen-look decorative curtains chosen for natural texture, movement and relaxed elegance.', group: 'curtain' },
  { key: 'products/curtains/velvet-curtains', turkishPath: '/urunler/tul-fon-perde/kadife-fon-perde', title: 'Velvet Decorative Curtains', summary: 'Velvet decorative curtains offering depth of colour, a soft handle and a refined full-length finish.', group: 'curtain' },
  { key: 'products/curtains/patterned-curtains', turkishPath: '/urunler/tul-fon-perde/desenli-fon-perde', title: 'Patterned Decorative Curtains', summary: 'Patterned decorative curtains selected to complement the scale, palette and character of the room.', group: 'curtain' },
  { key: 'products/curtains/designer-curtains', turkishPath: '/urunler/tul-fon-perde/tasarim-fon-perdeler', title: 'Designer Decorative Curtains', summary: 'Bespoke decorative curtain compositions developed around the architecture and material palette.', group: 'curtain' },
  { key: 'products/curtains/linen-sheers', turkishPath: '/urunler/tul-fon-perde/keten-tul-perdeler', title: 'Linen Sheer Curtains', summary: 'Linen-look sheer curtains that soften daylight while retaining a natural, textural appearance.', group: 'curtain' },
  { key: 'products/curtains/printed-curtains', turkishPath: '/urunler/tul-fon-perde/baskili-fon-perdeler', title: 'Printed Decorative Curtains', summary: 'Printed decorative curtains specified to introduce controlled pattern and colour into an interior.', group: 'curtain' },

  { key: 'products/upholstery-fabrics/textured', turkishPath: '/urunler/dosemelik-kumas/dokulu-kumas', title: 'Textured Upholstery Fabrics', summary: 'Textured upholstery fabrics selected for tactile depth, colour and suitability for the intended use.', group: 'fabric' },
  { key: 'products/upholstery-fabrics/velvet', turkishPath: '/urunler/dosemelik-kumas/kadife-kumas', title: 'Velvet Upholstery Fabrics', summary: 'Velvet upholstery fabrics offering saturated colour, a refined handle and distinctive surface depth.', group: 'fabric' },
  { key: 'products/upholstery-fabrics/patterned', turkishPath: '/urunler/dosemelik-kumas/desenli-kumas', title: 'Patterned Upholstery Fabrics', summary: 'Patterned upholstery fabrics for considered accent pieces and coordinated interior schemes.', group: 'fabric' },
  { key: 'products/upholstery-fabrics/outdoor', turkishPath: '/urunler/dosemelik-kumas/outdoor-kumas', title: 'Outdoor Upholstery Fabrics', summary: 'Outdoor upholstery fabrics selected for exterior seating and sheltered open-air living areas.', group: 'fabric' },
  { key: 'products/upholstery-fabrics/leather', turkishPath: '/urunler/dosemelik-kumas/deri-kumas', title: 'Leather Upholstery Materials', summary: 'Leather upholstery materials chosen for colour, texture and compatibility with the intended furniture application.', group: 'fabric' },
  { key: 'products/upholstery-fabrics/leopard-print', turkishPath: '/urunler/dosemelik-kumas/leopar-desenli-dosemelik-kumaslar', title: 'Leopard Print Upholstery Fabrics', seoTitle: 'Leopard Print Upholstery | Pile Perde', summary: 'Leopard print upholstery fabrics for carefully judged statement pieces and decorative accents.', group: 'fabric' },

  { key: 'products/motorised-window-treatments/motorised-curtains', turkishPath: '/urunler/motorlu-tul-ve-kumas-perdeler', title: 'Motorised Curtains', summary: 'Motorised curtain tracks for sheer and decorative curtains, including wide and hard-to-reach installations.', group: 'motorised' },
  { key: 'products/motorised-window-treatments/wooden-venetian-blinds', turkishPath: '/urunler/motorlu-perdeler/ahsap-jaluzi', title: 'Motorised Wooden Venetian Blinds', seoTitle: 'Motorised Wooden Venetian Blinds | Pile Perde', summary: 'Powered wooden Venetian blinds combining natural material character with convenient light control.', group: 'motorised' },
  { key: 'products/motorised-window-treatments/roller-blinds', turkishPath: '/urunler/motorlu-perdeler/motorlu-stor-perdeler', title: 'Motorised Roller Blinds', summary: 'Motorised roller blinds for wide glazing, coordinated groups and discreet everyday operation.', group: 'motorised' },
  { key: 'products/motorised-window-treatments/vertical-blinds', turkishPath: '/urunler/motorlu-perdeler/motorlu-dikey-perdeler', title: 'Motorised Vertical Blinds', summary: 'Motorised vertical blinds for expansive windows and commercial interiors requiring flexible control.', group: 'motorised' },
  { key: 'products/motorised-window-treatments/zip-screens', turkishPath: '/urunler/motorlu-perdeler/zip-perde', title: 'External ZIP Screens', summary: 'Zip-guided external screens designed to manage solar gain and glare at the building envelope.', group: 'motorised' },
  { key: 'products/motorised-window-treatments/external-venetian-blinds', turkishPath: '/urunler/motorlu-perdeler/dis-cephe-jaluzi', title: 'External Venetian Blinds', summary: 'External Venetian blinds providing adjustable solar shading before heat reaches the glazing.', group: 'motorised' },
  { key: 'products/motorised-window-treatments/projection-screens', turkishPath: '/urunler/motorlu-perdeler/projeksiyon-perde', title: 'Motorised Projection Screens', summary: 'Discreet motorised projection screens for residential media rooms, meeting rooms and presentation spaces.', group: 'motorised' },

  { key: 'products/curtain-accessories/curtain-poles', turkishPath: '/urunler/perde-aksesuarlari/rustik-takimlari', title: 'Decorative Curtain Poles', summary: 'Decorative curtain poles and coordinated fittings selected to suit the curtain weight and interior finish.', group: 'accessory' },
  { key: 'products/curtain-accessories/tiebacks', turkishPath: '/urunler/perde-aksesuarlari/kol-bagi', title: 'Curtain Tiebacks', summary: 'Curtain tiebacks used to shape decorative curtains and introduce a controlled finishing detail.', group: 'accessory' },
  { key: 'products/curtain-accessories/holdbacks', turkishPath: '/urunler/perde-aksesuarlari/bracol', title: 'Curtain Holdbacks', summary: 'Decorative curtain holdbacks selected for proportion, finish and compatibility with the wider scheme.', group: 'accessory' },
  { key: 'products/metal-chain-curtains/room-dividers', turkishPath: '/urunler/metal-zincir-perde/metal-zincir-seperator', title: 'Metal Chain Room Dividers', summary: 'Made-to-measure metal chain room dividers for permeable zoning and architectural screening.', group: 'accessory' },
  { key: 'products/metal-chain-curtains/pro-collection', turkishPath: '/urunler/metal-zincir-perde/pro-collection', title: 'Metal Chain Pro Collection', summary: 'Architectural metal chain surfaces developed for distinctive commercial and hospitality installations.', group: 'accessory' },

  { key: 'curtain-designs', turkishPath: '/perde-modelleri', title: 'Bespoke Curtain Designs', summary: 'Explore curtain compositions created for different architectural settings, proportions and interior styles.', group: 'design' },
  { key: 'curtain-designs/classic-and-ornate', turkishPath: '/model-perdeler/klasik-ve-avangart-perde', title: 'Classic & Ornate Curtain Designs', seoTitle: 'Classic & Ornate Curtains | Pile Perde', summary: 'Layered curtain designs with generous proportions and carefully controlled decorative detailing.', group: 'design' },
  { key: 'curtain-designs/contemporary', turkishPath: '/model-perdeler/modern-perde', title: 'Contemporary Curtain Designs', summary: 'Clean-lined curtain compositions developed for modern homes and restrained interior schemes.', group: 'design' },
  { key: 'curtain-designs/curtain-pole', turkishPath: '/model-perdeler/rustikli-perde', title: 'Curtain Pole Designs', summary: 'Decorative curtain arrangements designed around visible poles, finials and coordinated hardware.', group: 'design' },
  { key: 'curtain-designs/cross-over', turkishPath: '/model-perdeler/kruvaze-perde', title: 'Cross-over Curtain Designs', summary: 'Softly draped cross-over curtain treatments developed for graceful decorative window compositions.', group: 'design' },
  { key: 'curtain-designs/balloon', turkishPath: '/model-perdeler/balon-perde', title: 'Balloon Blind Designs', summary: 'Decorative balloon blind treatments with softly gathered volume and a tailored textile finish.', group: 'design' },
  { key: 'curtain-designs/roman-blinds', turkishPath: '/model-perdeler/katlamali-perde', title: 'Roman Blind Designs', summary: 'Made-to-measure Roman blinds combining structured folds with the warmth of decorative fabric.', group: 'design' },
  { key: 'curtain-designs/double-height-spaces', turkishPath: '/model-perdeler/yuksek-tavanli-galeri-perde', title: 'Curtains for Double-height Spaces', summary: 'Curtain and blind solutions planned for tall glazing, galleries and double-height living spaces.', group: 'design' },
  { key: 'curtain-designs/string-curtains', turkishPath: '/model-perdeler/ip-perde', title: 'String Curtains', summary: 'Lightweight string curtains used as decorative screens and softly permeable room dividers.', group: 'design' },
  { key: 'curtain-designs/children-rooms', turkishPath: '/model-perdeler/cocuk-perde', title: 'Curtains for Children’s Rooms', summary: 'Curtain and blind schemes developed around daylight, privacy and the character of a child’s room.', group: 'design' },
  { key: 'curtain-designs/canopy-curtains', turkishPath: '/model-perdeler/cibinlik-perde', title: 'Canopy Curtains', summary: 'Soft canopy curtain treatments creating an intimate decorative layer around beds and resting areas.', group: 'design' },
  { key: 'curtain-designs/loft-windows', turkishPath: '/model-perdeler/cati-kati-perde', title: 'Blinds for Loft Windows', summary: 'Compact blind solutions considered for sloping roofs, roof windows and characterful loft interiors.', group: 'design' },
  { key: 'curtain-designs/conservatories', turkishPath: '/model-perdeler/kis-bahcesi-perde', title: 'Conservatory & Roof Blinds', summary: 'Specialist blinds for conservatories and roof glazing, planned around solar control and complex openings.', group: 'design' },

  { key: 'commercial', turkishPath: '/kurumsal-urunler', title: 'Commercial Window Treatments', summary: 'Curtains, blinds and shading systems specified for hospitality, workplace, healthcare and bespoke projects.', group: 'commercial' },
  { key: 'commercial/bespoke-projects', turkishPath: '/kurumsal-urunler/ozel-proje-perdeleri', title: 'Bespoke Contract Projects', summary: 'Made-to-measure window-treatment packages developed for individual architectural and interior-design briefs.', group: 'commercial' },
  { key: 'commercial/restaurants-and-cafes', turkishPath: '/kurumsal-urunler/cafe-restoran-perdeleri', title: 'Restaurant & Café Window Treatments', summary: 'Curtains, blinds and screening solutions specified for restaurants, cafés and hospitality interiors.', group: 'commercial' },
  { key: 'commercial/healthcare', turkishPath: '/kurumsal-urunler/hastane-perdeleri', title: 'Healthcare Curtain Systems', summary: 'Curtain and blind systems planned for healthcare interiors in line with the functional project brief.', group: 'commercial' },
  { key: 'commercial/offices', turkishPath: '/kurumsal-urunler/ofis-perdeleri', title: 'Office Curtains & Blinds', summary: 'Commercial curtains and blinds for glare management, privacy and considered workplace interiors.', group: 'commercial' },
  { key: 'commercial/hotels', turkishPath: '/kurumsal-urunler/otel-perdeleri', title: 'Hotel Curtains & Blinds', summary: 'Made-to-measure curtains, sheers, blinds and motorised systems for guest rooms and hospitality spaces.', group: 'commercial' },
  { key: 'corporate', turkishPath: '/kurumsal', title: 'Pile Perde Corporate Profile', summary: 'An overview of Pile Perde’s approach, experience and professional window-treatment service in Ankara.', group: 'utility' },
  { key: 'faq', turkishPath: '/sss', title: 'Frequently Asked Questions', summary: 'Practical information about consultation, measuring, specification and installation with Pile Perde.', group: 'utility' },
  { key: 'privacy-policy', turkishPath: '/gizlilik-politikasi', title: 'Privacy Policy', summary: 'Information about how Pile Perde handles personal information submitted through this website.', group: 'utility' },
  { key: 'terms-of-use', turkishPath: '/kullanim-kosullari', title: 'Terms of Use', summary: 'The terms governing access to and use of the Pile Perde website and its published information.', group: 'utility' },
]

for (const seed of englishCatalogSeeds) {
  const group = groupCopy[seed.group]
  englishPages[seed.key] = {
    title: seed.title,
    seoTitle: seed.seoTitle || `${seed.title}${seed.title.length > 32 ? ' | Pile Perde' : ' in Ankara | Pile Perde'}`,
    description: `${seed.summary} Specified and installed by Pile Perde in Ankara.`,
    eyebrow: group.eyebrow,
    lead: seed.summary,
    paragraphs: [
      `${seed.summary} Pile Perde develops each solution in response to the room, glazing and practical requirements of the project.`,
      group.secondParagraph,
    ],
    turkishPath: seed.turkishPath,
    image: englishImageByTurkishPath[seed.turkishPath],
  }
}

export const englishNavigation = [
  { name: 'Home', href: '/en' },
  { name: 'About', href: '/en/about' },
  {
    name: 'Products', href: '/en/products', megaMenu: true,
    items: [
      ['Made-to-Measure Blinds', '/en/products/blinds-and-shades'],
      ['Sheer & Decorative Curtains', '/en/products/sheer-and-drapery'],
      ['Upholstery Fabrics', '/en/products/upholstery-fabrics'],
      ['Motorised Window Treatments', '/en/products/motorised-window-treatments'],
      ['Curtain Accessories', '/en/products/curtain-accessories'],
      ['Metal Chain Curtains', '/en/products/metal-chain-curtains'],
    ],
  },
  {
    name: 'Curtain Designs', href: '/en/curtain-designs', megaMenu: true,
    items: englishCatalogSeeds.filter((item) => item.key.startsWith('curtain-designs/')).map((item) => [item.title, `/en/${item.key}`]),
  },
  {
    name: 'Commercial', href: '/en/commercial', megaMenu: true,
    items: englishCatalogSeeds.filter((item) => item.key.startsWith('commercial/')).map((item) => [item.title, `/en/${item.key}`]),
  },
  { name: 'Journal', href: '/en/journal' },
  { name: 'Contact', href: '/en/contact' },
] as const

export function getEnglishParentKey(key: string): string | undefined {
  if (!key) return undefined
  if (key === 'about' || key === 'contact' || key === 'products' || key === 'curtain-designs' || key === 'commercial' || key === 'corporate' || key === 'faq' || key === 'privacy-policy' || key === 'terms-of-use') return ''
  if (key === 'products/blinds-and-shades' || key === 'products/sheer-and-drapery' || key === 'products/upholstery-fabrics' || key === 'products/motorised-window-treatments' || key === 'products/curtain-accessories' || key === 'products/metal-chain-curtains') return 'products'
  if (key.startsWith('products/blinds/venetian-blinds/')) return 'products/blinds/venetian-blinds'
  if (key.startsWith('products/blinds/roller-blinds/')) return 'products/blinds/roller-blinds'
  if (key.startsWith('products/blinds/')) return 'products/blinds-and-shades'
  if (key.startsWith('products/curtains/')) return 'products/sheer-and-drapery'
  if (key.startsWith('products/upholstery-fabrics/')) return 'products/upholstery-fabrics'
  if (key.startsWith('products/motorised-window-treatments/')) return 'products/motorised-window-treatments'
  if (key.startsWith('products/curtain-accessories/')) return 'products/curtain-accessories'
  if (key.startsWith('products/metal-chain-curtains/')) return 'products/metal-chain-curtains'
  if (key.startsWith('curtain-designs/')) return 'curtain-designs'
  if (key.startsWith('commercial/')) return 'commercial'
  return undefined
}

export function getEnglishChildPages(key: string) {
  return Object.entries(englishPages)
    .filter(([candidate]) => getEnglishParentKey(candidate) === key)
    .map(([candidate, page]) => ({ key: candidate, ...page }))
}

export const englishArticles: Record<string, EnglishArticle> = {
  'wooden-venetian-blinds-guide': {
    title: 'Wooden Venetian Blinds: Design, Performance and Specification', seoTitle: 'Wooden Venetian Blinds: A Design Guide', description: 'A professional guide to wooden Venetian blinds, covering slat widths, timber finishes, light control, measuring, installation and motorised operation.', eyebrow: 'DESIGN GUIDE', lead: 'Natural timber, precise light control and an architectural rhythm make wooden Venetian blinds a compelling choice for considered interiors.',
    paragraphs: ['Wooden Venetian blinds introduce warmth and structure without the visual weight of full-length curtains. Adjustable slats direct daylight while maintaining privacy—particularly valuable in living spaces, home offices and street-facing rooms.', 'The most convincing installations begin with proportion. Slat width, timber tone and headrail finish should respond to the scale of the glazing and surrounding joinery. For wide or hard-to-reach windows, motorised operation provides effortless control.', 'Professional measuring is essential. Recess depth, handle clearance and stacking height all influence whether an inside- or face-fix installation will deliver the best result.'],
    turkishPath: '/blog/ahsap-jaluzi-perde-nedir-avantajlari-ve-kullanim-alanlari', category: 'Materials & Specification', datePublished: '2026-02-18', displayDate: '18 February 2026',
  },
  'motorised-window-treatments-guide': {
    title: 'A Designer’s Guide to Motorised Window Treatments', seoTitle: 'A Guide to Motorised Curtains & Blinds', description: 'Learn how to specify motorised curtains, sunscreen and blackout roller blinds for luxury homes, offices, double-height spaces and expansive glazing.', eyebrow: 'SMART INTERIORS', lead: 'The best motorised window treatments are almost invisible in operation and entirely integrated into the interior architecture.',
    paragraphs: ['Motorisation is especially valuable for expansive glazing, double-height rooms and layered schemes where several treatments need to move together. Powered curtain tracks offer a soft, luxurious finish; motorised sunscreen roller blinds manage glare; blackout roller blinds create effective room darkening.', 'A successful specification coordinates fabric weight, tube size, motor torque, control protocol and access for maintenance. Early planning also allows pockets, recesses and power supplies to be concealed within the architecture.', 'Control can range from a dedicated remote or wall switch to scheduled scenes within a compatible smart-home or building-management system.'],
    turkishPath: '/blog/motorlu-ve-elektrikli-perde-sistemleri', category: 'Motorisation', datePublished: '2026-02-12', displayDate: '12 February 2026',
  },
  'how-to-choose-living-room-curtains': {
    title: 'How to Choose Curtains for a Living Room', seoTitle: 'How to Choose Curtains for Your Living Room', description: 'A designer-led guide to choosing sheer curtains, decorative curtains, tracks, fabrics and discreet light-control layers for a well-resolved living room.', eyebrow: 'INTERIOR DESIGN ADVICE', lead: 'Living-room curtains should shape daylight, frame the architecture and support the room’s material palette—without competing for attention.',
    paragraphs: ['Begin with the role of each layer. Sheer curtains filter daylight and soften the view, while lined decorative curtains add depth, acoustic comfort and evening privacy. In contemporary rooms, a recessed ceiling track can produce a calm, full-height composition.', 'Fabric should be assessed in the actual space. Natural and artificial light can shift colour dramatically, while weight and weave determine how elegantly a curtain falls. Fullness, hem depth and the relationship to furniture are equally important.', 'Where glare or heat gain is significant, a sunscreen roller blind can sit discreetly behind the textile treatment. This layered approach combines technical performance with a warmer residential finish.'],
    turkishPath: '/blog/salon-perde-secimi-nasil-yapilir', category: 'Design Advice', datePublished: '2026-02-06', displayDate: '6 February 2026',
  },
}

export const englishProductCards = [
  ['Made-to-Measure Blinds', '/en/products/blinds-and-shades', 'Roller, Venetian, vertical, zebra and pleated blind systems.', '/api/public/media/images/36e65445-18c7-432e-9d43-d2afc1ad5567/file'],
  ['Sheer & Decorative Curtains', '/en/products/sheer-and-drapery', 'Layered, made-to-measure soft window treatments.', '/api/public/media/images/ac111c41-9c23-4975-94bb-cab90e242037/file'],
  ['Upholstery Fabrics', '/en/products/upholstery-fabrics', 'Refined residential and contract textiles.', '/api/public/media/images/819c6a80-7dbe-4074-9934-dfdf8b903d8a/file'],
  ['Motorised Window Treatments', '/en/products/motorised-window-treatments', 'Quiet automation for curtains, blinds and external screens.', '/api/public/media/images/9ae3d120-1399-40e0-81e2-47d274e6c2b8/file'],
  ['Curtain Accessories', '/en/products/curtain-accessories', 'Tracks, poles, holdbacks and specialist hardware.', '/api/public/media/images/35d4d007-ea8e-4f37-9363-ad2ebfa75173/file'],
  ['Metal Chain Curtains', '/en/products/metal-chain-curtains', 'Architectural screening and statement installations.', '/api/public/media/images/ac0a3aee-b553-4521-ae13-386cb302e723/file'],
] as const
