// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
            // Each item here is one entry in the navigation menu.
            { label: '스터디 소개', slug: 'guides/about' },
          ],
        },
        {
          label: '스터디 회차',
          items: [{ autogenerate: { directory: 'sessions', collapsed: true } }],
        },
      ],
      lastUpdated: false,
    }),
  ],
});
