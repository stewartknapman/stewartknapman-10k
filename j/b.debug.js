(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
// Load GA
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-11095759-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
*/

// Load Typekit
(function(d) {
  var config = {
    kitId: 'bmn1olh',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

// Load Shopify buy button, but only on index.html
if (document.querySelector('body').className === 'ix') {
  window.loader.js(['https://widgets.shopifyapps.com/assets/widgets/embed/client.js']);
  _.ready(function () {
      window.loader.replace({
        jtms: '<div data-embed_type="product" data-shop="luciddesign.myshopify.com" data-product_name="&#39;Jack of all Trades; Master of Some&#39; Poster" data-product_handle="jack-of-all-trades-master-of-some-poster" data-has_image="false" data-display_size="compact" data-redirect_to="checkout" data-buy_button_text="Buy the poster" data-buy_button_out_of_stock_text="Out of Stock" data-buy_button_product_unavailable_text="Unavailable" data-button_background_color="ffffff" data-button_text_color="03b9e3" data-product_modal="false" data-product_title_color="000000" data-next_page_button_text="Next page"></div>'
      });
  });
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3JjL2pzL3ZlbmRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4vLyBMb2FkIEdBXG52YXIgX2dhcSA9IF9nYXEgfHwgW107XG5fZ2FxLnB1c2goWydfc2V0QWNjb3VudCcsICdVQS0xMTA5NTc1OS0xJ10pO1xuX2dhcS5wdXNoKFsnX3RyYWNrUGFnZXZpZXcnXSk7XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBnYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOyBnYS50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7IGdhLmFzeW5jID0gdHJ1ZTtcbiAgZ2Euc3JjID0gKCdodHRwczonID09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID8gJ2h0dHBzOi8vc3NsJyA6ICdodHRwOi8vd3d3JykgKyAnLmdvb2dsZS1hbmFseXRpY3MuY29tL2dhLmpzJztcbiAgdmFyIHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07IHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZ2EsIHMpO1xufSkoKTtcbiovXG5cbi8vIExvYWQgVHlwZWtpdFxuKGZ1bmN0aW9uKGQpIHtcbiAgdmFyIGNvbmZpZyA9IHtcbiAgICBraXRJZDogJ2JtbjFvbGgnLFxuICAgIHNjcmlwdFRpbWVvdXQ6IDMwMDAsXG4gICAgYXN5bmM6IHRydWVcbiAgfSxcbiAgaD1kLmRvY3VtZW50RWxlbWVudCx0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtoLmNsYXNzTmFtZT1oLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJ3Zi1sb2FkaW5nXFxiL2csXCJcIikrXCIgd2YtaW5hY3RpdmVcIjt9LGNvbmZpZy5zY3JpcHRUaW1lb3V0KSx0az1kLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksZj1mYWxzZSxzPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF0sYTtoLmNsYXNzTmFtZSs9XCIgd2YtbG9hZGluZ1wiO3RrLnNyYz0naHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvJytjb25maWcua2l0SWQrJy5qcyc7dGsuYXN5bmM9dHJ1ZTt0ay5vbmxvYWQ9dGsub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7YT10aGlzLnJlYWR5U3RhdGU7aWYoZnx8YSYmYSE9XCJjb21wbGV0ZVwiJiZhIT1cImxvYWRlZFwiKXJldHVybjtmPXRydWU7Y2xlYXJUaW1lb3V0KHQpO3RyeXtUeXBla2l0LmxvYWQoY29uZmlnKX1jYXRjaChlKXt9fTtzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRrLHMpXG59KShkb2N1bWVudCk7XG5cbi8vIExvYWQgU2hvcGlmeSBidXkgYnV0dG9uLCBidXQgb25seSBvbiBpbmRleC5odG1sXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTmFtZSA9PT0gJ2l4Jykge1xuICB3aW5kb3cubG9hZGVyLmpzKFsnaHR0cHM6Ly93aWRnZXRzLnNob3BpZnlhcHBzLmNvbS9hc3NldHMvd2lkZ2V0cy9lbWJlZC9jbGllbnQuanMnXSk7XG4gIF8ucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgd2luZG93LmxvYWRlci5yZXBsYWNlKHtcbiAgICAgICAganRtczogJzxkaXYgZGF0YS1lbWJlZF90eXBlPVwicHJvZHVjdFwiIGRhdGEtc2hvcD1cImx1Y2lkZGVzaWduLm15c2hvcGlmeS5jb21cIiBkYXRhLXByb2R1Y3RfbmFtZT1cIiYjMzk7SmFjayBvZiBhbGwgVHJhZGVzOyBNYXN0ZXIgb2YgU29tZSYjMzk7IFBvc3RlclwiIGRhdGEtcHJvZHVjdF9oYW5kbGU9XCJqYWNrLW9mLWFsbC10cmFkZXMtbWFzdGVyLW9mLXNvbWUtcG9zdGVyXCIgZGF0YS1oYXNfaW1hZ2U9XCJmYWxzZVwiIGRhdGEtZGlzcGxheV9zaXplPVwiY29tcGFjdFwiIGRhdGEtcmVkaXJlY3RfdG89XCJjaGVja291dFwiIGRhdGEtYnV5X2J1dHRvbl90ZXh0PVwiQnV5IHRoZSBwb3N0ZXJcIiBkYXRhLWJ1eV9idXR0b25fb3V0X29mX3N0b2NrX3RleHQ9XCJPdXQgb2YgU3RvY2tcIiBkYXRhLWJ1eV9idXR0b25fcHJvZHVjdF91bmF2YWlsYWJsZV90ZXh0PVwiVW5hdmFpbGFibGVcIiBkYXRhLWJ1dHRvbl9iYWNrZ3JvdW5kX2NvbG9yPVwiZmZmZmZmXCIgZGF0YS1idXR0b25fdGV4dF9jb2xvcj1cIjAzYjllM1wiIGRhdGEtcHJvZHVjdF9tb2RhbD1cImZhbHNlXCIgZGF0YS1wcm9kdWN0X3RpdGxlX2NvbG9yPVwiMDAwMDAwXCIgZGF0YS1uZXh0X3BhZ2VfYnV0dG9uX3RleHQ9XCJOZXh0IHBhZ2VcIj48L2Rpdj4nXG4gICAgICB9KTtcbiAgfSk7XG59Il19
