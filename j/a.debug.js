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

/* IMG */
Load.prototype.img = function (files) {
  _.eachIn(files, function (id, markup) {
    this.imgReplace(id, markup);
  }, this);
};

Load.prototype.imgReplace = function (id, markup) {
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
var supports = !!document.querySelector && !!window.addEventListener;
if (!supports) return;

var _ = require('./_lib.js');
var Load = require('./_load.js');
var load = new Load();

load.css(['/c/b.css']);
load.svg(['/i/i.svg']);
_.ready(function () {
  load.img({
    ig: '<svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg>',
    it: '<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>',
    id: '<svg class="icon icon-dribbble"><use xlink:href="#icon-dribbble"></use></svg>',
    p: '<img src="http://placehold.it/1440x600">'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3JjL2pzL19saWIuanMiLCJfc3JjL2pzL19sb2FkLmpzIiwiX3NyYy9qcy9jb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8qXG4gICAgQXJyYXkgRnVuY3Rpb25zXG4gICovXG4gIC8vIEZvciBlYWNoIGl0ZW0gaW4gQXJyYXlcbiAgZWFjaDogZnVuY3Rpb24gKGFyciwgY2FsbGJhY2ssIGN0eCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjdHggPSBjdHggfHwgYXJyW2ldO1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBbYXJyW2ldLCBpXSk7XG4gICAgfVxuICB9LFxuICBcbiAgLy8gRm9yIGVhY2ggaXRlbSBpbiBPYmplY3RcbiAgZWFjaEluOiBmdW5jdGlvbiAob2JqLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgY3R4ID0gY3R4IHx8IG9ialtrXTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBbaywgb2JqW2tdXSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcbiAgLypcbiAgICBET00gRnVuY3Rpb25zXG4gICovXG4gIGluc2VydEFmdGVyOiBmdW5jdGlvbiAoZWwsIHJlZk5vZGUpIHtcbiAgICByZWZOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCByZWZOb2RlLm5leHRTaWJsaW5nKTtcbiAgfSxcbiAgXG4gIC8qXG4gICAgRXZlbnQgRnVuY3Rpb25zXG4gICovXG4gIC8vIFJ1biBjb2RlIHdoZW4gdGhlIHBhZ2UgaXMgcmVhZHlcbiAgcmVhZHk6IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuICAgIFxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07IiwidmFyIF8gPSByZXF1aXJlKCcuL19saWIuanMnKTtcbnZhciBMb2FkID0gZnVuY3Rpb24gKCkge307XG5cbi8qIENTUyAqL1xuTG9hZC5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIHRoaXMuX2NyZWF0ZUFmdGVyKCdsaW5rJywgZmlsZXMsIGZ1bmN0aW9uIChlbCwgZmlsZSkge1xuICAgIGVsLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBlbC5ocmVmID0gZmlsZTtcbiAgICByZXR1cm4gZWw7XG4gIH0pO1xufTtcblxuLyogSlMgKi9cbkxvYWQucHJvdG90eXBlLmpzID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIHRoaXMuX2NyZWF0ZUFmdGVyKCdzY3JpcHQnLCBmaWxlcywgZnVuY3Rpb24gKGVsLCBmaWxlKSB7XG4gICAgZWwuc3JjID0gZmlsZTtcbiAgICBlbC5hc3luYyA9IHRydWU7XG4gICAgcmV0dXJuIGVsO1xuICB9KTtcbn07XG5cbi8qIFNWRyAqL1xuTG9hZC5wcm90b3R5cGUuc3ZnID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIF8uZWFjaChmaWxlcywgZnVuY3Rpb24gKGZpbGUpIHtcbiAgICB0aGlzLl9hamF4U1ZHKGZpbGUpO1xuICB9LCB0aGlzKTtcbn07XG5cbkxvYWQucHJvdG90eXBlLl9hamF4U1ZHID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICBcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRoaXMucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xuICB9KTtcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zb2xlLmxvZygnQUpBWCBFUlJPUjonLCB0aGlzLCBlKTtcbiAgfSk7XG4gIFxuICB4aHIub3BlbihcIkdFVFwiLCBmaWxlLCB0cnVlKTtcbiAgeGhyLnNlbmQoKTtcbn07XG5cbi8qIElNRyAqL1xuTG9hZC5wcm90b3R5cGUuaW1nID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIF8uZWFjaEluKGZpbGVzLCBmdW5jdGlvbiAoaWQsIG1hcmt1cCkge1xuICAgIHRoaXMuaW1nUmVwbGFjZShpZCwgbWFya3VwKTtcbiAgfSwgdGhpcyk7XG59O1xuXG5Mb2FkLnByb3RvdHlwZS5pbWdSZXBsYWNlID0gZnVuY3Rpb24gKGlkLCBtYXJrdXApIHtcbiAgdmFyIGkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytpZCk7XG4gIGlmIChpKSB7XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBtYXJrdXA7XG4gICAgaS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChkaXYuY2hpbGROb2Rlc1swXSwgaSk7XG4gIH1cbn07XG5cbi8qIFBSSVZBVEUgKi9cbkxvYWQucHJvdG90eXBlLl9jcmVhdGVBZnRlciA9IGZ1bmN0aW9uICh0YWdOYW1lLCBmaWxlcywgY2FsbGJhY2spIHtcbiAgdmFyIGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YWdOYW1lKTtcbiAgdmFyIGRvY2ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIFxuICBfLmVhY2goZmlsZXMsIGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBlbCA9IGNhbGxiYWNrKGVsLCBmaWxlKTtcbiAgICBkb2NmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgfSk7XG4gIFxuICBfLmluc2VydEFmdGVyKGRvY2ZyYWcsIGZpcnN0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZDsiLCIvLyBDaGVjayB0aGF0IHdlIGhhdmUgd2hhdCB3ZSBuZWVkIHRvIG1vdmUgZm9yd2FyZFxudmFyIHN1cHBvcnRzID0gISFkb2N1bWVudC5xdWVyeVNlbGVjdG9yICYmICEhd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG5pZiAoIXN1cHBvcnRzKSByZXR1cm47XG5cbnZhciBfID0gcmVxdWlyZSgnLi9fbGliLmpzJyk7XG52YXIgTG9hZCA9IHJlcXVpcmUoJy4vX2xvYWQuanMnKTtcbnZhciBsb2FkID0gbmV3IExvYWQoKTtcblxubG9hZC5jc3MoWycvYy9iLmNzcyddKTtcbmxvYWQuc3ZnKFsnL2kvaS5zdmcnXSk7XG5fLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgbG9hZC5pbWcoe1xuICAgIGlnOiAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi1naXRodWJcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1naXRodWJcIj48L3VzZT48L3N2Zz4nLFxuICAgIGl0OiAnPHN2ZyBjbGFzcz1cImljb24gaWNvbi10d2l0dGVyXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tdHdpdHRlclwiPjwvdXNlPjwvc3ZnPicsXG4gICAgaWQ6ICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRyaWJiYmxlXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZHJpYmJibGVcIj48L3VzZT48L3N2Zz4nLFxuICAgIHA6ICc8aW1nIHNyYz1cImh0dHA6Ly9wbGFjZWhvbGQuaXQvMTQ0MHg2MDBcIj4nXG4gIH0pO1xufSk7XG5cbi8vIGxvYWQgR0Fcbi8qXG52YXIgX2dhcSA9IF9nYXEgfHwgW107XG5fZ2FxLnB1c2goWydfc2V0QWNjb3VudCcsICdVQS0xMTA5NTc1OS0xJ10pO1xuX2dhcS5wdXNoKFsnX3RyYWNrUGFnZXZpZXcnXSk7XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBnYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOyBnYS50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7IGdhLmFzeW5jID0gdHJ1ZTtcbiAgZ2Euc3JjID0gKCdodHRwczonID09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID8gJ2h0dHBzOi8vc3NsJyA6ICdodHRwOi8vd3d3JykgKyAnLmdvb2dsZS1hbmFseXRpY3MuY29tL2dhLmpzJztcbiAgdmFyIHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07IHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZ2EsIHMpO1xufSkoKTtcbiovXG5cbi8vIGxvYWQgdHlwZWtpdFxuKGZ1bmN0aW9uKGQpIHtcbiAgdmFyIGNvbmZpZyA9IHtcbiAgICBraXRJZDogJ2p6czdxZmwnLFxuICAgIHNjcmlwdFRpbWVvdXQ6IDMwMDAsXG4gICAgYXN5bmM6IHRydWVcbiAgfSxcbiAgaD1kLmRvY3VtZW50RWxlbWVudCx0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtoLmNsYXNzTmFtZT1oLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJ3Zi1sb2FkaW5nXFxiL2csXCJcIikrXCIgd2YtaW5hY3RpdmVcIjt9LGNvbmZpZy5zY3JpcHRUaW1lb3V0KSx0az1kLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksZj1mYWxzZSxzPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF0sYTtoLmNsYXNzTmFtZSs9XCIgd2YtbG9hZGluZ1wiO3RrLnNyYz0naHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvJytjb25maWcua2l0SWQrJy5qcyc7dGsuYXN5bmM9dHJ1ZTt0ay5vbmxvYWQ9dGsub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7YT10aGlzLnJlYWR5U3RhdGU7aWYoZnx8YSYmYSE9XCJjb21wbGV0ZVwiJiZhIT1cImxvYWRlZFwiKXJldHVybjtmPXRydWU7Y2xlYXJUaW1lb3V0KHQpO3RyeXtUeXBla2l0LmxvYWQoY29uZmlnKX1jYXRjaChlKXt9fTtzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRrLHMpXG59KShkb2N1bWVudCk7Il19
