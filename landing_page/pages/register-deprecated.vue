<template>
	<!-- Register Step -->
	<div id="register">
		<register-panel
			id="register-panel"
			:selected-step="selectedStep"
			@goToStep="goToStep"
		></register-panel>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import RegisterPanel from '~/components/RegisterPanel.vue';

export default Vue.extend({
	name: 'Register',
	components: {
		RegisterPanel,
	},
	data: function () {
		return {
			selectedStep: 1,
		};
	},
	methods: {
		goToStep: function (step) {
			this.selectedStep = step;
		},
	},
});
</script>

<style lang="scss" scoped>
#register {
	width: 100%;
	height: 100vh;

	grid-template-rows: 60px auto;

	background-image: url('../assets/bg/4-blurred-landscape.jpg');
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;

	#register-panel {
		padding-top: 84px;

		width: 100%;
		height: 100%;
	}
}
</style>
