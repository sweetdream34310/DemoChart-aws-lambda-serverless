<template>
    <a class="block py-3 px-12 bg-[#5858e6] cursor-pointer border-[#5858e6] border-2 text-white rounded-full font-bold">{{
         title
      }}</a>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Save Settings'
    }
  }
    
}
</script>
<style lang="">
    
</style>