<template>
	<div class="user-container">
		<div>
			<h1 class="title">
				<slot name="title"></slot>
			</h1>
			<slot name="description"></slot>

			<div style="margin-top: 32px">
				<slot name="cta"></slot>
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
import CloseIcon from "../icons/CloseIcon";
export default {
	name: "SignUpConfirmation",
	components: {CloseIcon},
}
</script>

<style scoped lang="scss">
	.user-container {
		width: 100vw;
		height: 100vh;
		margin-bottom: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 32px;
		font-size: 64px;

		@include respondTo(laptop) {
			display: block;
			font-size: 64px;
		}

		@include respondTo(mobile) {
			display: block;
			font-size: 36px;
		}
	}


	.exit-container, .back-container {
		position: absolute;
		top: 36px;
		right: 36px;

		@include respondTo(mobile) {
			right: 24px;
		}

		.exit-button, .back-button {
			background: #efefef;
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
</style>
