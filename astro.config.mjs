import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { READY } from './src/i18n/locales.ts';

export default defineConfig({
  site: 'https://s4gs.org',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (u) => !u.includes('/merci/') && !u.includes('/privacy/') && !u.includes('/prizes/') && !u.includes('/cookies/') && !u.includes('/football-cup/') && !u.includes('/parents/'),
      i18n: { defaultLocale: 'en', locales: Object.fromEntries(READY.map((l) => [l.code, l.code])) },
    }),
  ],
});
