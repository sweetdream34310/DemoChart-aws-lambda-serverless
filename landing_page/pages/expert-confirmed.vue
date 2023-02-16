<template>
	<SignUpConfirmation>
		<template #title>
			Great to have you on Board, {{ firstName }}
		</template>
		<template #description>
			<p>You will be redirected shortly. If not, please click the button below.</p>
		</template>


		<template #cta>
			<DButton :link="'https://app.democharts.org'" external primarysolid big>Login</DButton>
		</template>

	</SignUpConfirmation>



</template>

<script lang="ts">
import Vue from 'vue';
import DButton from "~/components/DButton.vue";
import SignUpConfirmation from "~/components/landingpage/SignUpConfirmation.vue";


export default Vue.extend({
	components: {
		SignUpConfirmation,
		DButton,
	},
	data: function () {
		return {
			confirmationCode: '',
			firstName: '',
			isExpert: undefined,
		};
	},
	head() {
		return {
			title: 'Democharts - The Chartlist For Unreleased Music',
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: 'description',
					name: 'description',
					content:
						'Democharts is a platform that connects artists with music industry experts. Pitch your songs directly to record labels, managers or Spotify playlist curators.',
				},
			],
			htmlAttrs: {
				lang: 'en'
			},
		};
	},
	mounted() {
		this.$nuxt.$emit('show-menu', false);
		this.firstName = this.$route.query.firstName;

	},
	beforeDestroy() {
		this.$nuxt.$emit('show-menu', true);
	},
});
</script>
