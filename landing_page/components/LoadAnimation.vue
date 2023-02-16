<template>
	<div class="sk-wave" :class="[
      noMargin ? 'sk-wave-no-margin' : ''
    ]">
		<div class="sk-rect sk-rect1" :class="[white ? 'white' : '', small ? 'small' : '']"></div>
		<div class="sk-rect sk-rect2" :class="[white ? 'white' : '', small ? 'small' : '']"></div>
		<div class="sk-rect sk-rect3" :class="[white ? 'white' : '', small ? 'small' : '']"></div>
		<div class="sk-rect sk-rect4" :class="[white ? 'white' : '', small ? 'small' : '']"></div>
		<div class="sk-rect sk-rect5" :class="[white ? 'white' : '', small ? 'small' : '']"></div>
	</div>
</template>

<script>
export default {
	name: 'LoadAnimation',
	props: {
		noMargin: {
			type: Boolean,
			default: false
		},
		white: {
			type: Boolean,
			default: false
		},
		small: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped>

	.sk-wave {
		height: unset;
	}

	.sk-wave-no-margin {
		margin: 0;
	}

	.white {
		background-color: white !important;
	}

	.small {
		width: 3px;
		height: 15px;
	}
</style>
