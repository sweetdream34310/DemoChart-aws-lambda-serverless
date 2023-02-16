<template>
	<div class="question">
		<h1>{{ question }}</h1>
		<slot></slot>

		<div>

			<DButton
				:on-click="() => $emit('on-next')"
				neutral
				big
				:disabled="!isValid"
				class="question-button"
				id="question-button"
			>Next</DButton>

		</div>
	</div>
</template>

<script>
import DButton from "~/components/DButton";
export default {
	name: "Question",
	components: {DButton},
	props: {
		question: {
			type: String,
			required: true
		},
		isValid: {
			type: Boolean,
			default: false
		}
	},
}
</script>

<style scoped>

h1 {
	font-size: 30px;
	margin-bottom: 45px;
}

.question {
	color: white;
	text-align: center;
	margin-top: 36px;

}

.question-button {
	margin-top: 45px;
	background-color: violet;

}

#question-button {
	font-size: 26px;
}

</style>
