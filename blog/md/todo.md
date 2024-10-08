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
More info in website.md
urlhases being #'s at the end of a url to change content on the website. Usually used for jumping to headings so it is non-standard behaviour, and requires js.

## Folder structure
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
.
└── pages
    ├── blogs
    │   └── first.html
    │   └── first.md
    ├── Misc
    │   └── todo.html
    │   └── todo.md
    └── Photography
        └── Christchurch