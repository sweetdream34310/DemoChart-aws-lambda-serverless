<template>
    <div class="p-4 rounded-md border border-[#f2f2f2]" >
        <div class="flex p-3 rounded-md items-center bg-zinc-100 justify-start gap-4">
            <Mp3Icon v-if="media.fileEnding === 'mp3'" :class="'text-demo-violet'" />
            <ImageIcon v-if="media.fileEnding === 'png' || media.fileEnding === 'jpg'" :class="'text-demo-violet'"/>
            Track Demo
        </div>
        <div class="flex text-sm mt-1 justify-between">
            <p>{{ media.fileEnding.toUpperCase() }}</p>
            <p>2.45MB</p>
        </div>
    </div>
</template>
<script lang="ts">
import ImageIcon from '../Icons/ImageIcon.vue';
import Mp3Icon from '../Icons/Mp3Icon.vue';

export default {
    props: {
        media: {
            type: Object,
            required: true
        }
    },
    components: { Mp3Icon, ImageIcon }
}
</script>