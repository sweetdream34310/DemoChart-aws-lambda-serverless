<template>
    <div id="gigSettings-4">
        <settings-header @saveSettings="saveServiceOffers" :header="'Offers & Features'" :description="'Show the customers which offers you have'"
            :showGuidelines="true" />
        <div>
            <div class="flex flex-wrap gap-8 justify-center mt-12">
                <GigSettingsOffer v-for="offer in activeGig.gigServiceOffers" :offer="offer"/>
            </div>
        </div>
    </div>
</template>
<script>
import { useGigsStore } from '~~/stores/gigs';
import PenIcon from '../Icons/PenIcon.vue';
import SelectInput from '../Inputs/SelectInput.vue';
import GigSettingsOffer from './GigSettingsOffer.vue';
export default {
    setup(props, ctx){
        const gigStore = useGigsStore()

        const activeGig = computed(() => {
            return gigStore.getActiveGig;
        })

        function saveServiceOffers(){
            gigStore.uploadGig()
        }

        return { activeGig, saveServiceOffers }
    },
    components: { PenIcon, SelectInput, GigSettingsOffer},
}

</script>
<style lang="">

</style>