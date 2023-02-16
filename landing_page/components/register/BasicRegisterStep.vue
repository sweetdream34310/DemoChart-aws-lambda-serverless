<template>
	<div>
    <div>
		<slot></slot>
	</div>
	<div class="button-container">
		<DButton
			v-if="!hideNext"
			:disabled="!isValid || buttonLoading"
			:on-click="() => $emit('goNext')"
			neutral
		>
			<LoadAnimation v-if="buttonLoading" no-margin small></LoadAnimation>
			<span v-else>{{ buttonText }}</span>
		</DButton>
	</div>
	</div>
</template>

<script>
import DButton from "../DButton";
import LoadAnimation from "../LoadAnimation";
export default {
	name: "BasicRegisterStep",
	components: {LoadAnimation, DButton},
	props: {
		isValid: {
			type: Boolean,
			default: false
		},
		buttonText: {
			type: String,
			default: 'next'
		},
		buttonLoading: {
			type: Boolean,
			default: false
		},
		hideNext: {
			type: Boolean,
			default: false
		},
	},
}
</script>

<style scoped lang="scss">

	.button-container {
		margin-top: 32px;
	}

</style>
