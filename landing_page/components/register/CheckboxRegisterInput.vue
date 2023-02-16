<template>
	<div class="checkbox-container">

		<input type="checkbox" v-model="cbvalue" />
		<span class="checkmark" @click="setValue(!cbvalue)"></span>
		<label class="checkbox-description pointer" @click="setValue(!cbvalue)"><slot></slot></label>
	</div>
</template>

<script>
export default {
	name: "CheckboxRegisterInput",
	props: {
		value: {
			type: Boolean,
			required: true
		},
		isValid: {
			type: Boolean,
			default: undefined
		},
	},
	data() {
		return {
			cbvalue: false
		}
	},
	mounted() {
		this.cbvalue = this.value;
	},
	methods: {
		setValue(bool) {
			this.cbvalue = bool;
			this.$emit('input', this.cbvalue)
		}
	},
}
</script>

<style scoped lang="scss">
	.checkbox-container {
		position: relative;
		height: 25px;
		display: flex;
		align-items: center;
		margin-bottom: 16px;
	}

	.checkbox-description {
		margin-left: 32px;
		font-size: 19px;
	}


	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: #e5e5e5;
		border-radius: 5px;
		cursor: pointer;
	}
	.checkmark::after {
		top: 6px;
		left: 6px;
		position: absolute;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: $primary;
		display: none;
	}

	input:checked {
		background: blue;
	}

	input:checked ~ .checkmark::after {
		display: block;
		content: '';
	}

	input:focus ~ .checkmark {
		border: 1px solid #80808061 !important
	}

	.checkbox {
		opacity: 0;
		position: absolute;
	}


	.container input:checked ~ .checkmark {
		background-color: #2196F3;
	}

	/* On mouse-over, add a grey background color */
	.container:hover input ~ .checkmark {
		background-color: #ccc;
	}

</style>
