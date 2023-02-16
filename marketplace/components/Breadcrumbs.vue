<template>
    <div class="flex py-4 items-center gap-4 text-gray-500 z-10 bg-[#f4f5f5]">
        <div class="flex shrink-0 gap-4">
            <p>
                Graphic Design
            </p>
            <p>
                <arrow-right-icon />
            </p>
            <p>
                Grunge
            </p>
        </div>
        <div class="h-[2px] w-full bg-gray-400"></div>
    </div>
</template>
<script>
import ArrowRightIcon from './Icons/ArrowRightIcon.vue';
export default {
    components: { ArrowRightIcon }
}
</script>