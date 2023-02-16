<template>
     <nav 
     ref="navigationElement"
     class="bg-gradient-to-t from-[#f5f5f5] to-white border-t shadow-lg border-t-[#EBEBEB] w-full fixed left-0 right-0 transition-all"
     :class="[
        `${bottomModalOpened ? ' z-40 ease-out duration-700' : 'duration-300'}`,
        !hideGeneralNavigationBar && `flex justify-center duration-300 
        ${navigationStore.bottomNavigationMode === 'shown' ||
          (navigationStore.bottomNavigationMode === 'show-on-scroll' && navigationStore.bottomNavigationScrollVisibility === 'shown')  ? 'bottom-0' : '-bottom-20'}`,
        
        !hideOrderplacement && `z-40 shadow-2xl py-4 overflow-hidden ${navigationStore.bottomNavigationMode === 'show-on-scroll' && navigationStore.bottomNavigationScrollVisibility === 'shown' ? 'bottom-0' : '-bottom-20'}`
        ]"
     >
        <bottom-navigation v-if="!hideGeneralNavigationBar"/>
        <bottom-order-placement v-if="!hideOrderplacement"/>

<!--       <div class="DEBUGGING-KEEP-THIS-LINE fixed bg-white top-0 left-0 right-0">-->
<!--         scroll visibility: {{ navigationStore.bottomNavigationScrollVisibility}}, <br />-->
<!--         general visibility: {{ navigationStore.bottomNavigationMode}} <br />-->
<!--         hide order placement: {{ hideOrderplacement }}<br />-->
<!--         bottom modal opened: {{ navigationStore.bottomModalOpened }}<br />-->
<!--         bottom modal opened: {{ navigationStore.bottomModalOpened }}<br />-->
<!--       </div>-->
    </nav>
</template>
<script lang="ts">
import { useNavigationStore } from '~~/stores/navigation';
import {computed} from "vue";
import {useRoute} from "#app";

export default {
    setup(props: any) {
        const navigationStore = useNavigationStore()
        const route = useRoute()

        const hideGeneralNavigationBar = computed(() => {
            return navigationStore.generalNavigationBarHidden;
        })

        const bottomModalOpened = computed(() => {
            return navigationStore.bottomModalOpened
        })

        const hideOrderplacement = computed(() => {
            return navigationStore.bottomOrderPlacementHidden;
        })

        const modalMode = computed(() => {
            return navigationStore.modalMode
        })

        return { 
            hideGeneralNavigationBar,
            hideOrderplacement,
          navigationStore,
            route,
            bottomModalOpened,
            modalMode
        }
    }
}
</script>