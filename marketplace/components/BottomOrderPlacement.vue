<template >
    <div :class="'bottom-order-placement z-40 relative'">
        <div class="flex  justify-between items-center px-4">
            <div class="w-full">
                <transition name="orderModalTextExpand">
                    <div v-if="!orderModalOpened" class="flex w-full text-sm flex-col">
                        <p>
                            from
                            <span class="font-semibold">
                                {{ lowestPriceDeliveryTime.price }}€
                            </span>
                        </p>
                        <p>
                            delivered in
                            <span class="font-semibold">
                                {{ lowestPriceDeliveryTime.deliverTime }} days
                            </span>
                        </p>
                    </div>
                </transition>
            </div>
            <button @click="() => handleSelectClick()" :class="` max-w-max overflow-hidden shrink-0 flex no-mobile-highlight outline-none text-sm px-4 ${orderModalOpened ? 'py-4 bg-white text-black border border-black' : 'py-2 bg-demo-violet'} transition-all text-white font-medium rounded-full`">
                <transition name="orderModalButtonExpand">
                    <p v-if="!orderModalOpened">
                        <span v-if="activeOffer?.uid === currentOrder?.serviceOfferUid">
                            Complete Order
                        </span>
                        <span v-else>
                            Select package
                        </span>
                    </p>
                </transition>
                <transition name="orderModalClose">
                    <close-icon v-if="orderModalOpened" />
                </transition>
            </button>
        </div>
        <div :class="` bg-white transition-all duration-500 ${orderModalOpened ? 'max-h-[999px]' : 'max-h-0 overflow-hidden'} `">
            <div >
                <div ref="scrollContainer" id="scrollContainer" :class="`pb-20 h-auto overflow-x-hidden flex`">
                    <service-package 
                        :class="`snap-start h-auto w-screen self-stretch flex-shrink-0`"
                        :is-gig-loading="isGigLoading"
                        :activeGig="activeGig" 
                        :isInModal="true"
                    />
                    <order-placement-modal
                        v-if="orderModalOpened"
                        :class="`snap-start h-full w-screen self-stretch flex-shrink-0`"  
                        :activeGig="activeGig"
                        :isInModal="true"
                    />
                    <order-payment-modal
                        v-if="orderModalOpened"
                        :class="`snap-start h-auto w-screen self-stretch flex-shrink-0`" 
                        :isInModal="true"
                        @orderSuccessfullyPlaced="() => handleNextButton()"
                    />
                    <order-succeeded-modal 
                        class="snap-start h-auto w-screen self-stretch flex-shrink-0"
                    />
                </div>
                
            </div>
            <div :class="`mt-4 flex px-4 justify-between left-0 right-0`">
                <buttons-outline-button class="w-max" v-if="currentPage !== 1" @click="() => handlePrevButton()">
                    <arrow-left-icon :class="''"/>
                </buttons-outline-button>
                <buttons-primary-button :class="`${currentPage === 1 ? 'max-w-[600px]' : 'max-w-max'} w-full`" @click="() => {handleNextButton(); setActiveOrder()}" >
                    Next Page
                </buttons-primary-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { useGigsStore } from '~~/stores/gigs';
import { useNavigationStore } from '~~/stores/navigation';
import { useOrderStore } from '~~/stores/orders';
import CloseIcon from './Icons/CloseIcon.vue';
import OrderPlacementModal from './Orders/OrderPlacementModal.vue';
import OrderPaymentModal from './Orders/OrderPaymentModal.vue';
import { useAppStore } from '~~/stores/app';
import ArrowLeftIcon from './Icons/ArrowLeftIcon.vue';
import {computed, onMounted, ref} from "vue";
import OrderSucceededModal from "~/components/Orders/OrderSucceededModal.vue";
import scrollToPage from '~~/utils/scrollToPage';

export default {
    components: {
        OrderSucceededModal,
        CloseIcon,
        OrderPlacementModal,
        OrderPaymentModal,
        ArrowLeftIcon
    },
    setup(props: any, ctx: any) {
        const gigStore = useGigsStore();
        const navigationStore = useNavigationStore()
        const appStore = useAppStore();
        const orderStore = useOrderStore()

        const showBottom = ref(false)
        const scrollContainer = ref()

        const currentPage = computed(() => {
            return navigationStore.currentModalPage
        })

        const isGigLoading = computed(() => {
            return gigStore.isActiveGigLoading;
        })

        const orderModalOpened = computed(() => {
            return navigationStore.bottomModalOpened
        })

        const currentOrder = computed(() => {
            return orderStore.getCurrentOrder;
        });

        const activeOffer = computed(() => {
            return orderStore.activeOffer
        })

        const handleSelectClick = () => {
            navigationStore.toggleModal()
            if (activeOffer.value.uid !== currentOrder.value.serviceOfferUid) {
                scrollToPage(navigationStore.setModalPage, scrollContainer.value, 1 )
            }
        };

        onMounted(() => {
            window.onscroll = function () {
                const currentScrollPosition = window.scrollY;
                const viewportOffset = document.documentElement.scrollTop;
                if ((navigationStore.getMobileOrderModalLimit.getBoundingClientRect().top + viewportOffset) < currentScrollPosition) {
                    navigationStore.setBottomNavigationScrollVisibility("shown");
                } else {
                    navigationStore.setBottomNavigationScrollVisibility("hidden");
                }
            };
        })

        const handleNextButton = () => {
            scrollToPage(navigationStore.setModalPage, scrollContainer.value, currentPage.value + 1 )
        }

        const handlePrevButton = () => {
            scrollToPage(navigationStore.setModalPage, scrollContainer.value, currentPage.value - 1 )
        }

        const setActiveOrder = () => {
            orderStore.setActiveOrder({
              orderDue: orderStore.activeOffer.deliveryTime,
              serviceOfferUid: orderStore.activeOffer.uid
            })
        }

        const lowestPriceDeliveryTime = computed(() => {
            return gigStore.getLowestPriceDeliveryTime;
        });

        const activeGig = computed(() => {
            return gigStore.getActiveGig;
        });

        return { 
            lowestPriceDeliveryTime,
            activeGig,
            activeOffer,
            showBottom,
            isGigLoading,
          bottomModalOpened: navigationStore.bottomModalOpened,
            scrollContainer,
            orderModalOpened,
            currentOrder,
            handleSelectClick,
            scrollToPage,
            handleNextButton,
            handlePrevButton,
            setActiveOrder,
            currentPage
        };
    }  
}
</script>