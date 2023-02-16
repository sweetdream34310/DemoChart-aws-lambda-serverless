<template>
	<div class="investors-page">
		<InvestorsPassword v-if="!isAuth" @onSuccess="isAuth = true"></InvestorsPassword>
		<div v-else>
			<div>
				<video src="/investors-video.mp4" autoplay class="video"></video>


				<section class="section-welcome">
					<h1 class="section-title-welcome">Looks like you've scored
						a backstage pass.</h1>
				</section>



				<SectionContent inverted
								smaller-height>
					<template #title>
						<span class="primary">The core team</span> behind democharts.
					</template>

					<template #description>
						Teamwork makes the dreamwork, right?
						<p class="team-desc">Democharts is made up of an Austrian based core-team with international work experience</p>
						<p class="team-desc"><BulletPoint /> CEO Julian has worked as a music producer for several years & knows the struggle of pitching songs to labels. That’s exactly how the idea of Democharts was born</p>
						<p class="team-desc"><BulletPoint /> CTO Markus previously worked at "Little Big Art”, a live-event-platform which organized at-home concerts for young artists in all over the world</p>
						<p class="team-desc"><BulletPoint /> Creative Director Isabella has a background in consultancy and music journalism, and makes the Democharts vision come to life</p>

					</template>

					<template #image>
						<img src="@/assets/investors/Democharts_Team.png" class="graphic-team" />
					</template>
				</SectionContent>


				<SectionContent smaller-height>
					<template #title>
						<span class="primary">Achievements 2020</span> Thank you!
					</template>

					<template #description>
						<p class="team-desc">2020 was a big year for Democharts</p>
						<p class="team-desc"><BulletPoint /> Received the AWS Grant</p>
						<p class="team-desc"><BulletPoint /> Built the first prototype, tested it, & improved it for our launch</p>
						<p class="team-desc"><BulletPoint /> Optimized our user experience and strategy</p>
						<p class="team-desc"><BulletPoint /> Onboarded more than 100 labels, A&Rs, agencies & other industry experts</p>
						<p class="team-desc"><BulletPoint /> Streamlined our branding & filmed commercial video ads</p>
					</template>

					<template #image>
						<div class="graphic-achievements-wrapper">
							<img src="@/assets/investors/Democharts_Achievements_Grafik.png" class="graphic-achievements" />
						</div>
					</template>
				</SectionContent>

				<section>
					<div class="section-inner-container">
						<h2 class="section-title section-title-graphic">Our Mission</h2>
						<img src="@/assets/investors/Democharts_Mission.png" class="section-graphic" />
					</div>
				</section>


				<section>
					<div class="section-inner-container">
						<h2 class="section-title section-title-graphic">Our Roadmap</h2>
						<img src="@/assets/investors/Democharts_Roadmap.png" class="section-graphic" />
					</div>
				</section>

				<section style="height: 100vh">
					<h1 class="email">hello@democharts.org</h1>
				</section>
			</div>
		</div>




		<div class="exit-container">
			<div class="exit-button" @click="() =>this.$router.push('/')">
				<CloseIcon></CloseIcon>
			</div>
		</div>
	</div>
</template>

<script>
import InvestorsPassword from "../components/Investors/InvestorsPassword";
import CloseIcon from "../components/icons/CloseIcon";
import SectionContent from "../components/SectionContent";
import CheckIcon from "../components/icons/CheckIcon";
import BulletPoint from "../components/icons/BulletPoint";

export default {
	name: "investors",
	components: {BulletPoint, CheckIcon, SectionContent, CloseIcon, InvestorsPassword},
	data() {
		return {
			isAuth: false
		}
	},
	mounted() {
		let video = document.createElement("video");
		video.setAttribute("src", "/investors-video.mp4");

		this.$nuxt.$emit('show-menu', false)
	},
	destroyed() {
		this.$nuxt.$emit('show-menu', true);
	},
}
</script>

<style scoped lang="scss">

	.investors-page {
		background: black;
	}

	.video {
		width: 99vw;
		height: 100vh;
		object-fit: cover;

		@include respondTo(mobile) {
			height: unset;
			margin-top: 35%;
		}
	}



	.exit-container, .back-container {
		position: absolute;
		top: 36px;
		right: 36px;

		@include respondTo(mobile) {
			top: 16px;
			right: 16px;
		}

		.exit-button, .back-button {
			/*background: #efefef;*/
			width: 24px;
			height: 24px;
			border-radius: 50%;
			display: flex;
			cursor: pointer;
			align-items: center;
			justify-content: center;
			fill: white;
			padding: 16px;
		}


		@include respondTo(mobile) {
			.back-button {
				margin-left: 24px;
			}
		}
	}


	section {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.section-title {
		font-size: 56px;
		font-weight: 900;
	}

	.section-welcome {
		height: 100vh;

		@include respondTo(mobile) {
			height: unset;
			margin-top: 64px;
			margin-bottom: 160px;
		}
	}
	.section-title-welcome {
		font-size: 4em;
		font-weight: 900;
		text-align: center;
		max-width: 750px;

		@include respondTo(mobile) {
			font-size: 1.9em;
			margin: 0 16px;
		}
	}

	section {
		height: unset;
	}

	.section-inner-container {
		text-align: center;
		width: 100%;
		height: unset;
		margin-bottom: 128px;

		@include respondTo(mobile) {
			padding: 16px;
		}
	}

	.section-title-graphic {
		margin-bottom: 64px;
	}

	.section-graphic {
		width: 50%;

		@include respondTo(mobile) {
			width: 100%;
		}
	}

	.team-desc {
		margin-bottom: 16px;
	}

	.email {

		@include respondTo(mobile) {
			font-size: 18px;
		}
	}


	.graphic-achievements-wrapper {

		.graphic-achievements {
			width: 75%;

			@include respondTo(mobile) {
				width: 100%;
			}
		}
	}

	.graphic-team {
		width: 85%;

		@include respondTo(mobile) {
			width: 100%;
		}
	}

</style>
