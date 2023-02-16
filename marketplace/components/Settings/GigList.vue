<template>
    <div>
        <settings-header :addGig="true" :header="'Your gigs'" :description="'Please add at least 2 an max. 4 References'" :showNothing="true" />
        <div class="flex mt-12 gap-4 flex-wrap w-full">
            <gig-card @deleteGig="deleteGig" v-for="(gig, i) in allSellerGigs" :Gig="gig" />
        </div>
    </div>
</template>
<script lang="ts">
import { useSettingsStore } from '~~/stores/settings';
import { useGigsStore } from '~~/stores/gigs';
import GigCard from './GigCard.vue';
export default {
    setup(props) {
        const settings = useSettingsStore();
        const gigStore = useGigsStore()

        const allSellerGigs = ref()

        watchEffect(() => allSellerGigs.value = props.Gigs);

        const setTab = (tab: number) => {
            settings.setActiveTab(tab);
        };
        
        const setGig = (gig: object) => {
            gigStore.setActiveGig(gig);
        };

        const deleteGig = (uid: string) => {
            allSellerGigs.value = allSellerGigs.value.filter((obj: object) => {
                return obj.uid != uid
            })
        }
        return { setTab, setGig, deleteGig, allSellerGigs };
    },
    props: {
        Gigs: {
            type: Array,
            required: false
        }
    },
    components: { GigCard }
}
</script>
<style lang="">
    
</style>