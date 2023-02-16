<template>
  <div
      @click="() => $emit('backClick')"
      class="w-10 h-10 bg-gray-100 transition-all rounded-full flex cursor-pointer items-center justify-center drop-shadow-lg"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FloatingButton"
}
</script>

<style scoped>

</style>