var _={each:function(e,t,n){for(var s=0;s<e.length;s++)n=n||e[s],t.apply(n,[e[s],s])},eachIn:function(e,t,n){for(var s in e)e.hasOwnProperty(s)&&(n=n||e[s],t.apply(n,[s,e[s]]))},insertAfter:function(e,t){t.parentNode.insertBefore(e,t.nextSibling)},ready:function(e,t){"function"==typeof e&&("loading"!==document.readyState?e.apply(t):document.addEventListener("DOMContentLoaded",function(){e.apply(t)}))}},Load=function(){};Load.prototype.css=function(e){this._createAfter("link",e,function(e,t){return e.rel="stylesheet",e.href=t,e})},Load.prototype.js=function(e){this._createAfter("script",e,function(e,t){return e.src=t,e.async=!0,e})},Load.prototype.svg=function(e){_.each(e,function(e){this._ajaxSVG(e)},this)},Load.prototype._ajaxSVG=function(e){var t=new XMLHttpRequest;t.addEventListener("load",function(e){document.body.insertBefore(this.responseXML.documentElement,document.body.childNodes[0])}),t.addEventListener("error",function(e){console.log("AJAX ERROR:",this,e)}),t.open("GET",e,!0),t.send()},Load.prototype.replace=function(e){_.eachIn(e,function(e,t){this.replaceMarkup(e,t)},this)},Load.prototype.replaceMarkup=function(e,t){var n=document.querySelector("#"+e);if(n){var s=document.createElement("div");s.innerHTML=t,n.parentNode.replaceChild(s.childNodes[0],n)}},Load.prototype._createAfter=function(e,t,n){var s=document.querySelector(e),o=document.createDocumentFragment();_.each(t,function(t){var s=document.createElement(e);s=n(s,t),o.appendChild(s)}),_.insertAfter(o,s)},function(e,t,n){if(e.querySelector){window.loader=load=new n,t.ready(function(){load.replace({l:'<svg class="logo"><use xlink:href="#logo"></use></svg>',ig:'<svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg>',it:'<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>',id:'<svg class="icon icon-dribbble"><use xlink:href="#icon-dribbble"></use></svg>',posi:'<svg class="prod-img"><use xlink:href="#poster"></use></svg>',hpk:'<img src="/i/peckhams_2048.jpg" alt="Peckhams limited release labels">',hphd:'<img src="/i/phd_2048.jpg" alt="PHD six pack builder">',hart:'<img src="/i/peckhams_2048.jpg" alt="Arthouse website">',hjam:'<img src="/i/phd_2048.jpg" alt="Wedding invites">',pk:'<a href="/peckhams.html"><img src="/i/peckhams_2048.jpg" alt="Peckhams limited release labels"></a>',phd:'<a href="/phd.html"><img src="/i/phd_2048.jpg" alt="PHD six pack builder"></a>',art:'<a href="/arthouse.html"><img src="/i/peckhams_2048.jpg" alt="Arthouse website"></a>',jam:'<a href="/invites.html"><img src="/i/phd_2048.jpg" alt="Wedding invites"></a>',jtms:'<a class="b" id="jtms" href="https://luciddesign.myshopify.com/cart/25377140360:1" target="_blank">Buy the poster</a>'})}),load.css(["/c/b.css"]);var s=["/i/i.svg"];if("ix"===e.querySelector("body").className&&s.push("/i/poster.svg"),load.svg(s),"?vendor=false"!==location.search&&load.js(["/j/b.js"]),CSS||CSS.supports||"classList"in e.createElement("p")){var o=function(t,n){CSS.supports(t)?e.documentElement.classList.add(n):e.documentElement.classList.add("no-"+n)};o("(shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and (-webkit-shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 80%)) and ((clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)) or (-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%)))","css-shape")}}}(document,_,Load);
