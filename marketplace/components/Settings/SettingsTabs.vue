<template>
    <div class="top-40 sticky ">
        <div class="bg-white relative p-8 pt-24 mt-16 md:mt-0 md:pt-16 text-center rounded-3xl ">
            <img class="absolute -top-24 md:-top-12 rounded-full left-1/2 transform -translate-x-1/2 h-48 md:h-24 w-48 md:w-24"
                :src="seller.profileImageSrc"
                alt="">
            <div v-if="seller.user != undefined">
                <p class="font-bold">
                    {{seller.user.firstName}} {{seller.user.name}}
                </p>
                <p class="mt-2">
                    {{getCountry(seller.user.countryID)}}
                </p>
            </div>
            <div class="mt-4" @click="setTab(0)">
                <div :class="{ '!bg-[#5858e6] text-white': activeTab === 0 }" class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-[#f4f4f5]">
                    <settings-icon/>
                    <p class="text-sm">Personal Settings</p>
                </div>
            </div>
            <div class="mt-4" @click="setTab(1)">
                <div :class="{ '!bg-[#5858e6] text-white': activeTab === 1 }" class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-[#f4f4f5]">
                    <settings-icon/>
                    <p class="text-sm">Your Gigs</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SettingsIcon from '../Icons/SettingsIcon.vue';
import { useSettingsStore } from '~~/stores/settings';
import getCountry from '~~/utils/getCountry';

export default {
    setup(){
        const settings = useSettingsStore();
        
        const activeTab = computed(() => {
            return settings.getActiveTab;
        })

        const setTab = (tab) => {
            settings.setActiveTab(tab)
        }
        

        return {setTab, activeTab, getCountry}
    },
    components: { SettingsIcon },
    props: {
        seller: {
            type: Object,
            required: true
        }
    }
}
</script>

    
