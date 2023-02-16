<template>
	<div>
		<select :value="value" @input="e => $emit('input', e.target.value)" name="survey">
			<option v-for="answer in answers" :value="answer">
				{{ answer }}
			</option>
		</select>
	</div>
</template>

<script>
export default {
	name: "SurveyDropdown",
	props: {
		answers: {
			type: Array,
			required: true
		},
		value: {
			type: Object,
			required: true
		}
	}
}
</script>

<style scoped>

</style>
