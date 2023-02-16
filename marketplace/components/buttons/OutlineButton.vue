<template>
  <skeleton v-if="showSkeleton" class="w-full sm:w-unset py-6 text-white px-6 text-center border-2 rounded-lg mt-8 font-bold" ></skeleton>
  <button v-else class="w-full sm:w-unset py-3.5 px-6 text-center border-2 border-black rounded-lg font-md "><slot></slot></button>

</template>
<script>
import Skeleton from "~/components/misc/Skeleton";
export default {
  components: {Skeleton},
  props: {
    showSkeleton: {
      type: Boolean,
      default: false
    }
  },
  name: 'OutlineButton'
}
</script>

<style scoped>




</style>