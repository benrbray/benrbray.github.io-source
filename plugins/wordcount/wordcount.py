from pelican import signals

def test(sender):
	print("{} initialized !!".format(sender))

def write_article(sender, content):
	pass;

def register():
	signals.initialized.connect(test)
	signals.article_generator_write_article.connect(write_article);