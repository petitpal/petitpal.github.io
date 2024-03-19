const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const pluginDrafts = require("./plugins/eleventy.config.drafts.js");
const pluginImages = require("./plugins/eleventy.config.images.js");
const pluginTopics = require("./plugins/eleventy.config.topics.js");
const pluginTags = require("./plugins/eleventy.config.tags.js");
const pluginSocialShare = require("./plugins/eleventy.config.socialshare.js");
const pluginFilters = require("./plugins/filters.js");
const cleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./src/public/img": "/img",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("src/content/**/*.{svg,webp,png,jpeg}");
	eleventyConfig.addWatchTarget("src/public/**/*.css");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginTopics);
	eleventyConfig.addPlugin(pluginTags);
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(pluginSocialShare);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, { preAttributes: { tabindex: 0 } });
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	

	// css minifying (see: https://www.11ty.dev/docs/quicktips/inline-css/)
	eleventyConfig.addFilter("cssmin", function(code) {
		return new cleanCSS({}).minify(code).styles;
	})

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		dir: {
			input: "src/content",
			includes: "../_includes",
			data: "../_data",
			output: "_site"
		},

		pathPrefix: "/",
	};
};
