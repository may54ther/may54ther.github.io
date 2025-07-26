import * as CONFIG from './src/constants/config.js';

const config = {
	projectName: CONFIG.PROJECT_NAME,
	organizationName: CONFIG.AUTHOR_NAME,

	title: CONFIG.TITLE,
	tagline: CONFIG.TAG_LINE,
	favicon: CONFIG.FAVICON,

	url: CONFIG.URL,
	baseUrl: CONFIG.BASE_URL,
	trailingSlash: false,

	i18n: {
		defaultLocale: "ko",
		locales: ["ko"],
	},

	presets: [
		[
			"classic",
			{
				theme: {
					customCss: ["./src/css/custom.css"],
				},
				docs: {
					routeBasePath: "docs",
					sidebarPath: "./sidebars.js",
					editUrl: CONFIG.EDIT_URL,
				},
				blog: {
					path: "posts",
					routeBasePath: "posts",
					showReadingTime: true,
					blogSidebarTitle: "All posts",
					blogSidebarCount: "ALL",
					postsPerPage: "ALL",
					feedOptions: {
						type: ["rss", "atom"],
						xslt: true,
					},
					editUrl: CONFIG.EDIT_URL,
					onUntruncatedBlogPosts: "ignore",
				},
				pages: {},
				sitemap: {
					lastmod: "date",
					changefreq: "daily",
					priority: 0.5,
					ignorePatterns: ["/tags/**"],
					filename: "sitemap.xml",
				},
				gtag: {
					trackingID: CONFIG.GTAG_TRACING_ID,
					anonymizeIP: CONFIG.GTAG_ANONYMIZE_IP
				}
			},
		],
	],

	themeConfig: {
		algolia: {
			appId: CONFIG.ALGOLIA_APP_ID,
			apiKey: CONFIG.ALGOLIA_API_KEY,
			indexName: CONFIG.ALGOLIA_INDEX_NAME,
			contextualSearch: CONFIG.ALGOLIA_CONTEXTUAL_SEARCH,
		},
		prism: {
			additionalLanguages: CONFIG.PRISM_ADDITIONAL_LANGUAGES
		},
		metadata: [
			{
				name: CONFIG.ALGOLIA_SITE_VERIFICATION_NAME,
				content: CONFIG.ALGOLIA_SITE_VERIFICATION_CONTENT
			},
			{
				name: CONFIG.GOOGLE_SITE_VERIFICATION_NAME,
				content: CONFIG.GOOGLE_SITE_VERIFICATION_CONTENT
			},
		],
		navbar: {
			title: CONFIG.TITLE,
			hideOnScroll: true,
			items: [
				{
					to: "/docs",
					label: "Docs",
					position: "right",
					type: "docSidebar",
					sidebarId: "docsSidebar",
				},
				{
					to: "/posts",
					label: "Archive",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			links: [],
			copyright: CONFIG.COPYRIGHT,
		},

	},
};

export default config