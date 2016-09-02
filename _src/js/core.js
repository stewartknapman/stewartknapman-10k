// Check that we have what we need to move forward
var supports = !!document.querySelector && !!window.addEventListener;
if (!supports) return;

var Load = require('./_load.js');
var load = new Load();

load.css(['/c/b.css']);
load.svg(['/i/i.svg']);
load.img({
  ig: '<svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg>',
  it: '<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>',
  id: '<svg class="icon icon-dribbble"><use xlink:href="#icon-dribbble"></use></svg>'
});

// load GA
/*
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-11095759-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
*/

// load typekit
(function(d) {
  var config = {
    kitId: 'jzs7qfl',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);