const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export const fallbackSiteSettings: Record<string, string> = {
  'company.phone.primary': '+90 (312) 241 72 72',
  'company.whatsapp.primary': '+90 (533) 512 72 72',
  'company.email': 'info@pileperde.com.tr',
  'company.address.showroom': 'Prof. Dr. Ahmet Taner Kışlalı Mah., Bangabandhu Bulvarı No:94 H, 06810 Çayyolu / Çankaya / Ankara',
  'company.maps.url': 'https://maps.app.goo.gl/vZuC8nLLVss97n2Z9',
  'company.hours.weekday': 'Pzt-Cmt: 10:00-19:30',
  'company.hours.sunday': 'Pazar: Kapalı',
}

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string | null
  timestamp: string
}

export const normalizePhoneHref = (value: string) => value.replace(/[^\d+]/g, '')
export const normalizeWhatsAppNumber = (value: string) => value.replace(/\D/g, '')

export const getPublicSiteSettings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/settings`, { cache: 'no-store' })
    if (!response.ok) {
      return fallbackSiteSettings
    }

    const body = await response.json() as ApiResponse<Record<string, string>>
    return {
      ...fallbackSiteSettings,
      ...body.data,
      'company.address.showroom': fallbackSiteSettings['company.address.showroom'],
      'company.hours.sunday': fallbackSiteSettings['company.hours.sunday'],
    }
  } catch {
    return fallbackSiteSettings
  }
}
