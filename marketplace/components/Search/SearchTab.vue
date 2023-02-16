<template>
    <div class="">
        <div :style="{
            'background-image': `url(${Service.image})`
        }" class="p-4 flex aspect-[3/1] bg-center bg-no-repeat rounded-3xl bg-cover w-full">
            <div class="mt-auto w-full bottom-8 left-8">
                <p class="text-3xl md:text-4xl lg:text-5xl text-white text-shadow font-bold w-2/3 mt-">
                    {{Service.header}}
                </p>
                <div class="w-full  flex flex-col sm:flex-row mt-8 gap-4">
                    <div class="relative sm:flex-row items-center sm:w-1/3">
                        <input
                            class="pr-6 !pl-14 placeholder:text-black placeholder:font-semibold w-full py-4 rounded-full"
                            placeholder="e.g Grapic Designer" type="text" name="" id="">
                            <search-icon :class="'absolute left-6 top-1/2 -translate-y-1/2'" />
                    </div>
                    <search-button />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SearchIcon from "../Icons/SearchIcon.vue";
import SearchButton from "../buttons/SearchButton.vue";
export default {
    props: {
        Service: {
            type: Object,
            required: true
        }
    },
    components: { SearchIcon, SearchButton }
}
</script>


