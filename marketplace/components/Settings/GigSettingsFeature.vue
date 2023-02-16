<template>
    <div>
        <label class="relative group  w-full" for="">
            <pen-icon
                class="absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:opacity-0 transition-opacity" />
            <input required placeholder="Feature 1" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                class="withBorder !pr-9 group-focus-within:!pr-5 transition-all w-full" type="text">
        </label>
    </div>
</template>
<script>
import PenIcon from '../Icons/PenIcon.vue';
export default {
    components: { PenIcon },
    props: {
        modelValue: {
            type: String
        }
    }
}
</script>
