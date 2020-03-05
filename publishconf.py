#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals;

DEVELOP_FLAG = False;

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os;
import sys;
sys.path.append(os.curdir);
from pelicanconf import *;

SITEURL = 'http://benrbray.com';
RELATIVE_URLS = False;


# URL Settings (different from publishconf.py)
ARTICLE_URL = "posts/{date:%Y}/{slug}";
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{slug}.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}.html'

# URL Settings (different from pelicanconf.py)
#ARTICLE_URL = "posts/{date:%Y}/{date:%b}/{date:%d}/{slug}";
#ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}.html';
#PAGE_URL = '{slug}';
#PAGE_SAVE_AS = '{slug}/index.html';

## Plugins ---------------------------------------------------------------------

# Disqus Comments
DISQUS_SITENAME = "benrbray";

# Feeds
FEED_ALL_ATOM = 'feeds/all.atom.xml';
CATEGORY_FEED_ATOM = 'feeds/%s.atom.xml';
