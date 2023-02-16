<template>
    <div id="overview" class="">
        <div class="">

          <div>
          <seller-short-description :seller="gig?.seller" :isLoading="isLoading"/>
          <skeleton v-if="isLoading" class="mb-4 text-3xl mt-6font-semibold rounded-full h-8 w-64"></skeleton>
          <h1 v-if="!isLoading" class="title font-semibold mt-6 mb-6 ">
              {{gig?.name}}
          </h1>
          </div>


          <primary-button
              @click="openOrderModal()"
              class="md:hidden"
              :show-skeleton="isLoading">
            Select your package <span class="text-sm">(from $49)</span>
          </primary-button>
          <outline-button
              :show-skeleton="isLoading"
              class="mt-2 md:hidden"
          >
            Send Message to seller
          </outline-button>

          <div v-if="!isLoading" class="hidden sm:block mt-6 p-4 bg-white rounded-2xl">
              <media-carousel :active-gig="gig" />
          </div>
      </div>
    </div>
</template>
<script lang="ts">
import MediaCarousel from './MediaCarousel.vue';
import SellerShortDescription from './SellerShortDescription.vue';
import Skeleton from "~/components/misc/Skeleton";
import OutlineButton from "~/components/buttons/OutlineButton";
import PrimaryButton from "~/components/buttons/PrimaryButton";
import { useNavigationStore } from '~~/stores/navigation';
import { useSellerStore } from '~~/stores/seller';
import { useAppStore } from '~~/stores/app';
import {defineComponent, PropType} from "vue";
import {IActiveGig} from "~/stores/types";
export default defineComponent({
    components: {
      PrimaryButton,
      OutlineButton,
      Skeleton,
        MediaCarousel, SellerShortDescription
    },
    props: {
        gig: {
            type: Object as PropType<IActiveGig>
        },
      isLoading: {
          type: Boolean,
        default: false
      }
    },
    setup(props) {
        const navigationStore = useNavigationStore()
        const appStore = useAppStore()

        const openOrderModal = () => {
            if (appStore.getWindowWidth < 640) {
                scrollToElement(navigationStore.getMobileOrderModalLimit.getBoundingClientRect().bottom, 300)
            } else {
                navigationStore.toggleModal()
            }
        }

        return { openOrderModal };
    }
})
</script>