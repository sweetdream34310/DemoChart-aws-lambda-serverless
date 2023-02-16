<template>
  <div>
    <skeleton v-if="showSkeleton" :class="`w-full sm:w-unset py-6 text-white px-6 text-center border-2 font-bold ${ fullyRounded ? 'rounded-full' : 'rounded-lg'}`" ></skeleton>
    <button
        v-if="!showSkeleton"
        :class="`w-full sm:w-unset py-4 text-white px-6 text-center ${color} font-bold ${ fullyRounded ? 'rounded-full' : 'rounded-lg'}`"
    >
      <slot></slot>
    </button>
  </div>
</template>
<script>
import Skeleton from "~/components/misc/Skeleton";
export default {
  name: 'PrimaryButton',
  components: {Skeleton},
  props: {
    showSkeleton: {
      type: Boolean,
      default: false
    },
    fullyRounded: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "bg-demo-violet"
    }
  }
}
</script>