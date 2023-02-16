<template>
	<section
		class="container"
		:class="[
			inverted ? 'inverted' : '',
			smallerHeight ? 'smallerHeight' : '',
			responsiveOrder === 'normal' ? 'responsive-normal' : 'responsive-reverse',
			]"
	>
		<div class="left" :class="[
			invertedWidth ? 'w-60' : 'w-40',
			inverted ? '' : 'left-block'
		]">
			<div :style="textInnerContainerStyle">
				<h2 class="section-title"><slot name="title"></slot></h2>

				<div class="lp-text">
					<slot name="description"></slot>
				</div>

				<div>
					<slot name="cta"></slot>
				</div>
			</div>
		</div>

		<div class="right" :class="invertedWidth ? 'w-40' : 'w-60'">
			<slot name="image"></slot>
		</div>
	</section>
</template>

<script>
export default {
	name: "SectionContent",
	props: {
		inverted: {
			type: Boolean,
			default: false,
		},
		invertedWidth: {
			type: Boolean,
			default: false
		},
		textInnerContainerStyle: {
			type: String,
			default: '',
		},
		smallerHeight: {
			type: Boolean,
			default: false
		},
		responsiveOrder: {
			type: String,
			default: 'normal'
		}
	}
}
</script>

<style scoped lang="scss">
	.left, .right {
		display: flex;
		align-items: center;

		&.w-40 {
			width: 40%;
		}
		&.w-50 {
			width: 50%;
		}
		&.w-60 {
			width: 60%;
		}

		@include respondTo(mobile) {
			width: 100% !important;
		}

	}
	.left {
		margin-right: 32px;

		@include respondTo(mobile) {
			margin-right: 0;
		}
	}
	.right {
		margin-left: 32px;

		@include respondTo(mobile) {
			margin-left: 0;
		}
	}

	.inverted {
		display: flex;
		flex-direction: row-reverse;
	}


	.text-inner-container {
		width: 75%
	}

	.lp-text {
		margin-top: 32px;
		margin-bottom: 32px;
		font-size: 18px;
		line-height: 1.4rem;
	}

	.section-title {
		font-size: 56px;
		font-weight: 900;

		@include respondTo(tablet) {
			font-size: 36px;
		}

		@include respondTo(mobile) {
			font-size: 32px;
		}
	}


	.left-block {
		margin-left: 64px;
	}

	section {
		&.smallerHeight {
			height: 70vh;
			min-height: 670px;
		}

		@include respondTo(mobile) {
			margin-top: 64px;
			height: unset !important;
			min-height: unset !important;
			margin-bottom: 64px;

			&.smallerHeight {
				height: unset !important;
			}


			.left-block {
				margin-left: 0;
			}
		}
	}


	@include respondTo(mobile) {
		.responsive-normal {
			flex-direction: column;
		}
		.responsive-reverse {
			flex-direction: column-reverse;
		}
	}

</style>
