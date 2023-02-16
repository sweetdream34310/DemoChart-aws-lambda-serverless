<template>
    <div id="gigSettings-2">
        <SettingsHeader @saveSettings="saveDescription" :header="'Description'"
            :description="'Tell more about the Service you offer'" :showGuidelines="true" />
        <div class="mt-12">
            <client-only>
                <Tiptap :activeGig="activeGig" />
            </client-only>
        </div>
    </div>
</template>
<script>
import { useGigsStore } from '~~/stores/gigs';
import Tiptap from '../Tiptap.vue'
export default {
    setup(props, ctx) {
        const gigStore = useGigsStore()
        const activeGig = computed(() => {
            return gigStore.getActiveGig;
        })
        async function saveDescription() {
            gigStore.uploadGig()
        }

        return { activeGig, saveDescription }
    },
    components: { Tiptap }
}
</script>
