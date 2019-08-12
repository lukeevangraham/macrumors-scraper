# Macrumors Mongo Scraper

## Overview

Deployed at:  https://macrumors-mongo-scraper.herokuapp.com/

Macrumors Mongo Scraper is a web app that lets users view and leave comments on the latest news from Macrumors.com.  All articles are imported from Macrumors.com.

## Using the app

In the navbar the 'Scrape New Articles' button fetches the latest articles about the Apple Computer Company from Macrumors.  Shortly thereafter new articles populate on the main page.

Each article displays the article's title (linked to it's source), first sentence and a 'Save Article' button.

Clicking the 'Save Article' button moves the article from the Home page to the Commmented page.

## Commented Articles

The Commented Articles page displays all articles that have been saved by all users.

Each article has an unsave button that moves the article back to the Home.  The Article Comments button displays a modal (popup window) containing comments from all users.  It also displays a form allowing users to add new comments about the article.