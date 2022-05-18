import { markdownIt } from 'https://deno.land/x/lume@v1.8.0/deps/markdown_it.ts'
import { html as html_ } from 'https://deno.land/x/html@v1.2.0/mod.ts'
import { parseFeed } from 'https://deno.land/x/rss@0.5.5/mod.ts'
import { slug } from 'https://deno.land/x/slug@v0.1.1/mod.ts'
import {
  normalize,
  relative,
  normalizeGlob,
  globToRegExp,
} from 'https://deno.land/std@0.139.0/path/mod.ts'

const markdownItEngine = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

export const md = (content) =>
  markdownItEngine.renderInline(content ?? '').trim()

export const html = (content, ...params) =>
  html_`${content
    .map(
      (token, i) =>
        token +
        ((Array.isArray(params[i]) ? params[i].join('\n') : params[i]) ?? ''),
    )
    .join('')}`

export const fetchFeed = async (url) => {
  const response = await fetch(url)
  const xml = await response.text()
  return await parseFeed(xml)
}

export const slugify = slug

export const listRecursive = (path) => {
  const path_ = normalize(path.replace(/\\$/, ''))
  const entries = []
  for (const entry of Deno.readDirSync(path_)) {
    const entryPath = `${path_}/${entry.name}`
    entries.push(entryPath)
    if (entry.isDirectory) {
      entries.push(...listRecursive(entryPath))
    }
  }
  return entries
}

export const globSearch = (path, pattern) =>
  listRecursive(path)
    .map((entry) => relative(path, entry))
    .filter((entry) => entry.match(globToRegExp(normalizeGlob(pattern))))
