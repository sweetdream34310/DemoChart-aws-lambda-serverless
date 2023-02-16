<template>
	<div>
		<div
			v-for="answer in answers"
			@click="toggle(answer)"
			class="item"
			:class="value.find(selected => selected === answer) ? 'active' : ''"

		>
			{{ answer }}
		</div>
		<div v-if="allowCustomInput" class="item no-padding"
			 :class="value.find(selected => selected.startsWith('CUSTOM_')) ? 'active' : ''"
		>
			<input
				:value="customTextBinding"
				placeholder="type alternative..."
				@input="onCustomInput($event)"
				class="item-input"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: "SingleChoice",
	props: {
		value: {
			type: Array,
			required: true
		},
		answers: {
			type: Array,
			required: true
		},
		isSingleMode: {
			type: Boolean,
			required: true
		},
		allowCustomInput: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			customTextBinding: ''
		}
	},
	watch: {
		answers(newVal) {
			this.customTextBinding =''
		}
	},
	methods: {
		toggle(el) {

			if (this.isSingleMode) {
				this.customTextBinding = ''
				this.$emit('input', [el])
				return;
			}

			const arr = [...this.value];

			const i = arr.indexOf(el);
			if (i !== -1){
				arr.splice(i, 1)
			} else {
				arr.push(el);
			}
			this.$emit('input', arr);
		},
		onCustomInput($event) {
			const newInput = $event.target.value;
			this.customTextBinding = newInput;

			const arr = [...this.value];
			const customInput = arr.find(item => item.startsWith('CUSTOM_'));

			if (customInput) {
				const i = arr.indexOf(customInput);
				if (i !== -1){
					arr.splice(i, 1)
				}
			}

			if (newInput.length > 0){
				arr.push('CUSTOM_' + newInput)

				if (this.isSingleMode) {
					this.$emit('input', ['CUSTOM_' + newInput])
					return;
				}
			}

			this.$emit('input', arr);
		}

	},
}
</script>

<style scoped lang="scss">

.item {
	padding: 20px 45px;
	background: #3b3b3b;
	display: inline-block;
	margin: 10px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 20px;

	@include respondTo(mobile) {
		padding: 10px 18px;
		font-size: 20px;
	}
}

.item.no-padding {
	padding: 0;
}

.item:hover {
	transform: scale(1.02);
}

.active {
	background: $primary;
}

.item-input {
	background: none;
	border: none;
	color: white;
	font-size: 20px;
	padding: 20px 45px;
	width: 160px;

	@include respondTo(mobile) {
		padding: 10px 18px;
		font-size: 20px;
		width: 160px;
	}
}

.item-input::placeholder {
	color: rgb(153, 153, 153);
	opacity: 1;
}



</style>
