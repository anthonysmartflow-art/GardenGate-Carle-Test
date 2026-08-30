import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const app = readFileSync(resolve(root, 'src/App.jsx'), 'utf8')
const styles = readFileSync(resolve(root, 'src/styles.css'), 'utf8')
const html = readFileSync(resolve(root, 'index.html'), 'utf8')

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
assert(!app.includes('Eric Carle'), 'Reference-site identity leaked into the rendered page')
assert(!app.includes('Studio Margin'), 'Obsolete V1 Studio Margin Notes remain in the page')

for (const color of ['#539edf', '#1470af', '#ffffff', '#000000', '#eaeaee']) {
  assert(styles.toLowerCase().includes(color), `Missing locked palette color: ${color}`)
}

assert(html.includes('name="theme-color" content="#539EDF"'), 'HTML theme color must use Garden Gate blue')
assert(!html.includes('rel="icon"'), 'No logo-like favicon should be invented for this prototype')

for (const forbidden of ['#f15a24', '#9d3152', '#49634d', '#f7f7f2', '#17231f']) {
  assert(!`${styles}\n${html}`.toLowerCase().includes(forbidden), `Forbidden V1/reference color found: ${forbidden}`)
}

const images = [
  'asset-003-outdoor.jpg',
  'asset-005-watercolor.jpg',
  'asset-006-painting.jpg',
  'asset-007-clay.jpg',
  'asset-009-place.jpg',
  'asset-129-meadow.jpg',
  'asset-149-paint.jpg',
  'asset-165-investigation.jpg',
  'asset-201-construction.jpg',
  'asset-203-translucent.jpg',
  'asset-235-group-making.jpg',
  'asset-237-clay-collaboration.jpg',
  'asset-253-collaboration.jpg',
  'asset-254-observation.jpg',
  'asset-264-place.jpg',
]

for (const image of images) {
  assert(existsSync(resolve(root, 'public/images', image)), `Missing selected image: ${image}`)
  assert(app.includes(`/images/${image}`), `Selected image is not rendered: ${image}`)
}

const imageTags = [...app.matchAll(/<img[\s\S]*?>/g)].map((match) => match[0])
assert.equal(imageTags.length, 7, 'Unexpected number of JSX image renderers')
for (const tag of imageTags) {
  assert(
    /alt=(?:"[^"]+"|\{(?:practice|program|material)\.alt\})/.test(tag),
    `Image lacks purpose-based alt text: ${tag.slice(0, 80)}`,
  )
}

const dataDrivenAlts = [...app.matchAll(/\balt:\s*'[^']+'/g)]
assert.equal(dataDrivenAlts.length, 11, 'Every data-driven image needs purpose-based alt text')

for (const requiredLabel of [
  'Explore Programs',
  'See Our Approach',
  'Begin Enrollment',
  'Why Support Matters',
  'Donate',
]) {
  assert(app.includes(requiredLabel), `Missing required action label: ${requiredLabel}`)
}

console.log('Static V2 prototype checks passed.')
