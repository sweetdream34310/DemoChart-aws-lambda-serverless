<template>
    <label :class="required ? 'required' : ''" for="">
        <select
            :class="`font-bold required:after:conte bg-no-repeat select bg-white ipnut w-full hide-select pl-12 p-2 rounded-xl placeholder:pl-5 active`"
            @input="$emit('update:modelValue', parseInt($event.target.value))"
            :required="required">
            <option v-if="placeholder != '' && modelValue == undefined" disabled hidden selected value="">{{placeholder}}</option>
            <option :selected="modelValue == option[optionKey]" :value="option[optionKey]" :class="'!pl-0'" v-for="(option, i) in data">
                {{option.name}}</option>
        </select>
    </label>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        modelValue: {
            type: Number,
            required: false
        },
        optionKey: {
            type: String,
            default: 'id'
        },
        required: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.select {
    background-position: 8px;
    background-image: url("data:image/svg+xml, %3Csvg width='28' height='28' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='black' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
</style>

