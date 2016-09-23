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
        jp: '<div data-embed_type="product" data-shop="luciddesign.myshopify.com" data-product_name="&#39;Jack of all Trades; Master of Some&#39; Poster" data-product_handle="jack-of-all-trades-master-of-some-poster" data-has_image="false" data-display_size="compact" data-redirect_to="checkout" data-buy_button_text="Buy the poster" data-buy_button_out_of_stock_text="Out of Stock" data-buy_button_product_unavailable_text="Unavailable" data-button_background_color="ffffff" data-button_text_color="03b9e3" data-product_modal="false" data-product_title_color="000000" data-next_page_button_text="Next page"><a class="b" href="mailto:info@stewartknapman.com?subject=Buy%20Poster" id="jtms">Buy the poster</a></div>'
      });
  });
}