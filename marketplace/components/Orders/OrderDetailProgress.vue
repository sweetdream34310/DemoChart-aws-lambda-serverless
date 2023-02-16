<template>
    <div class="bg-white p-7 rounded-lg mt-8">
        <h5 class="text-lg font-bold">
            Order status
        </h5>
        <section class="flex relative mt-4 flex-col gap-4">
            <div id="progressBar" class="w-[10px] progressBar bg-gray-300 z-0 top-1 left-[7px] h-[calc(100%-8px)] absolute">
            </div>
            <div class="flex items-center relative gap-4">
                <OrderProgressButton :done="isStatusDone(ServiceOrderStatus.PLACED)"/>
                <p>
                    Order placed
                </p>
            </div>
            <div class="flex items-center relative gap-4">
                <OrderProgressButton :done="isStatusDone(ServiceOrderStatus.PAID)"/>
                <p>
                    Order paid
                </p>
            </div>
            <div class="flex items-center gap-4">
                <OrderProgressButton :done="isStatusDone(ServiceOrderStatus.IN_PROGRESS)"/>
                <p>
                    Order in Progress
                </p>
            </div>
            <div class="flex items-center gap-4">
                <OrderProgressButton :done="isStatusDone(ServiceOrderStatus.READY_TO_REVIEW)"/>
                <p>
                    Ready to review
                </p>
            </div>
            <div class="flex items-center gap-4">
                <OrderProgressButton :done="isStatusDone(ServiceOrderStatus.CHANGES_REQUESTED)"/>
                <p>
                    Changes requested
                </p>
            </div>
            <div class="flex items-center gap-4">
                <OrderProgressButton :done="isStatusDone(ServiceOrderStatus.COMPLETED)"/>
                <p>
                    Done
                </p>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import OrderProgressButton from './OrderProgressButton.vue';
import {defineComponent, onMounted} from "vue";
import {ServiceOrderStatus, isOrderStatusDone, OrderStepCompleted} from "../../../lib/types/ServiceOrderStatus";

export default defineComponent({
  props: {
      order: {
          type: Object,
          required: true
      }
  },
  components: { OrderProgressButton },
  setup(props) {
      onMounted(() => {
          const progressBar = document.getElementById("progressBar");
          const progressIcons = document.getElementsByClassName("progressButton");
          const distanceBetweenPoints = progressIcons[progressIcons.length - 1].getBoundingClientRect().top - progressIcons[0].getBoundingClientRect().top;
          progressBar.style.top = progressIcons[0].offsetTop + (progressIcons[0].clientHeight / 2) + "px";
          progressBar.style.height = distanceBetweenPoints + "px";
          window.addEventListener("resize", (event) => {
              const distanceBetweenPoints = progressIcons[progressIcons.length - 1].getBoundingClientRect().top - progressIcons[0].getBoundingClientRect().top;
              progressBar.style.top = progressIcons[0].offsetTop + (progressIcons[0].clientHeight / 2) + "px";
              progressBar.style.height = distanceBetweenPoints + "px";
          });
      });

      const isStatusDone = (status: string) => {
        return isOrderStatusDone(status, props.order.orderStatus)
      }

      return { ServiceOrderStatus, isStatusDone, OrderStepCompleted }
  },
})

</script>