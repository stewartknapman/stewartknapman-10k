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
        callback.apply(ctx, [obj[k], k]);
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

var LoadCSS = function (files) {
  this.files = files;
  this.load();
};

LoadCSS.prototype.load = function () {
  var first = document.querySelector('link');
  var docfrag = document.createDocumentFragment();
  
  _.each(this.files, function (file) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = file;
    docfrag.appendChild(link);
  });
  
  _.insertAfter(docfrag, first);
};

module.exports = LoadCSS;
},{"./_lib.js":1}],3:[function(require,module,exports){
/*
  Load an external svg file from the cdn to leverage browser caching
  source: https://css-tricks.com/ajaxing-svg-sprite/ 
*/
var _ = require('./_lib.js');

var LoadSVG = function (files) {
  this.files = files;
  this.load();
};

LoadSVG.prototype.load = function () {
  _.each(this.files, function (file) {
    this.loadFile(file);
  }, this);
};

LoadSVG.prototype.loadFile = function (file) {
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

module.exports = LoadSVG;
},{"./_lib.js":1}],4:[function(require,module,exports){
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
},{"./_load-css.js":2,"./_load-svg.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3JjL2pzL19saWIuanMiLCJfc3JjL2pzL19sb2FkLWNzcy5qcyIsIl9zcmMvanMvX2xvYWQtc3ZnLmpzIiwiX3NyYy9qcy9jb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvKlxuICAgIEFycmF5IEZ1bmN0aW9uc1xuICAqL1xuICAvLyBGb3IgZWFjaCBpdGVtIGluIEFycmF5XG4gIGVhY2g6IGZ1bmN0aW9uIChhcnIsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgY3R4ID0gY3R4IHx8IGFycltpXTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgW2FycltpXSwgaV0pO1xuICAgIH1cbiAgfSxcbiAgXG4gIC8vIEZvciBlYWNoIGl0ZW0gaW4gT2JqZWN0XG4gIGVhY2hJbjogZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2ssIGN0eCkge1xuICAgIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIGN0eCA9IGN0eCB8fCBvYmpba107XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgW29ialtrXSwga10pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXG4gIC8qXG4gICAgRE9NIEZ1bmN0aW9uc1xuICAqL1xuICBpbnNlcnRBZnRlcjogZnVuY3Rpb24gKGVsLCByZWZOb2RlKSB7XG4gICAgcmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgcmVmTm9kZS5uZXh0U2libGluZyk7XG4gIH0sXG4gIFxuICAvKlxuICAgIEV2ZW50IEZ1bmN0aW9uc1xuICAqL1xuICAvLyBSdW4gY29kZSB3aGVuIHRoZSBwYWdlIGlzIHJlYWR5XG4gIHJlYWR5OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHJldHVybjtcbiAgICBcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjay5hcHBseShjdHgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59OyIsInZhciBfID0gcmVxdWlyZSgnLi9fbGliLmpzJyk7XG5cbnZhciBMb2FkQ1NTID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gIHRoaXMuZmlsZXMgPSBmaWxlcztcbiAgdGhpcy5sb2FkKCk7XG59O1xuXG5Mb2FkQ1NTLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZmlyc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rJyk7XG4gIHZhciBkb2NmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBcbiAgXy5lYWNoKHRoaXMuZmlsZXMsIGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgbGluay5ocmVmID0gZmlsZTtcbiAgICBkb2NmcmFnLmFwcGVuZENoaWxkKGxpbmspO1xuICB9KTtcbiAgXG4gIF8uaW5zZXJ0QWZ0ZXIoZG9jZnJhZywgZmlyc3QpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkQ1NTOyIsIi8qXG4gIExvYWQgYW4gZXh0ZXJuYWwgc3ZnIGZpbGUgZnJvbSB0aGUgY2RuIHRvIGxldmVyYWdlIGJyb3dzZXIgY2FjaGluZ1xuICBzb3VyY2U6IGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vYWpheGluZy1zdmctc3ByaXRlLyBcbiovXG52YXIgXyA9IHJlcXVpcmUoJy4vX2xpYi5qcycpO1xuXG52YXIgTG9hZFNWRyA9IGZ1bmN0aW9uIChmaWxlcykge1xuICB0aGlzLmZpbGVzID0gZmlsZXM7XG4gIHRoaXMubG9hZCgpO1xufTtcblxuTG9hZFNWRy5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgXy5lYWNoKHRoaXMuZmlsZXMsIGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgdGhpcy5sb2FkRmlsZShmaWxlKTtcbiAgfSwgdGhpcyk7XG59O1xuXG5Mb2FkU1ZHLnByb3RvdHlwZS5sb2FkRmlsZSA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgXG4gIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGUpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZSh0aGlzLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcbiAgfSk7XG4gIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgY29uc29sZS5sb2coJ0FKQVggRVJST1I6JywgdGhpcywgZSk7XG4gIH0pO1xuICBcbiAgeGhyLm9wZW4oXCJHRVRcIiwgZmlsZSwgdHJ1ZSk7XG4gIHhoci5zZW5kKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRTVkc7IiwiLy8gQ2hlY2sgdGhhdCB3ZSBoYXZlIHdoYXQgd2UgbmVlZCB0byBtb3ZlIGZvcndhcmRcbnZhciBzdXBwb3J0cyA9ICEhZG9jdW1lbnQucXVlcnlTZWxlY3RvciAmJiAhIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuaWYgKCAhc3VwcG9ydHMgKSByZXR1cm47XG5cbi8vIHZhciBfID0gcmVxdWlyZSgnLi9fbGliLmpzJyk7XG52YXIgTG9hZENTUyA9IHJlcXVpcmUoJy4vX2xvYWQtY3NzLmpzJyk7XG52YXIgTG9hZFNWRyA9IHJlcXVpcmUoJy4vX2xvYWQtc3ZnLmpzJyk7XG5cbi8vIExvYWQgY3NzXG52YXIgY3NzID0gWycvYy9iLmNzcyddO1xubmV3IExvYWRDU1MoY3NzKTtcblxuLy8gTG9hZCBzdmdcbnZhciBzdmcgPSBbJy9pL2kuc3ZnJ107XG5uZXcgTG9hZFNWRyhzdmcpOyJdfQ==
