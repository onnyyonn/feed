
import { html, md, fetchFeed, slugify } from './util.js'

const article = (entry) => {
  const title = entry.title.value
  const slug = slugify(title)
  const link = entry.links[0].href
  const timestamp = entry.updated
  const summary = entry.content.value

  return html`
    <entry>
        <title>${title}</title>
    	<link href="${link}"/>
    	<updated>${timestamp.toISOString()}</updated>
    	<id>${slug}</id>
    	<content type="html"><![CDATA[${md(entry.content.value)}]]></content>
    </entry>
  `
}

export default async function (_) {
  const feed = await fetchFeed(
    'https://rss.0n1.one/public.php?op=rss&id=-2&view-mode=all_articles&key=44ssqy5f0c7a59a8e12',
  )

  return html`<?xml version="1.0" encoding="utf-8"?>
      
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>onnyyonn//feed</title>
    <link href="https://onnyyonn.github.io/feed" rel="self"/>
    ${feed.entries.map(article).join('\n')}
</feed>`
}
