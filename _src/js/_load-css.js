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