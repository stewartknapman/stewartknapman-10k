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
    d.body.insertBefore(this.responseXML.documentElement, d.body.childNodes[0]);
  });
  
  xhr.open("GET", file, true);
  xhr.send();
};

/* Image */
Load.prototype.img = function (id, alt, sizes, thumb) {
  var widths = (thumb)? [320,440,560,680,900] : [320,440,560,680,900,1080,1200,1500,1800,2100];
  return '<img src="'+id+widths[0]+'.jpg" srcset="'+this.imgSrcset(id, widths)+'" sizes="'+(sizes || '100vw')+'" alt="'+alt+'">';
};
Load.prototype.imgSrcset = function (id,widths) {
  var str = [];
  _.each(widths, function (width) {
    str.push('/i/'+id+width+'.jpg '+width+'w');
  });
  return str.join(',');
};

/* Markup */
Load.prototype.replace = function (files) {
  _.eachIn(files, function (id, markup) {
    this.replaceMarkup(id, markup);
  }, this);
};

Load.prototype.replaceMarkup = function (id, markup) {
  var ele = document.querySelector('#'+id);
  if (ele) {
    var div = d.createElement('div');
    div.innerHTML = markup;
    ele.parentNode.replaceChild(div.childNodes[0], ele);
  }
};

/* PRIVATE */
Load.prototype._createAfter = function (tagName, files, callback) {
  var first = d.querySelector(tagName);
  var docfrag = d.createDocumentFragment();
  
  _.each(files, function (file) {
    var el = d.createElement(tagName);
    el = callback(el, file);
    docfrag.appendChild(el);
  });
  
  _.insertAfter(docfrag, first);
};