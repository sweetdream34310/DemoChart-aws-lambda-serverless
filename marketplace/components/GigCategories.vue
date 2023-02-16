<template>
    <div class="w-full gap-4 no-scrollbar overflow-x-scroll select-none pt-3 sm:mt-4 flex px-4 py-2 z-10">
      <nuxt-link
        v-for="(cat, index) in allCategories"
        :to="cat.categoryCode === 0 ? '/' : `/e/category/${encodeURIComponent(cat.name)}`"
        @click="() => clickOnCategory(cat, index)"
        class="flex items-center"
        :class="`
        ${pageName === cat.name || cat.categoryCode === 0 && pageName === '' ?
          'bg-demo-violet text-white font-semibold selected_category':
          'bg-white text-[#6e6e6e]'} font-semibold px-4 shrink-0 text-sm z-10 rounded-3xl cursor-pointer py-2 gap-4`">

        <img :src="cat.icon" class="h-4 w-4" />

        {{ cat.name }}
      </nuxt-link>  
    </div>
    <div class="w-full gap-4 no-scrollbar overflow-x-scroll select-none flex px-4 py-2 bg-[#f4f5f5] z-10">
        <p
            v-for="(cat, index) in CATEGORIES[activeCategory].subCategories"
            @click="(settingsStore.setActiveSubCategory(index))"
            :class="`${activeSubCategory === index ? 'font-bold scale-110' : ''} shrink-0 text-sm z-10 px-4 rounded-3xl transition-all cursor-pointer py-2 gap-4`">
            {{ cat.name }}
        </p>
    </div>
</template>
<script lang="ts">
import { CATEGORIES } from '~~/../lib/types/Categories'
import { useSettingsStore } from '~~/stores/settings'
import {computed, defineComponent} from "vue";
import { useNavigationStore } from '~~/stores/navigation';
export default defineComponent({
  props: {
    customCategoryClickFunction: {
      type: Function,
      default: undefined
    }
  },
    setup(props) {
        const settingsStore = useSettingsStore();
        const pageName = ref("")
        const activeCategory = ref(0)

        const activeSubCategory = computed(() => {
            return settingsStore.settings.activeSubCategory
        })

        onMounted(() => {
          pageName.value = getPageNameFromUrl()
        })

      const clickOnCategory = (cat: any, index: number) => {
          if (props.customCategoryClickFunction) {
            props.customCategoryClickFunction(cat, index);
            return;
          }
          // todo no settingstore here!
          activeCategory.value = index
          settingsStore.setActiveSubCategory(0);
      }

      const allCategories = [
          {
            name: 'Trending',
            categoryCode: 0,
            icon: '/fire.svg'
          },
        ...CATEGORIES
      ]

        return {
          CATEGORIES,
          settingsStore,
          activeCategory,
          activeSubCategory,
          clickOnCategory,
          pageName,
          allCategories
        }

    }
})
</script>

<style scoped>

.selected_category {
  align-items: center;
  appearance: none;
  background-color: #3EB2FD;
  background-image: linear-gradient(1deg, #3b3bc7, #5858E6 99%);
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 100px;
  border-width: 0;
  box-shadow: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-flex;
  height: auto;
  justify-content: center;
  line-height: 1.5;
  padding: 6px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color .2s,background-position .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
}


</style>