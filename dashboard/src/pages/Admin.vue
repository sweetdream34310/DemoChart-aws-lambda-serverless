<template>
	<div class="container">
		<button @click="rerunChartCaching()">Rerun chart ranking.</button>


		<h1 class="title" style="color: red; margin-top: 300px">Pros / Devs only!!!</h1>
		<button @click="updateDBColumns()">Update DB - Columns</button>

		<button @click="resetDB()">Reset DB</button>

	</div>
</template>

<script>

import useAuth from "../use/Auth";
import {aPOST} from "../api/apiHelper";
import Menu from "./Menu.vue";
const auth = useAuth();

const basePath = import.meta.env.VITE_API_BASE_PATH;


export default {
	name: 'Admin',
	components: {
		Menu
	},
	data() {
		return {
			users: [],
			activeShowUser: undefined,
		}
	},
	methods: {
		async rerunChartCaching() {
			const res = await aPOST('dashboard/rerunCharts').then();
		},
		async updateDBColumns() {
			const res = await aPOST('dashboard/updateColumns').then();
		},
		async resetDB() {
			const res = await aPOST('dashboard/initDB').then();
		}
	}
}
</script>

<style lang="scss" scoped>

</style>