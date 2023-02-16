<template>
	<div class="validation-box" :class="isValid ? 'isValid' : 'isNotValid' ">

		<img src="@/assets/checkmark-white.svg" width="60%" height="60%" style="padding: 6px" />
	</div>
</template>

<script>
export default {
	name: "ValidationBox",
	props: {
		isValid: {
			type: Boolean,
			default: false
		},
	},
}
</script>

<style scoped lang="scss">
	.validation-box {
		border-radius: 50%;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.isValid {
		background: green;
	}

	.isNotValid {
		background: $grey-light;
	}
</style>
