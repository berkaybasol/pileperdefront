import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const standaloneDir = join('.next', 'standalone')

if (!existsSync(standaloneDir)) {
  process.exit(0)
}

mkdirSync(join(standaloneDir, '.next'), { recursive: true })

cpSync('public', join(standaloneDir, 'public'), { recursive: true })
cpSync(join('.next', 'static'), join(standaloneDir, '.next', 'static'), { recursive: true })
