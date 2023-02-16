<template>
            <div :class="`container ${isMobile ? 'h-max' : 'h-4/5'} my-auto py-12 mx-auto`">
                <div class="h-1/2 flex flex-col justify-end">
                    <div class="text-center">
                        <h4 class="text-2xl">
                            Log-In
                        </h4>
                        <p class="mt-4 text-sm">
                            Type in your Email and your Password
                        </p>
                    </div>
                    <div class="flex text-center flex-col gap-4 mt-8">
                        <input v-model="email" class="bg-gray-200 outline-none" type="email" placeholder="Your Email" name="" id="">
                        <input v-model="password" class="bg-gray-200 outline-none" type="password" placeholder="Your Password" name="" id="">
                        <a class="underline text-demo-gray-800 hover:scale-105 transition-transform text-sm" href="">Forgot Password</a>
                        <buttons-primary-button
                            :class="'hover:scale-105 transition-transform'" :fullyRounded="true"
                            @click="() => login()"
                        >
                            Login
                        </buttons-primary-button>
                    </div>
                </div>
                <hr class="mt-8">
                <div class="mt-8 h-1/2">
                    <div class="text-center">
                        <h4 class="text-2xl">
                            Create New Account
                        </h4>
                        <p class="mt-4 text-sm">
                            Register as a new user and create your account
                        </p>
                    </div>
                    <ul class="mt-8 flex flex-col gap-4 mx-auto w-max">
                        <li class="flex items-center gap-4">
                            <div class="bg-blue-400 rounded-full p-2">
                                <icons-checkmark-icon class="h-4 w-4 text-white"/>
                            </div>
                            Work with verified freelancers</li>
                        <li class="flex items-center gap-4">
                            <div class="bg-blue-400 rounded-full p-2">
                                <icons-checkmark-icon class="h-4 w-4 text-white"/>
                            </div>
                            Level-Up your music carrer</li>
                    </ul>
                    <buttons-primary-button @click="signup" :class="'hover:scale-105 mt-8 transition-transform'" :color="'bg-demo-red'">
                        Register
                    </buttons-primary-button>
                </div>
            </div>
</template>
<script lang="ts">
import {useRuntimeConfig} from "#app";
import {useAuth} from "#imports";
import {ref} from "vue";
import {useNavigationStore} from "~/stores/navigation";

export default {
  setup() {
    const email = ref('');
    const password = ref('');

    const runtimeConfig = useRuntimeConfig();
    const navigationStore = useNavigationStore();

    const auth = useAuth();

    const signup = () => {
      window.location.href = `${runtimeConfig.public.landingpageUrl}/apply?origin=marketplace`
    }

    const login = () => {
      console.log("PRE LOGIN");
      auth.login(email.value, password.value, () => {
        console.log("POST LOGIN HOOK")
        navigationStore.toggleModal()
      });
    }

    return {
      signup,
      password,
      email,
      login,
    }
  },
    props: {
        isMobile: {
            type: Boolean,
            default: false
        }
    }
    
}
</script>