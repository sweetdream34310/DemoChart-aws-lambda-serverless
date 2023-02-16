<template>
    <div :class="'z-40 bg-white rounded-l-xl w-4/5 lg:w-3/5 xl:w-2/5 top-0 fixed bottom-0 duration-700 transition-all'">
        <div class="relative pt-20 w-full h-full">
            <div @click="navigationStore.toggleModal" class="absolute p-3 rounded-full cursor-pointer top-3 left-3 bg-gray-200 hover:scale-110 transition-transform">
                <icons-close-icon/>
            </div>
            <div class="h-1/2" v-if="currentMode === 'order'">
                <div ref="scrollContainer" class="flex overflow-x-hidden">
                    <order-placement-modal class="w-full shrink-0" :isInModal="true" :activeGig="activeGig" />
                    <orders-order-payment-modal :isInModal="true" class="w-full shrink-0"/>
                </div>
                <div :class="`flex px-4`">
                    <buttons-outline-button class="w-max" v-if="currentPage !== 1" @click="() => handlePrevButton()">
                        <icons-arrow-left-icon/>
                    </buttons-outline-button>
                    <buttons-primary-button v-if="currentPage !== 2" :class="`w-full`" @click="handelNextButton()" >
                        Next Page
                    </buttons-primary-button>
                </div>
            </div>
            <login-register  v-else-if="currentMode === 'login'"/>
        </div>
    </div>
</template>
<script lang="ts">
import { useGigsStore } from '~~/stores/gigs';
import { useNavigationStore } from '~~/stores/navigation';
import OrderPlacementModal from './Orders/OrderPlacementModal.vue';
import scrollToPage from '~/utils/scrollToPage';

export default {
    setup(props, ctx) {
        const navigationStore = useNavigationStore();
        const gigStore = useGigsStore()
        const scrollContainer = ref()

        const currentPage = computed(() => {
            return navigationStore.currentModalPage
        })

        const currentMode = computed(() => {
            return navigationStore.modalMode
        })

        const activeGig = computed(() => {
            return gigStore.activeGig
        })

        const handelNextButton = () => {
            scrollToPage( navigationStore.setModalPage, scrollContainer.value, currentPage.value + 1)
        }

        const handlePrevButton = () => {
            scrollToPage( navigationStore.setModalPage, scrollContainer.value, currentPage.value - 1)
        }

        return { 
            navigationStore, 
            activeGig, 
            currentPage,
            scrollContainer,
            currentMode,
            scrollToPage,
            handelNextButton,
            handlePrevButton
        };
    },
    components: { OrderPlacementModal }
}
</script>