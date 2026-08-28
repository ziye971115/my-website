import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const distDir = resolve(projectRoot, 'dist')
const indexPath = resolve(distDir, 'index.html')

let html = await readFile(indexPath, 'utf8')

const scriptMatch = html.match(/<script type="module" crossorigin src="\.\/(assets\/index-[^"]+\.js)"><\/script>/)
const styleMatch = html.match(/<link rel="stylesheet" crossorigin href="\.\/(assets\/index-[^"]+\.css)">/)

if (!scriptMatch || !styleMatch) {
  throw new Error('未找到构建后的 JavaScript 或 CSS 文件。请先运行构建。')
}

const [script, style] = await Promise.all([
  readFile(resolve(distDir, scriptMatch[1]), 'utf8'),
  readFile(resolve(distDir, styleMatch[1]), 'utf8'),
])

html = html
  .replace(styleMatch[0], () => `<style>${style}</style>`)
  .replace(scriptMatch[0], () => `<script type="module">${script.replaceAll('</script>', '<\\/script>')}</script>`)

await writeFile(resolve(distDir, 'offline-review.html'), html)
console.log('已生成 dist/offline-review.html')
