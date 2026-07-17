import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import profile from '../content/data/profile.json';

export async function GET(context) {
  const posts = await getCollection('blog');
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: `${profile.name} — blog`,
    description: 'Blog Ondřeje Burdy — AI agenti a backendová praxe, ale i esport a komentování. Někdy technika, někdy příběh, vždycky z první ruky.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      categories: [post.data.category],
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>cs</language>',
  });
}
