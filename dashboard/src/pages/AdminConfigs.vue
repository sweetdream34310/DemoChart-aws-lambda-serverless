<template>
	<div class="container">
		<table class="table">
			<thead>
			<tr>
				<th>Key</th>
				<th>Value</th>
				<th>Update</th>
				<th>Delete</th>
			</tr>
			</thead>

			<tbody>
			<tr v-for="config in adminConfigs" :key="config.uid">
				<td>{{config.key}} </td>
				<td><input v-model="config.value" /> </td>
				<td>
					<button @click="updateValue(config.key, config.value)">update</button>
				</td>
				<td>
					<button @click="updateValue(config.key, undefined)">delete</button>
				</td>
			</tr>

			<tr>
				<td><input v-model="newKey" /></td>
				<td><input v-model="newValue" /></td>
				<td>
					<button @click="updateValue(newKey, newValue)">insert</button>
				</td>
			</tr>
			</tbody>
		</table>

	</div>
</template>

<script>


import useAuth from "../use/Auth";
import Menu from "./Menu.vue";
const auth = useAuth();

const basePath = import.meta.env.VITE_API_BASE_PATH;

export default {
	name: 'AdminConfigs',
	components: {
		Menu

	},
	data() {
		return {
			newValue: '',
			newKey: '',
			adminConfigs: []
		}
	},
	mounted: function () {
		this.getValues().then(res => {
			this.adminConfigs = res
		});
	},
	methods: {
		async getValues(){
			const res = await fetch(basePath + 'dashboard/getAdminConfigs', {
				method: "GET",
				headers: auth.getAuthHeader(),
				mode: "cors"
			});
			console.log("RECEIVED CONFIGS");
			console.log(res);
			return res.json();
		},
		async updateValue(key, value) {

			const res = await fetch(basePath + 'dashboard/updateAdminConfig', {
				method: "POST",
				headers: auth.getAuthHeader(),
				mode: "cors",
				body: JSON.stringify({ key, value }),
			});

			this.getValues().then(res => {
				this.adminConfigs = res
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	.container {
		margin-top: 20px;
	}

	table {
		width: 100%;
	}
</style>