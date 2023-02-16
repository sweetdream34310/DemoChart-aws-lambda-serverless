<template>
  <div
      :class="`nav_top_bar sm:hidden transition-all duration-300 w-full p-4 z-50 bg-demo-gray-100 !bg-cover
        ${navigationStore.isFixedMobile ? 'fixed' : ''}
        ${navigationStore.isFixedDesktop ? 'lg:fixed' : ''}
      `"
      :style="navigationStore.backgroundUrl ? `background: no-repeat center url(${navigationStore.backgroundUrl});` : ''"
      >

    <div
        v-if="navigationStore.showBackButton && navigationStore.mode !== 'back-on-mobile'"
        :class="`p-4 ${navigationStore.showBackButton ? 'flex' : 'hidden'}`">
      <floating-button
          class="fixed top-0 left-0 m-4 z-50"
          @backClick="() => router.go(-1)"
      >
        <icons-arrow-left-icon></icons-arrow-left-icon>
      </floating-button>
    </div>

    <div v-if="navigationStore.mode === 'back-on-mobile'"
         class="flex items-center"
    >
      <div
          @click="() => router.go(-1)"
          class="inline-block"
      >
          <icons-arrow-left-icon></icons-arrow-left-icon>
      </div>
      <h1 class="ml-2 text-xl">{{ navigationStore.navigationTitle }}</h1>
    </div>

    <div v-if="navigationStore.mode !== 'back-on-mobile'">
      <h1
          :class="[
              navigationStore.navigationTitle ? 'flex text-shadow' : 'hidden',
              navigationStore.backgroundUrl ? '' : '',
              navigationStore.extendedInitial ? 'mt-48' : ''
              ]"
          class="p-4 title transition-all text-white flex flex-grow items-end mb-6">{{ navigationStore.navigationTitle }}
      </h1>
      <div :class="`flex items-center transition-all ${!navigationStore.navigationTitle ? 'justify-between w-full gap-4' : 'px-4'}`">
        <nuxt-link :to="'/'">
          <logo-dots v-if="!navigationStore.navigationTitle" class="h-8 w-8 mr-2"></logo-dots>
        </nuxt-link>
        <navigation-search :class="'relative transition-all order-2 w-full'"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import {useNavigationStore} from "~/stores/navigation";
import LogoDots from "~/components/Icons/LogoDots.vue";
import { CATEGORIES } from "~~/../lib/types/Categories";
import {useRouter} from "#app";
import {useAppStore} from "~/stores/app";
import FloatingButton from "~/components/misc/FloatingButton.vue";

export default defineComponent({
  name: "MobileNavigationTopBar",
  components: {FloatingButton, LogoDots },
  setup() {
    const router = useRouter();

    const appStore = useAppStore();
    const navigationStore = useNavigationStore();

    const activeCategory = computed(() => {
      return CATEGORIES.map(cat => cat.name.toLocaleLowerCase().replaceAll(" ", "") === router.params.cat)
    })

    return {
      navigationStore,
      activeCategory,
      router
    }
  }
})
</script>


<style scoped>
.nav_top_bar {
border-bottom: 1px solid rgb(228, 228, 228);
margin-bottom: 10px !important;
box-shadow: rgba(195, 196, 197, 0.2) 0px 8px 24px;
}
</style>