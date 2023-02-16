<template>
    <nav :class="`bg-white flex overflow-x-hidden flex-col items-center py-[17px] border-t shadow-lg border-t-[#EBEBEB] duration-300 w-full left-0 right-0 transition-all h-full`">
        <div :class="`relative flex justify-center w-full`">
            <transition name="generalNavigation">
            <div :class="`flex items-center transition-opacity gap-8 ${modalBottomOpened ? 'opacity-0' : 'opacity-100 duration-500'}`">
                <nuxt-link :to="'/'" class="text-xs flex gap-1 flex-col items-center">
                    <SearchIcon :class="`w-6 h-6 ${activeElement === 'explore' ? 'text-demo-red' : ''}`"/>
                    <span :class="`${activeElement === 'explore' ? 'font-semibold' : ''}`">
                        Explore
                    </span>
                </nuxt-link>
                <nuxt-link :to="'/saved'" class="text-xs flex gap-1 flex-col items-center">
                    <HeartIcon :class="`w-6 h-6 ${activeElement === 'favorites' ? 'text-demo-red' : ''}`"/>
                    <span :class="`${activeElement === 'favorites' ? 'font-semibold' : ''}`">
                        Favorites
                    </span>
                </nuxt-link>
                <nuxt-link v-if="isNotLoggedIn" @click="handleClick('login')" class="text-xs flex gap-1 flex-col items-center">
                    <UserIcon :class="`w-6 h-6 ${activeElement === 'login' ? 'text-demo-red' : ''}`"/>
                    <span :class="`${activeElement === 'login' ? 'font-semibold' : ''}`">
                        Login
                    </span>
                </nuxt-link>
                <div v-if="isLoggedIn" @click="handleClick('orders')" class="text-xs flex gap-1 flex-col items-center">
                    <UserIcon :class="`w-6 h-6 ${activeElement === 'orders' ? 'text-demo-red' : ''}`"/>
                    <span :class="`${activeElement === 'orders' ? 'font-semibold' : ''}`">
                        Orders
                    </span>
                </div>
                <div v-if="isLoggedIn" @click="handleClick('messages')" class="text-xs flex gap-1 flex-col items-center">
                    <UserIcon :class="`w-6 h-6 ${activeElement === 'messages' ? 'text-demo-red' : ''}`"/>
                    <span :class="`${activeElement === 'messages' ? 'font-semibold' : ''}`">
                        Messages
                    </span>
                </div>
                <div v-if="isLoggedIn" @click="handleClick('profile')" class="text-xs flex gap-1 flex-col items-center">
                    <UserIcon :class="`w-6 h-6 ${activeElement === 'profile' ? 'text-demo-red' : ''}`"/>
                    <span :class="`${activeElement === 'profile' ? 'font-semibold' : ''}`">
                        Profile
                    </span>
                </div>
            </div>
        </transition>
        <transition name="closeLogin">
            <div :class="`bg-gray-200 absolute right-5 transition-opacity rounded-full p-3 ${modalBottomOpened && modalMode === 'login' ? 'opacity-100' : 'opacity-0'}`">
                    <IconsCloseIcon @click="navigationStore.toggleModal()" class="h-6 w-6"/>
            </div>
        </transition>
        </div>
        <!-- <transition name="loginregister"> -->
        <div :class="`overflow-hidden overflow-y-scroll w-full transition-all duration-500 ${modalBottomOpened && modalMode === 'login' ? 'max-h-[90vh] py-8' : 'max-h-0 '}`">
            <div :class="`relative ease-in-out duration-500 transition-opacity  ${modalBottomOpened && modalMode === 'login' ? 'opacity-100' : 'opacity-0'}`">
                <div class="">
                    <LoginRegister :isMobile="true"/>
                </div>
            </div>
        </div>
        <!-- </transition> -->
    </nav>
</template>
<script lan="ts">
import HeartIcon from './Icons/HeartIcon.vue';
import SearchIcon from './Icons/SearchIcon.vue';
import UserIcon from './Icons/UserIcon.vue'
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useUserStore} from "../stores/user";
import {useRouter} from "#app";
import { useNavigationStore } from '~~/stores/navigation';
export default defineComponent({
    components: { UserIcon, HeartIcon, SearchIcon },
    setup(_,ctx){
      const router = useRouter();
      const userStore = useUserStore();
      const navigationStore = useNavigationStore()

      const isLoggedIn = computed(() => { return userStore.isLoggedIn })
      const isNotLoggedIn = computed(() => { return userStore.isNotLoggedIn; })

        let activeElement = ref("")
        let eventAdded;

        onMounted(() => {
            // if (isNotLoggedIn.value) {
                window.addEventListener("scroll", handleBottomNavigation)
                eventAdded = true;
            // }
        })


        watch(isNotLoggedIn, (isNotLoggedIn) => { 
            if (isNotLoggedIn) {
                window.addEventListener("scroll", handleBottomNavigation)
            }
        })
        
        watch(isLoggedIn, (loggedIn) => {
          if (loggedIn) {
            navigationStore.setBottomNavigationScrollVisibility("shown")
          }

            if (loggedIn && eventAdded) {
                window.removeEventListener("scroll", handleBottomNavigation);
                navigationStore.setBottomNavigationScrollVisibility("shown")
                ctx.emit("showBottomBar", true) 
            }
        })

        let lastScrollTop = 0;

        const handleBottomNavigation = () => {
            console.log("scroll executed???")
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollTop > lastScrollTop) {
                navigationStore.setBottomNavigationScrollVisibility("hidden")
                ctx.emit("showBottomBar", false)
            } else {
                navigationStore.setBottomNavigationScrollVisibility("shown")
                ctx.emit("showBottomBar", true)
            }
            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        }

        const modalMode = computed(() => {
            return navigationStore.modalMode
        })

        const modalBottomOpened = computed(() => {
            return navigationStore.bottomModalOpened
        })

        const handleClick = (element) => {
          switch (element) {
            case 'login': navigationStore.setModalMode('login'); navigationStore.toggleModal(); break;
            case 'explore': router.push('/'); break;
            case 'profile': router.push('/settings'); break;
            case 'orders': router.push('/orders'); break;
            case 'messages': router.push('/messages'); break;
          }
            activeElement.value = element
        }

        return { activeElement,modalMode,modalBottomOpened, handleClick, isNotLoggedIn, navigationStore, isLoggedIn }
    }
    
})
</script>

