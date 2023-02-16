<template>
  <div class="col-span-5 md:col-span-3 xl:col-span-4">
<!--    <search class="hidden sm:block"/>-->
    <div v-if="areGigsInitLoading">
      <div v-for="el in 13"
          class="min-w-[200px] h-64 rounded-2xl m-1 bg-gray-200"
      ></div>
    </div>

    <CardList v-if="!areGigsInitLoading" :gigs="gigs" :is-horizontal-on-mobile="isHorizontalOnMobile"/>
  </div>
</template>

<script>
export default {
  name: "GigList",
  props: {
    areGigsInitLoading: {
      type: Boolean,
      default: false
    },
    isHorizontalOnMobile: {
      type: Boolean,
      default: false
    },
    gigs: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>

</style>