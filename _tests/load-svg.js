/*
require('jsdom-global')();
var sinon = require('sinon');
var assert = require('chai').assert;
var LoadSVG = require('../_src/js/_load-svg.js');

var svgFiles = ['/i/i.svg'];
var XMLHttpRequest;

describe('Load SVG', function() {
  
  beforeEach(function () {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
  });
  
  it('recives an array of svg files', function () {
    var svgLoad = new LoadSVG(svgFiles);
    assert.equal(svgFiles, svgLoad.files);
  });
  
  it('adds svg content to the DOM', function (done) {
    new LoadSVG(svgFiles, function () {
      assert.equal(document.body.childNodes[0], 'svg');
      done();
    });
  });
});
*/