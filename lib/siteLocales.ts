export const SITE_URL = 'https://pileperde.com.tr'

export function turkishLocaleAlternates(turkishPath: string) {
  return {
    canonical: `${SITE_URL}${turkishPath}`,
    languages: {
      'tr-TR': `${SITE_URL}${turkishPath}`,
      'x-default': `${SITE_URL}${turkishPath}`,
    },
  }
}
