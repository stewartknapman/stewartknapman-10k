(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  /*
    Array Functions
  */
  // For each item in Array
  each: function (arr, callback, ctx) {
    for (var i = 0; i < arr.length; i++) {
      ctx = ctx || arr[i];
      callback.apply(ctx, [arr[i], i]);
    }
  },
  
  // For each item in Object
  eachIn: function (obj, callback, ctx) {
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        ctx = ctx || obj[k];
        callback.apply(ctx, [k, obj[k]]);
      }
    }
  },
  
  /*
    DOM Functions
  */
  insertAfter: function (el, refNode) {
    refNode.parentNode.insertBefore(el, refNode.nextSibling);
  },
  
  /*
    Event Functions
  */
  // Run code when the page is ready
  ready: function (callback, ctx) {
    if (typeof callback !== 'function') return;
    
    if (document.readyState !== 'loading') {
      callback.apply(ctx);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        callback.apply(ctx);
      });
    }
  }
};
},{}],2:[function(require,module,exports){
var _ = require('./_lib.js');
var Load = function () {};

/* CSS */
Load.prototype.css = function (files) {
  this._createAfter('link', files, function (el, file) {
    el.rel = 'stylesheet';
    el.href = file;
    return el;
  });
};

/* JS */
Load.prototype.js = function (files) {
  this._createAfter('script', files, function (el, file) {
    el.src = file;
    el.async = true;
    return el;
  });
};

/* SVG */
Load.prototype.svg = function (files) {
  _.each(files, function (file) {
    this._ajaxSVG(file);
  }, this);
};

Load.prototype._ajaxSVG = function (file) {
  var xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', function (e) {
    document.body.insertBefore(this.responseXML.documentElement, document.body.childNodes[0]);
  });
  xhr.addEventListener('error', function (e) {
    console.log('AJAX ERROR:', this, e);
  });
  
  xhr.open("GET", file, true);
  xhr.send();
};

/* IMG/Other Markup */
Load.prototype.replace = function (files) {
  _.eachIn(files, function (id, markup) {
    this.replaceMarkup(id, markup);
  }, this);
};

Load.prototype.replaceMarkup = function (id, markup) {
  var i = document.querySelector('#'+id);
  if (i) {
    var div = document.createElement('div');
    div.innerHTML = markup;
    i.parentNode.replaceChild(div.childNodes[0], i);
  }
};

/* PRIVATE */
Load.prototype._createAfter = function (tagName, files, callback) {
  var first = document.querySelector(tagName);
  var docfrag = document.createDocumentFragment();
  
  _.each(files, function (file) {
    var el = document.createElement(tagName);
    el = callback(el, file);
    docfrag.appendChild(el);
  });
  
  _.insertAfter(docfrag, first);
};

module.exports = Load;
},{"./_lib.js":1}],3:[function(require,module,exports){
// Check that we have what we need to move forward
// classlist???
var supports = !!document.querySelector && !!window.addEventListener;
if (!supports) return;

var _ = require('./_lib.js');
var Load = require('./_load.js');
var load = new Load();

/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log('Yey!', reg);
  }).catch(function(err) {
    console.log('Boo!', err);
  });
}
*/

// If css.supports load extra css
// add classes for clip-path and shape
var supportsCSS = function (property, className) {
  if (CSS.supports(property)) {
    document.documentElement.classList.add(className);
  } else {
    document.documentElement.classList.add('no-'+className);
  }
};

if (CSS && CSS.supports) {
  supportsCSS('(shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and (-webkit-shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and ((clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)) or (-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)))', 'css-shape');
}
load.css(['/c/b.css']);

// Load SVG files
var svgFiles = ['/i/i.svg'];
if (document.querySelector('body').className === 'ix') {
  svgFiles.push('/i/poster.svg');
}
load.svg(svgFiles);

// On DOMContentLoaded start adding images, svg, and other assets
_.ready(function () {
  load.replace({
    l: '<svg class="logo"><use xlink:href="#logo"></use></svg>',
    ig: '<svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg>',
    it: '<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>',
    id: '<svg class="icon icon-dribbble"><use xlink:href="#icon-dribbble"></use></svg>',
    posi: '<svg class="product-thumb"><use xlink:href="#poster"></use></svg>',
    p: '<img class="hero-img" src="/i/peckhams_2048.jpg">',
    phd: '<img class="hero-img" src="/i/phd_2048.jpg">',
    jtms: '<div data-embed_type="product" data-shop="luciddesign.myshopify.com" data-product_name="&#39;Jack of all Trades; Master of Some&#39; Poster" data-product_handle="jack-of-all-trades-master-of-some-poster" data-has_image="false" data-display_size="compact" data-redirect_to="checkout" data-buy_button_text="Buy the poster" data-buy_button_out_of_stock_text="Out of Stock" data-buy_button_product_unavailable_text="Unavailable" data-button_background_color="ffffff" data-button_text_color="03b9e3" data-product_modal="false" data-product_title_color="000000" data-next_page_button_text="Next page"></div>'
  });
  
//   load.js(['https://widgets.shopifyapps.com/assets/widgets/embed/client.js']);
});

// load GA
/*
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-11095759-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
*/

// load typekit
/*
(function(d) {
  var config = {
    kitId: 'bmn1olh',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
*/
},{"./_lib.js":1,"./_load.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3JjL2pzL19saWIuanMiLCJfc3JjL2pzL19sb2FkLmpzIiwiX3NyYy9qcy9jb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLypcbiAgICBBcnJheSBGdW5jdGlvbnNcbiAgKi9cbiAgLy8gRm9yIGVhY2ggaXRlbSBpbiBBcnJheVxuICBlYWNoOiBmdW5jdGlvbiAoYXJyLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN0eCA9IGN0eCB8fCBhcnJbaV07XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgsIFthcnJbaV0sIGldKTtcbiAgICB9XG4gIH0sXG4gIFxuICAvLyBGb3IgZWFjaCBpdGVtIGluIE9iamVjdFxuICBlYWNoSW46IGZ1bmN0aW9uIChvYmosIGNhbGxiYWNrLCBjdHgpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBjdHggPSBjdHggfHwgb2JqW2tdO1xuICAgICAgICBjYWxsYmFjay5hcHBseShjdHgsIFtrLCBvYmpba11dKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFxuICAvKlxuICAgIERPTSBGdW5jdGlvbnNcbiAgKi9cbiAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChlbCwgcmVmTm9kZSkge1xuICAgIHJlZk5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHJlZk5vZGUubmV4dFNpYmxpbmcpO1xuICB9LFxuICBcbiAgLypcbiAgICBFdmVudCBGdW5jdGlvbnNcbiAgKi9cbiAgLy8gUnVuIGNvZGUgd2hlbiB0aGUgcGFnZSBpcyByZWFkeVxuICByZWFkeTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjdHgpIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XG4gICAgXG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoY3R4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTsiLCJ2YXIgXyA9IHJlcXVpcmUoJy4vX2xpYi5qcycpO1xudmFyIExvYWQgPSBmdW5jdGlvbiAoKSB7fTtcblxuLyogQ1NTICovXG5Mb2FkLnByb3RvdHlwZS5jc3MgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgdGhpcy5fY3JlYXRlQWZ0ZXIoJ2xpbmsnLCBmaWxlcywgZnVuY3Rpb24gKGVsLCBmaWxlKSB7XG4gICAgZWwucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGVsLmhyZWYgPSBmaWxlO1xuICAgIHJldHVybiBlbDtcbiAgfSk7XG59O1xuXG4vKiBKUyAqL1xuTG9hZC5wcm90b3R5cGUuanMgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgdGhpcy5fY3JlYXRlQWZ0ZXIoJ3NjcmlwdCcsIGZpbGVzLCBmdW5jdGlvbiAoZWwsIGZpbGUpIHtcbiAgICBlbC5zcmMgPSBmaWxlO1xuICAgIGVsLmFzeW5jID0gdHJ1ZTtcbiAgICByZXR1cm4gZWw7XG4gIH0pO1xufTtcblxuLyogU1ZHICovXG5Mb2FkLnByb3RvdHlwZS5zdmcgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgXy5lYWNoKGZpbGVzLCBmdW5jdGlvbiAoZmlsZSkge1xuICAgIHRoaXMuX2FqYXhTVkcoZmlsZSk7XG4gIH0sIHRoaXMpO1xufTtcblxuTG9hZC5wcm90b3R5cGUuX2FqYXhTVkcgPSBmdW5jdGlvbiAoZmlsZSkge1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIFxuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUodGhpcy5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XG4gIH0pO1xuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnNvbGUubG9nKCdBSkFYIEVSUk9SOicsIHRoaXMsIGUpO1xuICB9KTtcbiAgXG4gIHhoci5vcGVuKFwiR0VUXCIsIGZpbGUsIHRydWUpO1xuICB4aHIuc2VuZCgpO1xufTtcblxuLyogSU1HL090aGVyIE1hcmt1cCAqL1xuTG9hZC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChmaWxlcykge1xuICBfLmVhY2hJbihmaWxlcywgZnVuY3Rpb24gKGlkLCBtYXJrdXApIHtcbiAgICB0aGlzLnJlcGxhY2VNYXJrdXAoaWQsIG1hcmt1cCk7XG4gIH0sIHRoaXMpO1xufTtcblxuTG9hZC5wcm90b3R5cGUucmVwbGFjZU1hcmt1cCA9IGZ1bmN0aW9uIChpZCwgbWFya3VwKSB7XG4gIHZhciBpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycraWQpO1xuICBpZiAoaSkge1xuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gbWFya3VwO1xuICAgIGkucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZGl2LmNoaWxkTm9kZXNbMF0sIGkpO1xuICB9XG59O1xuXG4vKiBQUklWQVRFICovXG5Mb2FkLnByb3RvdHlwZS5fY3JlYXRlQWZ0ZXIgPSBmdW5jdGlvbiAodGFnTmFtZSwgZmlsZXMsIGNhbGxiYWNrKSB7XG4gIHZhciBmaXJzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFnTmFtZSk7XG4gIHZhciBkb2NmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBcbiAgXy5lYWNoKGZpbGVzLCBmdW5jdGlvbiAoZmlsZSkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgZWwgPSBjYWxsYmFjayhlbCwgZmlsZSk7XG4gICAgZG9jZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gIH0pO1xuICBcbiAgXy5pbnNlcnRBZnRlcihkb2NmcmFnLCBmaXJzdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWQ7IiwiLy8gQ2hlY2sgdGhhdCB3ZSBoYXZlIHdoYXQgd2UgbmVlZCB0byBtb3ZlIGZvcndhcmRcbi8vIGNsYXNzbGlzdD8/P1xudmFyIHN1cHBvcnRzID0gISFkb2N1bWVudC5xdWVyeVNlbGVjdG9yICYmICEhd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG5pZiAoIXN1cHBvcnRzKSByZXR1cm47XG5cbnZhciBfID0gcmVxdWlyZSgnLi9fbGliLmpzJyk7XG52YXIgTG9hZCA9IHJlcXVpcmUoJy4vX2xvYWQuanMnKTtcbnZhciBsb2FkID0gbmV3IExvYWQoKTtcblxuLypcbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc3cuanMnKS50aGVuKGZ1bmN0aW9uKHJlZykge1xuICAgIGNvbnNvbGUubG9nKCdZZXkhJywgcmVnKTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgY29uc29sZS5sb2coJ0JvbyEnLCBlcnIpO1xuICB9KTtcbn1cbiovXG5cbi8vIElmIGNzcy5zdXBwb3J0cyBsb2FkIGV4dHJhIGNzc1xuLy8gYWRkIGNsYXNzZXMgZm9yIGNsaXAtcGF0aCBhbmQgc2hhcGVcbnZhciBzdXBwb3J0c0NTUyA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgY2xhc3NOYW1lKSB7XG4gIGlmIChDU1Muc3VwcG9ydHMocHJvcGVydHkpKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbm8tJytjbGFzc05hbWUpO1xuICB9XG59O1xuXG5pZiAoQ1NTICYmIENTUy5zdXBwb3J0cykge1xuICBzdXBwb3J0c0NTUygnKHNoYXBlLW91dHNpZGU6IHBvbHlnb24oMCAwLCAxMDAlIDAsIDEwMCUgMTAwJSwgMCA4MCUpKSBhbmQgKC13ZWJraXQtc2hhcGUtb3V0c2lkZTogcG9seWdvbigwIDAsIDEwMCUgMCwgMTAwJSAxMDAlLCAwIDgwJSkpIGFuZCAoKGNsaXAtcGF0aDogcG9seWdvbigwIDAsIDEwMCUgMCwgMTAwJSAxMDAlLCAwIDgwJSkpIG9yICgtd2Via2l0LWNsaXAtcGF0aDogcG9seWdvbigwIDAsIDEwMCUgMCwgMTAwJSAxMDAlLCAwIDgwJSkpKScsICdjc3Mtc2hhcGUnKTtcbn1cbmxvYWQuY3NzKFsnL2MvYi5jc3MnXSk7XG5cbi8vIExvYWQgU1ZHIGZpbGVzXG52YXIgc3ZnRmlsZXMgPSBbJy9pL2kuc3ZnJ107XG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTmFtZSA9PT0gJ2l4Jykge1xuICBzdmdGaWxlcy5wdXNoKCcvaS9wb3N0ZXIuc3ZnJyk7XG59XG5sb2FkLnN2ZyhzdmdGaWxlcyk7XG5cbi8vIE9uIERPTUNvbnRlbnRMb2FkZWQgc3RhcnQgYWRkaW5nIGltYWdlcywgc3ZnLCBhbmQgb3RoZXIgYXNzZXRzXG5fLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgbG9hZC5yZXBsYWNlKHtcbiAgICBsOiAnPHN2ZyBjbGFzcz1cImxvZ29cIj48dXNlIHhsaW5rOmhyZWY9XCIjbG9nb1wiPjwvdXNlPjwvc3ZnPicsXG4gICAgaWc6ICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWdpdGh1YlwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWdpdGh1YlwiPjwvdXNlPjwvc3ZnPicsXG4gICAgaXQ6ICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXR3aXR0ZXJcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi10d2l0dGVyXCI+PC91c2U+PC9zdmc+JyxcbiAgICBpZDogJzxzdmcgY2xhc3M9XCJpY29uIGljb24tZHJpYmJibGVcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kcmliYmJsZVwiPjwvdXNlPjwvc3ZnPicsXG4gICAgcG9zaTogJzxzdmcgY2xhc3M9XCJwcm9kdWN0LXRodW1iXCI+PHVzZSB4bGluazpocmVmPVwiI3Bvc3RlclwiPjwvdXNlPjwvc3ZnPicsXG4gICAgcDogJzxpbWcgY2xhc3M9XCJoZXJvLWltZ1wiIHNyYz1cIi9pL3BlY2toYW1zXzIwNDguanBnXCI+JyxcbiAgICBwaGQ6ICc8aW1nIGNsYXNzPVwiaGVyby1pbWdcIiBzcmM9XCIvaS9waGRfMjA0OC5qcGdcIj4nLFxuICAgIGp0bXM6ICc8ZGl2IGRhdGEtZW1iZWRfdHlwZT1cInByb2R1Y3RcIiBkYXRhLXNob3A9XCJsdWNpZGRlc2lnbi5teXNob3BpZnkuY29tXCIgZGF0YS1wcm9kdWN0X25hbWU9XCImIzM5O0phY2sgb2YgYWxsIFRyYWRlczsgTWFzdGVyIG9mIFNvbWUmIzM5OyBQb3N0ZXJcIiBkYXRhLXByb2R1Y3RfaGFuZGxlPVwiamFjay1vZi1hbGwtdHJhZGVzLW1hc3Rlci1vZi1zb21lLXBvc3RlclwiIGRhdGEtaGFzX2ltYWdlPVwiZmFsc2VcIiBkYXRhLWRpc3BsYXlfc2l6ZT1cImNvbXBhY3RcIiBkYXRhLXJlZGlyZWN0X3RvPVwiY2hlY2tvdXRcIiBkYXRhLWJ1eV9idXR0b25fdGV4dD1cIkJ1eSB0aGUgcG9zdGVyXCIgZGF0YS1idXlfYnV0dG9uX291dF9vZl9zdG9ja190ZXh0PVwiT3V0IG9mIFN0b2NrXCIgZGF0YS1idXlfYnV0dG9uX3Byb2R1Y3RfdW5hdmFpbGFibGVfdGV4dD1cIlVuYXZhaWxhYmxlXCIgZGF0YS1idXR0b25fYmFja2dyb3VuZF9jb2xvcj1cImZmZmZmZlwiIGRhdGEtYnV0dG9uX3RleHRfY29sb3I9XCIwM2I5ZTNcIiBkYXRhLXByb2R1Y3RfbW9kYWw9XCJmYWxzZVwiIGRhdGEtcHJvZHVjdF90aXRsZV9jb2xvcj1cIjAwMDAwMFwiIGRhdGEtbmV4dF9wYWdlX2J1dHRvbl90ZXh0PVwiTmV4dCBwYWdlXCI+PC9kaXY+J1xuICB9KTtcbiAgXG4vLyAgIGxvYWQuanMoWydodHRwczovL3dpZGdldHMuc2hvcGlmeWFwcHMuY29tL2Fzc2V0cy93aWRnZXRzL2VtYmVkL2NsaWVudC5qcyddKTtcbn0pO1xuXG4vLyBsb2FkIEdBXG4vKlxudmFyIF9nYXEgPSBfZ2FxIHx8IFtdO1xuX2dhcS5wdXNoKFsnX3NldEFjY291bnQnLCAnVUEtMTEwOTU3NTktMSddKTtcbl9nYXEucHVzaChbJ190cmFja1BhZ2V2aWV3J10pO1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgZ2EgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsgZ2EudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBnYS5hc3luYyA9IHRydWU7XG4gIGdhLnNyYyA9ICgnaHR0cHM6JyA9PSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA/ICdodHRwczovL3NzbCcgOiAnaHR0cDovL3d3dycpICsgJy5nb29nbGUtYW5hbHl0aWNzLmNvbS9nYS5qcyc7XG4gIHZhciBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdOyBzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGdhLCBzKTtcbn0pKCk7XG4qL1xuXG4vLyBsb2FkIHR5cGVraXRcbi8qXG4oZnVuY3Rpb24oZCkge1xuICB2YXIgY29uZmlnID0ge1xuICAgIGtpdElkOiAnYm1uMW9saCcsXG4gICAgc2NyaXB0VGltZW91dDogMzAwMCxcbiAgICBhc3luYzogdHJ1ZVxuICB9LFxuICBoPWQuZG9jdW1lbnRFbGVtZW50LHQ9c2V0VGltZW91dChmdW5jdGlvbigpe2guY2xhc3NOYW1lPWguY2xhc3NOYW1lLnJlcGxhY2UoL1xcYndmLWxvYWRpbmdcXGIvZyxcIlwiKStcIiB3Zi1pbmFjdGl2ZVwiO30sY29uZmlnLnNjcmlwdFRpbWVvdXQpLHRrPWQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSxmPWZhbHNlLHM9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXSxhO2guY2xhc3NOYW1lKz1cIiB3Zi1sb2FkaW5nXCI7dGsuc3JjPSdodHRwczovL3VzZS50eXBla2l0Lm5ldC8nK2NvbmZpZy5raXRJZCsnLmpzJzt0ay5hc3luYz10cnVlO3RrLm9ubG9hZD10ay5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXthPXRoaXMucmVhZHlTdGF0ZTtpZihmfHxhJiZhIT1cImNvbXBsZXRlXCImJmEhPVwibG9hZGVkXCIpcmV0dXJuO2Y9dHJ1ZTtjbGVhclRpbWVvdXQodCk7dHJ5e1R5cGVraXQubG9hZChjb25maWcpfWNhdGNoKGUpe319O3MucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGsscylcbn0pKGRvY3VtZW50KTtcbiovIl19
