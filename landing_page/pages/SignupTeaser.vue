<template>
	<section
		:class="isExpert ? 'isExpert' : 'isArtist'"
		class="flex vert signup-teaser-wrapper"
	>
		<h2 class="signup-title center">
			<span class="signup-text">Apply as&nbsp;an&nbsp;</span>
			<DButton :secondarysolid="isExpert" :primarysolid="!isExpert" big
					 :link="isExpert ? '/apply?role=expert' : '/apply?role=artist'">
				{{isExpert ? 'Expert' : 'Artist'}}
			</DButton>
		</h2>
		<div><a href="https://app.democharts.org/login">Already a member? Click here to login</a></div>
	</section>
</template>
<script>
import DButton from '~/components/DButton.vue'

export default {
	name: 'SignupTeaser',
	components: {DButton},
	props: {
		isExpert: {
			type: Boolean,
			default: false
		},
	},
}
</script>
<style scoped lang="scss">
	@import "assets/scss/Components/landingpage-common";


	$secondary: #2a276d;

	.signup-title {
		display: flex;
	}

	@include respondTo(mobile){
		.signup-title {
			display: block;
			text-align: center;
		}

		.signup-text {
			display: block;
			margin-bottom: 12px;
		}
	}

	.isExpert {
		path {
			fill: $secondary;
		}
	}

	.signup-teaser-wrapper {
		height: 60vh;
		@include respondTo(mobile) {
			height: 40vh;

			background: #efefef;
			margin: 16px 16px 32px 16px;
			border-radius: 8px;
		}
	}
</style>
