# Stewartknapman.com

This website was built, not only as a portfolio refresh, but as an entry to the [Event Apart's](http://aneventapart.com/) [10k competition](https://a-k-apart.com/). The idea being that its baseline load should be delivered in under 10k and work without Javascript, however by using progressive enhancement techniques and lazy loading extra assets, we are still able to deliver a rich experience without breaking the 10k limit.

The baseline load delivers the HTML, a CSS file that sets some basic styles, and the Javascript file which starts loading the extra assets. Amongst these assets is some enhanced CSS, SVG icons, responsive images, and 3rd party Javascript such as fonts and a Shopify 'Buy Button'. It is possible to disable the 3rd party Javascript by adding `?vendor=false` to any page's URL, to simulate as if it has not loaded.

I have also used a service worker to cache the site's assets for fast loading and to allow it to work offline.

The main font used on the site is [Proxima Nova](http://www.marksimonson.com/fonts/view/proxima-nova) served by [Typekit](https://typekit.com), which falls back to the default sans-serif font served by the browser.