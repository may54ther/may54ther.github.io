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
  title: 'aha.devlog',
  // tagline: 'devlog',
  favicon: 'img/favicon.ico',

  url: `https://${process.env.REACT_APP_PROJECT_NAME}`,
  baseUrl: '/',
  projectName: process.env.REACT_APP_PROJECT_NAME,
  organizationName: process.env.REACT_APP_PROJECT_OWNER,
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
          editUrl: `https://github.com/${process.env.REACT_APP_PROJECT_OWNER}/${process.env.REACT_APP_PROJECT_NAME}/tree/main/docs`,
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
            `https://github.com/${process.env.REACT_APP_PROJECT_OWNER}/${process.env.REACT_APP_PROJECT_NAME}/tree/main/blog`,
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
        title: 'aha.devlog',
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
        copyright: `Copyright © ${new Date().getFullYear()} ${process.env.REACT_APP_PROJECT_OWNER}, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.palenight,
        darkTheme: prismThemes.palenight,
      },
       algolia: {
        appId:  process.env.REACT_APP_ALGOLIA_APP_ID,
        apiKey:  process.env.REACT_APP_ALGOLIA_API_KEY,
        indexName:  process.env.REACT_APP_PROJECT_NAME,
        contextualSearch: true,
      },
    }),

  customFields: {
    firebaseConfig: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    }
  }
};

export default config;
