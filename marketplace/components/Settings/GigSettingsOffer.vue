<template>
    <div class="bg-white snap-center w-full sm:w-max flex p-4 rounded-2xl flex-col">
        <label class=" ">            
            <input v-model="offer.offerName" class="withBorder w-full" type="text">
        </label>
        <label class="relative  group mt-3 w-full" for="">
            <pen-icon class="absolute group-focus-within:opacity-0 transition-opacity right-4 top-4" />
            <textarea placeholder="Short Description"
                class="bg-[#f4f4f5] placeholder:font-semibold w-full rounded-lg placeholder:pl-2 pr-9 group-focus-within:!pr-2 transition-all placeholder:pt-1 outline-none p-2 "
                name="" v-model="offer.offerDescription" id="" cols="20" rows="4"></textarea>
        </label>
        <div class="gap-2 flex flex-col">
            <text-input :class="'required bigger'" v-model="offer.features[0].name" :withBorder="true" :placeholder="'Feature 1'"/>
            <text-input :class="'required bigger'" v-model="offer.features[1].name" :withBorder="true" :placeholder="'Feature 2'"/>
            <text-input v-model="offer.features[2].name" :withBorder="true" :placeholder="'Feature 3'"/>
            <text-input v-model="offer.features[3].name" :withBorder="true" :placeholder="'Feature 4'"/>
        </div>
        <div class="flex gap-2 flex-col mt-2">
            <select-input :class="' '" :data="REVISIONS" v-model="offer.numRevisions" class="!rounded-md bg-[#ebebf6]" :placeholder="'Revisions'"/>
            <label class=' w-full' for="">
                <input v-model="offer.deliveryTime" placeholder="Delivery Time" class=" w-full !rounded-md bg-[#ebebf6]" type="number" name="" id="">
            </label>
            <label class=' w-full' for="">
                <input v-model="offer.offerPrice" placeholder="Price" class="!rounded-md w-full bg-[#ebebf6]" type="number" name="" id="">
            </label>
        </div>
    </div>
</template>
<script>
import PenIcon from '../Icons/PenIcon.vue';
import {REVISIONS} from '../../../lib/types/Revisions'
import SelectInput from '../Inputs/SelectInput.vue';
import GigSettingsFeature from './GigSettingsFeature.vue';
import TextInput from '../Inputs/TextInput.vue';

export default {
    setup(props){

        return { REVISIONS }
    },
    props: {
        offer: {
            type: Object,
            required: true
        }
    },
    components: { PenIcon, SelectInput, GigSettingsFeature, TextInput }
}
</script>
<style lang="">
    
</style>