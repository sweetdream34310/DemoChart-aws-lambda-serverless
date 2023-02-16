<template>
    <div class="bg-white p-3 md:pl-12 flex justify-between items-center rounded-lg">
        <div>
            <div class="flex gap-3 items-center">
                <span class="bg-demo-violet hidden md:block text-white px-3 py-1 rounded-md">
                    {{ activeOrder?.orderStatus }}
                </span>
                <h5 class="font-bold text-xl">
                    {{ activeOrder?.serviceOffer?.gig?.name }}
                </h5>
                <p class="text-demo-violet">
                    {{ activeOrder?.serviceOffer?.offerName }}
                </p>
            </div>
            <div class="flex mt-2 gap-4 text-sm">
                <div class="hidden md:flex gap-2">
                    <p class="text-[#969696]">
                        Buyer:
                    </p>
                    <!-- TODO: get buyer name -->
                    <p class="font-bold text-demo-violet">
                        {{ activeBuyer.firstName }}
                        {{ activeBuyer.lastName }}
                    </p>
                </div>
                <div class="flex gap-2">
                    <p class="text-[#969696]">
                        Date ordered:
                    </p>
                    <p class="font-bold text-demo-violet">
                        {{ getDayTime(activeOrder?.orderDate) }}
                    </p>
                </div>
            </div>
            <span class="bg-demo-violet block w-max mt-2 text-sm md:hidden text-white px-3 py-1 rounded-md">
                {{ activeOrder?.orderStatus }}
            </span>
        </div>
        <div class="flex flex-col md:flex-row gap-3 relative justify-between items-center md:w-1/6 h-full">
            <h5 class="font-bold h-full text-demo-active mr-3">
                {{ activeOrder.orderPrice }} €
            </h5>
            <div class="w-[1px] hidden md:block h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-300">
            </div>
            <button class="bg-demo-violet rounded-md text-white p-2 ">
                <ChatIcon :class="'h-5 w-5'" />
            </button>
        </div>
    </div>
</template>
<script>
import ChatIcon from '../Icons/ChatIcon.vue';

export default {
    props: {
        activeOrder: {
            type: Object,
            required: true
        },
        activeBuyer: {
            type: Object,
            required: true
        }
    },
    components: { ChatIcon }
}
</script>
