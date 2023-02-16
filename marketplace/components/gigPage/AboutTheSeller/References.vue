<template>
  <div class="subtitle mt-8 mb-4">References</div>
    <div
        id="references"
        class="flex w-[full+16px+16px] md:w-full  overflow-auto -mx-4">
      <reference-card
          v-for="(Reference, index) in References"
          class="ml-4"
          :Reference="Reference"
      />
    </div>
</template>
<script>
import ReferenceCard from '../../../components/ReferenceCard.vue'

export default {
  name: "references",
    setup() {
    },
    components: {
        ReferenceCard
    },
    props: {
        References: {
            type: Object
        }
    }
}
</script>
<style lang="">
    
</style>