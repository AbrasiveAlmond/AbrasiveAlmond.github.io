# Don't read this too closely it's just filler text

### Website behaviour & Todo:
 - [x] Properly test prototype idea
 - [x] Use onhashchange to swap what blog is shown
 - [ ] RSS support using comrak export to xml feature

## Sidebar
 - [x] Fill out with blank urls
 - [ ] Make items collapsible
 - [ ] Fix text wrapping

## Linking
local pages will edit the website urlhash, while external pages will be normal links
This is technically inconsistent behaviour in terms of whether something will open in the current page vs open in a new tab. But middle click for new tab will work on everything so at least that is consistent, and other things that can't run inside the website wont kick you out. Could implement a warning that you are about to change sites

### Website url hashes
Using #'s at the end of a url to change content on the website. Usually used for jumping to headings so it is non-standard behaviour, and requires js.

I can't link to headings inside embedded html in the "blog" without some weird work around like 2-piece hashes.

This means I don't have a bunch of independent pages, and can instead just convert md to html and import that into a otherwise static page using js onhashchange. This works with browser back/forward buttons which is a big plus compared to other methods. I imagine that if it were more like a webapp that switched contexts without changing url, then you would need a bunch of js logic and mouse/keyboard hijacking to create subpar back/forward functionality.