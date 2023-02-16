<template>
    <div>
        <GigCategories/>
    </div>
    <div>
        <CommonExploreWrapper :searchFilter="category"/>
    </div>
</template>
<script lang="ts">
import { CATEGORIES } from '~~/../lib/types/Categories';
import CommonExploreWrapper from '~~/components/explore/CommonExploreWrapper.vue';
import { useGigsStore } from '~~/stores/gigs';
import { useNavigationStore } from '~~/stores/navigation';
import getPageNameFromUrl from "~/utils/getPageNameFromUrl";
export default {
    setup(props) {
        let category = ref("");
        const navivationStore = useNavigationStore();
        const gigStore = useGigsStore();
        onBeforeMount(() => {
            category.value = getPageNameFromUrl();
            const activeCategory = CATEGORIES.find(cat => cat.name === category.value);
          navivationStore.setExploreMode(activeCategory?.image!, activeCategory?.header!);
            gigStore.getAllGigs;
        });
        return { category }
    },
    components: { CommonExploreWrapper }
}
</script>