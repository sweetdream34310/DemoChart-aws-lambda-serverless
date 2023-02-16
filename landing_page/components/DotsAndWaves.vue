<template>
    <div class="dotsAndWaveContainer" :style="style">
        <lottie :options="defaultOptions" @animCreated="handleAnimation" />
    </div>
</template>
<script lang="ts">
import Lottie from 'vue-lottie/src/lottie.vue'
import waveAndDots from "~/assets/waveAndDots.json";
import waveAndDotsBlue from "~/assets/waveAndDotsBlue.json";

export default {
    name: 'DotsAndWaves',
    components: {Lottie},
	computed: {
    	style() {
    		return `bottom: ${this.bottom}px;`
		},
		defaultOptions() {
			return {
				animationData: !this.isBlue ? waveAndDots : waveAndDotsBlue,
				loop: true
			}
		},
	},
	props: {
		bottom: {
			type: Number,
			default: -20,
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

	.dotsAndWaveContainer {
		position:absolute;
		left: 0;
		right: 0;
	}
</style>
