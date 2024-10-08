Almost use just-the-docs because gnome websites uses it, but it was hella overkill for this job. So simplicity is the goal here.
rationale for building it like this is because I like inventing my own solutions to whatever problems I face, instead of using prebuild ones. This is probably why I've never properly learned anything in compsci.

## Technicalities of using url hashes
I can't link to headings inside embedded html in the "blog" without some weird work around like 2-part hashes.
Pages on the website won't appear as independent links online
This works with browser back/forward buttons which is a big plus compared to some other sketch ideas I had.
if the pages switched without changing url, then default browser back/forward functionality would not work.

Because I don't have a bunch of independent pages I can simplify the workflow of creating new pages. All that is needed is to convert md to html and add a navbar entry with a link and title.

