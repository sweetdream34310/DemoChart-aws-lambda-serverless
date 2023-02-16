<template>
  <div v-if="activeGig" class="helpme md:container md:m-auto">
    <skeleton v-if="isGigLoading" class="h-80"></skeleton>
    <div
        v-if="activeGig.gigMedias"
        class="flex overflow-scroll sm:hidden">

      <div v-for="el in activeGig.gigMedias" class="flex-shrink-0 w-full max-w-screen-sm h-80">
        <img v-if="!el.isVideo" :src="el.mediaUrl" class="h-full w-full  object-cover" />
        <video v-else :src="el.mediaUrl" autoplay class="h-full w-full object-cover"></video>
      </div>
    </div>

    <floating-button
        class="fixed top-0 left-0 m-4 z-20 drop-shadow-lg"
        @backClick="() => router.go(-1)"
    >
      <icons-arrow-left-icon></icons-arrow-left-icon>
    </floating-button>

    <floating-button
        class="absolute top-0 right-0 m-4 z-20"
    >
      <fav-button :is-active="activeGig?.savedByUser" @toggleActive="gigStore.toggleFavorite(activeGig?.uid)"></fav-button>

    </floating-button>


    <div class="static sm:fixed grid grid-cols-3 z-10 top-[88px] w-full">
      <div class="col-span-3  xl:col-span-2 pl-4 xl:pl-20 w-full">
        <!--                <gig-categories />-->
        <!--                <breadcrumbs />-->
        <!--                <page-markers />-->
      </div>
    </div>
    <div class="sm:pt-[100px]">
      <div class="xl:grid px-4 xl:px-20 h-full grid-cols-3 gap-12">
        <div class="col-span-3 xl:col-span-2">
          <div>
            <!--                      <page-markers></page-markers>-->
            <overview :gig="activeGig" :isLoading="isGigLoading" class="mt-4"/>

            <skeleton v-if="isGigLoading" class="mt-16 w-64 inline-block h-8 rounded-2xl"></skeleton>
            <skeleton v-if="isGigLoading" class="mt-4 w-full h-[256px] rounded-2xl"></skeleton>
            <div v-if="!isGigLoading">
              <description :Gig="activeGig" />
              <service-package
                  class="md:hidden"
                  :is-gig-loading="isGigLoading"
                  :activeGig="activeGig" />
              <reviews />
              <references :References="activeGig?.gigReferences"/>
              <about-the-seller :Gig="activeGig" :Seller="seller" />
              <FAQ :Faqs="activeGig?.gigFaqs" />
            </div>
          </div>
        </div>
        <service-package
            class="hidden md:block"
            :is-gig-loading="isGigLoading"
            :height-stretch="false"
            :activeGig="activeGig"
        />
      </div>
      <div v-if="!isGigLoading" class="mt-16 px-4 sm:px-20">
        <h2 class="subtitle font-semibold mb-6">More Designers and Gigs</h2>
        <skeleton class="w-64 h-64 pb-8"></skeleton>
        <div>
          <card-list />
        </div>
        <div class="h-32"></div>
      </div>
    </div>
  </div>

</template>
<script lang="ts">

import Overview from '../../../components/gigPage/Overview/Overview.vue';
import PageMarkers from '../../../components/PageMarkers.vue'
import Breadcrumbs from '../../../components/Breadcrumbs.vue'
import GigCategories from '../../../components/GigCategories.vue'
import ServicePackage from '../../../components/ServicePackages/ServicePackage.vue';
import Description from '../../../components/gigPage/Desciption/Description.vue';
import AboutTheSeller from '../../../components/gigPage/AboutTheSeller/AboutTheSeller.vue';
import FAQ from '~~/components/gigPage/FAQ.vue';
import Reviews from '../../../components/gigPage/Reviews.vue';
import CardList from '../../../components/CardList.vue';
import { useSellerStore } from '~~/stores/seller';
import { useGigsStore } from '~~/stores/gigs';
import CloseIcon from '~~/components/Icons/CloseIcon.vue'
import { useOrderStore } from '~~/stores/orders';
import {useCustomAsyncData} from "../../../composables/useCustomAsyncData";
import {computed, defineComponent, onBeforeMount, onUnmounted, ref} from "vue";
import {useNavigationStore} from "~/stores/navigation";
import {useRoute, useRouter} from "#app";
import Skeleton from "~/components/misc/Skeleton.vue";
import References from "~/components/gigPage/AboutTheSeller/References.vue";
import FloatingButton from "~/components/misc/FloatingButton.vue";
import FavButton from "~/components/favorites/FavButton.vue";


export default defineComponent({
  components: {
    FavButton,
    FloatingButton,
    References,
    Skeleton,
    GigCategories,
    CardList,
    Breadcrumbs,
    PageMarkers,
    Overview,
    ServicePackage,
    Description,
    AboutTheSeller,
    FAQ,
    Reviews,
    CloseIcon
  },
  async setup(props) {
    const sellerStore = useSellerStore()
    const gigStore = useGigsStore()
    const navigationStore = useNavigationStore();
    const orderStore = useOrderStore()
    const route = useRoute();
    const router = useRouter();


    let showOverlay = ref(false)

    onBeforeMount(async () => {
      await navigationStore.initOnPageLoad();
    });

    const activeGig = computed(() => {
      return gigStore.getActiveGig;
    })

    watch(activeGig, (activeGig) => {
      orderStore.setActiveOffer(activeGig.gigServiceOffers?.[0])
    })

    onMounted(() => {
      orderStore.setActiveOffer(activeGig.value.gigServiceOffers?.[0])
    })

    onUnmounted(() => {
      gigStore.resetActiveGig();
    })

    await useCustomAsyncData('fetch-gig', () => gigStore.fetchGig(route.params.gig));

    const seller = computed(() => {
      return sellerStore.getGigSeller;
    })

    const isGigLoading = computed(() => {
      return gigStore.isActiveGigLoading;
    })

    return {
      seller,
      gigStore,
      activeGig,
      isGigLoading,
      showOverlay,
      router
    };
  }
})

</script>

<style lang="">

</style>