import lume from 'https://deno.land/x/lume@v1.8.0/mod.ts'
import { globSearch } from './src/util.js'

// Config
const config = {
  src: './src',
  dest: './dist',
}
const plugins = {
  markdown: {
    html: true,
    linkify: true,
    typographer: true,
  },
}
const site = lume(config, plugins)

// Static files
globSearch(config.src, `./**/favicon.*`).forEach((entry) => site.copy(entry))

export default site
