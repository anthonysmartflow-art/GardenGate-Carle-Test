import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const app = readFileSync(resolve(root, 'src/App.jsx'), 'utf8')
const styles = readFileSync(resolve(root, 'src/styles.css'), 'utf8')

const requiredRoutes = [
  '/',
  '/families',
  '/professional-development',
  '/employment',
  '/support',
  '/contact',
  '/programs',
  '/approach',
  '/about',
  '/about/people',
  '/news',
  '/enrollment',
  '/privacy',
  '/accessibility',
]

for (const route of requiredRoutes) {
  assert(app.includes(`'${route}'`) || app.includes(`"${route}"`), `Missing route: ${route}`)
}

assert(app.includes('https://www.gardengatemv.org/donate'), 'Direct donation URL is missing')
assert(!app.includes('href="/em-portugues"'), 'Em Português must not be linked')
assert(!app.includes("href='/em-portugues'"), 'Em Português must not be linked')
assert(!app.includes('/give'), 'Unsupported Give route found')
assert(!app.includes('Eric Carle'), 'Reference-site identity leaked into the page')
assert(!styles.includes('#f15a24'), 'Reference-like orange token found')

const images = [
  'asset-005-watercolor.jpg',
  'asset-006-painting.jpg',
  'asset-007-clay.jpg',
  'asset-129-meadow.jpg',
  'asset-253-collaboration.jpg',
  'asset-254-observation.jpg',
  'asset-264-place.jpg',
]

for (const image of images) {
  assert(existsSync(resolve(root, 'public/images', image)), `Missing selected image: ${image}`)
}

const imageTags = [...app.matchAll(/<img[\s\S]*?>/g)].map((match) => match[0])
assert(imageTags.length >= images.length, 'Expected selected images are not rendered')
for (const tag of imageTags) {
  assert(/alt="[^"]+"/.test(tag), `Image lacks useful alt text: ${tag.slice(0, 80)}`)
}

console.log('Static prototype checks passed.')
