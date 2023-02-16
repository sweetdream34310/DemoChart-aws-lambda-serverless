<template>
<!--  <div class="w-full h-64 bg-demo-violet flex flex-col">-->

<!--  </div>-->
  <common-explore-wrapper>
    <template v-slot:start>
      <gig-categories/>
    </template>
  </common-explore-wrapper>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, onUnmounted} from "vue";
import {useAppStore} from "~/stores/app";
import CommonExploreWrapper from "~/components/explore/CommonExploreWrapper.vue";
import {useNavigationStore} from "~/stores/navigation";
export default defineComponent({
  name: "index",
  components: {CommonExploreWrapper},
  setup() {
    const appStore = useAppStore();
    const navigationStore = useNavigationStore();


    onBeforeMount(() => {
        console.log("onBeforeMount=!=!")
      navigationStore.setIsFixedMobile(false);
      navigationStore.setIsFixedDesktop(true);
      navigationStore.setBackgroundUrl('yesss');
      navigationStore.setShowBackButton(true);
      navigationStore.setNavigationTitle('Explore the best Graphic design for you.')
    })



  }
})
</script>

<style scoped>

</style>