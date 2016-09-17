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
    jtms: '<div data-embed_type="product" data-shop="luciddesign.myshopify.com" data-product_name="&#39;Jack of all Trades; Master of Some&#39; Poster" data-product_handle="jack-of-all-trades-master-of-some-poster" data-has_image="false" data-display_size="compact" data-redirect_to="checkout" data-buy_button_text="Buy the poster" data-buy_button_out_of_stock_text="Out of Stock" data-buy_button_product_unavailable_text="Unavailable" data-button_background_color="ffffff" data-button_text_color="03b9e3" data-product_modal="false" data-product_title_color="000000" data-next_page_button_text="Next page"><a class="b" href="https://luciddesign.myshopify.com/cart/25377140360:1" target="_blank">Buy the poster</a></div>'
  });
  
  load.js(['https://widgets.shopifyapps.com/assets/widgets/embed/client.js']);
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
(function(d) {
  var config = {
    kitId: 'bmn1olh',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
},{"./_lib.js":1,"./_load.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3JjL2pzL19saWIuanMiLCJfc3JjL2pzL19sb2FkLmpzIiwiX3NyYy9qcy9jb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvKlxuICAgIEFycmF5IEZ1bmN0aW9uc1xuICAqL1xuICAvLyBGb3IgZWFjaCBpdGVtIGluIEFycmF5XG4gIGVhY2g6IGZ1bmN0aW9uIChhcnIsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgY3R4ID0gY3R4IHx8IGFycltpXTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgW2FycltpXSwgaV0pO1xuICAgIH1cbiAgfSxcbiAgXG4gIC8vIEZvciBlYWNoIGl0ZW0gaW4gT2JqZWN0XG4gIGVhY2hJbjogZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2ssIGN0eCkge1xuICAgIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIGN0eCA9IGN0eCB8fCBvYmpba107XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgW2ssIG9ialtrXV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXG4gIC8qXG4gICAgRE9NIEZ1bmN0aW9uc1xuICAqL1xuICBpbnNlcnRBZnRlcjogZnVuY3Rpb24gKGVsLCByZWZOb2RlKSB7XG4gICAgcmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgcmVmTm9kZS5uZXh0U2libGluZyk7XG4gIH0sXG4gIFxuICAvKlxuICAgIEV2ZW50IEZ1bmN0aW9uc1xuICAqL1xuICAvLyBSdW4gY29kZSB3aGVuIHRoZSBwYWdlIGlzIHJlYWR5XG4gIHJlYWR5OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHJldHVybjtcbiAgICBcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjay5hcHBseShjdHgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59OyIsInZhciBfID0gcmVxdWlyZSgnLi9fbGliLmpzJyk7XG52YXIgTG9hZCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vKiBDU1MgKi9cbkxvYWQucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uIChmaWxlcykge1xuICB0aGlzLl9jcmVhdGVBZnRlcignbGluaycsIGZpbGVzLCBmdW5jdGlvbiAoZWwsIGZpbGUpIHtcbiAgICBlbC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgZWwuaHJlZiA9IGZpbGU7XG4gICAgcmV0dXJuIGVsO1xuICB9KTtcbn07XG5cbi8qIEpTICovXG5Mb2FkLnByb3RvdHlwZS5qcyA9IGZ1bmN0aW9uIChmaWxlcykge1xuICB0aGlzLl9jcmVhdGVBZnRlcignc2NyaXB0JywgZmlsZXMsIGZ1bmN0aW9uIChlbCwgZmlsZSkge1xuICAgIGVsLnNyYyA9IGZpbGU7XG4gICAgZWwuYXN5bmMgPSB0cnVlO1xuICAgIHJldHVybiBlbDtcbiAgfSk7XG59O1xuXG4vKiBTVkcgKi9cbkxvYWQucHJvdG90eXBlLnN2ZyA9IGZ1bmN0aW9uIChmaWxlcykge1xuICBfLmVhY2goZmlsZXMsIGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgdGhpcy5fYWpheFNWRyhmaWxlKTtcbiAgfSwgdGhpcyk7XG59O1xuXG5Mb2FkLnByb3RvdHlwZS5fYWpheFNWRyA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgXG4gIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGUpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZSh0aGlzLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcbiAgfSk7XG4gIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgY29uc29sZS5sb2coJ0FKQVggRVJST1I6JywgdGhpcywgZSk7XG4gIH0pO1xuICBcbiAgeGhyLm9wZW4oXCJHRVRcIiwgZmlsZSwgdHJ1ZSk7XG4gIHhoci5zZW5kKCk7XG59O1xuXG4vKiBJTUcvT3RoZXIgTWFya3VwICovXG5Mb2FkLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIF8uZWFjaEluKGZpbGVzLCBmdW5jdGlvbiAoaWQsIG1hcmt1cCkge1xuICAgIHRoaXMucmVwbGFjZU1hcmt1cChpZCwgbWFya3VwKTtcbiAgfSwgdGhpcyk7XG59O1xuXG5Mb2FkLnByb3RvdHlwZS5yZXBsYWNlTWFya3VwID0gZnVuY3Rpb24gKGlkLCBtYXJrdXApIHtcbiAgdmFyIGkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytpZCk7XG4gIGlmIChpKSB7XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBtYXJrdXA7XG4gICAgaS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChkaXYuY2hpbGROb2Rlc1swXSwgaSk7XG4gIH1cbn07XG5cbi8qIFBSSVZBVEUgKi9cbkxvYWQucHJvdG90eXBlLl9jcmVhdGVBZnRlciA9IGZ1bmN0aW9uICh0YWdOYW1lLCBmaWxlcywgY2FsbGJhY2spIHtcbiAgdmFyIGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YWdOYW1lKTtcbiAgdmFyIGRvY2ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIFxuICBfLmVhY2goZmlsZXMsIGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBlbCA9IGNhbGxiYWNrKGVsLCBmaWxlKTtcbiAgICBkb2NmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgfSk7XG4gIFxuICBfLmluc2VydEFmdGVyKGRvY2ZyYWcsIGZpcnN0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZDsiLCIvLyBDaGVjayB0aGF0IHdlIGhhdmUgd2hhdCB3ZSBuZWVkIHRvIG1vdmUgZm9yd2FyZFxuLy8gY2xhc3NsaXN0Pz8/XG52YXIgc3VwcG9ydHMgPSAhIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgJiYgISF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcbmlmICghc3VwcG9ydHMpIHJldHVybjtcblxudmFyIF8gPSByZXF1aXJlKCcuL19saWIuanMnKTtcbnZhciBMb2FkID0gcmVxdWlyZSgnLi9fbG9hZC5qcycpO1xudmFyIGxvYWQgPSBuZXcgTG9hZCgpO1xuXG4vKlxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycpLnRoZW4oZnVuY3Rpb24ocmVnKSB7XG4gICAgY29uc29sZS5sb2coJ1lleSEnLCByZWcpO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBjb25zb2xlLmxvZygnQm9vIScsIGVycik7XG4gIH0pO1xufVxuKi9cblxuLy8gSWYgY3NzLnN1cHBvcnRzIGxvYWQgZXh0cmEgY3NzXG4vLyBhZGQgY2xhc3NlcyBmb3IgY2xpcC1wYXRoIGFuZCBzaGFwZVxudmFyIHN1cHBvcnRzQ1NTID0gZnVuY3Rpb24gKHByb3BlcnR5LCBjbGFzc05hbWUpIHtcbiAgaWYgKENTUy5zdXBwb3J0cyhwcm9wZXJ0eSkpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCduby0nK2NsYXNzTmFtZSk7XG4gIH1cbn07XG5cbmlmIChDU1MgJiYgQ1NTLnN1cHBvcnRzKSB7XG4gIHN1cHBvcnRzQ1NTKCcoc2hhcGUtb3V0c2lkZTogcG9seWdvbigwIDAsIDEwMCUgMCwgMTAwJSAxMDAlLCAwIDgwJSkpIGFuZCAoLXdlYmtpdC1zaGFwZS1vdXRzaWRlOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkgYW5kICgoY2xpcC1wYXRoOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkgb3IgKC13ZWJraXQtY2xpcC1wYXRoOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkpJywgJ2Nzcy1zaGFwZScpO1xufVxubG9hZC5jc3MoWycvYy9iLmNzcyddKTtcblxuLy8gTG9hZCBTVkcgZmlsZXNcbnZhciBzdmdGaWxlcyA9IFsnL2kvaS5zdmcnXTtcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NOYW1lID09PSAnaXgnKSB7XG4gIHN2Z0ZpbGVzLnB1c2goJy9pL3Bvc3Rlci5zdmcnKTtcbn1cbmxvYWQuc3ZnKHN2Z0ZpbGVzKTtcblxuLy8gT24gRE9NQ29udGVudExvYWRlZCBzdGFydCBhZGRpbmcgaW1hZ2VzLCBzdmcsIGFuZCBvdGhlciBhc3NldHNcbl8ucmVhZHkoZnVuY3Rpb24gKCkge1xuICBsb2FkLnJlcGxhY2Uoe1xuICAgIGw6ICc8c3ZnIGNsYXNzPVwibG9nb1wiPjx1c2UgeGxpbms6aHJlZj1cIiNsb2dvXCI+PC91c2U+PC9zdmc+JyxcbiAgICBpZzogJzxzdmcgY2xhc3M9XCJpY29uIGljb24tZ2l0aHViXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZ2l0aHViXCI+PC91c2U+PC9zdmc+JyxcbiAgICBpdDogJzxzdmcgY2xhc3M9XCJpY29uIGljb24tdHdpdHRlclwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXR3aXR0ZXJcIj48L3VzZT48L3N2Zz4nLFxuICAgIGlkOiAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1kcmliYmJsZVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRyaWJiYmxlXCI+PC91c2U+PC9zdmc+JyxcbiAgICBwb3NpOiAnPHN2ZyBjbGFzcz1cInByb2R1Y3QtdGh1bWJcIj48dXNlIHhsaW5rOmhyZWY9XCIjcG9zdGVyXCI+PC91c2U+PC9zdmc+JyxcbiAgICBwOiAnPGltZyBjbGFzcz1cImhlcm8taW1nXCIgc3JjPVwiL2kvcGVja2hhbXNfMjA0OC5qcGdcIj4nLFxuICAgIHBoZDogJzxpbWcgY2xhc3M9XCJoZXJvLWltZ1wiIHNyYz1cIi9pL3BoZF8yMDQ4LmpwZ1wiPicsXG4gICAganRtczogJzxkaXYgZGF0YS1lbWJlZF90eXBlPVwicHJvZHVjdFwiIGRhdGEtc2hvcD1cImx1Y2lkZGVzaWduLm15c2hvcGlmeS5jb21cIiBkYXRhLXByb2R1Y3RfbmFtZT1cIiYjMzk7SmFjayBvZiBhbGwgVHJhZGVzOyBNYXN0ZXIgb2YgU29tZSYjMzk7IFBvc3RlclwiIGRhdGEtcHJvZHVjdF9oYW5kbGU9XCJqYWNrLW9mLWFsbC10cmFkZXMtbWFzdGVyLW9mLXNvbWUtcG9zdGVyXCIgZGF0YS1oYXNfaW1hZ2U9XCJmYWxzZVwiIGRhdGEtZGlzcGxheV9zaXplPVwiY29tcGFjdFwiIGRhdGEtcmVkaXJlY3RfdG89XCJjaGVja291dFwiIGRhdGEtYnV5X2J1dHRvbl90ZXh0PVwiQnV5IHRoZSBwb3N0ZXJcIiBkYXRhLWJ1eV9idXR0b25fb3V0X29mX3N0b2NrX3RleHQ9XCJPdXQgb2YgU3RvY2tcIiBkYXRhLWJ1eV9idXR0b25fcHJvZHVjdF91bmF2YWlsYWJsZV90ZXh0PVwiVW5hdmFpbGFibGVcIiBkYXRhLWJ1dHRvbl9iYWNrZ3JvdW5kX2NvbG9yPVwiZmZmZmZmXCIgZGF0YS1idXR0b25fdGV4dF9jb2xvcj1cIjAzYjllM1wiIGRhdGEtcHJvZHVjdF9tb2RhbD1cImZhbHNlXCIgZGF0YS1wcm9kdWN0X3RpdGxlX2NvbG9yPVwiMDAwMDAwXCIgZGF0YS1uZXh0X3BhZ2VfYnV0dG9uX3RleHQ9XCJOZXh0IHBhZ2VcIj48YSBjbGFzcz1cImJcIiBocmVmPVwiaHR0cHM6Ly9sdWNpZGRlc2lnbi5teXNob3BpZnkuY29tL2NhcnQvMjUzNzcxNDAzNjA6MVwiIHRhcmdldD1cIl9ibGFua1wiPkJ1eSB0aGUgcG9zdGVyPC9hPjwvZGl2PidcbiAgfSk7XG4gIFxuICBsb2FkLmpzKFsnaHR0cHM6Ly93aWRnZXRzLnNob3BpZnlhcHBzLmNvbS9hc3NldHMvd2lkZ2V0cy9lbWJlZC9jbGllbnQuanMnXSk7XG59KTtcblxuLy8gbG9hZCBHQVxuLypcbnZhciBfZ2FxID0gX2dhcSB8fCBbXTtcbl9nYXEucHVzaChbJ19zZXRBY2NvdW50JywgJ1VBLTExMDk1NzU5LTEnXSk7XG5fZ2FxLnB1c2goWydfdHJhY2tQYWdldmlldyddKTtcbihmdW5jdGlvbigpIHtcbiAgdmFyIGdhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7IGdhLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JzsgZ2EuYXN5bmMgPSB0cnVlO1xuICBnYS5zcmMgPSAoJ2h0dHBzOicgPT0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPyAnaHR0cHM6Ly9zc2wnIDogJ2h0dHA6Ly93d3cnKSArICcuZ29vZ2xlLWFuYWx5dGljcy5jb20vZ2EuanMnO1xuICB2YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTsgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShnYSwgcyk7XG59KSgpO1xuKi9cblxuLy8gbG9hZCB0eXBla2l0XG4oZnVuY3Rpb24oZCkge1xuICB2YXIgY29uZmlnID0ge1xuICAgIGtpdElkOiAnYm1uMW9saCcsXG4gICAgc2NyaXB0VGltZW91dDogMzAwMCxcbiAgICBhc3luYzogdHJ1ZVxuICB9LFxuICBoPWQuZG9jdW1lbnRFbGVtZW50LHQ9c2V0VGltZW91dChmdW5jdGlvbigpe2guY2xhc3NOYW1lPWguY2xhc3NOYW1lLnJlcGxhY2UoL1xcYndmLWxvYWRpbmdcXGIvZyxcIlwiKStcIiB3Zi1pbmFjdGl2ZVwiO30sY29uZmlnLnNjcmlwdFRpbWVvdXQpLHRrPWQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSxmPWZhbHNlLHM9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXSxhO2guY2xhc3NOYW1lKz1cIiB3Zi1sb2FkaW5nXCI7dGsuc3JjPSdodHRwczovL3VzZS50eXBla2l0Lm5ldC8nK2NvbmZpZy5raXRJZCsnLmpzJzt0ay5hc3luYz10cnVlO3RrLm9ubG9hZD10ay5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXthPXRoaXMucmVhZHlTdGF0ZTtpZihmfHxhJiZhIT1cImNvbXBsZXRlXCImJmEhPVwibG9hZGVkXCIpcmV0dXJuO2Y9dHJ1ZTtjbGVhclRpbWVvdXQodCk7dHJ5e1R5cGVraXQubG9hZChjb25maWcpfWNhdGNoKGUpe319O3MucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGsscylcbn0pKGRvY3VtZW50KTsiXX0=
