<template>
<div>
<section class="home">
    <home-header-new></home-header-new>
    <blog-previews></blog-previews>
</section>
</div>
</template>


<script>
import HomeHeaderNew from '../components/HomeHeaderNew.vue'
import BlogPreviews from '../components/BlogPreviews.vue'


export default {
    components: {
        HomeHeaderNew,
        BlogPreviews,
    }
}

</script>

<style scoped>
.home {
    min-height: 100vh;
}
</style>

