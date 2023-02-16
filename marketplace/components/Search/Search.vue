<template>
    <div class="py-5 w-full overflow-x-hidden">
        <div class="w-full mt-8">
            <search-tab v-show="activeCategory === index" v-for="(pill, index) in CATEGORIES" :Service="pill"/>
        </div>
    </div>
</template>
<script>
import SearchPill from './SearchPill.vue';
import SearchTab from './SearchTab.vue';
import { useSettingsStore } from '~~/stores/settings';
import { CATEGORIES } from '~~/../lib/types/Categories';

export default {
    setup(){
        const settingsStore = useSettingsStore()

        const activeCategory = computed(() => {
            return settingsStore.getActiveCategory;
        });

        return {activeCategory, CATEGORIES}
    },
    components: { SearchPill, SearchTab }
}
</script>
<style lang="">
    
</style>