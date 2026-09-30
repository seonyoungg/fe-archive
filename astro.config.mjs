// @ts-check
import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const sessionDirectories = readdirSync(new URL('./src/content/docs/sessions/', import.meta.url), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name))
  .map((entry) => entry.name)
  .sort((a, b) => Number(b) - Number(a));

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'FE Study Archive',
      // social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: '시작하기',
          items: [
            { label: 'Archive 이해하기', slug: 'guides' },
            { label: '스터디 소개', slug: 'guides/about' },
          ],
        },
        { label: '발표 목록', link: '/archive/' },
        {
          label: '스터디 회차',
          items: sessionDirectories.map((session) => ({
            label: session,
            collapsed: true,
            items: [{ autogenerate: { directory: `sessions/${session}` } }],
          })),
        },
      ],
      lastUpdated: true,
      components: {
        TwoColumnContent: './src/components/PresentationTwoColumnContent.astro',
        Footer: './src/components/PresentationFooter.astro',
      },
    }),
  ],
});
