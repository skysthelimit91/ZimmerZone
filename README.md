# ZimmerZone

##Technologies used:

node.js to run js server side, javascript for programming, postgresql for data management, npm for installing useful libraries, axios for accessing api, ajax for refreshing page

##Wireframes:

https://imgur.com/a/YreET
https://imgur.com/a/FArjS

##User Stories:

As a huge fan of Hans Zimmer, I want to be able to view a list of all of his movie scores and get info on each.

##The approach taken:

I knew I wanted to have a user be able to log in and it would probably be difficult to add that in later on so I started there. Then I got the info from the api, used a split to skip the first object (which contains info I don't want/need) and then began rendering info to the pages.

##Unsolved problems:

Currently: If a user has made multiple comments on a page, an attempt to edit one of those comments results in all comments by that user on that page being edited. And styling. Always styling.
