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
  var div = document.createElement('div');
  div.innerHTML = markup;
  i.parentNode.replaceChild(div.childNodes[0], i);
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
},{"./_load.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3JjL2pzL19saWIuanMiLCJfc3JjL2pzL19sb2FkLmpzIiwiX3NyYy9qcy9jb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvKlxuICAgIEFycmF5IEZ1bmN0aW9uc1xuICAqL1xuICAvLyBGb3IgZWFjaCBpdGVtIGluIEFycmF5XG4gIGVhY2g6IGZ1bmN0aW9uIChhcnIsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgY3R4ID0gY3R4IHx8IGFycltpXTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgW2FycltpXSwgaV0pO1xuICAgIH1cbiAgfSxcbiAgXG4gIC8vIEZvciBlYWNoIGl0ZW0gaW4gT2JqZWN0XG4gIGVhY2hJbjogZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2ssIGN0eCkge1xuICAgIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIGN0eCA9IGN0eCB8fCBvYmpba107XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgW2ssIG9ialtrXV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXG4gIC8qXG4gICAgRE9NIEZ1bmN0aW9uc1xuICAqL1xuICBpbnNlcnRBZnRlcjogZnVuY3Rpb24gKGVsLCByZWZOb2RlKSB7XG4gICAgcmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgcmVmTm9kZS5uZXh0U2libGluZyk7XG4gIH0sXG4gIFxuICAvKlxuICAgIEV2ZW50IEZ1bmN0aW9uc1xuICAqL1xuICAvLyBSdW4gY29kZSB3aGVuIHRoZSBwYWdlIGlzIHJlYWR5XG4gIHJlYWR5OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHJldHVybjtcbiAgICBcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjay5hcHBseShjdHgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59OyIsInZhciBfID0gcmVxdWlyZSgnLi9fbGliLmpzJyk7XG52YXIgTG9hZCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vKiBDU1MgKi9cbkxvYWQucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uIChmaWxlcykge1xuICB0aGlzLl9jcmVhdGVBZnRlcignbGluaycsIGZpbGVzLCBmdW5jdGlvbiAoZWwsIGZpbGUpIHtcbiAgICBlbC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgZWwuaHJlZiA9IGZpbGU7XG4gICAgcmV0dXJuIGVsO1xuICB9KTtcbn07XG5cbi8qIEpTICovXG5Mb2FkLnByb3RvdHlwZS5qcyA9IGZ1bmN0aW9uIChmaWxlcykge1xuICB0aGlzLl9jcmVhdGVBZnRlcignc2NyaXB0JywgZmlsZXMsIGZ1bmN0aW9uIChlbCwgZmlsZSkge1xuICAgIGVsLnNyYyA9IGZpbGU7XG4gICAgcmV0dXJuIGVsO1xuICB9KTtcbn07XG5cbi8qIFNWRyAqL1xuTG9hZC5wcm90b3R5cGUuc3ZnID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIF8uZWFjaChmaWxlcywgZnVuY3Rpb24gKGZpbGUpIHtcbiAgICB0aGlzLl9hamF4U1ZHKGZpbGUpO1xuICB9LCB0aGlzKTtcbn07XG5cbkxvYWQucHJvdG90eXBlLl9hamF4U1ZHID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICBcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRoaXMucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xuICB9KTtcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zb2xlLmxvZygnQUpBWCBFUlJPUjonLCB0aGlzLCBlKTtcbiAgfSk7XG4gIFxuICB4aHIub3BlbihcIkdFVFwiLCBmaWxlLCB0cnVlKTtcbiAgeGhyLnNlbmQoKTtcbn07XG5cbi8qIElNRyAqL1xuTG9hZC5wcm90b3R5cGUuaW1nID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIF8uZWFjaEluKGZpbGVzLCBmdW5jdGlvbiAoaWQsIG1hcmt1cCkge1xuICAgIHRoaXMuaW1nUmVwbGFjZShpZCwgbWFya3VwKTtcbiAgfSwgdGhpcyk7XG59O1xuXG5Mb2FkLnByb3RvdHlwZS5pbWdSZXBsYWNlID0gZnVuY3Rpb24gKGlkLCBtYXJrdXApIHtcbiAgdmFyIGkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytpZCk7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmlubmVySFRNTCA9IG1hcmt1cDtcbiAgaS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChkaXYuY2hpbGROb2Rlc1swXSwgaSk7XG59O1xuXG4vKiBQUklWQVRFICovXG5Mb2FkLnByb3RvdHlwZS5fY3JlYXRlQWZ0ZXIgPSBmdW5jdGlvbiAodGFnTmFtZSwgZmlsZXMsIGNhbGxiYWNrKSB7XG4gIHZhciBmaXJzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFnTmFtZSk7XG4gIHZhciBkb2NmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBcbiAgXy5lYWNoKGZpbGVzLCBmdW5jdGlvbiAoZmlsZSkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgZWwgPSBjYWxsYmFjayhlbCwgZmlsZSk7XG4gICAgZG9jZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gIH0pO1xuICBcbiAgXy5pbnNlcnRBZnRlcihkb2NmcmFnLCBmaXJzdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWQ7IiwiLy8gQ2hlY2sgdGhhdCB3ZSBoYXZlIHdoYXQgd2UgbmVlZCB0byBtb3ZlIGZvcndhcmRcbnZhciBzdXBwb3J0cyA9ICEhZG9jdW1lbnQucXVlcnlTZWxlY3RvciAmJiAhIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuaWYgKCFzdXBwb3J0cykgcmV0dXJuO1xuXG4vLyB2YXIgXyA9IHJlcXVpcmUoJy4vX2xpYi5qcycpO1xudmFyIExvYWQgPSByZXF1aXJlKCcuL19sb2FkLmpzJyk7XG52YXIgbG9hZCA9IG5ldyBMb2FkKCk7XG5cbmxvYWQuY3NzKFsnL2MvYi5jc3MnXSk7XG5sb2FkLnN2ZyhbJy9pL2kuc3ZnJ10pO1xubG9hZC5pbWcoe1xuICBpZzogJzxzdmcgY2xhc3M9XCJpY29uIGljb24tZ2l0aHViXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZ2l0aHViXCI+PC91c2U+PC9zdmc+JyxcbiAgaXQ6ICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXR3aXR0ZXJcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi10d2l0dGVyXCI+PC91c2U+PC9zdmc+JyxcbiAgaWQ6ICc8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRyaWJiYmxlXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZHJpYmJibGVcIj48L3VzZT48L3N2Zz4nXG59KTsiXX0=
