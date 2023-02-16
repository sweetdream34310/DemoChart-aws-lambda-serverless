<template>
    <div class="waveContainer" :style="waveStyle">
        <lottie :options="defaultOptions" @animCreated="handleAnimation" />
    </div>
</template>
<script lang="ts">
import Lottie from 'vue-lottie/src/lottie.vue'
import waveFlipped from "~/assets/waveFlipped.json";

export default {
    name: 'WavesFlipped',
    components: {Lottie},
	computed: {
		defaultOptions() {
			return {
				animationData: waveFlipped,
				loop: true
			}
		},
	},
	props: {
		waveStyle: {
			type: String,
			default:`top: -4px;`,
		},
		isBlue: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		handleAnimation(anim) {
			anim.setSpeed(0.75);
		}
	},
}
</script>
<style scoped lang="scss">

	.waveContainer {
		position:absolute;
		left: 0;
		right: 0;
		z-index: 50;
	}
</style>
