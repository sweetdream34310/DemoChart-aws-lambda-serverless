
<template>
  <div class="app-container min-h-screen">
    <div v-if="showBackDrop" class="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"></div>
    <ModalWrapper :class="`${showModalWrapper ? 'right-0' : '-right-[100vw]'}`"/>
    <Navigation class="w-full" />
    <div
        class=" sm:mx-auto"
        :class="[
         `${navigationStore.isFixedMobile && !navigationStore.topBarHidden ? 'pt-[72px]' : ''}`,
         `${navigationStore.isFixedDesktop && !navigationStore.topBarHidden ? 'lg:pt-[72px]' : ''}`,
        ]">
      <NuxtPage/>
    </div>
    
    <BottomNavigationWrapper :key="route.path" :class="'sm:hidden'"/>
  </div>
</template>

<script lang="ts">
  import { useSellerStore } from "./stores/seller";
  import {useUserStore} from "./stores/user";
  import {useAppStore} from "./stores/app";
  import {computed, defineComponent, onBeforeMount} from "vue";
  import {useNavigationStore} from "~/stores/navigation";
  import {useCustomAsyncData} from "~/composables/useCustomAsyncData";
  import {useRoute} from "#app";

  export default defineComponent({
    async setup() {

      const route = useRoute()

      const navigationStore = useNavigationStore();

      const showBackDrop = computed(() => {
        return navigationStore.showBackdrop
      })
      
      onBeforeMount(async () => {

        const sellerStore = useSellerStore();
        await sellerStore.fetchSeller();

      })

      const userStore = useUserStore()
      await useCustomAsyncData('fetch-user', () => userStore.fetchUser());
      // await navigationStore.initOnPageLoad();


      const showModalWrapper = computed(() => {
        return navigationStore.showModalWrapper
      }) 

      return {
        route,
        navigationStore,
        showBackDrop,
        showModalWrapper
      }
    },
    watch: {
      async $route() {
        const navigationStore = useNavigationStore()
        await navigationStore.initOnPageLoad();
      },
  },
  })
</script>
