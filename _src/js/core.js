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

var csImgs = {
  pk: 'Peckhams limited release labels',
  p: 'PHD six pack builder',
  a: 'Arthouse website',
  i: 'Wedding invites'
};
var imgs = {
  l: '<a href="/"><svg class="l"><use xlink:href="#logo"></use></svg></a>',
  g: '<svg class="i ig"><use xlink:href="#icon-github"></use></svg>',
  t: '<svg class="i it"><use xlink:href="#icon-twitter"></use></svg>',
  d: '<svg class="i id"><use xlink:href="#icon-dribbble"></use></svg>',
  p: '<svg class="pdi"><use xlink:href="#poster"></use></svg>'
};
// case study hero images
_.eachIn(csImgs, function (id, alt) {
  imgs['hr'+id] = load.img(id, alt);
});
// case study thumbs
_.eachIn(csImgs, function (id, alt) {
  imgs['c'+id] = load.img(id, alt, 'sizes="(min-width: 87.5em) 23em,(min-width: 56.25em) 34.5vw,(min-width: 35em) 46vw,96vw"');
});

// On DOMContentLoaded start adding images, svg, and other assets
_.ready(function () {
  load.replace(imgs);
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
  TODO: remove some imgs sizes to bring js files size down
  - js build img tags for replace? if it's lighter
  
  // Case study hero
  <img src="/i/pk320.jpg"
       srcset="/i/pk320.jpg 320w,
          /i/pk440.jpg 440w,
          /i/pk560.jpg 560w,
          /i/pk680.jpg 680w,
          /i/pk900.jpg 900w,
          /i/pk1080.jpg 1080w,
          /i/pk1200.jpg 1200w,
          /i/pk1500.jpg 1500w,
          /i/pk1800.jpg 1800w,
          /i/pk2100.jpg 2100w"
       sizes="100vw"
       alt="Peckhams limited release labels">
  
  // Case study thumb
  <img src="/i/pk320.jpg"
       srcset="/i/pk320.jpg 320w,
          /i/pk440.jpg 440w,
          /i/pk560.jpg 560w,
          /i/pk680.jpg 680w,
          /i/pk900.jpg 900w,
          /i/pk1080.jpg 1080w"
       sizes="(min-width: 87.5em) 23em,
          (min-width: 56.25em) 34.5vw,
          (min-width: 35em) 46vw,
          96vw"
       alt="Peckhams limited release labels">
       
       
       
*/