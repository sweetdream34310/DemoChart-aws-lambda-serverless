<template>
    <div class="w-full flex justify-center mt-6">
        <button class="w-3/4 rounded-full py-[10px] text-white text-sm font-semibold bg-[#64d345]">Continue
            (${{packagePrice}})</button>
    </div>
</template>
<script>
export default {
    props: {
        packagePrice: {
            type: Number,
            required: true
        }
    }
}
</script>
