<template>
    <div class="bg-white rounded-2xl p-4 min-w-[25%] w-full sm:w-max px-6 relative">
        <div v-show="(Gig.active || Gig.completed === false)" class="absolute  z-10 top-4   left-4 ">
            <div v-if="Gig.active" class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-[#25df14]"></div>
                <p class="text-xs font-bold uppercase">
                    Active
                </p>
            </div>
            <div v-if="(Gig.completed === false)" class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-demo-red"></div>
                <p class="text-xs font-bold uppercase">
                    Incomplete
                </p>
            </div>
        </div>
        <div>
        </div>
        <div class="py-8 pt-12">
            <h5 class="text-lg font-semibold">
                {{Gig.name}}

            </h5>
            <p v-if="(Gig.gigServiceOffers && Gig.gigServiceOffers.length > 0 && lowestPrice != null)" class="mt-3 text-sm">
                starting at 
                <span class="text-lg font-bold">
                    $ {{lowestPrice}}
                </span>
            </p>
            <p class="text-demo-red font-semibold" v-else>
                No Price | Offers still incomplete
            </p>
        </div>
        <button @click="deleteGig(Gig.uid, Gig.sellerUid)" class="absolute top-2 right-2 text-demo-red"><trash-icon/></button>
        <div class="flex gap-4 text-sm">
            <button class="px-8 py-3 bg-[#5858e6] rounded-full button cursor-pointer text-white"
                @click="(setTab(3), setGig(Gig.slug))">Edit Gig</button>
            <button :disabled="(Gig.completed === false)" @click="toggleActive(Gig)" class="px-8 disabled:brightness-50 py-3 text-white rounded-full button bg-[#bcbcbc]" href="#" v-html="Gig.active ? 'Pause Gig' : Gig.completed === false ? 'Gig incomplete' : 'Unpause Gig'"></button>
        </div>
    </div>
</template>
<script>
import { useGigsStore } from '~~/stores/gigs';
import { useSettingsStore } from '~~/stores/settings';
import TrashIcon from '../Icons/TrashIcon.vue';
export default {
    setup(props, ctx) {
        const { $axios } = useNuxtApp();
        const settings = useSettingsStore();
        const gigStore = useGigsStore();
        const setTab = (tab) => {
            settings.setActiveTab(tab);
        };

        const setGig = (slug) => {
            gigStore.fetchGig(slug);
        };

        const toggleActive = (gig) => {
            gig.active = !gig.active;
        };

        const lowestPrice = computed(() => {
            return props.Gig.gigServiceOffers.reduce(function (prev, curr) {
                return prev.offerPrice < curr.offerPrice ? prev : curr;
            }).offerPrice
        })

        const deleteGig = async (gigUid) => {
            ctx.emit('deleteGig', gigUid )
            const res5 = await $axios.post("/marketplace/deleteGig", {
                gigUid: gigUid
            });
            console.log(res5)
        }
        
        return { setTab, setGig, toggleActive, deleteGig, lowestPrice };
    },
    props: {
        Gig: {
            type: Object,
            required: true
        }
    },
    components: { TrashIcon }
}
</script>
<style lang="">
    
</style>