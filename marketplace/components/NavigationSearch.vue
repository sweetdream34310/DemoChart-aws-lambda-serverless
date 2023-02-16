<template>
    <div>
        <label class="relative" for="searchMarketplace">
            <div class="absolute bg-gray-200 p-2 -mr-1 rounded-full right-2 top-1/2 -translate-y-1/2">
                <SearchIcon/>
            </div>
            <input class="w-full px-6 rounded-full py-2 input_field" type="search" name="searchMarketplace" id="">
        </label>
    </div>
</template>
<script>
import SearchIcon from './Icons/SearchIcon.vue';
export default {
    components: { SearchIcon }
}
</script>


<style scoped>

.input_field:focus {
    outline: 0;
}

</style>