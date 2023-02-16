<template>
	<div class="modal-wrapper" @click="$emit('close')">
		<div class="modal-container" @click.stop>
			<slot></slot>

			<div class="close-button" @click="$emit('close')">
				<CloseIcon></CloseIcon>
			</div>
		</div>
	</div>
</template>

<script>
import CloseIcon from "~/components/icons/CloseIcon";
export default {
	name: "Modal",
	components: {CloseIcon},
	methods: {
		disableBodyScroll() {
			document.body.classList.add('no-scroll')
		},
		enableBodyScroll() {
			document.body.classList.remove('no-scroll')
		},
	},
	mounted() {
		this.disableBodyScroll();
	},
	beforeDestroy() {
		this.enableBodyScroll();
	}
}
</script>

<style scoped lang="scss">
	.modal-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		color: black;
		backdrop-filter: blur(1);
	}

	.modal-container {
		padding: 48px;
		background: white;
		border-radius: 15px;
		max-width: 500px;
		position: relative;
	}

	.close-button {
		right: -58px;
		top: -58px;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(239, 239, 239, 0.33);
		color: black;
		cursor: pointer;
		user-select: none;

		svg {
			margin: 16px;
			width: 16px;
			height: 16px;
		}
	}

</style>
