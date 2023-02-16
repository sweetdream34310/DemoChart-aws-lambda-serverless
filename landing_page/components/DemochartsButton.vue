o<template>
	<a :href="href" :style="cssVars" @click="bubbleClick">
		<span>
			{{ text }}
		</span>
	</a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		text: String,
		href: String,
		bgColor: String,
		textColor: String,
		bgHover: String,
		textHover: String,
		borderColor: String,
		filled: {
			type: Boolean,
			default: true,
		},
		borderRadius: {
			type: String,
			default: '2rem',
		},
		fontSize: {
			type: String,
			default: '1.25rem',
		},
		fontWeight: {
			type: Number,
			default: 400,
		},
		padding: {
			type: String,
			default: '1.25rem 2.5rem',
		},
	},
	computed: {
		bg_color() {
			if (this.filled === true) return this.bgColor;
			else return 'transparent';
		},
		cssVars() {
			return {
				'--bg-color': this.bg_color,
				'--text-color': this.textColor,
				'--bg-hover': this.bgHover,
				'--text-hover': this.textHover,
				'--border-color': this.borderColor,
				'--border-radius': this.borderRadius,
				'--font-size': this.fontSize,
				'--font-weight': this.fontWeight,
				'--padding': this.padding,
			};
		},
	},
	methods: {
		bubbleClick() {
			this.$emit('click');
		},
	},
});
</script>

<style scoped lang="scss">
* {
	transition: all 0.2s ease-in-out;
}

a {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: fit-content;

	padding: var(--padding);
	text-decoration: none;

	border: 2px solid var(--border-color);
	border-radius: var(--border-radius);

	background-color: var(--bg-color);
	color: var(--text-color);

	span {
		font-size: var(--font-size);
		font-weight: var(--font-weight);
	}

	&:hover {
		background-color: var(--bg-hover);
		color: var(--text-hover);
	}
}
</style>
