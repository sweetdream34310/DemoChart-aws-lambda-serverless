<template>
    <div class="h-auto">
        <div class="mt-6">
            <div class="flex justify-between items-center">
                <h4 class="text-2xl font-bold ">
                    {{ Package.offerName }}
                </h4>
                <p>
                    ${{ Package.offerPrice }}
                </p>
            </div>
            <p class="mt-6">
                {{ Package.offerDescription }}
            </p>
        </div>
        <div class="flex mt-12 h-auto justify-between">
            <div class="flex gap-2 items-center">
                <div
                    class="w-[24px] h-[24px] bg-black text-sm flex items-center justify-center text-white font-semibold">
                    01
                </div>
                <p>{{ Package.deliveryTime }}</p>
            </div>
            <div class="flex gap-2 items-center">
                <div class="">
                    <RevisionIcon />
                </div>
                <p>{{ Package.numRevisions }}</p>
            </div>
        </div>
        <div class="flex flex-col gap-4 mt-6">
            <div v-for="(feature, index) in Package.features.filter(el  => el.name !== '')" class="flex gap-4">
                <checkmark-icon />
                <p>{{ feature.name }}</p>
            </div>
        </div>
      <primary-button v-if="!isInModal" class="mt-6" @click="$emit('selectOrder', Package)">Continue ({{Package.offerPrice}})</primary-button>
    </div>
</template>
<script>
import CheckmarkIcon from '../Icons/CheckmarkIcon.vue';
import ContinueButton from '../buttons/ContinueButton.vue';
import RevisionIcon from '../Icons/RevisionIcon.vue';
import PrimaryButton from "~/components/buttons/PrimaryButton";

export default {
    emits: ["selectOrder"],
    props: {
        Package: {
            type: Object,
            required: true
        },
        isInModal: {
            type: Boolean,
        }
    },
    components: {
      PrimaryButton,
        CheckmarkIcon,
        ContinueButton,
        RevisionIcon
    },
    setup(){

        const uploadOrder = () => {
            this.$emit()
        }

        return { uploadOrder }
    }
}
</script>
<style lang="">

</style>