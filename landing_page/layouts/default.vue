<template>
	<div>
		<Navigation></Navigation>
		<nuxt />
	</div>
</template>


<script>
import Navigation from '~/components/Navigation';
import {comeBackTitle} from "../mixins/ComeBackTitle";

export default {
	components: { Navigation },
	head() {
		return {
			title: this.title,
			htmlAttrs: {
				lang: 'en'
			},
		}
	},
	data() {
		return {
			title: 'Democharts.org'
		}
	},
	mounted() {

		!function (w, d, t) {
			w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

			ttq.load('C3O165CGJNO3BAJEIHMG');
			ttq.page();
		}(window, document, 'ttq');

	},
	mixins: [comeBackTitle]
};
</script>

<style>
	html {
		font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		font-size: 16px;
		word-spacing: 1px;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		/*box-sizing: border-box;*/
		scroll-behavior: smooth;
	}

	*,
	*:before,
	*:after {
		/*box-sizing: border-box;*/
		margin: 0;
	}
</style>
