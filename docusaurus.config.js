// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import 'dotenv/config';
import { themes as prismThemes } from 'prism-react-renderer';
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ahalog',
  tagline: '',
  favicon: 'img/favicon.ico',

  url: `https://${process.env.PROJECT_NAME}`,
  baseUrl: '/',
  projectName: process.env.PROJECT_NAME,
  organizationName: process.env.PROJECT_OWNER,
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `https://github.com/${process.env.PROJECT_OWNER}/${process.env.PROJECT_NAME}/tree/main/docs`,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            `https://github.com/${process.env.PROJECT_OWNER}/${process.env.PROJECT_NAME}/tree/main/blog`,
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Ahalog',
        logo: {
          alt: 'Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} ${process.env.PROJECT_OWNER}, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.palenight,
        darkTheme: prismThemes.palenight,
      },
       algolia: {
        appId:  process.env.ALGOLIA_APP_ID,
        apiKey:  process.env.ALGOLIA_API_KEY,
        indexName:  process.env.ALGOLIA_INDEX_NAME,
        contextualSearch: true,
      },
    }),

  customFields: {
    firebaseConfig: {
      appId: process.env.FIREBASE_APP_ID,
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }
  }
};

export default config;
