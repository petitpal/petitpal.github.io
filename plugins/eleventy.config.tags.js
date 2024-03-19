module.exports = function(eleventyConfig) {      

	eleventyConfig.addFilter("countPostsForTag", (posts, tag) => {
			return posts.filter(post => {
					if (post.data.draft) return false
					return (post.data.tags.includes(tag))
			}).length;
	});
       
	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", (collection) => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", (tags) => {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});
}
