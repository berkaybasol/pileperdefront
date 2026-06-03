import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "@/components/GoogleAnalytics";
import SiteShell from "@/components/SiteShell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pileperde.com.tr'),
  title: {
    default: 'Pile Perde Ankara Çayyolu - Perde, Jaluzi, Stor Perde',
    template: '%s | Pile Perde'
  },
  description: 'Pile Perde 35 yıllık dekorasyon deneyimi ile sizleri hayaller ötesinde mekanlara kavuşturuyor. Beytepe, Bilkent, Yaşamkent, Çayyolu, Ümitköy. ☎️ 0312 241 72 72',
  keywords: [
    'ankara perde',
    'ankara jaluzi',
    'ankara stor perde',
    'perde fiyatları',
    'jaluzi fiyatları',
    'dikey perde',
    'zebra perde',
    'plise perde',
    'motorlu perde',
    'tül perde',
    'fon perde',
    'blackout perde',
    'ahşap jaluzi',
    'alüminyum jaluzi',
    'cam balkon perdesi',
    'otel perdesi',
    'ofis perdesi',
    'hastane perdesi',
    'pile perde ankara',
  ],
  authors: [{ name: 'Pile Perde' }],
  creator: 'Pile Perde',
  publisher: 'Pile Perde',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon.ico' }
    ],
    apple: '/favicon_io/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://pileperde.com.tr',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://pileperde.com.tr',
    siteName: 'Pile Perde',
    title: 'Pile Perde - Ankara Perde, Jaluzi ve Stor Perde Sistemleri',
    description: 'Ankara\'da 20+ yıllık tecrübe ile perde, jaluzi, stor perde sistemleri. Profesyonel montaj, garantili hizmet.',
    images: [
      {
        url: '/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file',
        width: 1200,
        height: 630,
        alt: 'Pile Perde - Ankara Perde Sistemleri',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pile Perde - Ankara Perde ve Jaluzi Sistemleri',
    description: 'Ankara\'da perde, jaluzi, stor perde sistemleri. 20+ yıllık tecrübe, profesyonel montaj.',
    images: ['/api/public/media/images/8cecc447-bb34-4dec-a8ac-dc8ab189fe81/file'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification ID buraya eklenecek
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    // Yandex verification ID buraya eklenecek
    // yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    // Bing verification ID buraya eklenecek
    // other: {
    //   'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE',
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body suppressHydrationWarning className={`${poppins.className} antialiased`}>
        <GoogleTagManager />

        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
