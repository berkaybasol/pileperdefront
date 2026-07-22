export const CMS_SAVE_VERIFICATION_ERROR = 'Kayıt doğrulanamadı. CMS’deki gerçek değer, kaydetmek istediğiniz değerle eşleşmiyor.'
export const PUBLIC_SAVE_VERIFICATION_ERROR = 'CMS kaydı doğrulandı ancak public çıktı CMS’deki gerçek değerle eşleşmiyor.'

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
}

export const runVerifiedSave = async <TCms, TPublic = never>({
  write,
  readBack,
  cmsMatches,
  onCmsRead,
  revalidate,
  readPublic,
  publicMatches,
  onPublicRead,
}: VerifiedSaveOptions<TCms, TPublic>) => {
  await write()

  const cmsValue = await readBack()
  await onCmsRead?.(cmsValue)
  if (!cmsMatches(cmsValue)) {
    throw new SaveVerificationError(CMS_SAVE_VERIFICATION_ERROR, 'cms', cmsValue)
  }

  await revalidate?.()

  if (readPublic && publicMatches) {
    const publicValue = await readPublic()
    await onPublicRead?.(publicValue)
    if (!publicMatches(publicValue, cmsValue)) {
      throw new SaveVerificationError(PUBLIC_SAVE_VERIFICATION_ERROR, 'public', publicValue)
    }
    return { cmsValue, publicValue }
  }

  return { cmsValue, publicValue: undefined }
}
