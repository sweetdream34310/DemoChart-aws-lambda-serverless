<template>
    <div class="grid grid-cols-5 gap-4 py-5 items-center">
        <div :class="`col-span-5 ${showNothing && !addGig ? '' : 'sm:col-span-2'} `">
            <h1 class="text-3xl font-bold">{{header}}</h1>
            <p class="mt-1">
                {{description}}
            </p>
        </div>
        <div v-show="showNothing ? !showNothing : true" class="col-span-5 sm:col-span-3 gap-4 flex flex-wrap ml-auto items-center">
            <guidelines-button v-show="showGuidelines"/>
            <submit-button @click="$emit('saveSettings')" :title="buttonText"/>
        </div>
        <div v-show="addGig ? addGig : false" class="col-span-5 sm:col-span-3 gap-4 flex flex-wrap ml-auto items-center">
            <button @click="(setTab(3), resetGig(), setActiveGigSetting())" class="button bg-demo-violet text-white font-bold">Add Gig</button>
        </div>
    </div>
    <div class="h-[3px] bg-white w-full"></div>
</template>
<script>
import GuidelinesButton from '../buttons/GuidelinesButton.vue';
import EditButton from '../buttons/EditButton.vue';
import SaveSettingsButton from '../buttons/SubmitButton.vue';
import { useSettingsStore } from '~~/stores/settings';
import { useGigsStore } from '~~/stores/gigs';
import SubmitButton from "../buttons/SubmitButton";
export default {
    emits: ["saveSettings"],
    setup(){
        const settings = useSettingsStore();
        const gigSettings = useGigsStore();

        const resetGig = (gig) => {
            gigSettings.resetActiveGig();
        };

        const setTab = (tab) => {
            settings.setActiveTab(tab);
        };

        const setActiveGigSetting = (tab) => {
            settings.setActiveGigSetting('overview')
        };

        return { setTab, resetGig, setActiveGigSetting }
    },
    props: {
        header: {
            type: String,
            required: true
        },
      buttonText: {
        type: String,
        default: 'Save settings'
      },
        description: {
            type: String,
            required: true
        },
        showGuidelines: {
            type: Boolean,
            required: false
        },
        showNothing: {
            type: Boolean,
            required: false
        },
        addGig: {
            type: Boolean,
            required: false
        },
    },
    components: {SubmitButton, GuidelinesButton, EditButton, SaveSettingsButton }
}
</script>
<style lang="">
    
</style>