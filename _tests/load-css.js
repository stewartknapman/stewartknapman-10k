require('jsdom-global')();
var fs = require('fs');
var assert = require('chai').assert;
var fixture = fs.readFileSync('./_tests/fixtures/load-css.html', 'utf8');
var LoadCSS = require('../_src/js/_load-css.js');

var cssFiles = ['/c/b.css'];

describe('Load', function() {
  
  beforeEach(function () {
    document.documentElement.innerHTML = fixture;
  });
  
  it('recives an array of css files', function () {
    var cssLoad = new LoadCSS(cssFiles);
    assert.equal(cssFiles, cssLoad.files);
  });
  
  it('adds link tag to the DOM for each css file', function () {
    var cssLoad = new LoadCSS(cssFiles);
    var head = document.querySelector('head');
    assert.equal(head.innerHTML, '<link rel="stylesheet" href="/c/a.css"><link rel="stylesheet" href="/c/b.css">');
  });
});