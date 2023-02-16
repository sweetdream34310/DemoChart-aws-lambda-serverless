<template>
    <div
        @click="() => $router.push(`/orders/${order.uid}`)"
        class="flex flex-col items-center xl:flex-row w-full lg:w-[calc(50%-16px)] xl:w-full relative gap-4 bg-white rounded-xl py-6 px-6 xl:px-12">
        <div @click="deleteOrder(order.uid)" class="absolute left-3 top-3">
            <TrashIcon/>
        </div>
        <img class="w-full xl:w-40 object-cover rounded-xl" :src="order.serviceOffer.gig.gigMedias[0].mediaUrl" alt="">
        <div class="flex items-center shrink-0 w-full xl:w-1/4 2xl:w-1/3 gap-6">
            <!-- TODO: nur anzeigen wenn User; Link zu Seller -->
            <!-- <img class="object-cover w-16 h-16 rounded-full" src="https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt=""> -->
            <div class="">
                <p class="font-bold">
                    {{ order.serviceOffer.gig.name }}
                </p>
                <p>{{ order.serviceOffer.offerName }}</p>
            </div>
        </div>
        <div class="flex items-center w-full xl:w-1/2 gap-4 justify-between">
            <div>
                <div class="flex gap-2">
                    <p>Due on:</p>
                    <p class="font-bold">{{ getMonthDay(order.orderDue) }}</p>
                </div>
                <p class="flex absolute xl:static top-2 left-2 bg-demo-violet xl:mt-2 gap-2 p-2 rounded-md text-white">
                    <clock-icon />
                    <span class="font-bold ">
                        {{ getTimeLeft(order.orderDue) }} 
                    </span>
                </p>
            </div>
            <div class="xl:flex xl:flex-col 2xl:flex-row items-center xl:items-start justify-between w-max xl:w-1/2">
                <div class="flex xl:flex-row 2xl:flex-col w-full gap-2">
                    <p>Price:</p>
                    <p class="font-bold text-demo-active">$ {{ order.orderPrice }}</p>
                </div>
                <div class="bg-demo-inactive xl:flex gap-2  xl:flex-row 2xl:flex-col shrink-0 xl:bg-transparent absolute xl:static top-2 right-2 rounded-md">
                    <p class="hidden xl:block">
                        Status
                    </p>
                    <p class="font-bold text-white xl:text-demo-red p-2 xl:p-0">{{ order.orderStatus }}</p>
                </div>
            </div>
        </div>
        <nuxt-link @click="setActiveOrder(order)" :to="`/orders/${order.uid}`" class="bg-demo-red w-full xl:w-1/5 xl:ml-8 h-min p-2 rounded-lg text-white">
            Details
        </nuxt-link>
    </div>
</template>
<script lang="ts">
import { useOrderStore } from '~~/stores/orders';
import { useUserStore } from '~~/stores/user';
import ClockIcon from '../Icons/ClockIcon.vue';
import TrashIcon from '../Icons/TrashIcon.vue';
import {defineComponent} from "vue";
export default defineComponent({
  name: "OrderCard",
    components: {
        ClockIcon,
        TrashIcon
    },
    props: {
        order: {
            type: Object,
          required: true
        }
    },
    setup(_, ctx) {
        const orderStore = useOrderStore()
        const userStore = useUserStore()

        const setActiveOrder = (order: any) => {
            orderStore.setActiveOrder(order);
            userStore.fetchBuyer(order.buyerUid)
        }

        const deleteOrder = (uid:string) => {
            ctx.emit('deleteOrder', uid )
            orderStore.deleteOrder(uid)
        }
        return { getMonthDay, getTimeLeft, deleteOrder, setActiveOrder }
    }
})
</script>
