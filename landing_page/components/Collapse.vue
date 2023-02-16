<template>
	<div>
		<article class="message-header" @click="open = !open">
			<slot name="header"></slot>
			<img
				id="arrow"
				:class="accordionClasses"
				src="@/assets/collapse-arrow.svg"
			/>
		</article>

		<article class="message" :class="accordionClasses">
			<div class="message-body">
				<slot name="content"></slot>
			</div>
		</article>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	data: function () {
		return {
			open: false,
		};
	},
	computed: {
		accordionClasses: function () {
			return {
				'is-closed': !this.open,
			};
		},
	},
});
</script>

<style lang="scss">
.message-header {
	cursor: pointer;

	#arrow {
		margin-left: 0.5rem;
		height: 0.8rem;
		transform: rotate(90deg);
		transition: 0.3s ease all;

		&.is-closed {
			transform: rotate(0deg);
		}
	}
}

.message-body {
	padding: 0;
	max-height: 16rem;
	overflow: hidden;
	transition: 0.3s ease all;
}

.is-closed .message-body {
	max-height: 0;
}

//----MOBILE STYLEZ----//
@media screen and (max-width: 768px) {
	.message-body {
		max-height: 32rem;
	}
}
</style>
