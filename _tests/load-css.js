require('jsdom-global')();
var assert = require('chai').assert;
var LoadCSS = require('../_src/js/_load-css.js');

var cssFiles = ['/c/b.css'];

describe('Load CSS', function() {
  
  beforeEach(function () {
    document.head.innerHTML = '<link rel="stylesheet" href="/c/a.css">';
  });
  
  it('recives an array of css files', function () {
    var cssLoad = new LoadCSS(cssFiles);
    assert.equal(cssFiles, cssLoad.files);
  });
  
  it('adds link tag to the DOM', function () {
    new LoadCSS(cssFiles);
    assert.equal(document.head.innerHTML, '<link rel="stylesheet" href="/c/a.css"><link rel="stylesheet" href="/c/b.css">');
  });
});