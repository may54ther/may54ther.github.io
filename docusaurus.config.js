import "dotenv/config";
import { themes as prismThemes } from "prism-react-renderer";

const config = {
	title: "Ahalog",
	tagline: "",
	favicon: "img/favicon.ico",
	url: `https://${process.env.PROJECT_NAME}`,
	baseUrl: "/",

	organizationName: process.env.PROJECT_OWNER,
	projectName: process.env.PROJECT_NAME,
	trailingSlash: false,

	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",

	i18n: {
		defaultLocale: "ko",
		locales: ["ko"],
	},

	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			{
				docs: {
					path: "topics",
					routeBasePath: "/topics",
					sidebarPath: "./sidebars.js",
					editUrl: `https://github.com/${process.env.PROJECT_OWNER}/${process.env.PROJECT_NAME}`,
				},
				blog: {
					path: "posts",
					routeBasePath: "/posts",
					blogSidebarTitle: "All posts",
					blogSidebarCount: "ALL",
					postsPerPage: "ALL",
					showReadingTime: true,
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			},
		],
	],

	themeConfig: {
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		metadata: [
			{
				name: "algolia-site-verification",
				content: "735DCF2730EE4F05",
			},
		],
		navbar: {
			title: "Ahalog",
			items: [
				{
					type: "docSidebar",
					sidebarId: "docsSidebar",
					to: "/topics",
					label: "Topics",
					position: "right",
				},
				{
					to: "/posts",
					label: "Posts",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			links: [],
			copyright: `Copyright © ${new Date().getFullYear()} ${
				process.env.PROJECT_OWNER
			}, Inc. Built with Docusaurus.`,
		},
		sitemap: {
			priority: 0.5,
			ignorePatterns: ["/tags/**"],
			filename: "sitemap.xml",
			createSitemapItems: async (params) => {
				const { defaultCreateSitemapItems, ...rest } = params;
				const items = await defaultCreateSitemapItems(rest);
				return items.filter((item) => !item.url.includes("/page/"));
			},
		},
		algolia: {
			appId: process.env.ALGOLIA_APP_ID,
			apiKey: process.env.ALGOLIA_API_KEY,
			indexName: process.env.ALGOLIA_INDEX_NAME,
			contextualSearch: true,
		},
		prism: {
			theme: prismThemes.palenight,
			darkTheme: prismThemes.palenight,
		},
	},
};

export default config;
