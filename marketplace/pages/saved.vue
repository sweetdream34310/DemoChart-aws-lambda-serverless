<template>
  <gig-list class="mt-4" :gigs="gigsSaved" :is-horizontal-on-mobile="false"></gig-list>
</template>

<script>
import GigList from "../components/explore/GigList";
import {useCustomAsyncData} from "../composables/useCustomAsyncData";
import {useGigsStore} from "../stores/gigs";
import {computed, onBeforeMount} from "vue";
import {useNavigationStore} from "../stores/navigation";
export default {
  name: "saved",
  components: {GigList},
  async setup() {
    const gigStore = useGigsStore()

    const navigationStore = useNavigationStore();
    onBeforeMount(() => {
      navigationStore.initOnPageLoad();
    })
    navigationStore.initOnPageLoad();

    await useCustomAsyncData('fetch-gigs', () => gigStore.fetchSavedGigs());

    const gigsSaved = computed(() => {
      return gigStore.savedGigs
    })

    return {
      gigsSaved,
    }
  }
}
</script>

<style scoped>

</style>