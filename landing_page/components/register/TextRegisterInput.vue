<template>
	<div class="wrapper" :class="darkMode ? 'darkMode' : ''">
		<label v-if="$slots"><slot></slot></label>
		<label v-if="label">{{ label }}</label>
		<div class="basic-input-wrapper">
			<input
				:type="type"
				:value="value"
				:placeholder="placeholder"
				@input="e => $emit('input', e.target.value)"
				class="input"
			/>

			<div class="validation-box-container">
				<ValidationBox :is-valid="isValid"></ValidationBox>
			</div>
		</div>

		<div v-if="invalidHint.show" class="error-hint">{{ invalidHint.message }}<a v-if="invalidHint.ctaLink" :href="invalidHint.ctaLink" class="error-link">{{invalidHint.ctaText}}</a></div>
	</div>
</template>

<script>
import ValidationBox from "./ValidationBox";
export default {
	name: "TextRegisterInput",
	components: {ValidationBox},
	props: {
		value: {
			type: String,
			default: ''
		},
		isValidCustom: {
			type: Boolean,
			default: undefined
		},
		validNotEmpty: {
			type: Boolean,
			default: true
		},
		invalidHint: {
			type: Object,
			default: () => ({})
		},
		label: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		},
		darkMode: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		isValid() {
			if (this.isValidCustom !== undefined){
				return this.isValidCustom;
			}
			if (this.validNotEmpty && this.value.length > 0) {
				return true;
			}

			return false;
		}
	},
}
</script>

<style scoped lang="scss">



	:focus {
		border: 1px solid #80808061 !important;
	}

	.basic-input-wrapper {
		display: flex;
		margin-bottom: 32px;

		max-width: 85vw;
	}


	.input {
		padding: 16px 16px;
		margin-top: 12px;
		/*border: 1px solid #d5d5d5;*/
		border-radius: 8px;
		font-size: 20px;
		/*min-width: 300px;*/

		color: $link;
		font-weight: 500;
		background: $grey-light;
		border: none;
		width: 400px;
		box-sizing: border-box;

		@include respondTo(mobile) {
			/*width: 65vw;*/
			flex: 1;
		}
	}

	.validation-box-container {
		display: flex;
		align-items: center;
		margin-left: 32px;
	}

	.error-link {
		margin-left: 16px;
	}


	.darkMode {
		label {
			color: white;
		}

		.input {
			background: $darkblack;
			color: white;
		}
	}

</style>
