<template>
	<div id="container" ref="container"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Lottie from 'lottie-web';

export default Vue.extend({
	mounted() {
		Lottie.loadAnimation({
			container: this.$refs['container'],
			autoplay: true,
			loop: true,
			renderer: 'svg',
			path: '/spinner.json',
		}).setSubframe(false);
	},
});
</script>

<style scoped lang="scss">
#container {
	width: 100%;
	height: 100%;
}
</style>
