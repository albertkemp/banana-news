# Big updation feature with eleventy and nunjucks
How to add a page:
1. Go into _includes/base.njk and add a page inside the top nav bar in that file
2. Create your new page as a HTML page in the root folder (The top level of the Github repository)
3. If you need any CSS/JS, create a CSS/JS file in the styles/scripts folders and add the style link or script tag to _includes/base.njk
4. Only put the body content in the HTML page, with the thingy on top. You don't need head, html or body tags, or a footer or top navigation bar. Just your unique content. For example:
<code>
---
layout: "base.njk"
title: "Home" (this is a comment: Notice that there is no - Banana News, that will be automatically handled)
---
Your stuff here:
e.g. 
&lt;h1&gt;THIS IS MY AMAZING PAGE&lt;/h1&gt;
&lt;p&gt;A little bit of page content&lt;/p&gt;
</code>

# Some important stuff:
All paths, unless they are absolute paths (like a link to another website) should have a / at the start: e.g. /images/banana.png
All links to other pages should not be page, but they should be /page, because the program has automatically generated pages that don't have the  which look simpler and more clean.
