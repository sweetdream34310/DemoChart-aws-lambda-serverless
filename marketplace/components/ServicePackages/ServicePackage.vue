<template>
  <div :class="heightStretch ? 'h-full' : ''">
    <div v-if="isGigLoading" class="w-full h-[256px] bg-gray-200 rounded-2xl"></div>
      <div v-if="!isGigLoading" :class="`h-full ${isInModal ? 'w-screen sm:w-full' : 'w-full' }`">
          <div :class="[
              `bg-white w-full sticky top-[100px] rounded-3xl ${ isInModal ? 'px-4 pt-4' : 'p-6'}`,
              heightStretch ? 'h-full' : ''
          ]">
              <div class="flex justify-between">
                  <p v-for="(Marker, index) in activeGig?.gigServiceOffers"
                     @click="setActiveOffer(Marker)"
                     :class="{ 'activePackageMarker': activeOfferIndex === index }"
                     class="rounded-full cursor-pointer py-2 select-none px-6">
                    {{ Marker.offerName }}
                  </p>
              </div>
              <hr class="mt-4">
              <div v-for="(Marker, index) in activeGig?.gigServiceOffers">
                <package-tab
                    v-if="activeOfferIndex === index"
                    :Package="Marker"
                    @selectOrder="uploadOrder"
                    :isInModal="isInModal" />
              </div>
          </div>
      </div>
  </div>
</template>
<script lang="ts">
import { useNavigationStore } from '~~/stores/navigation'
import { useOrderStore } from '~~/stores/orders'
import { useSellerStore } from '~~/stores/seller'
import { IGigServiceOffers, IOrder } from '~~/stores/types'
import { useUserStore } from '~~/stores/user'
import PackageTab from './PackageTab.vue'

export default {
  emits: ["orderPlaced"],
  props: {
    activeGig: {
      type: Object
    },
    isGigLoading: {
      type: Boolean,
      default: false
    },
    isInModal: {
      type: Boolean,
      default: false
    },
    heightStretch: {
      type: Boolean,
      default: true,
    }
  },
  setup(props,ctx) {
      const sellerStore = useSellerStore()
      const orderStore = useOrderStore()
      const navigationStore = useNavigationStore()
      const userStore = useUserStore()
      const isActive = ref(0)

      const seller = computed(() => {
          return sellerStore.getSeller;
      })

      const user = computed(() => {
          return userStore.getUser;
      })

      const activeOffer = computed(() => {
        return orderStore.getActiveOffer
      })

      const uploadOrder = (offer:IGigServiceOffers) => {
          orderStore.setActiveOrder({
            orderDue: activeOffer.value.deliveryTime,
            serviceOfferUid: activeOffer.value.uid
          })

          navigationStore.toggleModal()
      }

      const activeOfferIndex = computed(() => {
        const index = props.activeGig?.gigServiceOffers.indexOf(activeOffer.value)
        if (index === -1) {
          return 0
        }
        return index
      })

      const setActiveOffer = (offer: IGigServiceOffers) => {
        orderStore.setActiveOffer(offer)
      }

      return { isActive, uploadOrder, setActiveOffer, seller, activeOfferIndex }
  },
  components: {
      PackageTab
  }
}
</script>