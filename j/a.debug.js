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
load.svg(['/i/i.svg']);

_.ready(function () {
  load.replace({
    ig: '<svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg>',
    it: '<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>',
    id: '<svg class="icon icon-dribbble"><use xlink:href="#icon-dribbble"></use></svg>',
    p: '<img class="hero-img" src="/i/peckhams_2048.jpg">'
  });
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
    kitId: 'jzs7qfl',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
},{"./_lib.js":1,"./_load.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3JjL2pzL19saWIuanMiLCJfc3JjL2pzL19sb2FkLmpzIiwiX3NyYy9qcy9jb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8qXG4gICAgQXJyYXkgRnVuY3Rpb25zXG4gICovXG4gIC8vIEZvciBlYWNoIGl0ZW0gaW4gQXJyYXlcbiAgZWFjaDogZnVuY3Rpb24gKGFyciwgY2FsbGJhY2ssIGN0eCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjdHggPSBjdHggfHwgYXJyW2ldO1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBbYXJyW2ldLCBpXSk7XG4gICAgfVxuICB9LFxuICBcbiAgLy8gRm9yIGVhY2ggaXRlbSBpbiBPYmplY3RcbiAgZWFjaEluOiBmdW5jdGlvbiAob2JqLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgY3R4ID0gY3R4IHx8IG9ialtrXTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBbaywgb2JqW2tdXSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcbiAgLypcbiAgICBET00gRnVuY3Rpb25zXG4gICovXG4gIGluc2VydEFmdGVyOiBmdW5jdGlvbiAoZWwsIHJlZk5vZGUpIHtcbiAgICByZWZOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCByZWZOb2RlLm5leHRTaWJsaW5nKTtcbiAgfSxcbiAgXG4gIC8qXG4gICAgRXZlbnQgRnVuY3Rpb25zXG4gICovXG4gIC8vIFJ1biBjb2RlIHdoZW4gdGhlIHBhZ2UgaXMgcmVhZHlcbiAgcmVhZHk6IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuICAgIFxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07IiwidmFyIF8gPSByZXF1aXJlKCcuL19saWIuanMnKTtcbnZhciBMb2FkID0gZnVuY3Rpb24gKCkge307XG5cbi8qIENTUyAqL1xuTG9hZC5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIHRoaXMuX2NyZWF0ZUFmdGVyKCdsaW5rJywgZmlsZXMsIGZ1bmN0aW9uIChlbCwgZmlsZSkge1xuICAgIGVsLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBlbC5ocmVmID0gZmlsZTtcbiAgICByZXR1cm4gZWw7XG4gIH0pO1xufTtcblxuLyogSlMgKi9cbkxvYWQucHJvdG90eXBlLmpzID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIHRoaXMuX2NyZWF0ZUFmdGVyKCdzY3JpcHQnLCBmaWxlcywgZnVuY3Rpb24gKGVsLCBmaWxlKSB7XG4gICAgZWwuc3JjID0gZmlsZTtcbiAgICBlbC5hc3luYyA9IHRydWU7XG4gICAgcmV0dXJuIGVsO1xuICB9KTtcbn07XG5cbi8qIFNWRyAqL1xuTG9hZC5wcm90b3R5cGUuc3ZnID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIF8uZWFjaChmaWxlcywgZnVuY3Rpb24gKGZpbGUpIHtcbiAgICB0aGlzLl9hamF4U1ZHKGZpbGUpO1xuICB9LCB0aGlzKTtcbn07XG5cbkxvYWQucHJvdG90eXBlLl9hamF4U1ZHID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICBcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRoaXMucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xuICB9KTtcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zb2xlLmxvZygnQUpBWCBFUlJPUjonLCB0aGlzLCBlKTtcbiAgfSk7XG4gIFxuICB4aHIub3BlbihcIkdFVFwiLCBmaWxlLCB0cnVlKTtcbiAgeGhyLnNlbmQoKTtcbn07XG5cbi8qIElNRy9PdGhlciBNYXJrdXAgKi9cbkxvYWQucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgXy5lYWNoSW4oZmlsZXMsIGZ1bmN0aW9uIChpZCwgbWFya3VwKSB7XG4gICAgdGhpcy5yZXBsYWNlTWFya3VwKGlkLCBtYXJrdXApO1xuICB9LCB0aGlzKTtcbn07XG5cbkxvYWQucHJvdG90eXBlLnJlcGxhY2VNYXJrdXAgPSBmdW5jdGlvbiAoaWQsIG1hcmt1cCkge1xuICB2YXIgaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK2lkKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9IG1hcmt1cDtcbiAgICBpLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGRpdi5jaGlsZE5vZGVzWzBdLCBpKTtcbiAgfVxufTtcblxuLyogUFJJVkFURSAqL1xuTG9hZC5wcm90b3R5cGUuX2NyZWF0ZUFmdGVyID0gZnVuY3Rpb24gKHRhZ05hbWUsIGZpbGVzLCBjYWxsYmFjaykge1xuICB2YXIgZmlyc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhZ05hbWUpO1xuICB2YXIgZG9jZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgXG4gIF8uZWFjaChmaWxlcywgZnVuY3Rpb24gKGZpbGUpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGVsID0gY2FsbGJhY2soZWwsIGZpbGUpO1xuICAgIGRvY2ZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICB9KTtcbiAgXG4gIF8uaW5zZXJ0QWZ0ZXIoZG9jZnJhZywgZmlyc3QpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkOyIsIi8vIENoZWNrIHRoYXQgd2UgaGF2ZSB3aGF0IHdlIG5lZWQgdG8gbW92ZSBmb3J3YXJkXG4vLyBjbGFzc2xpc3Q/Pz9cbnZhciBzdXBwb3J0cyA9ICEhZG9jdW1lbnQucXVlcnlTZWxlY3RvciAmJiAhIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuaWYgKCFzdXBwb3J0cykgcmV0dXJuO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vX2xpYi5qcycpO1xudmFyIExvYWQgPSByZXF1aXJlKCcuL19sb2FkLmpzJyk7XG52YXIgbG9hZCA9IG5ldyBMb2FkKCk7XG5cblxuLy8gSWYgY3NzLnN1cHBvcnRzIGxvYWQgZXh0cmEgY3NzXG4vLyBhZGQgY2xhc3NlcyBmb3IgY2xpcC1wYXRoIGFuZCBzaGFwZVxudmFyIHN1cHBvcnRzQ1NTID0gZnVuY3Rpb24gKHByb3BlcnR5LCBjbGFzc05hbWUpIHtcbiAgaWYgKENTUy5zdXBwb3J0cyhwcm9wZXJ0eSkpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCduby0nK2NsYXNzTmFtZSk7XG4gIH1cbn07XG5cbmlmIChDU1MgJiYgQ1NTLnN1cHBvcnRzKSB7XG4gIHN1cHBvcnRzQ1NTKCcoc2hhcGUtb3V0c2lkZTogcG9seWdvbigwIDAsIDEwMCUgMCwgMTAwJSAxMDAlLCAwIDgwJSkpIGFuZCAoLXdlYmtpdC1zaGFwZS1vdXRzaWRlOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkgYW5kICgoY2xpcC1wYXRoOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkgb3IgKC13ZWJraXQtY2xpcC1wYXRoOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkpJywgJ2Nzcy1zaGFwZScpO1xufVxuXG5cbmxvYWQuY3NzKFsnL2MvYi5jc3MnXSk7XG5sb2FkLnN2ZyhbJy9pL2kuc3ZnJ10pO1xuXG5fLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgbG9hZC5yZXBsYWNlKHtcbiAgICBpZzogJzxzdmcgY2xhc3M9XCJpY29uIGljb24tZ2l0aHViXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZ2l0aHViXCI+PC91c2U+PC9zdmc+JyxcbiAgICBpdDogJzxzdmcgY2xhc3M9XCJpY29uIGljb24tdHdpdHRlclwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXR3aXR0ZXJcIj48L3VzZT48L3N2Zz4nLFxuICAgIGlkOiAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1kcmliYmJsZVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRyaWJiYmxlXCI+PC91c2U+PC9zdmc+JyxcbiAgICBwOiAnPGltZyBjbGFzcz1cImhlcm8taW1nXCIgc3JjPVwiL2kvcGVja2hhbXNfMjA0OC5qcGdcIj4nXG4gIH0pO1xufSk7XG5cbi8vIGxvYWQgR0Fcbi8qXG52YXIgX2dhcSA9IF9nYXEgfHwgW107XG5fZ2FxLnB1c2goWydfc2V0QWNjb3VudCcsICdVQS0xMTA5NTc1OS0xJ10pO1xuX2dhcS5wdXNoKFsnX3RyYWNrUGFnZXZpZXcnXSk7XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBnYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOyBnYS50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7IGdhLmFzeW5jID0gdHJ1ZTtcbiAgZ2Euc3JjID0gKCdodHRwczonID09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID8gJ2h0dHBzOi8vc3NsJyA6ICdodHRwOi8vd3d3JykgKyAnLmdvb2dsZS1hbmFseXRpY3MuY29tL2dhLmpzJztcbiAgdmFyIHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07IHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZ2EsIHMpO1xufSkoKTtcbiovXG5cbi8vIGxvYWQgdHlwZWtpdFxuKGZ1bmN0aW9uKGQpIHtcbiAgdmFyIGNvbmZpZyA9IHtcbiAgICBraXRJZDogJ2p6czdxZmwnLFxuICAgIHNjcmlwdFRpbWVvdXQ6IDMwMDAsXG4gICAgYXN5bmM6IHRydWVcbiAgfSxcbiAgaD1kLmRvY3VtZW50RWxlbWVudCx0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtoLmNsYXNzTmFtZT1oLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJ3Zi1sb2FkaW5nXFxiL2csXCJcIikrXCIgd2YtaW5hY3RpdmVcIjt9LGNvbmZpZy5zY3JpcHRUaW1lb3V0KSx0az1kLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksZj1mYWxzZSxzPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF0sYTtoLmNsYXNzTmFtZSs9XCIgd2YtbG9hZGluZ1wiO3RrLnNyYz0naHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvJytjb25maWcua2l0SWQrJy5qcyc7dGsuYXN5bmM9dHJ1ZTt0ay5vbmxvYWQ9dGsub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7YT10aGlzLnJlYWR5U3RhdGU7aWYoZnx8YSYmYSE9XCJjb21wbGV0ZVwiJiZhIT1cImxvYWRlZFwiKXJldHVybjtmPXRydWU7Y2xlYXJUaW1lb3V0KHQpO3RyeXtUeXBla2l0LmxvYWQoY29uZmlnKX1jYXRjaChlKXt9fTtzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRrLHMpXG59KShkb2N1bWVudCk7Il19
