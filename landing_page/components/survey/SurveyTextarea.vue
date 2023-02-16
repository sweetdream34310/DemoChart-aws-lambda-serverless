<template>
	<textarea
		:value="value"
		@input="e => $emit('input', e.target.value)"
	></textarea>
</template>

<script>
export default {
	name: "SurveyTextarea",
	props: {
		value: {
			type: String,
			required: true
		},
	},
}
</script>

<style scoped lang="scss">

textarea {
	border-radius: 8px;
	border: 2px rgb(70, 70, 70) solid;
	width: 700px;
	height: 219px;
	font-size: 18px;
	padding: 16px;
	background-color: rgb(36, 36, 36);
	color: white;

	@include respondTo(mobile) {
		width: unset;
		min-width: 90%;
	}
}

</style>
