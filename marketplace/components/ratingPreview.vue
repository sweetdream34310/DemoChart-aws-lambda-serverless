<template>
    <div class="bg-white relative w-full p-8 rounded-[30px] gap-8 flex items-center">
        <div class="w-full">
            <div class="flex gap-6 w-full">
                <div class="shrink-0">
                    <img class=" h-[90px] sm:h-14 w-[90px] object-cover sm:w-14 rounded-full"
                        :src="Rating.profileImage"
                        alt="">
                </div>
                <div class="shrink-0 flex items-center">
                    <div class="flex flex-col w-full sm:flex-row gap-2 sm:gap-4 sm:w-2/3 items-center">
                        <p class="font-bold w-full">{{Rating.name}}</p>
                        <p class="flex w-full md:w-fit gap-1 items-center flex-shrink-0">
                            <flag-icon />
                            {{Rating.country}}
                        </p>
                        <p class="flex gap-1 text-yellow-400 items-center">
                            <star-icon />
                            <star-icon />
                            <star-icon />
                            <star-icon />
                            <star-icon />
                            5
                        </p>
                    </div>
                </div>
    
            </div>
            <div class="mt-2 w-5/6">
                <p class="font-medium">
                    {{Rating.text}}
                </p>
            </div>
        </div>


        <div class="absolute bg-[#e6e6e6] p-4 rounded-full -right-3 top-1/2 transform -translate-y-1/2">
            <arrow-right-icon />
        </div>
    </div>
</template>
<script>
import ArrowRightIcon from './Icons/ArrowRightIcon.vue';
import FlagIcon from './Icons/Countries/FlagIcon.vue';
import StarIcon from './Icons/StarIcon.vue';
export default {
    components: { ArrowRightIcon, FlagIcon, StarIcon },
    props: {
        Rating: {
            type: Object,
            required: true
        }
    }
}
</script>
<style lang="">
    
</style>


