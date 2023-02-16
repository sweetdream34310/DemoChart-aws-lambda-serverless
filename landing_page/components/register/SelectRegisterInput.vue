<template>
	<div class="wrapper">
		<label style="display: block"><slot></slot></label>
		<div style="display: flex">
			<select name="cars" class="select" :value="value" @input="e => setValue(e)">
				<option disabled selected value>{{defaultSelectedText}}</option>
				<option v-for="opt of options" :key="keyFunction(opt)" :value="keyFunction(opt)">{{opt.name}}</option>
			</select>

			<div class="validation-box-container">
				<ValidationBox :is-valid="isValid"></ValidationBox>
			</div>
		</div>
	</div>
</template>

<script>
import ValidationBox from "./ValidationBox";
export default {
	name: "SelectRegisterInput",
	components: {ValidationBox},
	props: {
		value: {
			type: Number,
			default: undefined
		},

		options: {
			type: Array,
			required: true
		},
		isValidCustom: {
			type: Boolean,
			default: undefined
		},
		validNotEmpty: {
			type: Boolean,
			default: true
		},
		placeholder: {
			type: String,
			default: ''
		},
		keyFctn: {
			type: Function,
			default: undefined
		},
		defaultSelectedText: {
			type: String,
			default: '-- select an option -- '
		}
	},
	computed: {
		isValid() {
			if (this.isValidCustom !== undefined){
				return this.isValidCustom;
			}
			if (this.validNotEmpty && this.value !== undefined) {
				return true;
			}

			return false;
		},
	},
	methods: {
		setValue(e) {
			this.$emit('input', parseInt(e.target.value))
		},
		keyFunction(element) {
			if (this.keyFctn){
				return this.keyFctn(element);
			}
			return element.id;
		}
	},
}
</script>

<style scoped lang="scss">
	.wrapper {
		margin-bottom: 32px;
	}

	.select {
		margin-top: 8px;
		padding: 16px 16px;
		border-radius: 4px;
		font-size: 18px;
		border: none;
		width: 400px;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		background: $grey-light;
		background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
		background-repeat: no-repeat;
		background-position-x: 95%;
		background-position-y: 50%;
		box-sizing: border-box;

		&:focus {
			border: 1px solid #80808061 !important
		}


		@include respondTo(mobile) {
			/*width: unset;*/
			width: 65vw;
			padding: 16px;
		}

	}


	.validation-box-container {
		display: flex;
		align-items: center;
		margin-left: 32px;
	}

</style>
