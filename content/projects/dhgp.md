title:  Digital Humanities &amp; German&nbsp;Periodicals
date: December 1, 2016
tags:  nlp, topic-models, machine-learning
thumb_url: images/thumbnails/deutsche-rundschau_thumb.png
banner_url: images/thumbnails/deutsche-rundschau_long.png
banner_comment: Image: <a href="https://twitter.com/FontaneArchiv/status/999271012591177728">@FontaneArchiv</a>
Summary: As an undergraduate research assistant, I spent three years as the primary developer for an NLP-driven web application built to assist a humanities professor with his research on 19th-century German literature.  The application allowed him to run statistical topic models (LDA, HDP, dynamic topic models, etc.) on a large corpus of text, and displayed helpful visualizations of the results.  The application was built using Python / Flask / Bootstrap and also supported toponym detection and full-text search.  

# Overview

As an undergraduate research assistant, I spent three years as the primary developer for an NLP-driven web application built to assist a humanities professor ([Dr. Peter McIsaac](https://lsa.umich.edu/german/people/faculty/pmcisaac.html), University of Michigan) with his research on 19th-century German literature.  The application allowed him to run statistical topic models ([LDA](http://jmlr.org/papers/volume3/blei03a/blei03a.pdf), [HDP](http://proceedings.mlr.press/v15/wang11a/wang11a.pdf), [DTM](https://mimno.infosci.cornell.edu/info6150/readings/dynamic_topic_models.pdf), etc.) on a large corpus of text and displayed helpful visualizations of the results.  The application was built using **Python** / **Flask** / **Bootstrap** and also supported toponym detection and full-text search.  

I was also responsible for preprocessing.  Initially, we only had access to digital scans of books printed in a difficult-to-read blackletter font.  I was responsible for converting these images to text with OCR.  The OCR results were extremely noisy, so I developed a custom OCR-correction scheme based on word fragments to correct as many mistakes as possible and highlight any ambiguities.

Using the application I built, my supervisor was able to effectively detect cultural and historical trends in a large corpus of previously unstudied documents, leading to a number of publications in humanities journals and conferences, including [[McIsaac 2014]](http://www.jstor.org/stable/10.7722/j.ctt5vj848.11).

# Data Characteristics & Preprocessing

Our analysis focused on a corpus of widely-circulated periodicals, published in Germany during the 19th-century around the time of the administrative [unification](https://en.wikipedia.org/wiki/Unification_of_Germany) of Germany in 1871.  Through [HathiTrust](https://www.hathitrust.org/) and partnerships with university libraries, we obtained digital scans of the following periodicals:

* *Deutsche Rundschau* (1874-1964)
* *Westermann's Illustrirte Monatshefte* (1856-1987)
* *Die Gartenlaube* (1853-1944)

These periodicals, published weekly or monthly, were among Germany's most widely-read print material in the latter half of the nineteenth century, and served as precursors to the modern magazine.  Scholars have long recognized the cultural significance of these publications (c.f. [[Belgum 2002]](https://books.google.com/books?hl=en&lr=&id=yGHo-Alkp84C&oi=fnd&pg=PR9&dq=belgum+2002+popularizing+the+nation+Audience,+Representation,+and+the+Production+of+Identity+in+Die+Gartenlaube&ots=VFwEvxdUUS&sig=kF6W0ktdb6BOcD1TY7Rdwtf_tsc#v=onepage&q&f=false)), but their enormous volume had so far precluded comprehensive study.

Using statistical methods, including [topic models](http://journalofdigitalhumanities.org/2-1/topic-modeling-a-basic-introduction-by-megan-r-brett/), we aimed to study the development of a German national identity following the 1848 revolutions, through the 1871 unification, and leading up to the world wars of the twentieth century.  This approach is commonly referred to as **digital humanities** or **distant reading** (in contrast to [close reading](https://en.wikipedia.org/wiki/Close_reading)).

## Digital Scans

The digital scans we had access to possessed a number of characteristics that introduced errors into the OCR process:

* Aging source material
* Orthographic differences from modern German, including ligatures and the [long s](https://en.wikipedia.org/wiki/Long_s)
* Poor image quality (speckles, erosion)
* Blackletter fonts which are difficult to read, even for humans, due to many similar glyphs
* The use of fonts such as Antiqua for dates and foreign words
* Headers, footers, and page numbers
* End-of-line hyphenation
* Ornamentations and illustrations at the beginning of each chapter 
* Full-page images (although some metadata was provided about locations of full-page images)

![Deutsche Rundschau](/images/deutsche-rundschau-wikipedia.jpg)

## Optical Character Recognition (OCR)

Scanned using tesseract, with a custom model trained to recognize German blackletter fonts.
Evaluated by generating synthetic scans with known ground truth.

## OCR Error Correction

Noisy channel model
Confusion matrix
Word segmentation

## OCR Evaluation

## Further Preprocessing

* Running header removal
* Word stemming / lemmatization

# Topic Models

# DHGP Browser

# Miscellaneous

## UROP Symposium Poster

The poster below summarizes the progress made during my first year on the project, which I initially joined through the [UROP Program](https://lsa.umich.edu/urop) at UM.  After my first year, I was hired to continue working on the project as an undergraduate research assistant.

<a href="/static/dhgp/dhgp_urop-poster_benrbray.pdf">
<img src="/images/dhgp-poster.png"></img>
</a>

# References

* **[McIsaac 2014]** McIsaac, Peter M. [“Rethinking Nonfiction: Distant Reading the Nineteenth-Century Science-Literature Divide.”](http://www.jstor.org/stable/10.7722/j.ctt5vj848.11) *Distant Readings: Topologies of German Culture in the Long Nineteenth Century*, edited by Matt Erlin and Lynne Tatlock, ed., Boydell and Brewer, 2014, pp. 185–208.
* **[Belgum 2002]** Belgum, Kirsten. [*Popularizing the Nation: Audience, Representation, and the Production of Identity in Die Gartenlaube*](https://books.google.com/books?hl=en&lr=&id=yGHo-Alkp84C&oi=fnd&pg=PR9&dq=belgum+2002+popularizing+the+nation+Audience,+Representation,+and+the+Production+of+Identity+in+Die+Gartenlaube&ots=VFwEvxdUUS&sig=kF6W0ktdb6BOcD1TY7Rdwtf_tsc#v=onepage&q&f=false), 1853-1900. U of Nebraska Press, 1998.