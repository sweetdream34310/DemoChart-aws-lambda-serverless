<template>
    <div ref="mobileOrderModalLimit" id="description" class="mt-12">
        <h2 class="subtitle font-bold">What people loved about this seller</h2>
        <div class="mt-8">
            <rating-preview :Rating="Rating"/>
        </div>
        <div class="mt-8 mb-8 h-full">
            <h3 class="subtitle border-b border-demo-gray-200 pb-2">
                About this Gig
            </h3>
            <div v-html="Gig?.description" class="mt-6 space-y-4">
            </div>
            <see-more-button class=" md:hidden" @click="readMore($event)"/>
        </div>
    </div>
</template>
<script>
import RatingPreview from '~~/components/ratingPreview.vue';
import PlusIcon from '~~/components/Icons/PlusIcon.vue';
import SeeMoreButton from '~~/components/buttons/SeeMoreButton.vue';
import { useNavigationStore } from '~~/stores/navigation';
export default {
    components: { RatingPreview, PlusIcon, SeeMoreButton },
    props: {
        Gig: {
            type: Object
        }
    },
    setup(){
        const Rating = {
            name: "shawnmichael",
            country: "United Stated",
            profileImage: "https://www.zbrushcentral.com/uploads/default/original/4X/1/e/c/1ecda0ca3c74b4b8676999157e73e36b7ead42f5.jpeg",
            rating: 5,
            text: "This guy is a total professional he works with you from beginning to end and his skills speak for himself. I’m definitely coming back for future work from him!"
        }
        const navigationStore = useNavigationStore()
        onMounted(() => {
            navigationStore.setMobileOrderModalLimit(document.getElementById("description"))
        })
        const readMore = (e) => {
            document.querySelector("#description").classList.remove("lineclamp");
            e.target.remove()
        }

        return { Rating, readMore }
    }
}
</script>
<style lang="">
    
</style>