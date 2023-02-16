<template>
    <Dialog @onClose="$emit('onClose')">
        <h1>You wanna grant some credits? fine.</h1>

        <div>
            <input v-model="email" type="email" placeholder="max.mustermann@gmail.com">
            <input v-model="amount" type="number" />
            <button @click="grantCredits">Submit</button>
        </div>
    </Dialog>
</template>

<script>

const basePath = import.meta.env.VITE_API_BASE_PATH;

import useAuth from "../use/Auth";
const auth = useAuth();

import Dialog from "./Dialog.vue";
export default {
	name: "GrantCredits",
	components: {Dialog},
	data() {
		return {
			email: '',
			amount: 1,
		}
	},
	props: {
		emailInput: {
			type: String,
			default: ''
		},
	},
	created() {
		this.email = this.emailInput
	},
	methods: {

		async grantCredits() {

			try {
				const res = await fetch(basePath + 'dashboard/grantCredits', {
					method: "POST",
					headers: auth.getAuthHeader(),
					mode: "cors",
					body: JSON.stringify({ email: this.email, credits: this.amount }),
				});

				alert("Should have been worked!")
				this.$emit('onClose');

			} catch(err){
				console.error(err)
			}


		}
	},
}
</script>

<style scoped>

</style>