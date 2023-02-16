<template>
    <div>
        <div class="bg-white p-4 rounded-2xl relative">
            <div @click="$emit('removeFaq', index)" class="absolute text-demo-red top-4 right-4">
                <trash-icon />
            </div>
            <p class="font-semibold">
                FAQ {{index}}
            </p>
            <div class="mt-6">
                <p class="text-sm font-bold">Question</p>
                <input v-model="faq.question" class="w-full mt-2 bg-[#f4f4f4] !py-5" type="text">
            </div>
            <div class="mt-4">
                <p class="text-sm font-bold">Answer</p>
                <input v-model="faq.answer" class="w-full mt-2 bg-[#f4f4f4] !py-5" type="text">
            </div>
        </div>
    </div>
</template>
<script>
import TrashIcon from '../Icons/TrashIcon.vue';

export default {
    props: {
        faq: {
            type: Object,
            required: false
        },
        index: {
            type: Number,
            required: true
        },
    },
    components: {TrashIcon}

}
</script>