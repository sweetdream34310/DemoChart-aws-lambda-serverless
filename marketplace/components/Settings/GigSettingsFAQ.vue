<template>
    <div id="gigSettings-5">
        <settings-header @saveSettings="saveFaqs" :header="'Frequently asked Questions'"
            :description="'Answer quesitons that your customers might have'" :showGuidelines="true" />
        <div class="mt-12 flex flex-col gap-4">
                <gig-settings-single-f-a-q v-for="(faq, i) in activeGig.gigFaqs" :index="i+1" :faq="faq" @removeFaq="removeFaq"
                    :key="faq.arrayPos"/>
            <div class="mt-12 flex justify-center">
                <a @click="increment"
                    class="px-12 flex w-max text-white items-center rounded-full gap-3 py-3 bg-[#d54942]">Create new FAQ
                    <plus-icon :color="'white'" />
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { useGigsStore } from '~~/stores/gigs';
import PlusIcon from '../Icons/PlusIcon.vue';
import GigSettingsSingleFAQ from './GigSettingsSingleFAQ.vue';
export default {
    setup(props, ctx) {
        const gigStore = useGigsStore()
        
        function increment() {
            props.activeGig.gigFaqs.push({ arrayPosition:`${props.activeGig.gigFaqs.length+1}`,question: "", answer: "" })
        }

        function removeFaq(index) {
            props.activeGig.gigFaqs.splice(index-1, 1)
        }

        function saveFaqs() {
            gigStore.uploadGig()
        }

        return { increment, removeFaq, saveFaqs}
    },
    props: {
        activeGig: {
            type: Object,
            required: false
        }
    },
    components: { PlusIcon, GigSettingsSingleFAQ }
}


const checkIfEmpty = (faqs) => {
    return faqs.every(faq => {
        return faq.question != "" && faq.answer != ""
    })
}
</script>
<style lang="">
    
</style>