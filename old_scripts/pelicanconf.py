#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals;
import datetime;

# No Cache
LOAD_CONTENT_CACHE = False;

# Site Information
SITENAME = 'Benjamin R. Bray';
SITEURL = '';
AUTHOR = 'Benjamin R. Bray';
TIMEZONE = 'America/Detroit';
DEFAULT_LANG = 'en';

# Basic Settings
PATH = 'content';
THEME = "./theme";
DEFAULT_PAGINATION = False;
DEFAULT_DATE_FORMAT = "%a, %d %b %Y";

# Custom Settings (custom variables defined by me, to be passed to templates)
SITE_LAST_MODIFIED = datetime.datetime.now();

## Pages, Paths, and URLs ------------------------------------------------------

# Articles
ARTICLE_PATHS = ['articles', 'projects'];

# Static Paths:  Simple static pages, with custom URLS
STATIC_PATHS = ['images', 'static', 'static/resume.pdf'];
EXTRA_PATH_METADATA = {
    'static/favicon.ico': {'path': 'favicon.ico'},
    'static/CNAME'      : {'path': 'CNAME'},
	'static/resume.pdf' : {'path': 'resume.pdf'}
};

# Template Pages:  Static Pages, Rendered as Jinja2 Templates
TEMPLATE_PAGES = {
	'static/resume.html' : 'resume.html'
}

# URL Settings (different from publishconf.py)
ARTICLE_URL = "posts/{date:%Y}/{date:%b}/{date:%d}/{slug}.html";
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}.html'
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'

## Content Generation ----------------------------------------------------------

# Delete output directory when regenerating, but save Git repositories.
DELETE_OUTPUT_DIRECTORY = True
OUTPUT_RETENTION = [".git", ".gitignore", ".git/*"]

## External Links / Plugins ----------------------------------------------------

# Plugins
PLUGIN_PATHS = ['plugins'];
PLUGINS = ["render_math"];

# Plugin:  render_math
# Even though I use KaTeX for equation rendering, the render_math
# plugin is needed so that Pelican doesn't interpret asterisks in
# equations as emphasis markers.
# (see https://github.com/getpelican/pelican-plugins/tree/master/render_math)
MATH_JAX = {
    "auto_insert" : False
}

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),);

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),);

# Feeds (disabled while developing)
FEED_ALL_ATOM = None;
CATEGORY_FEED_ATOM = None;
TRANSLATION_FEED_ATOM = None;
AUTHOR_FEED_ATOM = None;
AUTHOR_FEED_RSS = None;

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
