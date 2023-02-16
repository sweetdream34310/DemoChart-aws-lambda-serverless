<template>
  <side-menu-wrapper>
  <div class="flex mt-4 flex-col gap-4">
    <a :href="signupUrl" v-if="isNotLoggedIn">
      <div  class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 justify-center text-white bg-demo-violet">
        <p class="text-sm">Sign up</p>
      </div>
    </a>
    <a :href="loginUrl" v-if="isNotLoggedIn">
      <div  class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 justify-center text-white bg-demo-red">
        <p class="text-sm">Login</p>
      </div>
    </a>
    <nuxt-link :to="'/'" v-if="isLoggedIn">
      <div  class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-demo-gray-100">
        <settings-icon />
        <p class="text-sm">Explore</p>
      </div>
    </nuxt-link>
    <nuxt-link to="/messages">
      <div  class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-demo-gray-100">
        <p class="text-sm">Messages</p>
      </div>
    </nuxt-link>
    <nuxt-link :to="'/freelancer/dj-thomas/orders'">
      <div  class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-demo-gray-100">
        <p class="text-sm">Orders</p>
      </div>
    </nuxt-link>
    <nuxt-link :to="'/settings'" v-if="isLoggedIn">
      <div  class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-demo-gray-100">
        <p class="text-sm">Settings</p>
      </div>
    </nuxt-link>
    <nuxt-link to="/support">
      <div  class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-demo-gray-100">
        <p class="text-sm">Contact Support</p>
      </div>
    </nuxt-link>
  </div>
  </side-menu-wrapper>
</template>
<script>
import {useAppStore} from "~/stores/app";
import {useUserStore} from "../../stores/user";
import SettingsIcon from "../Icons/SettingsIcon";

export default {
  name: "SideMenuDefault",
  components: {SettingsIcon},
  setup() {
    const appStore = useAppStore();
    const userStore = useUserStore();

    const isLoggedIn = computed(() => {
      return userStore.isLoggedIn
    })
    const isNotLoggedIn = computed(() => {
      return userStore.isNotLoggedIn
    })

    return {
      signupUrl: appStore.signupUrl,
      loginUrl: appStore.loginUrl,
      isLoggedIn,
      isNotLoggedIn,
    }

  }

}
</script>
<style lang="">

</style>