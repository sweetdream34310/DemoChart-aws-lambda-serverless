<template>
    <svg :width="size ? size : 20" :height="size ? size : 20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="currentColor" :stroke-width="thickness ? thickness : 2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>
<script>
export default {
    props: {
        size: {
            type: String,
            required: false
        },
        thickness: {
            type: String,
            required: false
        }
    }
}
</script>
<style lang="">
    
</style>