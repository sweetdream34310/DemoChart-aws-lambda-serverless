<template>
	<div id="snapport">
		<Initial isExpert></Initial>

		<SectionContent inverted
						smaller-height>
			<template #title>
				<span class="secondary">Scout</span> artists like never before.
			</template>

			<template #description>
				We take the struggle out of scouting for top talent. With state-of-the-art algorithms and a team of internal scouts, we find the best picks for you, so you can spend your time doing better things.
			</template>
			<template #cta>
				<DButton secondarysolid link="/apply">
					Apply Now
				</DButton>
			</template>

			<template #image>
				<img src="@/assets/bg/landingpage_banner_expert_1.png" class="banner_1" />
			</template>
		</SectionContent>


		<SectionContent
			smaller-height
		>
			<template #title>
				<span class="secondary">The chartlist</span> for newcomer artists.
			</template>

			<template #description>
				Upcoming artists' best rated demos are featured on our chartlist, which means easy access to top undiscovered talent without much effort. Only experts can reach out to artists, so no worries about being spammed.
			</template>
			<template #cta>
				<DButton secondarysolid link="/apply">
					Apply Here
				</DButton>
			</template>


			<template #image>
				<div class="artist-of-the-month-bg" style="padding: 0px 100px;
    background-size: 100%;
    background-position-y: center;
    background-repeat: no-repeat;">
					<img src="@/assets/bg/4.jpg" width="100%" style="border-radius: 16px;
    height: 317px;
    object-fit: cover;
    object-position: 0% 9%;" />
					<img src="@/assets/bg/landingpage_banner_play_dummy_blue.jpg" width="100%" />
				</div>
			</template>

		</SectionContent>




		<SectionContent
			inverted
			smaller-height
		>
			<template #title>
				<span class="secondary">Be part of</span> the Democharts family.
			</template>

			<template #description>
				Democharts is the most exclusive music network in the world. By connecting undiscovered talent with industry experts worldwide, we open up a whole new world of music possibilities.
			</template>
			<template #cta>
				<DButton secondarysolid link="/apply">
					Sign me up
				</DButton>
			</template>

			<template #image>
				<img src="@/assets/bg/landingpage_banner_expert_2.png" class="banner_2" />
			</template>
		</SectionContent>

		<SignupTeaser is-expert />

		<DemochartsFooter></DemochartsFooter>
	</div>
</template>

<script lang="ts">
import Initial from "~/components/landingpage/Initial.vue";
import DButton from "~/components/DButton.vue";
import SectionContent from "~/components/SectionContent.vue";
import DemochartsFooter from "~/components/DemochartsFooter.vue";
import SignupTeaser from "~/pages/SignupTeaser.vue";

export default {
	name: "Landingpage",
	components: {
		SignupTeaser,
		DemochartsFooter,
		SectionContent,
		DButton,
		Initial,
	},
	data: function () {
		return {
			selectedStep: 1,
		};
	},
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


	.artist-of-the-month-bg {
		background: url('~@/assets/bg/landingpage_banner_4_background.png');

		@include respondTo(mobile) {
			margin-top: 64px;
		}
	}

	$secondary: #2a276d;

	path {
		fill: $secondary;
	}

	.banner_2 {
		width: 70%;

		@include respondTo(mobile){
			width: 100%;
			margin-top: 32px;
		}
	}

	.banner_1 {
		width: 85%;

		@include respondTo(mobile){
			width: 100%;
			margin-top: 32px;
		}
	}
</style>
