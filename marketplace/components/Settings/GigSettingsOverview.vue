<template>
    <div id="gigSettings-0" v-if="activeGig != undefined">
        <settings-header @saveSettings="saveSettings" :header="'Overview'"
            :description="'Type in General Information about the gig'" :showGuidelines="true" />
        <div class="h-[3px] bg-white w-full"></div>
        <settings-sub-category v-if="activeGig.gigCategories && activeGig.gigCategories.length > 1" :title="'Offer Category'"
            :description="'What service are you providing for your customers?'">
            <div class="w-full flex flex-col md:flex-row gap-4 mt-4 sm:mt-0">
                <select-input :class="'w-full'" v-model="activeGig.gigCategories[0].categoryCode" :uid="'gigCategory'" :optionKey="'categoryCode'"
                    :placeholder="'Select Category'" :data="CATEGORIES" />
                <select-input :class="'w-full'" v-model="activeGig.gigCategories[1].categoryCode" :uid="'gigSubCategory'" :optionKey="'categoryCode'"
                    :placeholder="'Select Subcategory'" :data="subCategories" />
            </div>
        </settings-sub-category>
        <settings-sub-category :title="'Offer Title'"
            :description="'Click <a>here</a> to see suggestion and guidelines'">
            <label class="relative group w-full" for="offerTitle">
                <p
                    class="absolute group-focus-within:opacity-0 transition-opacity font-bold text-xs right-4 top-1/2 -translate-y-1/2">
                    50 Characters max
                </p>
                <input v-model="activeGig.name" maxlength="50" id="offerTitle"
                    class="w-full peer placeholder:text-base placeholder:sm:text-xs placeholder:md:text-base"
                    placeholder="e.g. I will design you Cover in 24h" type="text">
            </label>
        </settings-sub-category>
        <settings-sub-category v-if="activeGig.gigGenres && activeGig.gigGenres.length > 1" :title="'Genre-Fit'"
            :description="'In what kind of genre are your target customers?'">
            <div class="w-full flex flex-col md:flex-row gap-4 mt-4 sm:mt-0">
                <select-input :class="'w-full'" v-model="activeGig.gigGenres[0].genreId" :uid="'gigGenres'"
                    :placeholder="'Select Genre 1'" :data="GENRES" />
                <select-input :class="'w-full'" v-model="activeGig.gigGenres[1].genreId" :uid="'gigGenres'"
                    :placeholder="'Select Genre 2'" :data="GENRES" />
            </div>
        </settings-sub-category>
        <settings-sub-category :title="'Experience'"
            :description="'For how many years are you practicing you progession?'">
            <select-input v-model="activeGig.experienceYears" class="half" :placeholder="'Select in years'"
                :data="YEARS" />
        </settings-sub-category>
    </div>
</template>
<script>
import SelectInput from '../Inputs/SelectInput.vue';
import { GENRES } from '../../../lib/types/Genres'
import { CATEGORIES } from '../../../lib/types/Categories'
import { YEARS } from '../../../lib/types/Years'
import GuidelinesButton from '../buttons/GuidelinesButton.vue';
import EditButton from '../buttons/EditButton.vue';
import { useGigsStore } from '~~/stores/gigs';

export default {
    setup(props, ctx) {
        const gigStore = useGigsStore()

        const activeGig = computed(() => {
            return gigStore.getActiveGig
        })

        const seller = computed(() => {
            return activeGig?.value.seller
        })

        const subCategories = computed(() => {
            return CATEGORIES[activeGig.value.gigCategories[0].categoryCode - 1]?.subCategories.filter(category => category.categoryCode !== 1)
        })


        async function saveSettings() {
            await gigStore.uploadGig()
        }

        return { GENRES, YEARS, CATEGORIES, seller, saveSettings, activeGig, subCategories }
    },
    emits: ['validated'],
    components: { SelectInput, SelectInput, GuidelinesButton, EditButton }
}
</script>>