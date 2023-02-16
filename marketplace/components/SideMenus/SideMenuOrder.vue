<template>
  <side-menu-wrapper :header-information="'ratings'">
    <div class="h-[1px] bg-[#F2F2F2]"></div>
    <div class="py-8">
      <div class="flex flex-col gap-4">
        <div class="flex flex-row md:flex-col lg:flex-row xl:flex-col justify-between">
          <p>
            Inbox response time
          </p>
          <p class="text-right font-bold text-[#42B050] md:text-left lg:text-right xl:text-left">
            less than 1 hour
          </p>
        </div>
        <div class="flex flex-row md:flex-col lg:flex-row xl:flex-col items-center gap-8 md:gap-1 lg:gap-8 xl:gap-1">
          <p class="shrink-0 text-left w-2/5 md:w-full lg:w-2/5 xl:w-full">
            Order response rate
          </p>
          <div class="flex w-full gap-4 items-center ">
            <progress-bar class="" :progress="90" />
            <p>
              90%
            </p>
          </div>
        </div>
        <div class="flex flex-row md:flex-col lg:flex-row xl:flex-col items-center gap-8 md:gap-1 lg:gap-8 xl:gap-1">
          <p class="shrink-0 text-left w-2/5 md:w-full lg:w-2/5 xl:w-full">
            Delivered on time
          </p>
          <div class="flex w-full gap-4 items-center ">
            <progress-bar class="" :progress="100" />
            <p>
              100%
            </p>
          </div>
        </div>
        <div class="flex flex-row md:flex-col lg:flex-row xl:flex-col items-center gap-8 md:gap-1 lg:gap-8 xl:gap-1">
          <p class="shrink-0 text-left w-2/5 md:w-full lg:w-2/5 xl:w-full">
            Order completion
          </p>
          <div class="flex w-full gap-4 items-center ">
            <progress-bar class="" :progress="100" />
            <p>
              100%
            </p>
          </div>
        </div>
      </div>
      <div class="h-[1px] mt-8 w-full bg-[#F2F2F2]"></div>
      <div class="flex flex-row md:flex-col lg:flex-row xl:flex-col items-center md:items-start lg:items-center xl:items-start mt-8 gap-8 md:gap-1 lg:gap-8 xl:gap-1">
        <p>
          Earned in September
        </p>
        <p class="text-right font-bold md:text-left lg:text-right xl:text-left">
          $3,500
        </p>
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
  }
}
</script>