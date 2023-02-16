<template>
    <div v-if="!hasConsent() && showActive" class="cookie-banner">
		<div class="container">

			<p class="text">Democharts uses cookies to ensure you get the best experience on our website.</p>

			<DButton :on-click="setCookieAsAccepted" primarysolid>Accept Cookies</DButton>
		</div>
	</div>
</template>

<script>

import Cookies from 'js-cookie';
import DButton from "./DButton";

export default {
	name: "CookieBanner",
	components: {DButton},
	data() {
		return {
			showActive: true,
		}
	},
	methods: {
		setCookieAsAccepted() {
			this.showActive = false;
			Cookies.set('cookies_accepted', true, { expires: 100000000 });
		},
		hasConsent() {
			return Cookies.get('cookies_accepted');
		}
	},

}
</script>

<style scoped lang="scss">

	.cookie-banner {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: #111;
		padding: 32px 0;
		color: white;

		.container {
			display: flex;
			align-items: center;


			.text {
				flex: 1;
			}

		}
	}

</style>
