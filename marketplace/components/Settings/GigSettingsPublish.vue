<template>
    <div id="gigSettings-7">
        <settings-header :header="'Status'" :description="''" :showNothing="true" />
        <div v-if="(!activeGig.active && incompleteTabs.length === 0)" class="flex bg-[#f2f2f2] mt-12 rounded-[40px] flex-col items-center justify-center sm:p-20">
            <p class="text-6xl font-semibold">
                Last Step
            </p>
            <p class="text-3xl mt-8 font-bold">
                Ready to publish your gig?
            </p>
            <button @click="setGigActive" class="button !px-20 !py-4 mt-8 shadow-xl bg-[#7dd869] text-white font-bold text-2xl">Publish your gig</button>
        </div>
        <div v-if="justActivated" class="flex bg-[#f2f2f2] mt-12 rounded-[40px] flex-col items-center justify-center sm:p-20">
            <celebratin-icon />
            <p class="text-3xl mt-8 font-bold">
                Great, your gig is now live.
            </p>
            <nuxt-link v-if="gigSlug !== ''" :to="`freelancer/${seller?.slug}/${gigSlug}`" class="px-20 py-4 rounded-xl mt-8 shadow-xl  bg-[#6161e7] text-white font-bold text-2xl">Go to your gig</nuxt-link>
        </div>
        <div v-if="activeGig.active && !justActivated" class="flex bg-[#f2f2f2] mt-12 rounded-[40px] flex-col items-center justify-center sm:p-20">
            <celebratin-icon />
            <p class="text-3xl mt-8 font-bold">
                Your gig is already published
            </p>
            <div class="flex gap-4 items-center  mt-8 ">
                <nuxt-link v-if="activeGig.slug !== ''" :to="`/freelancer/${seller?.slug}/${activeGig.slug}`" class="px-20 py-4 rounded-xl shadow-xl  bg-[#6161e7] text-white font-bold text-2xl">Go to your gig</nuxt-link>
                <p>or</p>
                <button @click="pauseActiveGig()" class="px-20 py-4 rounded-xl shadow-xl  bg-demo-red text-white font-bold text-2xl">Pause Gig</button>
            </div>
        </div>
        <div class="p-8" v-if="(incompleteTabs.length != 0)">
            <div class="flex justify-between">
                <div>
                    <p class="text-lg">
                        Please finish your gig to publish it.
                    </p>
                    <p class="text-lg">
                        To save it anyway press here:
                    </p>
                </div>
                <SaveSettingsButton @click="saveGig(true)" />
            </div>
            <div class="mt-8">
                <h4 class="text-xl font-semibold">
                    Following Tabs need to be filled:
                </h4>
                <div class="flex flex-col gap-4 mt-4">
                    <div class="bg-white p-4 flex justify-between rounded-lg" v-for="tab in incompleteTabs">
                        <p>
                            {{ tab }}
                        </p>
                        <button class="flex gap-2 items-center" @click="setTab(tab)">Go to the {{ tab }} tab
                            <arrow-right-icon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { useGigsStore } from '~~/stores/gigs';
import CelebratinIcon from '../Icons/CelebratinIcon.vue';
import { useSettingsStore } from '~~/stores/settings';
import SaveSettingsButton from '../buttons/SubmitButton.vue';
import ArrowRightIcon from '../Icons/ArrowRightIcon.vue';
import { useSellerStore } from '~~/stores/seller';
import Swal from 'sweetalert2'
export default {
    setup() {
        const gigStore = useGigsStore();
        const settingsStore = useSettingsStore();
        const sellerStore = useSellerStore()
        const justActivated = ref(false)

        let gigSlug = ref("")

        const activeGig = computed(() => {
            return gigStore.getActiveGig
        })

        const seller = computed(() => {
            return sellerStore.getSeller
        })

        const incompleteTabs = computed(() => {
            return settingsStore.checkNotDoneTabs().map(tab => {
                return tab.id
            })
        })

        const setGigActive = () => {
            if (settingsStore.checkNotDoneTabs().length === 0) {
                justActivated.value = true
                activeGig.value.active = true;
            } else {
                activeGig.value.active = false;
            }
            saveGig(activeGig.value.active)
        }

        const setTab = (name:string) => {
            const slug = name.toLowerCase()
            settingsStore.setActiveGigSetting(slug)
        }

        const pauseActiveGig = () => {
            Swal.fire({
                position: 'center',
                icon: "warning",
                confirmButtonText: `Pause ${activeGig.value.name}`,
                showCancelButton: true,
                cancelButtonText: "Cancel",
                html: `Are you sure, you want to pause ${activeGig.value.name}?`
            }).then((result) => {
                if (result.isConfirmed) {
                    activeGig.value.active = false;
                    saveGig(activeGig.value.active, `Gig ${activeGig.value.name} sucessfully paused`)
                }
            })
        }

        const saveGig = async(isActive:boolean, message?:string) => {
            const slug = await gigStore.uploadGig(isActive, message);
            gigSlug.value = slug;
            console.log("SLUG  ", slug)
        }

        return { activeGig, setGigActive, saveGig, incompleteTabs, setTab, justActivated, seller, pauseActiveGig, gigSlug }
    },
    components: { CelebratinIcon, SaveSettingsButton, ArrowRightIcon }
}
</script>
<style lang="">
    
</style>