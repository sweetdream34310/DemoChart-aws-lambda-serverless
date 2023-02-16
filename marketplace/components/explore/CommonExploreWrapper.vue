<template>
  <div class="bg-neutral-100 w-full">
    <slot name="start"></slot>
    <div class="grid gap-4 grid-cols-5">
      <div class="hidden sm:block col-span-5 mt-12 md:mt-0 md:col-span-2 xl:col-span-1">
        <div class="sticky top-60">
          <side-menu-default></side-menu-default>
        </div>
      </div>

      <gig-list :gigs="gigs"></gig-list>
    </div>
  </div>
</template>

<script>
import GigList from "./GigList";
import {useGigsStore} from "~/stores/gigs";
import {useCustomAsyncData} from "~/composables/useCustomAsyncData";
import {computed} from "vue";
export default {
  name: "CommonExploreWrapper",
  props: {
  },
  components: {GigList},
  async setup() {
    const gigStore = useGigsStore()

    console.log("EXECUTE SSR")
    await useCustomAsyncData('fetch-gigs', () => gigStore.fetchGigs());

    const areGigsInitLoading = computed(() => {
      return gigStore.initGigsLoading;
    })

    const gigs = computed(() => {
      return gigStore.getAllGigs
    })

    return { gigs, areGigsInitLoading }
  },
}
</script>

<style scoped>

</style>