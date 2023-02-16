<template>
    <div class="py-2 px-4 text-xs font-medium rounded-full bg-[#e5e5e5]">
        {{title}}
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
}
</script>
<style lang="">
    
</style>