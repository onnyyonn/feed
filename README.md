# onnyyonn//feed

Feed is my personal link-sharing site built using [Deno](https://deno.land/) and [Lume](https://lume.land/). It converts an RSS/Atom feed to a minimal static site.

- Visit https://onnyyonn.github.io/feed to read the feed.
- Add https://onnyyonn.github.io/feed/feed.xml to your feed reader.

## Develop

1. [Install Deno](https://deno.land/manual/getting_started/installation).
2. Run `deno task build` to generate the site, or `deno task dev` for a live local preview
3. Customize the page generation at [`src/index.tmpl.js`](src/index.tmpl.js), should be somewhat self-explanatory

## Deploy

A [GitHub Action](.github/workflows/generate-site.yaml) builds the site and deploys to [GH-Pages](https://5310.github.io/onifeed-lume/).

However, the site content currently needs to be updated manually.
