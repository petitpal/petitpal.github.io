module.exports = [
    {
        allowed: true,
		name: 'gmail',
        icon: '/img/social-icons.svg#gmail',
        url: 'https://mail.google.com/mail/?view=cm&su=<title>&body=<url>'
    },
	{
        allowed: true,
        name: 'facebook',
        icon: '/img/social-icons.svg#facebook',
        url: 'http://www.facebook.com/sharer.php?u=<url>'
    },
    {
        allowed: true,
        name: 'linkedin',
        icon: '/img/social-icons.svg#linkedin',
        url: 'https://www.linkedin.com/sharing/share-offsite/?url=<url>'
    },
    {
        allowed: true,
        name: 'mastodon',
        icon: '/img/social-icons.svg#mastodon',
        url: 'https://mastodonshare.com/?url=<url>&text=<title>'
    }
]
