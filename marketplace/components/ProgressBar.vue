<template>
    <div class="w-full bg-[#F2F2F2] h-4 rounded-full">
        <div :style="`width: ${progress}%`" class="bg-[#42B050] h-full rounded-full"></div>
    </div>
</template>
<script>
export default {
    props: {
        progress: {
            type: Number,
            required: true
        }
    }
    
}
</script>