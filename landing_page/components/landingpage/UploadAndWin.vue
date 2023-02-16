<template>
    <span v-if="counter > 0 && counterMax > 0 ">
		Uploads Left: <strong>{{ this.counter }} of {{ this.counterMax }}</strong>
	</span>
</template>

<script>

export default {
	name: "UploadAndWin",
	data() {
		return {
			counter: -1,
			counterMax: -1,
		}
	},
	methods: {
		async getCount(){
			const res = await fetch(this.$config.API_BASE_PATH + '/dashboard/getAdminConfig', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				mode: "cors",
				body: JSON.stringify({ key: 'landingpage_counter' }),
			});
			return res.json();
		},
		async getCountMax(){
			const res = await fetch(this.$config.API_BASE_PATH + '/dashboard/getAdminConfig', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				mode: "cors",
				body: JSON.stringify({ key: 'landingpage_counter_max' }),
			});
			return res.json();
		},
	},
	async mounted() {
		const res = await this.getCount();
		const parsed = Number.parseInt(res);
		this.counter = Number.isNaN(parsed) ? -1 : res;

		const resMax = await this.getCountMax();
		const parsedMax = Number.parseInt(resMax);
		this.counterMax = Number.isNaN(parsedMax) ? -1 : resMax;

		console.log("----------------------------")
		console.log(resMax)
		console.log(res)
		console.log(typeof res)
	}
}
</script>

<style scoped>

</style>
