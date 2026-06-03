import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pile Perde - Ankara Perde ve Jaluzi Sistemleri',
    short_name: 'Pile Perde',
    description: 'Ankara\'da kaliteli perde, jaluzi, stor perde ve tüm mekanizmalı perde sistemleri. Profesyonel montaj ve garantili hizmet.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon_io/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon_io/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
