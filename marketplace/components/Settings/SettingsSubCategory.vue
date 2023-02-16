<template>
    <div class="grid grid-cols-5 gap-4 py-8 items-center">
        <div class="col-span-5 sm:col-span-2">
            <h2 class="text-xl font-bold">{{title}}</h2>
            <p v-html="description" class="mt-1 inlineLink">
            </p>
        </div>
        <div class="col-span-5 sm:col-span-3 gap-2 flex-col sm:flex-row flex items-center">
            <slot />
        </div>
    </div>
    <div class="h-[3px] bg-white w-full"></div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="">
    
</style>