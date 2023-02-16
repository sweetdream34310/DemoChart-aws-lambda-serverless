<template>
	<div id="snapport">
		<Initial></Initial>

		<SectionContent inverted
						smaller-height>
			<template #title>
				<span class="primary">Grow</span> skills & make connections.
			</template>

			<template #description>
				Democharts allows you to easily share unreleased music with the biggest record labels, A&R's and other industry experts. Upload songs and get noticed by the top names worldwide. Record deal anyone?
			</template>
			<template #cta>
				<DButton primarysolid link="/apply">
					Apply Now
				</DButton>
			</template>

			<template #image>
				<img src="@/assets/bg/landingpage_banner_1.png" class="banner_1" />
			</template>
		</SectionContent>


		<SectionContent
			smaller-height
		>
			<template #title>
				<span class="primary">Upload</span> hit songs,
				that get you signed.
			</template>

			<template #description>
				Tired of sending your music to record labels and managers without a response? Democharts connects you with industry experts guaranteeing at least 10 ratings on every single track you upload.
			</template>
			<template #cta>
				<DButton primarysolid link="/apply">
					Upload a Demo
				</DButton>
			</template>

			<template #image>
				<div class="artist-of-the-month-bg">
					<img src="@/assets/bg/landingpage_banner_4.jpg" width="100%" style="border-radius: 16px;" />
					<img src="@/assets/bg/landingpage_banner_play_dummy.jpg" width="100%" />
				</div>
			</template>
		</SectionContent>




		<SectionContent
			inverted
			smaller-height
		>
			<template #title>
				<span class="primary">Become part</span> of our exclusive community.
			</template>

			<template #description>
				Democharts opens the door for collaborations with industry experts worldwide. Top rated tracks are featured on chart lists, and can win festival slots, or promotional deals and equipment.
			</template>
			<template #cta>
				<DButton primarysolid link="/apply">
					Apply Now
				</DButton>
			</template>

			<template #image>
				<img src="@/assets/bg/landingpage_banner_2.png" class="banner_2" />
			</template>
		</SectionContent>


		<SectionContent
			text-width="40"
			image-width="60"
			smaller-height
		>
			<template #title>
				<div style="margin-top: 32px">
					<span class="primary">Ready to join</span> <br />
					<span>the Democharts family?</span>
				</div>
			</template>

			<template #description>
				<div>
					<p class="flex-v-top" style="margin-bottom: 8px"><CheckIcon />&nbsp;Apply to get approved by the Democharts scouts.
					<br /></p>
					<p class="flex-v-top"><CheckIcon />&nbsp;Gain access to over 200 experts, plus free uploads.</p>
				</div>
			</template>
			<template #cta>
				<div class="button-free-upload">
					<DButton primarysolid link="/apply">
						Get a Free Upload
					</DButton>
				</div>

				<UploadAndWin></UploadAndWin>
			</template>

			<template #image>
				<img
					v-if="!isMaxMobileScreen"
					src="@/assets/bg/landingpage_banner_3.png"
					class="banner_3"
				/>
			</template>
		</SectionContent>


		<SignupTeaser></SignupTeaser>

		<DemochartsFooter></DemochartsFooter>
	</div>
</template>

<script lang="ts">
import Initial from "~/components/landingpage/Initial.vue";
import UploadAndWin from "~/components/landingpage/UploadAndWin.vue";
import DButton from "~/components/DButton.vue";
import SectionContent from "~/components/SectionContent.vue";
import DotsAndWaves from "~/components/DotsAndWaves.vue";
import DemochartsFooter from "~/components/DemochartsFooter.vue";
import WavesFlipped from "~/components/WavesFlipped.vue";
import SignupTeaser from "~/pages/SignupTeaser.vue";
import {DeviceDimensions} from "~/mixins/DeviceDimensions";
import CheckIcon from "~/components/icons/CheckIcon.vue";

export default {
	name: "Landingpage",
	components: {
		CheckIcon,
		SignupTeaser,
		WavesFlipped,
		DemochartsFooter,
		DotsAndWaves,
		SectionContent,
		DButton,
		UploadAndWin,
		Initial,
	},
	data: function () {
		return {
			selectedStep: 1,
		};
	},
	mixins: [DeviceDimensions],
	props: {
		isExpert: {
			type: Boolean,
			default: false
		},
	},
	methods: {
		goToStep: function (step) {
			this.selectedStep = step;
		},
	},
};

</script>

<style scoped lang="scss">
	@import "assets/scss/Components/landingpage-common";

	.flex-v-top {
		display: flex;
		align-items: start;
	}

	.button-free-upload {
		display: inline-block;

		@include respondTo(mobile){
			display: block;
			margin-bottom: 16px;
		}
	}

	.banner_1 {
		width: 85%;

		@include respondTo(mobile) {
			width: 100%;
			margin-top: 32px;
		}
	}


	.banner_2 {
		width: 70%;

		@include respondTo(mobile) {
			width: 100%;
		}
	}


	.banner_3 {
		width: 90%;

		@include  respondTo(tablet){
			margin-bottom: 64px;
			margin-top: 48px
		}
		@include respondTo(mobile) {
			width: 100%;
		}
	}

	.artist-of-the-month-bg {
		padding: 0 100px;
		background-size: 100%;
		background-position-y: center;
		background-repeat: no-repeat;

		@include respondTo(mobile) {
			margin-top: 32px;
			padding: 0;
		}
	}

</style>
