(function(d, _, Load) {
// Cutting the mustard
if (!d.querySelector) return;

// Register our service worker
/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
*/

// Require the loader modual
window.loader = load = new Load();

// On DOMContentLoaded start adding images, svg, and other assets
_.ready(function () {
  load.replace({
    l: '<a href="/"><svg class="l"><use xlink:href="#logo"></use></svg></a>',
    g: '<svg class="i ig"><use xlink:href="#icon-github"></use></svg>',
    t: '<svg class="i it"><use xlink:href="#icon-twitter"></use></svg>',
    d: '<svg class="i id"><use xlink:href="#icon-dribbble"></use></svg>',
    p: '<svg class="pdi"><use xlink:href="#poster"></use></svg>',
    hrpk: '<img src="/i/peckhams_2048.jpg" alt="Peckhams limited release labels">',
    hrp: '<img src="/i/phd_2048.jpg" alt="PHD six pack builder">',
    hra: '<img src="/i/arthouse_2048_2.jpg" alt="Arthouse website">',
    hri: '<img src="/i/phd_2048.jpg" alt="Wedding invites">',
    c1: '<a href="/peckhams.html"><img src="/i/peckhams_2048.jpg" alt="Peckhams limited release labels"></a>',
    c2: '<a href="/phd.html"><img src="/i/phd_2048.jpg" alt="PHD six pack builder"></a>',
    c3: '<a href="/arthouse.html"><img src="/i/arthouse_2048_2.jpg" alt="Arthouse website"></a>',
    c4: '<a href="/invites.html"><img src="/i/phd_2048.jpg" alt="Wedding invites"></a>'
  });
});

// load the extra css
load.css(['/c/b.css']);

// Load SVG files
var svgFiles = ['/i/i.svg'];
if (d.querySelector('body').className === 'ix') { // only include the poster svg on the index
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
  }
};

supportsCSS('(shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and (-webkit-shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and ((clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)) or (-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)))', 'css-shape');

})(document, _, Load);

/*
  // Case study hero
  <img src="/i/peckhams_230.jpg"
       srcset="/i/peckhams_320.jpg 320w,
          /i/peckhams_440.jpg 440w,
          /i/peckhams_560.jpg 560w,
          /i/peckhams_680.jpg 680w,
          /i/peckhams_900.jpg 900w,
          /i/peckhams_1200.jpg 1200w,
          /i/peckhams_1500.jpg 1500w,
          /i/peckhams_1800.jpg 1800w,
          /i/peckhams_2100.jpg 2100w"
       sizes="100vw"
       alt="Peckhams limited release labels">
  
  // Case study thumb
  <img src="/i/peckhams_320.jpg"
       srcset="/i/peckhams_320.jpg 320w,
          /i/peckhams_440.jpg 440w,
          /i/peckhams_560.jpg 560w,
          /i/peckhams_680.jpg 680w,
          /i/peckhams_900.jpg 900w,
          /i/peckhams_1080.jpg 1080w"
       sizes="(min-width: 87.5em) 23em,
          (min-width: 75em) 28.75vw,
          (min-width: 62.5em) 32.2vw,
          (min-width: 56.25em) 34.5vw,
          (min-width: 50em) 37.5vw,
          (min-width: 43.75em) 41vw,
          (min-width: 35em) 46vw,
          96vw"
       alt="Peckhams limited release labels">
  
*/