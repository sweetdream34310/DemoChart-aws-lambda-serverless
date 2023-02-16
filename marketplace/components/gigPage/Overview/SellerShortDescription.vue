<template>
    <div class="flex flex-wrap gap-2 mt-2">

      <skeleton v-if="isLoading" class="h-8 w-8 rounded-full bg-gray-200"></skeleton>
      <img v-else class="h-8 w-8 rounded-full mt-2" src="https://cdn.pixabay.com/photo/2021/05/04/13/29/portrait-6228705_1280.jpg" alt="">

      <skeleton v-if="isLoading" class="h-8 w-64 rounded-full "></skeleton>
      <div>

      <p v-if="!isLoading" class="">{{seller?.userName}}</p>
<!--      <p v-if="!isLoading">|</p>-->

        <skeleton v-if="isLoading" class="w-32 h-4 rounded-full mb-4"></skeleton>
        <div v-if="!isLoading" class="text-sm flex">
          <star-icon/>&nbsp;verified seller
        </div>
      </div>
      <div v-if="!isLoading" class=" gap-2 flex-grow">
        <div class="flex items-center justify-end">
          <span class="hidden sm:block">
            Rating
          </span>
          <star-icon/>&nbsp;
          <span>4.8</span>
        </div>
      </div>


      <!-- <p class="hidden sm:block">
          |
          for
      </p> -->
      <!-- <div class="hidden sm:block" v-for="(item, index) in seller.gigs">
          <project-pill :title="item.name"/>
      </div> -->
    </div>
</template>
<script>

import ProjectPill from "./ProjectPill.vue";
import StarIcon from "~~/components/Icons/StarIcon.vue";
import Skeleton from "~/components/misc/Skeleton";
export default {
    components: {Skeleton, ProjectPill, StarIcon },
    props: {
        seller: {
            type: Object
        },
      isLoading: {
          type: Boolean,
        default: false
      }
    },
}
</script>