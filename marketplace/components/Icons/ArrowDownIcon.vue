<template>
    <svg :width="size ? size : 24" :height="size ? size : 24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            required: false
        }
    }
}
</script>

