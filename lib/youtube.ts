export const getYouTubeEmbedUrl = (value: string | null | undefined) => {
  const rawValue = value?.trim()
  if (!rawValue) {
    return ''
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(rawValue)) {
    return `https://www.youtube.com/embed/${rawValue}`
  }

  try {
    const url = new URL(rawValue)
    const hostname = url.hostname.replace(/^www\./, '')

    if (hostname === 'youtu.be') {
      const videoId = url.pathname.replace(/^\/+/, '').split('/')[0]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (url.pathname.startsWith('/embed/')) {
        const videoId = url.pathname.split('/')[2]
        return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
      }

      const videoId = url.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
    }
  } catch {
    return ''
  }

  return ''
}
