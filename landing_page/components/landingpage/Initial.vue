<template>
	<section :class="isExpert ? 'forArtists' : 'forExperts'" style="position: relative;">
		<div class="container">
			<h1 v-if="!isExpert" class="title">Pitch your music to<br />labels, scouts and curators.</h1>
			<h1 v-else class="title">Find newcomer artists<br />curated by industry experts.</h1>

			<Counter v-if="!isExpert"></Counter>

<!--			<h2 class="subtitle">Democharts connects talented artists with the most respected<br />music curators, managers, labels and scouts.</h2>-->


			<div class="input-wrapper">
				<input v-model="email" type="email" class="email-input" placeholder="Your Email Address" />

				<DButton v-if="!isExpert" primarysolid :link="link">
					{{ isMaxMobileScreen ? 'Apply' : 'Apply Now'}}
				</DButton>
				<DButton v-if="isExpert" secondarysolid :link="link">
					{{ isMaxMobileScreen ? 'Apply' : 'Apply Now'}}
				</DButton>
			</div>

		</div>

		<DotsAndWaves :is-blue="isExpert"/>
	</section>
</template>

<script>
import DButton from "~/components/DButton";


import Lottie from 'vue-lottie/src/lottie.vue';
import animationData from '../../assets/StarsAnimation.json';
import DotsAndWaves from "~/components/DotsAndWaves";
import Counter from "~/components/landingpage/Counter";
import {DeviceDimensions} from "~/mixins/DeviceDimensions";

export default {
	name: "Initial",
	components: {Counter, DotsAndWaves, DButton, Lottie},
	data() {
		return {
			defaultOptions: {animationData: animationData, loop: false},
			email: "",
		}
	},
	mixins: [DeviceDimensions],
	props: {
		isExpert: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		link() {
			if (this.email === '') {
				return `/apply`
			}
			return `/apply?email=${this.email}`
		}
	}
}
</script>

<style scoped lang="scss">
	section {
		display: flex !important;
		color: white;
		/*background-image: url('../../assets/bg/4-blurred-landscape.jpg');*/
	}

	.container {
		margin: auto;
	}

	.subtitle {
		font-size: 18px;
		margin-top: 32px;
		margin-bottom: 48px;
		font-weight: 100;
		color: #ffffff8a;
		line-height: 1.2;
	}

	.title {
		text-align: left;
		font-weight: 900;
		font-size: 50px;
		margin-top: -48px;

		@include respondTo(tablet) {
			font-size: 38px;
		}
	}



	.forArtists {
		background: url('~@/assets/bg/landingpage_forExperts.jpg') black;
		background-size: cover;
		background-position: center;
		min-height: 900px;

		@include respondTo(mobile) {
			height: 95vh;
			background-position: 73%;
		}
	}

	.forExperts {
		background: url('~@/assets/bg/landingpage_forArtists.jpg') black;
		background-size: cover;
		background-position: center;
		min-height: 900px;


		@include respondTo(mobile){
			height: 95vh;
			background-color: black;
			background-position: 63% 41%;
		}
	}

	.input-wrapper {
		background: white;
		border-radius: 36px;
		height: 64px;
		padding: 0 18px;
		align-items: center;
		display: flex;
		width: fit-content;
		margin-top: 32px;
	}

	.email-input {
		border: none;
		color: #000000;

		min-width: 280px;
		height: 48px;
		font-size: 18px;
	}


	@include respondTo(tablet) {
		.email-input {
			min-width: 200px;
		}
	}

	@include respondTo(mobile) {
		.input-wrapper {
			width: 90%;
			display: flex;
		}
		.email-input {
			min-width: unset;
			flex: 1;
		}
	}


</style>
