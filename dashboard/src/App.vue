<template>
	<div>
		<Menu></Menu>
		<router-view></router-view>
	</div>
</template>

<script>

import {setBasePath} from "./api/apiHelper";
import Menu from "./pages/Menu.vue";

const basePath = import.meta.env.VITE_API_BASE_PATH;

export default {
	name: 'App',
	components: {
		Menu
	},
	mounted() {
		setBasePath(basePath);
	}
}
</script>
