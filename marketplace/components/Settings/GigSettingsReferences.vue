<template>
    <div id="gigSettings-1">
        <settings-header @saveSettings="saveReferenceImages" :header="'References'"
            :description="'Please add at least 2 and max. 4 references'" :showGuidelines="true" />
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 mt-12 justify-between">
            <gig-settings-reference @deleteReference="deleteReference"
                v-for="(reference, index) in activeGig.gigReferences" :key="reference.identifier" :index="index" :reference="reference" />
        </div>
        <div class="flex justify-center mt-8">
            <button @click="addReference" class="button bg-demo-red text-white">Add reference</button>
        </div>
    </div>
</template>
<script>
import { useGigsStore } from '~~/stores/gigs';
import PenIcon from '../Icons/PenIcon.vue';
import GigSettingsReference from './GigSettingsReference.vue';
import DeleteButton from '../buttons/DeleteButton.vue'
export default {
    setup(props, ctx) {
        const gigStore = useGigsStore()

        const activeGig = computed(() => {
            return gigStore.getActiveGig;
        })

        const deleteReference = (index) => {
            activeGig.value.gigReferences.splice(index, 1)
        }

        const addReference = () => {
            if (activeGig.value.gigReferences.length < 4) {
                activeGig.value.gigReferences.push({
                    arrayPosition: activeGig.value.gigReferences.length
                })
            } else {
                alert("Only 4 references allowed!")
            }
        }

        async function saveReferenceImages() {
            gigStore.uploadGig()
        }

        return { activeGig, addReference, saveReferenceImages, deleteReference }
    },
    components: { PenIcon, GigSettingsReference, DeleteButton }
}
</script>
