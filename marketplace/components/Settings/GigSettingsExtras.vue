<template>
    <div id="gigSettings-6">
        <settings-header @saveSettings="saveWelcomeMessage" :header="'Extras'" :description="'Add additional Infos to your Gig!'" :showGuidelines="true"/>
        <settings-header :header="'Welcome Message'" :description="'After a a customer books your gig we automatically send him this message:'" :showNothing="true"/>
        <div class="mt-12">
            <textarea v-model="activeGig.welcomeMessage" placeholder="Type your Message here...." class="w-full rounded-xl p-6" rows="10"></textarea>
        </div>
    </div>
</template>
<script>
import { useGigsStore } from '~~/stores/gigs';

export default {
    setup(_, ctx){
        const gigStore = useGigsStore()
        
        function saveWelcomeMessage(){
            gigStore.uploadGig()
        }

        const activeGig = computed(() => {
            return gigStore.getActiveGig;
        })

        return { saveWelcomeMessage, activeGig }
    },
    props: {
        activeGig: {
            type: Object,
            required: false
        }
    }
}
</script>
<style lang="">
    
</style>