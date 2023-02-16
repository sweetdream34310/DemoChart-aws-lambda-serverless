<template>
  <card-wrapper>debug: {{ order.orderStatus }}</card-wrapper>
  <card-wrapper v-if="order.orderStatus === ServiceOrderStatus.PLACED || true">
    <h5 class="font-semibold">
      You got a new order. Show your customer you are working on and set it to progress
    </h5>
    <div class="flex mt-4 flex-col ">
      <button class="w-full bg-demo-violet py-4 text-white rounded-md mb-2" @click="() => changeOrderStatus(ServiceOrderStatus.IN_PROGRESS)">
        Set to progress
      </button>
      <button class="w-full bg-zinc-100 py-4 rounded-md"
              @click="() => changeOrderStatus(ServiceOrderStatus.CANCELED)"
      >
        Cancel the gig
      </button>
    </div>
  </card-wrapper>

    <card-wrapper v-if="order.orderStatus === ServiceOrderStatus.IN_PROGRESS || true" >
        <h5 class="font-semibold">
            Ready to deliver?
        </h5>
        <div class="flex mt-4 flex-col ">
            <button class="w-full bg-demo-violet py-4 text-white rounded-md"
                    @click="() => changeOrderStatus(ServiceOrderStatus.READY_TO_REVIEW)"
            >
                Deliver
            </button>
            <button class="w-full py-4 text-demo-violet">
                Confirm delaying ???
            </button>
        </div>
    </card-wrapper>

    <card-wrapper v-if="order.orderStatus === ServiceOrderStatus.READY_TO_REVIEW || true ">
        <h5 class="font-semibold">
            SELLERNAME just asked for a review.
        </h5>
        <div class="flex mt-4 flex-col ">
            <button class="w-full bg-demo-violet py-4 text-white rounded-md"
            >
                View Review
            </button>
            <button class="w-full bg-demo-violet py-4 text-white rounded-md"
                    @click="() => changeOrderStatus(ServiceOrderStatus.COMPLETED)"
            >
                Complete
            </button>
            <button class="w-full py-4 text-demo-violet"
                    @click="() => changeOrderStatus(ServiceOrderStatus.CHANGES_REQUESTED)"
            >
                Ask for changes
            </button>
        </div>
    </card-wrapper>

    <card-wrapper v-if="order.orderStatus === ServiceOrderStatus.CHANGES_REQUESTED || true ">
        <h5 class="font-semibold">
            BUYERNAME just asked for some changes.
        </h5>
        <div class="flex mt-4 flex-col ">
            <button class="w-full bg-demo-violet py-4 text-white rounded-md"
            >
                View changerequest
            </button>
        </div>
    </card-wrapper>



</template>
<script lang="ts">
import {ServiceOrderStatus, OrderStepCompleted} from "../../../lib/types/ServiceOrderStatus";
import {useOrderStore} from "~/stores/orders";
import CardWrapper from "~/components/misc/CardWrapper.vue";

export default {
  components: {CardWrapper},
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const orderStatus = useOrderStore();


    const changeOrderStatus = (status) => {
      orderStatus.updateOrderStatus(props.order.uid, status)
    }

    return {
      ServiceOrderStatus, OrderStepCompleted, changeOrderStatus,
    }
  }
}
</script>
