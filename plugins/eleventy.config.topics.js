
const config = {
        showEmptyTopics: false,

        // supports: displayOrder or title
        topicSortOrder: 'displayOrder',
};

module.exports.eleventyTopicsConfig = config

module.exports = eleventyConfig => {

        
        eleventyConfig.addGlobalData("eleventyTopicsConfig", config);

        eleventyConfig.addFilter("filterPostsByTopic", function filterPostsByTopic(posts, topic) {
                return posts.filter(post => {
                        if (post.data.draft) return false;
                        const requestedTopic = topic.toLowerCase();
                        let postTopic = (post.data.topic||'').toLowerCase();
                        return postTopic == requestedTopic || (postTopic=='' && requestedTopic=='unclassified' );
                });
        });

        eleventyConfig.addFilter("orderedTopicKeys", function orderedTopicKeys(items) {
                switch (config.topicSortOrder) {
                        case 'title': return topicKeysByName(items);
                        case 'displayOrder': return topicKeysByDisplayOrder(items);
                        default: return [];
                }
        })
        

        // sorts topicdata by display order and returns an array of topic keys
        function topicKeysByDisplayOrder(items) {
                const orderedTopics = [];
                for (const key in items) {
                        orderedTopics.push({ topic: key, displayOrder: items[key]?.displayOrder })
                };
                const topics = orderedTopics.sort((a, b) => {
                        if (a.displayOrder < b.displayOrder) return -1;
                        if (a.displayOrder > b.displayOrder) return 1;
                        return 0;
                });
                return topics.map(t => t.topic);
        };

        // sorts topicdata by title and returns an array of topic keys
        function topicKeysByName(items) {
                const orderedTopics = [];
                for (const key in items) {
                        orderedTopics.push({ topic: key, title: items[key]?.title })
                };
                const topics = orderedTopics.sort((a, b) => {
                        if (a.title < b.title) return -1;
                        if (a.title > b.title) return 1;
                        return 0;
                });
                return topics.map(t => t.topic);
        };

        eleventyConfig.addFilter("groupPostsByTopic", function groupPostsByTopic(posts) {
                const topics = new Map();
                posts.forEach(post => {
                        if (post.data.draft) return;
                        const topic = post.data?.topic || 'unclassified';
                        if (topics.has(topic)) {
                                topics.get(topic).push(post);
                        } else {
                                topics.set(topic, [post]);
                        }
                });
                return topics;
        })

        eleventyConfig.addFilter("getMostRecentPost", function getMostRecentPost(posts) {
                const sortedPosts = posts?.sort((a, b) => {
                        if (a.date < b.date) return 1;
                        if (a.date > b.date) return -1;
                        return 0;
                });
                return sortedPosts?.length > 0 ? sortedPosts[0] : null;
        })
}
