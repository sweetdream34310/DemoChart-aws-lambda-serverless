<template>
	<button
		v-if="!link"
		@click="onClick()"
		:disabled="disabled"
		class="button"
		:class="[
			primary ? 'primary' : '',
			neutral ? 'neutral' : '',
			disabled ? 'disabled' : '',
			white ? 'white' : '',
			flat ? 'flat' : '',
			primarysolid ? 'primarysolid' : '',
			secondarysolid ? 'secondarysolid' : '',
			big ? 'big' : '',
		]"
	>
		<slot></slot>
	</button>
	<nuxt-link v-else-if="!external"
			   :to="link"
			   @click.native="onClick()"
			   :disabled="disabled"
			   class="button"
			   :class="[
			primary ? 'primary' : '',
			neutral ? 'neutral' : '',
			disabled ? 'disabled' : '',
			white ? 'white' : '',
			flat ? 'flat' : '',
			primarysolid ? 'primarysolid' : '',
			secondarysolid ? 'secondarysolid' : '',
			big ? 'big' : '',
			currentRoute === link ? 'active' : '',
			hoverColor === 'blue' ? 'blue-hover' : 'red-hover'
		]"
	>
		<slot></slot>
	</nuxt-link>
	<a v-else
			   :href="link"
			   @click="onClick()"
			   :disabled="disabled"
			   class="button"
			   :class="[
			primary ? 'primary' : '',
			neutral ? 'neutral' : '',
			disabled ? 'disabled' : '',
			white ? 'white' : '',
			flat ? 'flat' : '',
			primarysolid ? 'primarysolid' : '',
			secondarysolid ? 'secondarysolid' : '',
			big ? 'big' : '',
			currentRoute === link ? 'active' : '',
			hoverColor === 'blue' ? 'blue-hover' : 'red-hover'
		]"
	>
		<slot></slot>

	</a>
</template>

<script>
export default {
	name: "DButton",
	props: {
		onClick: {
			type: Function,
			default: () => { console.log("No action set for clicking on this button.")}
		},
		disabled: {
			type: Boolean,
			default: false
		},
		primary: {
			type: Boolean,
			default: false
		},
		neutral: {
			type: Boolean,
			default: false
		},
		white: {
			type: Boolean,
			default: false
		},
		flat: {
			type: Boolean,
			default: false
		},
		link: {
			type: String,
			default: null
		},
		primarysolid: {
			type: Boolean,
			default: false,
		},
		secondarysolid: {
			type: Boolean,
			default: false,
		},
		big: {
			type: Boolean,
			default: false,
		},
		hoverColor: {
			type: String,
			default: 'red'
		},
		external: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		currentRoute() {
			return this.$nuxt && this.$nuxt.$route.path
		}
	},
	methods: {

	},
}
</script>

<style scoped lang="scss">

	$secondary: #2a276d;

	.button {
		font-family: 'Josefin Sans', sans-serif;
		font-size: 1rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: fit-content;

		padding: 18px 36px 16px 36px;
		text-decoration: none;

		cursor: pointer;
		background: none;
		text-transform: capitalize;
		border: none;

		font-weight: 400;





		@include respondTo(laptop) {
			padding: 12px;
		}

		~.button {
			margin-left: 16px;

			@include respondTo(tablet) {
				margin-left: 0;
			}
		}

		&:focus {
			border: 1px solid #80808061 !important
		}


		&.primary {
			border: 2px solid $secondary;
			color: $primary;
			border-radius: 45px;

			&:hover {
				background-color: $secondary;
				color: white;
			}

			&.white {
				color: white;
				border-color: white;
			}
		}

		&.neutral {
			background-color: $primary;
			color: white;
			border-radius: 45px;
			padding: 12px 24px;


			transition: transform 100ms ease-in;
			transform-origin: center;

			&:hover {
				transform: scale(1.02);
				background-color: $primary;
				color: white;
			}


			&.big {
				padding: 12px 96px;
				font-size: 32px;
			}
		}

		&.neutral.disabled {
			color: #111111;
			cursor: not-allowed;
			background: $grey-light;

			&:hover {
				background:  #e5e5e5;
			}
		}

		&.flat {
			/*padding: 16px 16px;*/
			&.white {
				color: white;
			}

			&:focus {
				border: none !important
			}

			&.active {
				text-decoration: underline;
				text-underline-offset: 0.6rem;
			}

			&.blue-hover {
				text-decoration-color: $secondary;
			}
			&.red-hover {
				text-decoration-color: $primary;
			}


			transition: transform 100ms ease-in;
			transform-origin: left;

			&:hover {
				transform: scale(1.02);
				color: $primary;
			}
		}

		&.primarysolid, &.secondarysolid {
			background: $primary;
			color: white;
			padding: 14px 16px;
			border-radius: 36px;
			transition: 200ms ease all;

			&.big {
				padding: 16px 48px;
				font-size: 36px;

			}

			&:hover {
				transform: scale(1.02);
				box-shadow: rgba(91, 91, 91, 0.25) 0px 4px 4px;
			}
		}
		&.secondarysolid {
			background: $secondary;
		}
	}

</style>
