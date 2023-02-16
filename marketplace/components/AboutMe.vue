<template>
    <div id="aboutTheSeller" class="w-full z-0 bg-white rounded-3xl relative p-8">
        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex gap-8 p-4 shrink-0 flex-col items-center">
                <img class="w-32  h-32 object-cover rounded-full"
                    src="https://images.unsplash.com/photo-1587397845856-e6cf49176c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"
                    alt="">
                <div class="flex flex-col text-center">
                    <h4 class="text-lg font-bold">
                        {{Seller?.userName || "DJ Thomas"}}
                    </h4>
                    <p class="italic">
                        Illustrator
                    </p>
                </div>
            </div>
            <div class="space-y-4 pr-8">
                <h5 class="text-lg hidden md:block font-bold">About Me</h5>
                {{Seller?.aboutMe}}
            </div>
            <div class="absolute top-4 right-8">
                <p class="flex text-[#235382] text-sm items-end font-bold gap-1">
                    <verified-icon/>
                    verified seller
                </p>
            </div>
        </div>
        <hr>
        <div class="pt-8 pr-8 flex flex-col md:flex-row justify-between">
            <button class="bh-white border-2 font-bold border-black rounded-full py-3 px-5">
                Get in Touch
            </button>
            <div class="flex justify-between mt-4 gap-4 md:mt-0 px-6 md:px-0">
                <div class="flex flex-col gap-2 items-center">
                    <p>Location:</p>
                    <p class="font-bold">Germany</p>
                </div>
                <div class="flex flex-col gap-2 items-center">
                    <p>Experience:</p>
                    <p class="font-bold">{{Seller?.experienceYears}} Years</p>
                </div>
                <!-- <div class="hidden md:flex flex-col gap-2 items-center">
                    <p>Design Style:</p>
                    <p class="font-bold">Photographic</p>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import VerifiedIcon from "./Icons/VerifiedIcon.vue";
export default {
    components: { VerifiedIcon },
    props: {
        Seller: {
            type: Object
        }
    }
}
</script>
<style lang="">
    
</style>