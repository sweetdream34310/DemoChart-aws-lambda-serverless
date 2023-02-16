<template>
    <div>
        <div class="flex gap-4 overflow-x-scroll snap-x snap-mandatory no-scrollbar">
            <gig-settings-tab
                v-for="(setting, i) in gigSettingsTabs"
                :class="{ 'bg-[#5858e6] text-white': activeGigSetting === setting.slug }"
                @click="setActiveGigSetting(setting.slug)"
                :done="settings.isTabDone(setting.name)"
                :name="setting.name" />
        </div>
        <gig-settings-overview @validated="validateSection" v-if="activeGigSetting === 'overview'" />
        <gig-settings-references @validated="validateSection" :activeGig="activeGig" v-if="activeGigSetting === 'references'" />
        <gig-setting-description @validated="validateSection" :activeGig="activeGig" v-if="activeGigSetting === 'description'" />
        <gig-settings-media @validated="validateSection" :activeGig="activeGig" v-if="activeGigSetting === 'media'" />
        <gig-settings-offers-features @validated="validateSection" :activeGig="activeGig" v-if="activeGigSetting === 'offers'" />
        <gig-settings-f-a-q @validated="validateSection" :activeGig="activeGig" v-if="activeGigSetting === 'faq'" />
        <gig-settings-extras @validated="validateSection" :activeGig="activeGig" v-if="activeGigSetting === 'extras'" />
        <gig-settings-publish @validated="validateSection" :activeGig="activeGig" v-if="activeGigSetting === 'publish'" />
    </div>
</template>
<script>
import { useSettingsStore } from '~~/stores/settings';
import { useGigsStore } from '~~/stores/gigs';

import GigSettingsTab from './GigSettingsTab.vue';
import GigSettingsOverview from './GigSettingsOverview.vue';
import GigSettingsReferences from './GigSettingsReferences.vue';
import GigSettingDescription from './GigSettingDescription.vue';
import GigSettingsMedia from './GigSettingsMedia.vue';
import GigSettingsOffersFeatures from './GigSettingsOffersFeatures.vue';
import GigSettingsFAQ from './GigSettingsFAQ.vue';
import GigSettingsExtras from './GigSettingsExtras.vue';
import GigSettingsPublish from './GigSettingsPublish.vue';
import Swal from 'sweetalert2';

export default {
    setup() {
        const settings = useSettingsStore();
        const gigStore = useGigsStore()

        const activeGig = computed(() => {
            return gigStore.getActiveGig;
        });

        const unsavedChanges = computed(() => {
            return gigStore.checkUnsaveChanges;
        });

        onBeforeRouteLeave((to, from, next) => {
            if (from.name === "settings" && !unsavedChanges.value) {
                Swal.fire({
                    position: 'center',
                    icon: "warning",
                    confirmButtonText: `Save ${activeGig.value.name}`,
                    showDenyButton: true,
                    showCancelButton: true,
                    denyButtonText: 'Cancel',
                    cancelButtonText: "Continue",
                    html: `You have unsaved changes. Do you want to continue?`
                }).then((result) => {
                    if (result.isConfirmed) {
                        gigStore.uploadGig(activeGig.value.active)
                        next()
                    } else if(result.isDenied) {
                        return false;
                    } else {
                        next()
                    }
                })
            } else {
                next()
            }
        })

        const gigSettingsTabs = computed(() => {
            return settings.getSettingsTabs;
        });


        const activeGigSetting = computed(() => {
            return settings.getActiveGigSetting;
        });

        const setActiveGigSetting = (tab) => {
            settings.setActiveGigSetting(tab)
        }

        const validateSection = (index, validated) => {
            settings.setTabStatus(index, validated)
        }

        return { activeGig, unsavedChanges, settings, gigSettingsTabs, activeGigSetting, setActiveGigSetting, validateSection };
    },
    props: {
        activeGig: {
            type: Object,
            required: true
        }
    },
    components: { GigSettingsTab, GigSettingsOverview, GigSettingsReferences, GigSettingDescription, GigSettingsMedia, GigSettingsOffersFeatures, GigSettingsFAQ, GigSettingsExtras, GigSettingsPublish }
}
</script>
<style lang="">

</style>