<template>
    <div class="bg-white h-full flex-shrink-0 w-[75vw] md:max-w-xs p-4 rounded-[30px]">
        <img class="w-full aspect-square object-cover" :src="Reference.img" alt="">
        <div class="mt-8 flex items-center flex-col gap-8">
            <h4 class="text-xl font-bold">{{Reference.name}}</h4>
            <p class="text-sm">{{Reference.description}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        Reference: {
            type: Object,
            required: true
        }
    }
    
}
</script>
<style lang="">
    
</style>