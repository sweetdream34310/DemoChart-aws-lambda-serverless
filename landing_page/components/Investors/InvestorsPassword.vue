<template>
    <section>
		<div>
			<h1 class="password-title">Please Enter Your Password:</h1>

			<div class="digit-container">
				<div><input ref="digit0" v-model="digit0" @input="e => onInput(0, e)" type="number" /></div>
				<div><input ref="digit1" v-model="digit1" @input="e => onInput(1, e)" type="number" /></div>
				<div><input ref="digit2" v-model="digit2" @input="e => onInput(2, e)" type="number" /></div>
			</div>

			<div class="cta-container">
				<DButton :on-click="onEnter" primarysolid>Enter</DButton>
			</div>
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import DButton from "../DButton";

export default {
	name: "InvestorsPassword",
	components: {DButton},
	data() {
		return {
			passwordInput: [0,0,0],
			digit2: '',
			digit1: '',
			digit0: '',
		}
	},
	methods: {
		onInput(order, e) {
			Vue.set(this.passwordInput, order, e.data);

			switch (order) {
				case 2: this.digit2 = e.data; break;
				case 1: this.digit1 = e.data; break;
				case 0: this.digit0 = e.data; break;
			}

			if (order === 0) {
				this.$refs["digit1"].focus()
			}

			if (order === 1) {
				this.$refs["digit2"].focus()
			}
		},
		onEnter() {
			console.log(this.passwordInput)
			if (this.passwordInput[0] === "8" && this.passwordInput[1] === "0" && this.passwordInput[2] === "8"){
				this.$emit('onSuccess')
			} else {
				this.$emit('onError');
			}
		}
	},
	mounted() {
		this.$refs["digit0"].focus();
	}
}
</script>

<style scoped lang="scss">

	.digit-container {
		display: flex;
		justify-content: center;
		margin-top: 32px;
	}

	input {
		width: 48px;
		height: 64px;
		max-lines: 1;
		resize: none;
		-moz-appearance: textfield;
		border-radius: 5px;
		border: none;
		align-items: center;
		text-align: center;
		margin: 4px;
		font-size: 32px;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.cta-container {
		display: flex;
		justify-content: center;
		margin-top: 32px;
	}

	section {
		height: 100vh !important;
	}

	.password-title {
		@include respondTo(mobile) {
			text-align: center;
		}
	}
</style>
