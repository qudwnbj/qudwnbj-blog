/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism as any)
    .process(markdown);
  return result.toString();
}

export default markdownToHtml;
