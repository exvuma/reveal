// include index.html for webpack to load
require("reveal.js/lib/js/head.min.js")
// require("./src/index.html");
const Reveal = require('reveal.js')
require('reveal.js/css/reveal.css')
// require('reveal.js/css/theme/night.css')
require('reveal.js/css/theme/solarized.css')
require('reveal.js/lib/css/zenburn.css')
// require("reveal.js/lib/js/head.min.js")
// require('reveal.js/plugin/markdown/marked.js')
// require('reveal.js/plugin/markdown/markdown.js')
// require('reveal.js/plugin/highlight/highlight.js')
// require('reveal.js/plugin/search/search.js')
// require('reveal.js/plugin/zoom-js/zoom.js')
// require('reveal.js/plugin/notes/notes.js')
// require("reveal.js/lib/js/head.min.js" )
Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    
    // More info https://github.com/hakimel/reveal.js#dependencies
    dependencies: [
        { src: 'plugin/markdown/marked.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },
        { src: 'plugin/markdown/markdown.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },
        { src: 'plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } },
        { src: 'plugin/search/search.js', async: true },
        { src: 'plugin/zoom-js/zoom.js', async: true },
        { src: 'plugin/notes/notes.js', async: true }
    ]
});
// require("reveal.js/lib/js/head.min.js")
// require('reveal.js/plugin/markdown/marked.js')
// require('reveal.js/plugin/markdown/markdown.js')
// require('reveal.js/plugin/highlight/highlight.js')
// require('reveal.js/plugin/search/search.js')
// require('reveal.js/plugin/zoom-js/zoom.js')
// require('reveal.js/plugin/notes/notes.js')
// require("reveal.js/lib/js/head.min.js" )
window.Reveal = Reveal;
// console.log('foo')

