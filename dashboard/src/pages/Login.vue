<template>
	<div class="authBox">
		<div id="login">
			<h1 class="title">Login</h1>
			<input type="text" name="username" v-model="email" placeholder="Username" />
			<input type="password" name="password" v-model="password" placeholder="Password" />
			<button type="button" v-on:click="signIn()">Login</button>
		</div>
	</div>
</template>

<script>
   import { reactive, computed } from 'vue'
   import router from '../router';

   import useAuth from "../use/Auth";
   import apiClient from "../api/apiClient";
   const auth = useAuth();

   export default {
      name: 'login',
      data() {
         return {
            email: '',
            password: ''
         }
      },
      methods: {
         signIn() {
            auth.signIn(this.email, this.password).then( res => {
            	router.push('/home')

				// apiClient.defaults.headers.common = {
            	// 	...apiClient.defaults.headers.common,
            	// 	Authorization: `${auth.getAuthToken()}`
            	// };
			});
         }
      }
   }

</script>

<style lang="scss" scoped>
.authBox {
	display: flex;
	justify-content: center;
	flex: 1;

	& > * {
		margin-top: auto;
		margin-bottom: auto;

		padding: 1rem 2rem;
		width: 100%;
		max-width: 320px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		& > * {
			margin-bottom: 20px;
		}
	}
}
</style>