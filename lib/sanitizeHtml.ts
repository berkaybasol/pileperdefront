const VOID_TAGS = new Set(['br', 'img'])

const ALLOWED_TAGS = new Set([
  'a',
  'blockquote',
  'br',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'i',
  'img',
  'li',
  'ol',
  'p',
  'span',
  'strong',
  'ul',
])

const ALLOWED_CLASSES = new Set([
  'border-blue-500',
  'border-l-4',
  'font-bold',
  'font-semibold',
  'hover:text-blue-300',
  'italic',
  'leading-relaxed',
  'list-decimal',
  'list-disc',
  'list-inside',
  'mb-1',
  'mb-3',
  'mb-4',
  'mb-5',
  'mb-6',
  'mb-8',
  'ml-4',
  'mt-5',
  'mt-6',
  'mt-8',
  'mt-10',
  'my-8',
  'pl-6',
  'space-y-2',
  'text-2xl',
  'text-3xl',
  'text-base',
  'text-blue-400',
  'text-gray-300',
  'text-gray-400',
  'text-lg',
  'text-white',
  'text-xl',
  'transition-colors',
  'underline',
])

const DANGEROUS_BLOCK_RE = /<\s*(script|style|iframe|object|embed|svg|math)[\s\S]*?<\s*\/\s*\1\s*>/gi
const TAG_RE = /<\/?([a-zA-Z][a-zA-Z0-9-]*)([^>]*)>/g
const ATTR_RE = /([a-zA-Z_:][a-zA-Z0-9_:.-]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g

export function sanitizeHtml(html: string): string {
  return html
    .replace(DANGEROUS_BLOCK_RE, '')
    .replace(TAG_RE, (fullTag, rawTagName: string, rawAttributes: string) => {
      const tagName = rawTagName.toLowerCase()
      if (!ALLOWED_TAGS.has(tagName)) {
        return ''
      }

      const isClosingTag = fullTag.startsWith('</')
      if (isClosingTag) {
        return VOID_TAGS.has(tagName) ? '' : `</${tagName}>`
      }

      const attributes = sanitizeAttributes(tagName, rawAttributes)
      const suffix = VOID_TAGS.has(tagName) ? ' />' : '>'
      return `<${tagName}${attributes}${suffix}`
    })
}

function sanitizeAttributes(tagName: string, rawAttributes: string): string {
  const attributes: string[] = []
  let match: RegExpExecArray | null

  while ((match = ATTR_RE.exec(rawAttributes)) !== null) {
    const name = match[1].toLowerCase()
    const value = match[3] ?? match[4] ?? match[5] ?? ''

    if (name.startsWith('on') || name === 'style') {
      continue
    }

    if (name === 'class') {
      const classes = sanitizeClasses(value)
      if (classes) {
        attributes.push(`class="${escapeAttribute(classes)}"`)
      }
      continue
    }

    if (tagName === 'a' && name === 'href' && isSafeHref(value)) {
      attributes.push(`href="${escapeAttribute(value)}"`)
      continue
    }

    if (tagName === 'a' && (name === 'target' || name === 'rel')) {
      continue
    }

    if (tagName === 'img' && name === 'src' && isSafeImageSrc(value)) {
      attributes.push(`src="${escapeAttribute(value)}"`)
      continue
    }

    if (tagName === 'img' && name === 'alt') {
      attributes.push(`alt="${escapeAttribute(value)}"`)
    }
  }

  if (tagName === 'a') {
    attributes.push('rel="noopener noreferrer"')
  }

  return attributes.length > 0 ? ` ${attributes.join(' ')}` : ''
}

function sanitizeClasses(value: string): string {
  return value
    .split(/\s+/)
    .filter((className) => ALLOWED_CLASSES.has(className))
    .join(' ')
}

function isSafeHref(value: string): boolean {
  const trimmed = value.trim().toLowerCase()
  return trimmed.startsWith('/') || trimmed.startsWith('https://') || trimmed.startsWith('http://')
}

function isSafeImageSrc(value: string): boolean {
  const trimmed = value.trim()
  return trimmed.startsWith('/api/public/media/images/') || trimmed.startsWith('/_next/image')
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
