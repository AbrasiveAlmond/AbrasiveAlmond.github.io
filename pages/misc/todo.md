# Don't read this too closely it's just filler text

## Website behaviour & Todo:
 - [x] Properly test prototype idea
 - [x] Use onhashchange to swap what blog is shown
 - [ ] RSS support using comrak export to xml feature
 - [x] implement test page like photography home.html, desmos widget, or conways GOL
 - [x] test links
[conway-gol page todo list](#coding/conway-gol/conway-gol)

### Text formatting
 - [x] preserve line breaks from markdown
 - [ ] fix links
 - [ ] create overall theme / style that doesn't look like raw markdown

## Sidebar
 - [x] Fill out with blank urls
 - [ ] Make items collapsible
 - [ ] :hover{ show (name + desc) } using [<dl> <dt> <dd>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) 
 - [x] Fix text wrapping

### Checklist to get working sidebar items
- [x] Sidebar links are url + "#note.md"
- [x] js onhashupdate to switch html import
- [x] make some extra md files

## Linking
- [ ] Jesus christ fix the javascript. It is horrid
local pages will edit the website urlhash, while external pages will be normal links
More info in website.md
urlhases being #'s at the end of a url to change content on the website. Usually used for jumping to headings so it is non-standard behaviour, and requires js.

## Folder structure
 - [x] update all directory references in code

HTML is used for the actual pages on the website, which can be random projects or markdown conversions.
MD is purely just for where I need to embed some text
Mirrored directories where md is compiled to html, and custom html can be manually added.
.
├── html
│   ├── blogs
│   │   └── first.html
│   ├── Misc
│   │   └── todo.html
│   └── Photography
│       └── Christchurch
└── md
    ├── blogs
    │   └── first.md
    └── Misc
        └── todo.md

Combined directories, where each md-html document pair are siblings.
A script to auto update html pages is probably easy to make
.
└── pages
    ├── blogs
    │   └── todo.html
    │   └── todo.md
    │   └── self-hosting.html
    │   └── self-hosting.md
    │   └── nixos.html
    │   └── nixos.md
    ├── Misc
    │   └── conways-gol.html
    │   └── desmos.html
    └── Photography
        └── Christchurch

 ## Markdown compiling
 Would be nice to make a rust script to do this by crawling directories and converting md.
 not sure what the capabilities of github pages are for automating in terms of custom scripts.