import {
  type CountryCode,
  parsePhoneNumberFromString,
} from 'libphonenumber-js'

export const PHONE_ERROR_MESSAGE = 'Geçerli bir telefon numarası giriniz.'
export const EMAIL_ERROR_MESSAGE =
  'E-posta adresinizi kontrol ediniz. Örnek: adiniz@firma.com'

export function normalizeContactPhone(
  rawValue: string,
  country: CountryCode
): string | null {
  const trimmed = rawValue.trim()
  if (!trimmed) {
    return null
  }

  const candidates =
    country === 'TR' && /^0\d{10}$/.test(trimmed.replace(/\D/g, ''))
      ? [trimmed.replace(/\D/g, '').slice(1), trimmed]
      : [trimmed]

  for (const candidate of candidates) {
    const phoneNumber = parsePhoneNumberFromString(candidate, country)
    if (phoneNumber?.isValid()) {
      return phoneNumber.number
    }
  }

  return null
}

export function normalizeContactEmail(rawValue: string): string | null {
  const trimmed = rawValue.trim()
  if (
    !trimmed ||
    trimmed.length > 160 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(trimmed)
  ) {
    return null
  }
  return trimmed
}
