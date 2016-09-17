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
// Cutting the mustard
if (!document.querySelector) return;

/*
// Register our service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
*/

/*
// Service worker debug - REMOVE WHEN WORKING
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log('Yey!', reg);
  }).catch(function(err) {
    console.log('Boo!', err);
  });
}
*/

// Require the loader modual
window._ = _ = require('./_lib.js');
var Load = require('./_load.js');
window.loader = load = new Load();

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
    jtms: '<a class="b" id="jtms" href="https://luciddesign.myshopify.com/cart/25377140360:1" target="_blank">Buy the poster</a>'
  });
});

// load the extra css
load.css(['/c/b.css']);

// Load SVG files
var svgFiles = ['/i/i.svg'];
if (document.querySelector('body').className === 'ix') {
  svgFiles.push('/i/poster.svg');
}
load.svg(svgFiles);

// Load vendor scripts
if (location.search !== '?vendor=false') {
  load.js(['/j/b.js']); 
}

// If we have CSS.supports and classList then add classes for clip-path and shape
if (!CSS && !CSS.supports && !("classList" in document.createElement("p"))) return;

var supportsCSS = function (property, className) {
  if (CSS.supports(property)) {
    document.documentElement.classList.add(className);
  } else {
    document.documentElement.classList.add('no-'+className);
  }
};

supportsCSS('(shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and (-webkit-shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and ((clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)) or (-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)))', 'css-shape');
},{"./_lib.js":1,"./_load.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3JjL2pzL19saWIuanMiLCJfc3JjL2pzL19sb2FkLmpzIiwiX3NyYy9qcy9jb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8qXG4gICAgQXJyYXkgRnVuY3Rpb25zXG4gICovXG4gIC8vIEZvciBlYWNoIGl0ZW0gaW4gQXJyYXlcbiAgZWFjaDogZnVuY3Rpb24gKGFyciwgY2FsbGJhY2ssIGN0eCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjdHggPSBjdHggfHwgYXJyW2ldO1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBbYXJyW2ldLCBpXSk7XG4gICAgfVxuICB9LFxuICBcbiAgLy8gRm9yIGVhY2ggaXRlbSBpbiBPYmplY3RcbiAgZWFjaEluOiBmdW5jdGlvbiAob2JqLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgY3R4ID0gY3R4IHx8IG9ialtrXTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBbaywgb2JqW2tdXSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcbiAgLypcbiAgICBET00gRnVuY3Rpb25zXG4gICovXG4gIGluc2VydEFmdGVyOiBmdW5jdGlvbiAoZWwsIHJlZk5vZGUpIHtcbiAgICByZWZOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCByZWZOb2RlLm5leHRTaWJsaW5nKTtcbiAgfSxcbiAgXG4gIC8qXG4gICAgRXZlbnQgRnVuY3Rpb25zXG4gICovXG4gIC8vIFJ1biBjb2RlIHdoZW4gdGhlIHBhZ2UgaXMgcmVhZHlcbiAgcmVhZHk6IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuICAgIFxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07IiwidmFyIF8gPSByZXF1aXJlKCcuL19saWIuanMnKTtcbnZhciBMb2FkID0gZnVuY3Rpb24gKCkge307XG5cbi8qIENTUyAqL1xuTG9hZC5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIHRoaXMuX2NyZWF0ZUFmdGVyKCdsaW5rJywgZmlsZXMsIGZ1bmN0aW9uIChlbCwgZmlsZSkge1xuICAgIGVsLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBlbC5ocmVmID0gZmlsZTtcbiAgICByZXR1cm4gZWw7XG4gIH0pO1xufTtcblxuLyogSlMgKi9cbkxvYWQucHJvdG90eXBlLmpzID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIHRoaXMuX2NyZWF0ZUFmdGVyKCdzY3JpcHQnLCBmaWxlcywgZnVuY3Rpb24gKGVsLCBmaWxlKSB7XG4gICAgZWwuc3JjID0gZmlsZTtcbiAgICBlbC5hc3luYyA9IHRydWU7XG4gICAgcmV0dXJuIGVsO1xuICB9KTtcbn07XG5cbi8qIFNWRyAqL1xuTG9hZC5wcm90b3R5cGUuc3ZnID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIF8uZWFjaChmaWxlcywgZnVuY3Rpb24gKGZpbGUpIHtcbiAgICB0aGlzLl9hamF4U1ZHKGZpbGUpO1xuICB9LCB0aGlzKTtcbn07XG5cbkxvYWQucHJvdG90eXBlLl9hamF4U1ZHID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICBcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRoaXMucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xuICB9KTtcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zb2xlLmxvZygnQUpBWCBFUlJPUjonLCB0aGlzLCBlKTtcbiAgfSk7XG4gIFxuICB4aHIub3BlbihcIkdFVFwiLCBmaWxlLCB0cnVlKTtcbiAgeGhyLnNlbmQoKTtcbn07XG5cbi8qIElNRy9PdGhlciBNYXJrdXAgKi9cbkxvYWQucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgXy5lYWNoSW4oZmlsZXMsIGZ1bmN0aW9uIChpZCwgbWFya3VwKSB7XG4gICAgdGhpcy5yZXBsYWNlTWFya3VwKGlkLCBtYXJrdXApO1xuICB9LCB0aGlzKTtcbn07XG5cbkxvYWQucHJvdG90eXBlLnJlcGxhY2VNYXJrdXAgPSBmdW5jdGlvbiAoaWQsIG1hcmt1cCkge1xuICB2YXIgaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK2lkKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9IG1hcmt1cDtcbiAgICBpLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGRpdi5jaGlsZE5vZGVzWzBdLCBpKTtcbiAgfVxufTtcblxuLyogUFJJVkFURSAqL1xuTG9hZC5wcm90b3R5cGUuX2NyZWF0ZUFmdGVyID0gZnVuY3Rpb24gKHRhZ05hbWUsIGZpbGVzLCBjYWxsYmFjaykge1xuICB2YXIgZmlyc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhZ05hbWUpO1xuICB2YXIgZG9jZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgXG4gIF8uZWFjaChmaWxlcywgZnVuY3Rpb24gKGZpbGUpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGVsID0gY2FsbGJhY2soZWwsIGZpbGUpO1xuICAgIGRvY2ZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICB9KTtcbiAgXG4gIF8uaW5zZXJ0QWZ0ZXIoZG9jZnJhZywgZmlyc3QpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkOyIsIi8vIEN1dHRpbmcgdGhlIG11c3RhcmRcbmlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcikgcmV0dXJuO1xuXG4vKlxuLy8gUmVnaXN0ZXIgb3VyIHNlcnZpY2Ugd29ya2VyXG5pZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL3N3LmpzJyk7XG59XG4qL1xuXG4vKlxuLy8gU2VydmljZSB3b3JrZXIgZGVidWcgLSBSRU1PVkUgV0hFTiBXT1JLSU5HXG5pZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL3N3LmpzJykudGhlbihmdW5jdGlvbihyZWcpIHtcbiAgICBjb25zb2xlLmxvZygnWWV5IScsIHJlZyk7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgIGNvbnNvbGUubG9nKCdCb28hJywgZXJyKTtcbiAgfSk7XG59XG4qL1xuXG4vLyBSZXF1aXJlIHRoZSBsb2FkZXIgbW9kdWFsXG53aW5kb3cuXyA9IF8gPSByZXF1aXJlKCcuL19saWIuanMnKTtcbnZhciBMb2FkID0gcmVxdWlyZSgnLi9fbG9hZC5qcycpO1xud2luZG93LmxvYWRlciA9IGxvYWQgPSBuZXcgTG9hZCgpO1xuXG4vLyBPbiBET01Db250ZW50TG9hZGVkIHN0YXJ0IGFkZGluZyBpbWFnZXMsIHN2ZywgYW5kIG90aGVyIGFzc2V0c1xuXy5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIGxvYWQucmVwbGFjZSh7XG4gICAgbDogJzxzdmcgY2xhc3M9XCJsb2dvXCI+PHVzZSB4bGluazpocmVmPVwiI2xvZ29cIj48L3VzZT48L3N2Zz4nLFxuICAgIGlnOiAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1naXRodWJcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1naXRodWJcIj48L3VzZT48L3N2Zz4nLFxuICAgIGl0OiAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi10d2l0dGVyXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tdHdpdHRlclwiPjwvdXNlPjwvc3ZnPicsXG4gICAgaWQ6ICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRyaWJiYmxlXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZHJpYmJibGVcIj48L3VzZT48L3N2Zz4nLFxuICAgIHBvc2k6ICc8c3ZnIGNsYXNzPVwicHJvZHVjdC10aHVtYlwiPjx1c2UgeGxpbms6aHJlZj1cIiNwb3N0ZXJcIj48L3VzZT48L3N2Zz4nLFxuICAgIHA6ICc8aW1nIGNsYXNzPVwiaGVyby1pbWdcIiBzcmM9XCIvaS9wZWNraGFtc18yMDQ4LmpwZ1wiPicsXG4gICAgcGhkOiAnPGltZyBjbGFzcz1cImhlcm8taW1nXCIgc3JjPVwiL2kvcGhkXzIwNDguanBnXCI+JyxcbiAgICBqdG1zOiAnPGEgY2xhc3M9XCJiXCIgaWQ9XCJqdG1zXCIgaHJlZj1cImh0dHBzOi8vbHVjaWRkZXNpZ24ubXlzaG9waWZ5LmNvbS9jYXJ0LzI1Mzc3MTQwMzYwOjFcIiB0YXJnZXQ9XCJfYmxhbmtcIj5CdXkgdGhlIHBvc3RlcjwvYT4nXG4gIH0pO1xufSk7XG5cbi8vIGxvYWQgdGhlIGV4dHJhIGNzc1xubG9hZC5jc3MoWycvYy9iLmNzcyddKTtcblxuLy8gTG9hZCBTVkcgZmlsZXNcbnZhciBzdmdGaWxlcyA9IFsnL2kvaS5zdmcnXTtcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NOYW1lID09PSAnaXgnKSB7XG4gIHN2Z0ZpbGVzLnB1c2goJy9pL3Bvc3Rlci5zdmcnKTtcbn1cbmxvYWQuc3ZnKHN2Z0ZpbGVzKTtcblxuLy8gTG9hZCB2ZW5kb3Igc2NyaXB0c1xuaWYgKGxvY2F0aW9uLnNlYXJjaCAhPT0gJz92ZW5kb3I9ZmFsc2UnKSB7XG4gIGxvYWQuanMoWycvai9iLmpzJ10pOyBcbn1cblxuLy8gSWYgd2UgaGF2ZSBDU1Muc3VwcG9ydHMgYW5kIGNsYXNzTGlzdCB0aGVuIGFkZCBjbGFzc2VzIGZvciBjbGlwLXBhdGggYW5kIHNoYXBlXG5pZiAoIUNTUyAmJiAhQ1NTLnN1cHBvcnRzICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSkpIHJldHVybjtcblxudmFyIHN1cHBvcnRzQ1NTID0gZnVuY3Rpb24gKHByb3BlcnR5LCBjbGFzc05hbWUpIHtcbiAgaWYgKENTUy5zdXBwb3J0cyhwcm9wZXJ0eSkpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCduby0nK2NsYXNzTmFtZSk7XG4gIH1cbn07XG5cbnN1cHBvcnRzQ1NTKCcoc2hhcGUtb3V0c2lkZTogcG9seWdvbigwIDAsIDEwMCUgMCwgMTAwJSAxMDAlLCAwIDgwJSkpIGFuZCAoLXdlYmtpdC1zaGFwZS1vdXRzaWRlOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkgYW5kICgoY2xpcC1wYXRoOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkgb3IgKC13ZWJraXQtY2xpcC1wYXRoOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkpJywgJ2Nzcy1zaGFwZScpOyJdfQ==
