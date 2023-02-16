<template>
  <div class="lg:container mx-auto">
<!--  <common-explore-wrapper>-->
<!--    <template v-slot:start>-->
<!--      <gig-categories/>-->
<!--      <home-infos />-->
<!--    </template>-->
<!--  </common-explore-wrapper>-->

    <gig-categories></gig-categories>
    <div>
      <div v-for="gigGrouped in gigsGrouped" :key="gigGrouped.name">
        <div class="flex items-end">
          <h2 class="subtitle px-2 mt-8 flex-shrink-0">{{ gigGrouped.name }}</h2>
<!--<<<<<<< HEAD-->
          <hr class="h-[1px] w-full bg-[#efefef] ml-4 mr-4 mb-3">
<!--=======-->
<!--          <hr class="h-[1px] w-full bg-[#efefef] mx-4">-->
<!--&gt;>>>>>> origin/dev-->
        </div>

<!--        .home_info_gig_header > hr {-->
<!--        height: 1px;-->
<!--        background-color: rgb(165, 165, 165);-->
<!--        border: none;-->
<!--        margin-left: 20px;-->
<!--        width: 55vw;-->
<!--        }-->
        <gig-list class="mt-4" :gigs="gigGrouped.gigs" :is-horizontal-on-mobile="true"></gig-list>
      </div>
    </div>

    <home-infos></home-infos>

    <div class="p-4">
      <h2 class="subtitle font-bold">What people love about democharts</h2>
      <div class="mt-8">
        <rating-preview :Rating="Rating"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGigsStore } from "~~/stores/gigs"
import CardList from "../components/CardList.vue"
import CreateGig from "../components/CreateGig.vue"
import Search from "../components/Search/Search.vue"
import DragDrop from "~~/components/Inputs/DropDownUploader/DragDrop.vue"
import { useSellerStore } from "~~/stores/seller"
import { useUserStore } from "~~/stores/user"
import {useCustomAsyncData} from "~/composables/useCustomAsyncData";
import GigList from "~/components/explore/GigList.vue";
import {computed, defineComponent, onBeforeMount} from "vue";
import CommonExploreWrapper from "~/components/explore/CommonExploreWrapper.vue";
import {useNavigationStore} from "~/stores/navigation";
import HomeInfos from "~~/components/explore/HomeInfos.vue"
export default defineComponent({
  template: "default",
    components: {
      CommonExploreWrapper,
      GigList,
      CardList,
      Search,
      CreateGig,
      DragDrop,
        HomeInfos
    },
    async setup() {

      const gigStore = useGigsStore()

      const navigationStore = useNavigationStore();
      onBeforeMount(() => {
        navigationStore.initOnPageLoad();
      })

      await useCustomAsyncData('fetch-gigs', () => gigStore.fetchGigs());

      const areGigsInitLoading = computed(() => {
        return gigStore.initGigsLoading;
      })

      const gigsGrouped = computed(() => {
        // todo they are not grouped yet actually
        return [
          {
            name: 'Trending',
            gigs: gigStore.getAllGigs,
          },
          {
            name: 'Design',
            gigs: gigStore.getAllGigs,
          },
          {
            name: 'Digital Marketing',
            gigs: gigStore.getAllGigs,
          },
          {
            name: 'Mentoring',
            gigs: gigStore.getAllGigs,
          },
          {
            name: 'Influencer Marketing',
            gigs: gigStore.getAllGigs,
          },
        ]
      })

      const Rating = {
        name: "shawnmichael",
        country: "United Stated",
        profileImage: "https://www.zbrushcentral.com/uploads/default/original/4X/1/e/c/1ecda0ca3c74b4b8676999157e73e36b7ead42f5.jpeg",
        rating: 5,
        text: "This guy is a total professional he works with you from beginning to end and his skills speak for himself. I’m definitely coming back for future work from him!"
      }

      return {
        gigsGrouped,
        Rating
      }
    },
})
</script>
