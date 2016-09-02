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