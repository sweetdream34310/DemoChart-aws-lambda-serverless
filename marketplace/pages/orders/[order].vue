<template>
    <div class="pt-[150px] sm:pt-[88px] md:grid gap-14 px-4 md:px-14 grid-cols-1 md:grid-cols-4 xl:grid-cols-5">
        <div class="w-full rounded-lg mb-4 md:hidden py-5 flex px-5 justify-between items-center bg-white">
            
            <ArrowLeftIcon @click="router.go(-1)"/>
            <p>
                {{activeBuyer?.firstName}}
                {{activeBuyer?.lastName}}
            </p>
            <ThreeDotIcon/>
        </div>

        <div class="col-span-4 relative rounded-lg bg-gray-100">
            <div class="">
                <OrderDetailOverview :activeBuyer="user" :activeOrder="activeOrder" />
                <div class="bg-white md:grid grid-cols-4 mt-8 p-10 rounded-lg">
                    <div class="col-span-3">
                        <h5 @click="openDescription()" class="text-lg flex md:block items-center justify-between font-bold">
                            Description
                            <span class="md:hidden">
                                <ArrowDownIcon :class="`transition-transform ${descriptionOpen ? 'rotate-180' : ''}`"/>
                            </span>
                        </h5>
                        <p v-if="descriptionOpen" class="mt-2">
                            <p v-if="activeOrder.buyerMessage === ''">
                                The buyer provided no description
                            </p>
                            <p v-else>
                                {{ activeOrder.buyerMessage }}
                            </p>
                        </p>
                    </div>
                    <hr v-if="descriptionOpen" class="mt-4 md:hidden">
                    <div class="col-span-1 mt-4">
                        <div>
                            <h5 @click="openAttachedFiles()" class="text-lg flex md:block items-center justify-between font-bold">
                                Attached Files
                                <span class="md:hidden">
                                <ArrowDownIcon :class="`transition-transform ${attachedOpen ? 'rotate-180' : ''}`"/>
                            </span>
                            </h5>
                            <p v-if="attachedOpen" class="mt-2 ">
                                <div v-if="activeOrder?.orderMedias?.length > 0" class="flex flex-col gap-4">
                                    <div  v-for="media in activeOrder.orderMedias">
                                        <OrderFile :media="media"/>
                                    </div>
                                </div>
                                <p v-else>
                                    No files attached yet
                                </p>
                            </p>
                        </div>
                        <hr v-if="attachedOpen" class="border-none  mt-4 bg-neutral-300 h-[1px]">
                        <div class="mt-4">
                            <h5 @click="openDeliveredFiles()" class="text-lg flex md:block items-center justify-between font-bold">
                                Delivered Files
                                <span class="md:hidden">
                                <ArrowDownIcon :class="`transition-transform ${deliveredOpen ? 'rotate-180' : ''}`"/>
                            </span>
                            </h5>
                            <p v-if="deliveredOpen" class="mt-2 ">
                                No files delivered yet
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-4 xl:col-span-1">
            <OrderDetailActions :order="activeOrder" />
            <OrderDetailProgress :order="activeOrder" />
            <div class="mt-8 text-center px-8 md:px-0 pb-4 md:pb-0 md:text-left">
                <h5 class="text-lg font-bold">
                    Have any issues or questions?
                </h5>
                <p class="text-[#969696]">
                    We would love to help!
                </p>
                <button class="w-full mt-2 font-semibold bg-white rounded-md py-4 text-demo-violet">
                    Contact support
                </button>
            </div>


          <pre> testetstst {{ activeOrder}}</pre>
        </div>
    </div>
</template>
<script lang="ts">
import ChatIcon from '~/components/Icons/ChatIcon.vue';
import OrderDetailOverview from '~/components/Orders/OrderDetailOverview.vue';
import OrderDetailActions from '~/components/Orders/OrderDetailActions.vue';
import OrderDetailProgress from '~/components/Orders/OrderDetailProgress.vue';
import { useOrderStore } from '~/stores/orders';
import ArrowDownIcon from '~/components/Icons/ArrowDownIcon.vue';
import ArrowLeftIcon from '~/components/Icons/ArrowLeftIcon.vue';
import ThreeDotIcon from '~/components/Icons/ThreeDotIcon.vue';
import Mp3Icon from '~/components/Icons/Mp3Icon.vue';
import ImageIcon from '~/components/Icons/ImageIcon.vue';
import OrderFile from '~/components/Orders/OrderFile.vue';
import {computed, onMounted, ref, watch} from "vue";
import {useUserStore} from "~/stores/user";
import {useRoute, useRouter} from "#app";
import {useSellerStore} from "~/stores/seller";

export default {
    setup() {
        const router = useRouter()
        let descriptionOpen = ref(true)
        let attachedOpen = ref(true)
        let deliveredOpen = ref(true)

        const orderStore = useOrderStore();
        const userStore = useUserStore();
        const route = useRoute();

        onMounted(() => {
          console.log("onmounted order detail page", route.params.order);
          if (userStore.isLoggedIn) { orderStore.fetchOrder(route.params.order as string) }
        })

        watch(() => userStore.isLoggedIn, () => {
          if (userStore.isLoggedIn) { orderStore.fetchOrder(route.params.order as string) }
        })

        const activeOrder = computed(() => {
            return orderStore.getCurrentOrder;
        });

        const user = computed(() => {
          return userStore.getUser;
        })

        // const activeBuyer = computed(() => {
        //     return orderStore.getCurrentBuyer;
        // });

        const openDescription = () => {
            if (window.innerWidth < 768) {
                descriptionOpen.value = !descriptionOpen.value
            }
        }

        const openAttachedFiles = () => {
            if (window.innerWidth < 768) {
                attachedOpen.value = !attachedOpen.value
            }
        }

        const openDeliveredFiles = () => {
            if (window.innerWidth < 768) {
                deliveredOpen.value = !deliveredOpen.value
            }
        }
        return { activeOrder, descriptionOpen, attachedOpen, deliveredOpen, openDescription, router, openAttachedFiles, openDeliveredFiles, user };
    },
    components: { ChatIcon, OrderDetailOverview, OrderDetailActions, OrderDetailProgress, ArrowDownIcon, ArrowLeftIcon, ThreeDotIcon, Mp3Icon, ImageIcon, OrderFile }
}
</script>