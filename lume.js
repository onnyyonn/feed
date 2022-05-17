import lume from 'https://deno.land/x/lume@v1.8.0/mod.ts'

// Markdown plugin configuration
const markdown = {
  html: true,
  linkify: true,
  typographer: true,
}

const site = lume(
  {
    src: './src',
    dest: './dist',
  },
  { markdown },
)

//TODO: It seems Lume doens't do glob based static files, which is absolutely deplorable. Work around this later
site.copy('favicon.png')
site.copy('favicon.svg')

export default site
