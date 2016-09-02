// Check that we have what we need to move forward
var supports = !!document.querySelector && !!window.addEventListener;
if (!supports) return;

// var _ = require('./_lib.js');
var Load = require('./_load.js');
var load = new Load();

load.css(['/c/b.css']);
load.svg(['/i/i.svg']);
load.img({
  ig: '<svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg>',
  it: '<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>',
  id: '<svg class="icon icon-dribbble"><use xlink:href="#icon-dribbble"></use></svg>'
});