
## Refs:
https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll
https://jekyllrb.com/
https://github.com/jekyll/minima
https://pages.github.com/themes/

## Basic intro
https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll

## Set-up publishing options
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Dev notes

**Package manager**
```bash
bundler
```

**Test locally**
```bash
bundle exec jekyll serve
```

**Gemfile**
Needed to update plugins to include csv and webrick, as follows
```yaml
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem 'csv', '~> 3.0'
  gem 'webrick', '~> 1.8', '>= 1.8.1'
end
```

See:
- [CSV](https://rubygems.org/gems/csv/versions/3.0.0?locale=en)
- [webrick](https://rubygems.org/gems/webrick)
