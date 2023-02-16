<template>
  <div class=" box-border h-full">
  <mobile-navigation-top-bar v-if="!mobileNavigationHidden"></mobile-navigation-top-bar>

  <div class="hidden h-full sm:block">
    <div class="w-full z-20 bg-[#f4f5f5] fixed items-center top-0 py-6">
      <div class="flex items-center gap-4 flex-col sm:flex-row container mx-auto">
        <div class="flex sm:flex-[20%] items-center">
            <nuxt-link class="sm:flex-[1%] flex items-center sm:justify-between" to="/">
                <img src='~/assets/logo_black.svg' class="w-3/4 sm:w-72" alt="">
            </nuxt-link>
            <!-- <div class="relative">  TODO: still needed
                <BurgerIcon @click="() => burgerOpen = !burgerOpen" class="h-10 sm:hidden w-10 mr-4"/>
                <div v-if="burgerOpen" class="flex right-0 flex-col gap-4 bg-white py-2 px-8 z-10 md:hidden absolute  items-end justify-between">
                    <nuxt-link to="/freelancer/djThomas/orders">
                        <p class="uppercase font-semibold">
                            Orders
                        </p>
                    </nuxt-link>
                    <nuxt-link to="/">
                        <heart-icon :class="'text-black'"/>
                    </nuxt-link>
                    <nuxt-link to="/dj-thomas/messages">
                        <message-icon :class="'text-black'"/>
                    </nuxt-link>
                    <nuxt-link to="/settings">
                        <img class="h-8 w-8 rounded-full" :src="seller.profileImageSrc ? seller.profileImageSrc : user.profileImageSrc" alt="">
                    </nuxt-link>
                </div>
            </div> -->
        </div>
        <navigation-search :class="'order-2 sm:order-none w-full sm:flex-[20%] lg:flex-[60%]'"/>
        <div class="hidden sm:flex sm:flex-[20%] items-center justify-between">
            <nuxt-link v-if="isLoggedIn" to="/orders" class="uppercase font-semibold">
              Orders
            </nuxt-link>
            <a v-if="isNotLoggedIn" @click="openLoginModal()" class="uppercase font-semibold">Login</a>
            <nuxt-link to="/saved">
                <heart-icon :class="'text-black'"/>
            </nuxt-link>
            <nuxt-link v-if="isLoggedIn" to="/messages">
                <message-icon :class="'text-black'"/>
            </nuxt-link>
            <nuxt-link v-if="isLoggedIn" class="shrink-0" to="/settings">
                <img class="h-8 w-8 rounded-full" :src="seller ? seller.profileImageSrc : user.profileImageSrc" alt="">
            </nuxt-link>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import NavigationSearch from './NavigationSearch.vue'
import HeartIcon from './Icons/HeartIcon.vue'
import MessageIcon from './Icons/MessageIcon.vue'
import { useSellerStore } from '~~/stores/seller'
import { useUserStore } from '~~/stores/user'
import BurgerIcon from './Icons/BurgerIcon.vue'
import {useNavigationStore} from "../stores/navigation";
import {defineComponent} from "vue";
import MobileNavigationTopBar from "~/components/Navigation/MobileNavigationTopBar.vue";

export default defineComponent({

  components: {
    MobileNavigationTopBar,
    NavigationSearch, HeartIcon, MessageIcon, BurgerIcon
  },

  props: {
    isFixed: {
      type: Boolean,
      default: true,
    },
    backgroundUrl: {
      type: String,
      default: undefined
    },
    showTitle: {

    }
  },
  setup() {
    const sellerStore = useSellerStore();
    const userStore = useUserStore();
    const navigationStore = useNavigationStore();

    const burgerOpen = ref(false)

    const user = computed(() => {
      return userStore.getUser
    })

    const isLoggedIn = computed(() => {
      return userStore.isLoggedIn
    })

    const isNotLoggedIn = computed(() => {
      return userStore.isNotLoggedIn
    })

    const mobileNavigationHidden = computed(() => {
      return navigationStore.topBarHidden;
    })

    const openLoginModal = () => {
      navigationStore.setModalMode("login")
      navigationStore.toggleModal()
    }

    const openBurgerMenu = () => {
    }

    const seller = computed(() => {
      return sellerStore.getSeller
    })
    return {
      seller,
      user,
      burgerOpen,
      isLoggedIn,
      isNotLoggedIn,
      mobileNavigationHidden,
      openLoginModal
    }
  },
})
</script>