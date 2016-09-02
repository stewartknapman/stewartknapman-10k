require('jsdom-global')();
var fs = require('fs');
var sinon = require('sinon');
var assert = require('chai').assert;
var Load = require('../_src/js/_load.js');
var imgFxture = fs.readFileSync('./_tests/fixtures/load-img.html', 'utf8');

var cssFiles = ['/c/b.css'];
var jsFiles = ['/j/b.js'];
var svgFiles = ['/i/i.svg'];
var imgFiles = { a: '<img src="/i/a.jpg">' };

describe('Load.js', function() {
  describe('css', function() {
    beforeEach(function () {
      document.head.innerHTML = '<link rel="stylesheet" href="/c/a.css">';
    });
    
    it('adds a link tag to the DOM', function () {
      var load = new Load();
      load.css(cssFiles);
      assert.equal(document.head.innerHTML, '<link rel="stylesheet" href="/c/a.css"><link rel="stylesheet" href="/c/b.css">');
    });
  });
  
  describe('js', function() {
    beforeEach(function () {
      document.head.innerHTML = '<script src="/j/a.js" async=""></script>';
    });
    
    it('adds a script tag to the DOM', function () {
      var load = new Load();
      load.js(jsFiles);
      assert.equal(document.head.innerHTML, '<script src="/j/a.js" async=""></script><script src="/j/b.js"></script>');
    });
  });
  
  describe('svg', function() {
    beforeEach(function () {
      global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    });
    
    it('adds svg content to the DOM');
  });
  
  describe('img', function() {
    beforeEach(function () {
      document.body.innerHTML = imgFxture;
    });
    
    it('replaces an <i> tag with an <img> tag that matches its id', function () {
      var load = new Load();
      load.img(imgFiles);
      assert.equal(document.body.innerHTML, imgFiles.a);
    });
  });
});