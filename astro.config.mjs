import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { READY } from './src/i18n/locales.ts';
import { SITE } from './src/config/site.ts';

// Pages non publiques : brouillons, pages de formulaire et rubriques encore en exemple
const hidden = ['/merci/', '/privacy/', '/prizes/', '/cookies/', '/football-cup/', '/parents/', '/admin/', ...Object.entries(SITE.sections).filter(([k, v]) => !v && k !== 'stats').map(([k]) => `/${k}/`)];

export default defineConfig({
  site: 'https://s4gs.org',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (u) => !hidden.some((h) => u.includes(h)),
      i18n: { defaultLocale: 'en', locales: Object.fromEntries(READY.map((l) => [l.code, l.code])) },
    }),
  ],
});
