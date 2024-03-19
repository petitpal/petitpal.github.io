
const config = {
        siteurl: 'https://petitpal.github.io'
}

module.exports.socialShareConfig = config

module.exports = function(eleventyConfig) {

        eleventyConfig.addGlobalData("socialShareConfig", config);

        eleventyConfig.addFilter("shareLink", (shareTarget, title, url) => {
                return shareTarget.url
                        .replace('<title>', encodeURIComponent(title))
                        .replace('<url>', encodeURIComponent(`${config.siteurl}${url}`));
        });

}
