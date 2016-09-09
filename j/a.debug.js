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
    l: '<svg class="logo"><use xlink:href="#logo"></use></svg>',
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
    kitId: 'bmn1olh',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
},{"./_lib.js":1,"./_load.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3JjL2pzL19saWIuanMiLCJfc3JjL2pzL19sb2FkLmpzIiwiX3NyYy9qcy9jb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLypcbiAgICBBcnJheSBGdW5jdGlvbnNcbiAgKi9cbiAgLy8gRm9yIGVhY2ggaXRlbSBpbiBBcnJheVxuICBlYWNoOiBmdW5jdGlvbiAoYXJyLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN0eCA9IGN0eCB8fCBhcnJbaV07XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgsIFthcnJbaV0sIGldKTtcbiAgICB9XG4gIH0sXG4gIFxuICAvLyBGb3IgZWFjaCBpdGVtIGluIE9iamVjdFxuICBlYWNoSW46IGZ1bmN0aW9uIChvYmosIGNhbGxiYWNrLCBjdHgpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBjdHggPSBjdHggfHwgb2JqW2tdO1xuICAgICAgICBjYWxsYmFjay5hcHBseShjdHgsIFtrLCBvYmpba11dKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFxuICAvKlxuICAgIERPTSBGdW5jdGlvbnNcbiAgKi9cbiAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChlbCwgcmVmTm9kZSkge1xuICAgIHJlZk5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHJlZk5vZGUubmV4dFNpYmxpbmcpO1xuICB9LFxuICBcbiAgLypcbiAgICBFdmVudCBGdW5jdGlvbnNcbiAgKi9cbiAgLy8gUnVuIGNvZGUgd2hlbiB0aGUgcGFnZSBpcyByZWFkeVxuICByZWFkeTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjdHgpIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XG4gICAgXG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoY3R4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTsiLCJ2YXIgXyA9IHJlcXVpcmUoJy4vX2xpYi5qcycpO1xudmFyIExvYWQgPSBmdW5jdGlvbiAoKSB7fTtcblxuLyogQ1NTICovXG5Mb2FkLnByb3RvdHlwZS5jc3MgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgdGhpcy5fY3JlYXRlQWZ0ZXIoJ2xpbmsnLCBmaWxlcywgZnVuY3Rpb24gKGVsLCBmaWxlKSB7XG4gICAgZWwucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGVsLmhyZWYgPSBmaWxlO1xuICAgIHJldHVybiBlbDtcbiAgfSk7XG59O1xuXG4vKiBKUyAqL1xuTG9hZC5wcm90b3R5cGUuanMgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgdGhpcy5fY3JlYXRlQWZ0ZXIoJ3NjcmlwdCcsIGZpbGVzLCBmdW5jdGlvbiAoZWwsIGZpbGUpIHtcbiAgICBlbC5zcmMgPSBmaWxlO1xuICAgIGVsLmFzeW5jID0gdHJ1ZTtcbiAgICByZXR1cm4gZWw7XG4gIH0pO1xufTtcblxuLyogU1ZHICovXG5Mb2FkLnByb3RvdHlwZS5zdmcgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgXy5lYWNoKGZpbGVzLCBmdW5jdGlvbiAoZmlsZSkge1xuICAgIHRoaXMuX2FqYXhTVkcoZmlsZSk7XG4gIH0sIHRoaXMpO1xufTtcblxuTG9hZC5wcm90b3R5cGUuX2FqYXhTVkcgPSBmdW5jdGlvbiAoZmlsZSkge1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIFxuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUodGhpcy5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XG4gIH0pO1xuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnNvbGUubG9nKCdBSkFYIEVSUk9SOicsIHRoaXMsIGUpO1xuICB9KTtcbiAgXG4gIHhoci5vcGVuKFwiR0VUXCIsIGZpbGUsIHRydWUpO1xuICB4aHIuc2VuZCgpO1xufTtcblxuLyogSU1HL090aGVyIE1hcmt1cCAqL1xuTG9hZC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChmaWxlcykge1xuICBfLmVhY2hJbihmaWxlcywgZnVuY3Rpb24gKGlkLCBtYXJrdXApIHtcbiAgICB0aGlzLnJlcGxhY2VNYXJrdXAoaWQsIG1hcmt1cCk7XG4gIH0sIHRoaXMpO1xufTtcblxuTG9hZC5wcm90b3R5cGUucmVwbGFjZU1hcmt1cCA9IGZ1bmN0aW9uIChpZCwgbWFya3VwKSB7XG4gIHZhciBpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycraWQpO1xuICBpZiAoaSkge1xuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gbWFya3VwO1xuICAgIGkucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZGl2LmNoaWxkTm9kZXNbMF0sIGkpO1xuICB9XG59O1xuXG4vKiBQUklWQVRFICovXG5Mb2FkLnByb3RvdHlwZS5fY3JlYXRlQWZ0ZXIgPSBmdW5jdGlvbiAodGFnTmFtZSwgZmlsZXMsIGNhbGxiYWNrKSB7XG4gIHZhciBmaXJzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFnTmFtZSk7XG4gIHZhciBkb2NmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBcbiAgXy5lYWNoKGZpbGVzLCBmdW5jdGlvbiAoZmlsZSkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgZWwgPSBjYWxsYmFjayhlbCwgZmlsZSk7XG4gICAgZG9jZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gIH0pO1xuICBcbiAgXy5pbnNlcnRBZnRlcihkb2NmcmFnLCBmaXJzdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWQ7IiwiLy8gQ2hlY2sgdGhhdCB3ZSBoYXZlIHdoYXQgd2UgbmVlZCB0byBtb3ZlIGZvcndhcmRcbi8vIGNsYXNzbGlzdD8/P1xudmFyIHN1cHBvcnRzID0gISFkb2N1bWVudC5xdWVyeVNlbGVjdG9yICYmICEhd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG5pZiAoIXN1cHBvcnRzKSByZXR1cm47XG5cbnZhciBfID0gcmVxdWlyZSgnLi9fbGliLmpzJyk7XG52YXIgTG9hZCA9IHJlcXVpcmUoJy4vX2xvYWQuanMnKTtcbnZhciBsb2FkID0gbmV3IExvYWQoKTtcblxuXG4vLyBJZiBjc3Muc3VwcG9ydHMgbG9hZCBleHRyYSBjc3Ncbi8vIGFkZCBjbGFzc2VzIGZvciBjbGlwLXBhdGggYW5kIHNoYXBlXG52YXIgc3VwcG9ydHNDU1MgPSBmdW5jdGlvbiAocHJvcGVydHksIGNsYXNzTmFtZSkge1xuICBpZiAoQ1NTLnN1cHBvcnRzKHByb3BlcnR5KSkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ25vLScrY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuaWYgKENTUyAmJiBDU1Muc3VwcG9ydHMpIHtcbiAgc3VwcG9ydHNDU1MoJyhzaGFwZS1vdXRzaWRlOiBwb2x5Z29uKDAgMCwgMTAwJSAwLCAxMDAlIDEwMCUsIDAgODAlKSkgYW5kICgtd2Via2l0LXNoYXBlLW91dHNpZGU6IHBvbHlnb24oMCAwLCAxMDAlIDAsIDEwMCUgMTAwJSwgMCA4MCUpKSBhbmQgKChjbGlwLXBhdGg6IHBvbHlnb24oMCAwLCAxMDAlIDAsIDEwMCUgMTAwJSwgMCA4MCUpKSBvciAoLXdlYmtpdC1jbGlwLXBhdGg6IHBvbHlnb24oMCAwLCAxMDAlIDAsIDEwMCUgMTAwJSwgMCA4MCUpKSknLCAnY3NzLXNoYXBlJyk7XG59XG5cblxubG9hZC5jc3MoWycvYy9iLmNzcyddKTtcbmxvYWQuc3ZnKFsnL2kvaS5zdmcnXSk7XG5cbl8ucmVhZHkoZnVuY3Rpb24gKCkge1xuICBsb2FkLnJlcGxhY2Uoe1xuICAgIGw6ICc8c3ZnIGNsYXNzPVwibG9nb1wiPjx1c2UgeGxpbms6aHJlZj1cIiNsb2dvXCI+PC91c2U+PC9zdmc+JyxcbiAgICBpZzogJzxzdmcgY2xhc3M9XCJpY29uIGljb24tZ2l0aHViXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZ2l0aHViXCI+PC91c2U+PC9zdmc+JyxcbiAgICBpdDogJzxzdmcgY2xhc3M9XCJpY29uIGljb24tdHdpdHRlclwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXR3aXR0ZXJcIj48L3VzZT48L3N2Zz4nLFxuICAgIGlkOiAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1kcmliYmJsZVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRyaWJiYmxlXCI+PC91c2U+PC9zdmc+JyxcbiAgICBwOiAnPGltZyBjbGFzcz1cImhlcm8taW1nXCIgc3JjPVwiL2kvcGVja2hhbXNfMjA0OC5qcGdcIj4nXG4gIH0pO1xufSk7XG5cbi8vIGxvYWQgR0Fcbi8qXG52YXIgX2dhcSA9IF9nYXEgfHwgW107XG5fZ2FxLnB1c2goWydfc2V0QWNjb3VudCcsICdVQS0xMTA5NTc1OS0xJ10pO1xuX2dhcS5wdXNoKFsnX3RyYWNrUGFnZXZpZXcnXSk7XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBnYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOyBnYS50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7IGdhLmFzeW5jID0gdHJ1ZTtcbiAgZ2Euc3JjID0gKCdodHRwczonID09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID8gJ2h0dHBzOi8vc3NsJyA6ICdodHRwOi8vd3d3JykgKyAnLmdvb2dsZS1hbmFseXRpY3MuY29tL2dhLmpzJztcbiAgdmFyIHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07IHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZ2EsIHMpO1xufSkoKTtcbiovXG5cbi8vIGxvYWQgdHlwZWtpdFxuKGZ1bmN0aW9uKGQpIHtcbiAgdmFyIGNvbmZpZyA9IHtcbiAgICBraXRJZDogJ2JtbjFvbGgnLFxuICAgIHNjcmlwdFRpbWVvdXQ6IDMwMDAsXG4gICAgYXN5bmM6IHRydWVcbiAgfSxcbiAgaD1kLmRvY3VtZW50RWxlbWVudCx0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtoLmNsYXNzTmFtZT1oLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJ3Zi1sb2FkaW5nXFxiL2csXCJcIikrXCIgd2YtaW5hY3RpdmVcIjt9LGNvbmZpZy5zY3JpcHRUaW1lb3V0KSx0az1kLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksZj1mYWxzZSxzPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF0sYTtoLmNsYXNzTmFtZSs9XCIgd2YtbG9hZGluZ1wiO3RrLnNyYz0naHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvJytjb25maWcua2l0SWQrJy5qcyc7dGsuYXN5bmM9dHJ1ZTt0ay5vbmxvYWQ9dGsub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7YT10aGlzLnJlYWR5U3RhdGU7aWYoZnx8YSYmYSE9XCJjb21wbGV0ZVwiJiZhIT1cImxvYWRlZFwiKXJldHVybjtmPXRydWU7Y2xlYXJUaW1lb3V0KHQpO3RyeXtUeXBla2l0LmxvYWQoY29uZmlnKX1jYXRjaChlKXt9fTtzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRrLHMpXG59KShkb2N1bWVudCk7Il19
