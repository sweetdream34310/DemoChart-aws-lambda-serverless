<template>
    <div>
        <div class="">
            <div class="grid px-8 grid-cols-5 gap-14">
                <div class="col-span-5 md:col-span-2 xl:col-span-1 h-full">
                  <side-menu-settings></side-menu-settings>
<!--                    <seller-information :headerInformation="'country'" :bodyInformation="'settings'"/>-->
                </div>
                <div class="col-span-5 md:col-span-3 xl:col-span-4 w-full">
                    <div v-show="activeTab === 'personal-settings'">
                        <personal-settings />
<!--                        <user-settings v-if="!seller && user"/>-->
                    </div>
                    <div v-show="activeTab === 'your-gigs'">
                        <gig-list :Gigs="seller?.gigs" />
                    </div>
                    <div v-show="activeTab === 3">
                        <gig-settings :activeGig="activeGig"/>
                    </div>
                  <div v-show="activeTab === 'become-a-seller'">
                      <become-a-seller-setting/>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import ArrowDownIcon from '~~/components/Icons/ArrowDownIcon.vue';
import SettingsIcon from '~~/components/Icons/SettingsIcon.vue';
import PersonalSettings from '~~/components/Settings/PersonalSettings.vue';
import UserSettings from '~~/components/Settings/UserSettings.vue';
import GigList from '~~/components/Settings/GigList.vue';
import GigSettings from '~~/components/Settings/GigSettings.vue';

import { useSellerStore } from '~~/stores/seller';
import { useSettingsStore } from '~~/stores/settings';
import { useGigsStore } from '~~/stores/gigs';
import { useUserStore } from '~~/stores/user';
import BecomeASellerSetting from "../../components/Settings/BecomeASellerSetting";
import SideMenuDefault from "../../components/SideMenus/SideMenuDefault";


export default {
    components: {
      SideMenuDefault,
      BecomeASellerSetting,
        ArrowDownIcon,
        SettingsIcon,
        PersonalSettings,
        GigList,
        GigSettings,
        UserSettings
    },
    setup() {
        const store = useSellerStore()
        const settings = useSettingsStore()
        const gigStore = useGigsStore()
        const userStore = useUserStore()

        const user = computed(() => {
            return userStore.getUser
        })

        onMounted(async () => {
            settings.setActiveTab('personal-settings')
        })

        const seller = computed(() => {
            return store.getSeller
        })

        const activeGig = computed(() => {
            return gigStore.getActiveGig
        })
        
        const activeTab = computed(() => {
            return settings.getActiveTab;
        })

        function setTab(tab) {
            settings.setActiveTab(tab)
        }

        return {
            seller,
            user,
            activeGig,
            activeTab,
            setTab
        }
    }
}



</script>