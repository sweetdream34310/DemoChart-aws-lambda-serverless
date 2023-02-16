<template>
    <label class="relative group  w-full">
        <pen-icon v-if="withIcon"
            class="absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:opacity-0 transition-opacity" />
        <input required :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :class="`!pr-9 group-focus-within:!pr-5 transition-all w-full ${withBorder && 'withBorder'}`" type="text">
    </label>
</template>
<script>
import PenIcon from '../Icons/PenIcon.vue';
export default {
    props: {
        withBorder: {
            type: Boolean,
            default: false
        },
        withIcon: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            required: false
        },
    },
    components: { PenIcon }
}
</script>
