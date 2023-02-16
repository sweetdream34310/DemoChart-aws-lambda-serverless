<template>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	beforeMount() {
		window.location.href = this.$config.APP_BASE_PATH;
	},
});
</script>
