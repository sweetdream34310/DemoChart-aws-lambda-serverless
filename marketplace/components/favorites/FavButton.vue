<template>
  <div @click.prevent="toggleActive" :class="{ 'activePageMarker': isActive }" class="bg-[#eeeeee] cursor-pointer p-2 rounded-full inline-block gig_heart">
    <heart-icon />
  </div>
</template>

<script>
import HeartIcon from "../Icons/HeartIcon";
export default {
  name: "FavButton",
  components: {HeartIcon},
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const toggleActive = (e) => {
      console.log("test?=)==)=")
      // e.stopPropagation();
      emit('toggleActive');
    }

    return {
      toggleActive,
    }
  }

}
</script>

<style scoped>

</style>