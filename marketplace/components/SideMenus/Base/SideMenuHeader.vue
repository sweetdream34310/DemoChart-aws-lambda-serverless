<template>
  <div class="text-center ">
    <img class="absolute -top-24 md:-top-12 rounded-full left-1/2 transform -translate-x-1/2 h-48 md:h-24 w-48 md:w-24"
         :src="seller?.profileImageSrc || user?.profileImageSrc || profileImagePlaceholder"
    >
    <div>
      <p class="font-bold">
                        <span v-if="(seller?.user != undefined)">
                            {{ seller.user.firstName }} {{ seller.user.name }}
                        </span>
        <span v-else-if="(user.firstName != undefined && !seller)">
                            {{ user.firstName }} {{ user.name }}
                        </span>
        <span v-else>
                            This could be your profile...
                        </span>
      </p>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import profileImagePlaceholder from '~~/assets/img/profileImgPlaceholder.jpg'
export default {
  name: "SideMenuHeader",
  props: {
    user: {
      type: Object,
      required: true
    },
    seller: {
      type: Object,
      default: undefined,
    }
  },
  setup() {

    return {
      profileImagePlaceholder
    }
  }
}
</script>

<style scoped>

</style>