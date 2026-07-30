'use client'

import {
  getLocalizedProductGalleryText,
  getYouTubeVideoId,
  setLocalizedProductGalleryText,
  type ProductGalleryLocale,
  type ProductVideoGallery,
  type ProductVideoGalleryItem,
} from '@/lib/productGalleryContent'

type ProductVideoGalleryAdminProps = {
  value: ProductVideoGallery
  onChange: (gallery: ProductVideoGallery) => void
  locale?: ProductGalleryLocale
}

export default function ProductVideoGalleryAdmin({
  value,
  onChange,
  locale = 'tr',
}: ProductVideoGalleryAdminProps) {
  const updateVideo = (videoId: string, updates: Partial<ProductVideoGalleryItem>) => {
    onChange({
      ...value,
      videos: value.videos.map((video) => (
        video.id === videoId ? { ...video, ...updates } : video
      )),
    })
  }

  const addVideo = () => {
    onChange({
      ...value,
      videos: [
        ...value.videos,
        {
          id: crypto.randomUUID(),
          title: { [locale]: '' },
          description: { [locale]: '' },
          youtubeUrl: '',
          enabled: true,
          sortOrder: value.videos.length,
        },
      ],
    })
  }

  const normalizeOrder = (videos: ProductVideoGalleryItem[]) =>
    videos.map((video, index) => ({ ...video, sortOrder: index }))

  const removeVideo = (videoId: string) => {
    onChange({
      ...value,
      videos: normalizeOrder(value.videos.filter((video) => video.id !== videoId)),
    })
  }

  const moveVideo = (videoId: string, direction: 'up' | 'down') => {
    const index = value.videos.findIndex((video) => video.id === videoId)
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (index < 0 || targetIndex < 0 || targetIndex >= value.videos.length) return

    const videos = [...value.videos]
    const selectedVideo = videos[index]
    videos[index] = videos[targetIndex]
    videos[targetIndex] = selectedVideo
    onChange({ ...value, videos: normalizeOrder(videos) })
  }

  const setVideoPosition = (videoId: string, requestedIndex: number) => {
    const index = value.videos.findIndex((video) => video.id === videoId)
    if (index < 0 || !Number.isFinite(requestedIndex)) return
    const targetIndex = Math.max(0, Math.min(Math.trunc(requestedIndex), value.videos.length - 1))
    const videos = [...value.videos]
    const [selectedVideo] = videos.splice(index, 1)
    videos.splice(targetIndex, 0, selectedVideo)
    onChange({ ...value, videos: normalizeOrder(videos) })
  }

  return (
    <div className="rounded-lg border border-[#cbb78f] bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Video galerisi</h2>
          <p className="mt-1 text-sm text-[#6f6960]">
            YouTube videoları public sayfada fotoğraf galerisinden ayrı ve bu sırayla gösterilir.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#f1eadf] px-3 py-1 text-xs font-semibold text-[#6b4f1d]">
            Türkçe (tr)
          </span>
          <button
            type="button"
            onClick={addVideo}
            className="rounded-md bg-[#191714] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#2b261f]"
          >
            Yeni video ekle
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-[#3a342c]">
          Video galerisi küçük etiketi
          <input
            value={getLocalizedProductGalleryText(value.eyebrow, locale)}
            onChange={(event) => onChange({
              ...value,
              eyebrow: setLocalizedProductGalleryText(value.eyebrow, locale, event.target.value),
            })}
            className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
          />
        </label>
        <label className="text-sm font-medium text-[#3a342c]">
          Video galerisi ana başlığı
          <input
            value={getLocalizedProductGalleryText(value.title, locale)}
            onChange={(event) => onChange({
              ...value,
              title: setLocalizedProductGalleryText(value.title, locale, event.target.value),
            })}
            className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-4">
        {value.videos.length === 0 && (
          <p className="rounded-md border border-dashed border-[#d8d0c3] bg-[#fbfaf7] px-4 py-6 text-center text-sm text-[#6f6960]">
            Henüz video eklenmedi. Video galerisi public sayfada gösterilmeyecek.
          </p>
        )}

        {value.videos.map((video, index) => {
          const localizedTitle = getLocalizedProductGalleryText(video.title, locale)
          const localizedDescription = getLocalizedProductGalleryText(video.description, locale)
          const youtubeUrlInvalid = Boolean(video.youtubeUrl.trim()) && !getYouTubeVideoId(video.youtubeUrl)

          return (
            <div
              key={video.id}
              data-video-admin-card={video.id}
              className="rounded-md border border-[#e4dccf] bg-[#fbfaf7] p-4"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#3a342c]">Video {index + 1}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#6f6960]">
                    <input
                      type="checkbox"
                      checked={video.enabled}
                      onChange={(event) => updateVideo(video.id, { enabled: event.target.checked })}
                      className="h-4 w-4 rounded border-[#d8d0c3]"
                    />
                    Yayında
                  </label>
                  <button
                    type="button"
                    onClick={() => moveVideo(video.id, 'up')}
                    disabled={index === 0}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#3a342c] transition hover:bg-white disabled:opacity-40"
                  >
                    Yukarı taşı
                  </button>
                  <button
                    type="button"
                    onClick={() => moveVideo(video.id, 'down')}
                    disabled={index === value.videos.length - 1}
                    className="rounded-md border border-[#d8d0c3] px-2 py-1 text-xs font-medium text-[#3a342c] transition hover:bg-white disabled:opacity-40"
                  >
                    Aşağı taşı
                  </button>
                  <button
                    type="button"
                    onClick={() => removeVideo(video.id)}
                    className="rounded-md border border-[#c9beb0] px-2 py-1 text-xs font-medium text-[#7b3f2e] transition hover:bg-[#f8eee8]"
                  >
                    Sil
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-[#3a342c]">
                  Video başlığı
                  <input
                    value={localizedTitle}
                    onChange={(event) => updateVideo(video.id, {
                      title: setLocalizedProductGalleryText(video.title, locale, event.target.value),
                    })}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>
                <label className="text-sm font-medium text-[#3a342c]">
                  Sıralama
                  <input
                    type="number"
                    min={1}
                    max={value.videos.length}
                    value={index + 1}
                    onChange={(event) => setVideoPosition(video.id, Number(event.target.value) - 1)}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>
                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  YouTube URL
                  <input
                    value={video.youtubeUrl}
                    onChange={(event) => updateVideo(video.id, { youtubeUrl: event.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    aria-invalid={youtubeUrlInvalid}
                    aria-describedby={youtubeUrlInvalid ? `${video.id}-youtube-error` : undefined}
                    className={`mt-2 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ${
                      youtubeUrlInvalid
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-[#d8d0c3] focus:border-[#9d7b46]'
                    }`}
                  />
                  {youtubeUrlInvalid && (
                    <span id={`${video.id}-youtube-error`} className="mt-2 block text-xs font-medium text-red-700">
                      Geçerli bir youtube.com, youtu.be veya YouTube Shorts bağlantısı girin. Bu kayıt public sayfada gösterilmez.
                    </span>
                  )}
                </label>
                <label className="text-sm font-medium text-[#3a342c] md:col-span-2">
                  Kısa açıklama (isteğe bağlı)
                  <textarea
                    value={localizedDescription}
                    onChange={(event) => updateVideo(video.id, {
                      description: setLocalizedProductGalleryText(video.description, locale, event.target.value),
                    })}
                    rows={3}
                    className="mt-2 w-full rounded-md border border-[#d8d0c3] bg-white px-3 py-2 text-sm outline-none focus:border-[#9d7b46]"
                  />
                </label>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
