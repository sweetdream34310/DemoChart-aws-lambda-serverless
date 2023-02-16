<template>
    <div class="bg-white select-none cursor-pointer border-[2.5px] border-transparent py-3 font-bold text-lg px-5 rounded-full">
            {{Service.name}}
    </div>
</template>
<script>
export default {
    props: {
        Service: {
            type: Object, 
            required: true
        }
    }
}
</script>
