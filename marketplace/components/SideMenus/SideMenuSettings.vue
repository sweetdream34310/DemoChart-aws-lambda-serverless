<template>
  <side-menu-wrapper>
    <div>
      <div class="mt-4" @click="setTab('personal-settings')">
        <div :class="{ '!bg-[#5858e6] text-white': activeTab === 'personal-settings' }" class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-[#f4f4f5]">
          <settings-icon />
          <p class="text-sm">Personal Settings</p>
        </div>
      </div>
      <div class="mt-4" @click="setTab('your-gigs')">
        <div :class="{ '!bg-[#5858e6] text-white': activeTab === 'your-gigs' }" class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-[#f4f4f5]">
          <settings-icon />
          <p class="text-sm">Your Gigs</p>
        </div>
      </div>

      <div class="mt-4" @click="setTab('become-a-seller')">
        <div :class="{ '!bg-[#5858e6] text-white': activeTab === 'become-a-seller' }" class="flex cursor-pointer font-bold items-center gap-2 rounded-xl p-4 bg-[#f4f4f5]">
          <!--          <settings-icon />-->
          <p class="text-sm">Apply as a seller</p>
        </div>
      </div>
    </div>
  </side-menu-wrapper>
</template>
<script lang="ts">
import { useSellerStore } from '~~/stores/seller';
import { useSettingsStore } from '~~/stores/settings';
import SettingsIcon from '../Icons/SettingsIcon.vue'
export default {
  name: "SideMenuSettings",
  components: {
    SettingsIcon
  },
  setup(){
    const settings = useSettingsStore();
    const sellerStore = useSellerStore()

    const seller = computed(() => {
      return sellerStore.getSeller;
    })

    const activeTab = computed(() => {
      return settings.getActiveTab;
    })

    const setTab = (tab:number) => {
      settings.setActiveTab(tab)
    }

    return {setTab, activeTab, seller}
  }
}
</script>