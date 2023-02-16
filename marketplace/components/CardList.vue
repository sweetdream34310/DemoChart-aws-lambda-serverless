<template>
  <div class="relative">
    <div class="relative">
      <div ref="scrollContainer" v-if="gigs" :class="isHorizontalOnMobile ? 'no-scrollbar scroll-px-2 flex gap-4 px-4 no-wrap snap-x snap-mandatory flex-row overflow-x-scroll' : 'flex flex-wrap'">
        <div
          class="snap-start w-full lg:w-1/3 xl:w-[calc(25%-1rem)] shrink-0"
          :class="isHorizontalOnMobile ? 'w-[calc(100vw-20%)] sm:w-[50vw] md:w-[40vw]' : 'w-full'"
          v-for="(item, index) in gigs?.filter(gig => gig.active)"
          ref="cardItem">
          <freelancer-card
              :key="item.uid"
            :gig="item" />
        </div>
      </div>
      <div>
        <div class="w-full text-center flex justify-end" v-if="activeGigCount > gigs?.length">
          <outline-button class="mt-8 max-w-[170px] flex justify-center" @click="loadMoreGigs()">Show all <img src="/down.svg" alt="" class="w-5 ml-2 mt-[3px] -rotate-90"></outline-button>
        </div>
      </div>
    </div>
    <transition name="scrollArrow">
      <div v-if="showArrowLeft" class="absolute left-0 w-1/6 md:w-1/12 inset-y-0 md:bg-gradient-to-r from-demo-gray-100 to-transparent h-full">
        <div class="h-full relative">
          <div @click="handleHorizontalScroll()" class="p-4 absolute bg-white rounded-full left-4 hidden md:block drop-shadow-lg top-1/2 transfrom -translate-y-1/2">
            <ArrowLeftIcon />
          </div>
        </div>
      </div>
    </transition>
    <transition name="scrollArrow">
      <div v-if="showArrowRight" class="absolute right-0 w-1/6 md:w-1/12 inset-y-0 md:bg-gradient-to-l from-demo-gray-100 to-transparent h-full">
        <div class="h-full relative">
          <div @click="handleHorizontalScroll(true)" class="p-4 absolute bg-white rounded-full right-4 hidden md:block drop-shadow-lg top-1/2 transfrom -translate-y-1/2">
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </transition>
    <div>
      <div class="w-full hidden text-center" v-if="activeGigCount > gigs?.length">
        <outline-button class="mt-8" @click="loadMoreGigs()">Show more</outline-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FreelancerCard from "./FreelancerCard.vue"
import ArrowLeftIcon from "./Icons/ArrowLeftIcon.vue"
import { useGigsStore } from "~~/stores/gigs"
import OutlineButton from "~/components/buttons/OutlineButton.vue";
import ArrowRightIcon from "./Icons/ArrowRightIcon.vue";
import {computed, onMounted} from "vue";

export default {
  props: {
    gigs: {
      type: Array,
      required: false
    },
    isHorizontalOnMobile: {
      type: Boolean,
      default: false
    },
  },
  components: {
    OutlineButton,
    FreelancerCard,
    ArrowRightIcon,
    ArrowLeftIcon,
  },
  setup() {
    const gigStore = useGigsStore()
    const scrollContainer = ref()
    const showArrowLeft = ref(false)
    const showArrowRight = ref(false) // TODO set to true
    const cardItem = ref()
    const page = ref(0)
    const activeGigCount = computed(() => {
      return gigStore.getActiveGigCount
    });

    onMounted(() => {
      // TODO reactivate scroll part!
      // scrollContainer.value.addEventListener("scroll", () => {
      //   if (scrollContainer.value.scrollLeft < (cardItem.value[0].clientWidth / 2)) {
      //     showArrowLeft.value = false
      //   } else {
      //     showArrowLeft.value = true
      //   }
      //   if (scrollContainer.value.scrollLeft >= (scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth - (cardItem.value[0].clientWidth / 2))) {
      //     showArrowRight.value = false
      //   } else {
      //     showArrowRight.value = true
      //   }
      // })
    })

    const handleHorizontalScroll = (forward: boolean = false) => {
      const count = countVisibleElements(scrollContainer.value, cardItem.value);
      const onePillWidth = cardItem.value[0].clientWidth;

      if (forward) page.value++
      else page.value--

      // scrollContainer.value.scrollTo({
      //   top: 0,
      //   left: (onePillWidth * count) * page.value,
      //   behavior: 'smooth'
      // });
      
      console.log("count", count)
    }

    const loadMoreGigs = () => {
      gigStore.fetchGigs(true)
    }

    function countVisibleElements(container: any, elementSelector: HTMLElement[]) {
      let count = 0;

      console.log("scollLeft   ",container.scrollLeft, "   container width   ", container.clientWidth)
      elementSelector.forEach(element => {
        if (element.getBoundingClientRect().right > 0 && element.getBoundingClientRect().right < container.clientWidth) count++
      });
      return count;
    }

    return {
      activeGigCount,
      scrollContainer,
      showArrowLeft,
      showArrowRight,
      cardItem,
      loadMoreGigs,
      handleHorizontalScroll
    }
  }
}


</script>


