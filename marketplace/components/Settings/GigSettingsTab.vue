<template >
<div class="p-4 shrink-0 cursor-pointer rounded-xl flex gap-4 items-center font-bold">
                <div v-if="name != 'Publish'" :class="done ? 'bg-demo-active' : 'bg-demo-inactive'" class="h-4 w-4 rounded-full"></div>
                {{name}}
            </div>
</template>
<script>

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            required: false
        }
    }
}
</script>
