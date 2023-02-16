<template>
    <div class="mt-12">
      <h3 class="subtitle">About the seller</h3>
        <div class="mt-8 z-0">
            <about-me :Seller="Seller"/>
        </div>
    </div>
</template>
<script>
import AboutMe from '../../../components/AboutMe.vue'
import References from './References.vue';
export default {
    components: {
    AboutMe,
    References
},
props: {
        Gig: {
            type: Object
        },
        Seller: {
            type: Object
        }
    }
}
</script>
<style lang="">
    
</style>