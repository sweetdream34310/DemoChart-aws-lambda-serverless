<template>
	<SignUpConfirmation
	>
<!--		v-if="isExpert"-->
		<template #title>Application Completed, {{ firstName }}</template>
		<template #description>
			<p style="font-size: 24px;">Thanks for submitting your application.<br />We will review it and come back to you within 48 hours.</p>
		</template>
		<template #cta>
			<DButton :on-click="goBackToPage" primarysolid big>Back to page</DButton>
		</template>
	</SignUpConfirmation>

<!--	<SignUpConfirmation-->
<!--		v-else-if="isExpert === false"-->
<!--	>-->
<!--		<template #title>-->
<!--			Great to have you on Board, {{ firstName }}!-->
<!--		</template>-->
<!--		<template #description>-->
<!--			<p>You will be redirected shortly. If not, please klick the button below.</p>-->
<!--		</template>-->

<!--		<template #cta>-->
<!--			<DButton :link="`${$config.APP_BASE_PATH}`" external primarysolid big>Login</DButton>-->
<!--		</template>-->
<!--	</SignUpConfirmation>-->



</template>

<script lang="ts">
import Vue from 'vue';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import DButton from "~/components/DButton.vue";
import CloseIcon from "~/components/icons/CloseIcon.vue";
import SignUpConfirmation from "~/components/landingpage/SignUpConfirmation.vue";
import apiClient from "~/api/apiClient";

let userPool;

export default Vue.extend({
	components: {
		SignUpConfirmation,
		CloseIcon,
		DButton,
	},
	data: function () {
		return {
			confirmationCode: '',
			firstName: '',
			isExpert: undefined,
			userName: '',
			origin: '',
			redirectToUrl: ''
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
	beforeMount() {
		userPool = new CognitoUserPool({
			UserPoolId: this.$config.UserPoolId,
			ClientId: this.$config.ClientId,
		});
	},
	mounted() {
		this.$nuxt.$emit('show-menu', false);
		this.isExpert = this.$route.query.role === "expert";
		this.origin = this.$route.query.origin;

		if (this.origin === 'marketplace') {
			this.redirectToUrl = this.$config.MARKETPLACE_BASE_PATH
		}

		this.firstName = this.$route.query.firstName;
		this.userName = this.$route.query.username;

		if (this.$route.query.code && this.$route.query.username) {
			this.confirmationCode = this.$route.query.code;
			this.confirmSignUp(this.confirmationCode);
		} else {
			console.log('no arguments supplied :(');
		}
	},
	beforeDestroy() {
		this.$nuxt.$emit('show-menu', true);
	},
	methods: {
		goBackToPage: function(){
			if (this.redirectToUrl) {
				window.location.href = this.redirectToUrl;
			}
		},
		goToStep: function (step) {
			this.selectedStep = step;
		},
		async confirmSignUp(code: string) {
			new CognitoUser({
				Username: this.userName,
				Pool: userPool,
			}).confirmRegistration(code, true, async (err, result) => {
				if (err) {
					console.log('oh noes it no work :(', JSON.stringify(err));
					return;
				} else {
					console.log('success', JSON.stringify(result));

					const res = await this.$axios.post(`/signup/postUserConfirmed`, { uid: this.userName });

					console.log("origin: ", this.origin)
					if (this.origin === 'marketplace') {
						window.location.href = this.$config.MARKETPLACE_BASE_PATH
					}

					if (!this.isExpert){
						// window.location.href="https://app.democharts.org/";
					}
				}
			});
		},
	},
});
</script>
