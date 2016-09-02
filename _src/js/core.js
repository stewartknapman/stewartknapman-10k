// Check that we have what we need to move forward
var supports = !!document.querySelector && !!window.addEventListener;
if ( !supports ) return;

// var _ = require('./_lib.js');
var LoadCSS = require('./_load-css.js');
var LoadSVG = require('./_load-svg.js');

// Load css
var css = ['/c/b.css'];
new LoadCSS(css);

// Load svg
var svg = ['/i/i.svg'];
new LoadSVG(svg);