(function(d, _, Load) {
// Cutting the mustard
if (!d.querySelector) return;

/*
// Register our service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
*/

// Require the loader modual
window.loader = load = new Load();

// On DOMContentLoaded start adding images, svg, and other assets
_.ready(function () {
  load.replace({
    l: '<svg class="logo"><use xlink:href="#logo"></use></svg>',
    ig: '<svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg>',
    it: '<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>',
    id: '<svg class="icon icon-dribbble"><use xlink:href="#icon-dribbble"></use></svg>',
    posi: '<svg class="prod-img"><use xlink:href="#poster"></use></svg>',
    hpk: '<img src="/i/peckhams_2048.jpg" alt="Peckhams limited release labels">',
    hphd: '<img src="/i/phd_2048.jpg" alt="PHD six pack builder">',
    hart: '<img src="/i/peckhams_2048.jpg" alt="Arthouse website">',
    hjam: '<img src="/i/phd_2048.jpg" alt="Wedding invites">',
    pk: '<a href="/peckhams.html"><img src="/i/peckhams_2048.jpg" alt="Peckhams limited release labels"></a>',
    phd: '<a href="/phd.html"><img src="/i/phd_2048.jpg" alt="PHD six pack builder"></a>',
    art: '<a href="/arthouse.html"><img src="/i/peckhams_2048.jpg" alt="Arthouse website"></a>',
    jam: '<a href="/invites.html"><img src="/i/phd_2048.jpg" alt="Wedding invites"></a>',
    jtms: '<a class="b" id="jtms" href="https://luciddesign.myshopify.com/cart/25377140360:1" target="_blank">Buy the poster</a>'
  });
});

// load the extra css
load.css(['/c/b.css']);

// Load SVG files
var svgFiles = ['/i/i.svg'];
if (d.querySelector('body').className === 'ix') {
  svgFiles.push('/i/poster.svg');
}
load.svg(svgFiles);

// Load vendor scripts
if (location.search !== '?vendor=false') {
  load.js(['/j/b.js']); 
}

// If we have CSS.supports and classList then add classes for clip-path and shape
if (!CSS && !CSS.supports && !("classList" in d.createElement("p"))) return;

var supportsCSS = function (property, className) {
  if (CSS.supports(property)) {
    d.documentElement.classList.add(className);
  } else {
    d.documentElement.classList.add('no-'+className);
  }
};

supportsCSS('(shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and (-webkit-shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and ((clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)) or (-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)))', 'css-shape');

})(document, _, Load);