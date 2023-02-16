<template>
	<Landingpage>
	</Landingpage>
</template>

<script lang="ts">
import Vue from 'vue';
import Landingpage from "~/components/Landingpage.vue";
import {comeBackTitle} from "~/mixins/ComeBackTitle";

export default Vue.extend({
	components: {
		Landingpage,
	},
	data() {
		return {
			title: 'Democharts - The Chartlist For Unreleased Music'
		}
	},
	head() {
		return {
			htmlAttrs: {
				lang: 'en'
			},
			title: this.title,
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: 'description',
					name: 'description',
					content:
						'Democharts is a platform that connects artists with music industry experts. Pitch your songs directly to record labels, managers or Spotify playlist curators.',
				},
			],
			// script: [
			// 	{
			// 		id: 'mcjs',
			// 		hid: 'mcjs',
			// 		innerHTML: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/c2b867fc9c417f545ca7216f6/${this.$config.mailchimpPopupID}.js");`,
			// 		type: 'text/javascript',
			// 		charset: 'utf-8',
			// 	},
			// ],
		};
	},
	mixins: [comeBackTitle]
});
</script>

<style scoped lang="scss">
</style>
