<template>
    <div class="first:border-t-2 last:!border-b-2 py-8 px-3">
        <div class="flex gap-4">
            <img class="w-12 h-12 object-cover rounded-full" :src=reviewObject.artist.profileImage alt="">
            <div class="flex gap-4">
                <div>
                    <div class="flex  items-center gap-2 font-bold text-lg">
                        {{reviewObject.artist.name}}
                        <p class="flex">
                            <star-icon v-for="index in reviewObject.review.stars" />
                        </p>
                    </div>
                    <p class="flex items-center text-sm gap-2">
                        <flag-icon />
                        {{reviewObject.artist.country}}
                    </p>
                </div>
                <div class="items-center flex">
                </div>
            </div>
        </div>
        <div class="mt-8">
            <p class="font-semibold text-[#363232]">
                {{reviewObject.review.text }}
            </p>
        </div>
    </div>
</template>
<script>
import StarIcon from '../Icons/StarIcon.vue';
import FlagIcon from '../Icons/Countries/FlagIcon.vue';
export default {
    props: {
        reviewObject: {
            type: Object,
            required: true
        }
    },
    components: { StarIcon, FlagIcon }
}
</script>
<style lang="">
    
</style>