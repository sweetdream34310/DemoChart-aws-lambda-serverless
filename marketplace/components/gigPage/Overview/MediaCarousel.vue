<template>
    <div class="v-full swiperContainer rounded-2xl bg-black aspect-video">
      <div
          v-if="activeGig?.gigMedias"
          class="flex overflow-scroll">

        <div v-for="el in activeGig?.gigMedias" class="flex-shrink-0 w-full max-w-screen-sm h-full">
          <img v-if="!el.isVideo" :src="el.mediaUrl" class="h-full w-full  object-cover" />
          <video v-else :src="el.mediaUrl" autoplay class="h-full w-full object-cover"></video>
        </div>
      </div>
    </div>
</template>
<script lang="ts">

import {defineComponent, PropType} from "vue";
import {IActiveGig} from "~/stores/types";

export default defineComponent({
    props: {
      activeGig: {
        type: Object as PropType<IActiveGig>,
        required: true
      }
    }
})
</script>
<style lang="">
    
</style>