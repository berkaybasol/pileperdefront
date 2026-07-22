export const CMS_SAVE_VERIFICATION_ERROR = 'Kayıt doğrulanamadı. CMS’deki gerçek değer, kaydetmek istediğiniz değerle eşleşmiyor.'
export const PUBLIC_SAVE_VERIFICATION_ERROR = 'CMS kaydı doğrulandı ancak public çıktı henüz CMS’deki gerçek değerle eşleşmiyor.'

export class SaveVerificationError<T> extends Error {
  readonly phase: 'cms' | 'public'
  readonly actual: T

  constructor(message: string, phase: 'cms' | 'public', actual: T) {
    super(message)
    this.name = 'SaveVerificationError'
    this.phase = phase
    this.actual = actual
  }
}

type VerifiedSaveOptions<TCms, TPublic = never> = {
  write: () => Promise<void>
  readBack: () => Promise<TCms>
  cmsMatches: (actual: TCms) => boolean
  onCmsRead?: (actual: TCms) => void | Promise<void>
  revalidate?: () => Promise<unknown>
  readPublic?: () => Promise<TPublic>
  publicMatches?: (actual: TPublic, cms: TCms) => boolean
  onPublicRead?: (actual: TPublic) => void | Promise<void>
  publicReadAttempts?: number
  publicReadDelayMs?: number
  publicMismatchIsError?: boolean
}

const wait = (delayMs: number) => new Promise((resolve) => setTimeout(resolve, delayMs))

export const runVerifiedSave = async <TCms, TPublic = never>({
  write,
  readBack,
  cmsMatches,
  onCmsRead,
  revalidate,
  readPublic,
  publicMatches,
  onPublicRead,
  publicReadAttempts = 3,
  publicReadDelayMs = 750,
  publicMismatchIsError = true,
}: VerifiedSaveOptions<TCms, TPublic>) => {
  await write()

  const cmsValue = await readBack()
  await onCmsRead?.(cmsValue)
  if (!cmsMatches(cmsValue)) {
    throw new SaveVerificationError(CMS_SAVE_VERIFICATION_ERROR, 'cms', cmsValue)
  }

  await revalidate?.()

  if (readPublic && publicMatches) {
    const attempts = Math.max(1, publicReadAttempts)
    let publicValue: TPublic | undefined
    let publicVerified = false
    let publicReadError: unknown

    for (let attempt = 0; !publicVerified && attempt < attempts; attempt += 1) {
      if (attempt > 0) await wait(publicReadDelayMs)
      try {
        publicValue = await readPublic()
        publicReadError = undefined
        publicVerified = publicMatches(publicValue, cmsValue)
      } catch (error) {
        publicReadError = error
      }
    }

    if (publicValue !== undefined) await onPublicRead?.(publicValue)
    if (!publicVerified && publicMismatchIsError) {
      if (publicReadError instanceof Error) throw publicReadError
      throw new SaveVerificationError(PUBLIC_SAVE_VERIFICATION_ERROR, 'public', publicValue)
    }
    return { cmsValue, publicValue, publicVerified, publicReadError }
  }

  return { cmsValue, publicValue: undefined, publicVerified: undefined, publicReadError: undefined }
}
