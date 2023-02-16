<template>
    <div :class="`w-6 progressButton flex items-center justify-center relative shrink-0 h-6 ${done === OrderStepCompleted.DONE || done === OrderStepCompleted.DOING ? 'bg-demo-violet' : 'bg-white'} border-gray-300 border rounded-full`">
        <CheckmarkIcon v-if="done === OrderStepCompleted.DONE" :class="'w-3 text-white h-3'"/>
    </div>
</template>
<script lang="ts">
import CheckmarkIcon from '../Icons/CheckmarkIcon.vue';
import {OrderStepCompleted} from "../../../lib/types/ServiceOrderStatus";

export default {
    props: {
        done: {
            type: String,
            default: false
        }
    },
  setup() {

      return {
        OrderStepCompleted,
      }
  },
    components: { CheckmarkIcon }
}
</script>