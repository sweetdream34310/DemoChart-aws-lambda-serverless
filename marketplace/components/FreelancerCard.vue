<template>
    <nuxt-link @click="handleGigClick(gig)" class="h-full block px-4 py-4" :to="'/freelancer/' + gig?.seller.slug + '/' + gig.slug">
        <div class="bg-white h-full cursor-pointer transition-all select-none relative p-4 rounded-xl freelancer_card">
            <img class="rounded-t-xl freelancer_card_img" :src="gig.gigMedias.filter(media => !media.isVideo)[0].mediaUrl" alt="" >
            <div class="flex items-center  mt-4 justify-between">
                <div class="flex items-center gap-4">
                    <img class="w-8 h-8 rounded-full object-cover ml-3" :src="gig.seller.profileImageSrc" alt="">
                    <p class="gig_user_name">
                        {{gig?.seller.slug}}
                    </p>
                </div>
                <p class="flex gap-1  items-center star_icon font-semibold">
                    <star-icon/>
                    5
                </p>
            </div>
            <div class="mt-4 font-semibold gig_name">
                {{gig.name}}
            </div>
            <div class="flex mt-4 justify-between items-center gig_price">
                <p>
                    starting at <span class="font-bold text-xl gig_price_number">
                        ${{lowestPrice}}
                    </span>
                </p>
<!--                <p @click="(isActive = !isActive)" :class="{ 'activePageMarker': isActive }" class="bg-[#eeeeee] cursor-pointer p-2 rounded-full inline-block gig_heart">-->
<!--                    <heart-icon/>-->
<!--                </p>-->

              <fav-button :is-active="gig?.savedByUser" @toggleActive="gigStore.toggleFavorite(gig?.uid)"></fav-button>

            </div>
            <div v-if="gig?.seller?.customLabelValue" class="absolute top-5 gap-1 left-4 flex bg-[#364042]/70 items-center py-1 px-2 rounded-3xl text-white font-semibold text-xs gig_insta">
                <instagram-icon/>
                500
            </div>
            <div v-if="gig?.seller?.customLabel" class="absolute top-4  right-4 flex bg-[#364042]/70 items-center py-1 px-2 rounded-3xl text-white font-semibold text-xs gig_label">
                {{gig?.seller?.customLabel}}
            </div>
        </div>
    </nuxt-link>
</template>
<script>
import StarIcon from './Icons/StarIcon.vue';
import HeartIcon from './Icons/HeartIcon.vue';
import InstagramIcon from './Icons/SocialMedia/InstagramIcon.vue';
import { useSellerStore } from '~~/stores/seller';
import { useGigsStore } from '~~/stores/gigs';
import FavButton from "~/components/favorites/FavButton";
export default {
    setup(props) {
        const sellerStore = useSellerStore()
        const gigStore = useGigsStore()

        const handleGigClick = (gig) => {
          console.log("handleGigClick?=?")
            sellerStore.setGigSeller(gig.seller);
        }

        const lowestPrice = computed(() => {
            return props.gig.gigServiceOffers.reduce(function (prev, curr) {
                return prev.offerPrice < curr.offerPrice ? prev : curr;
            }).offerPrice
        })

        const isActive = ref(true)

        return { isActive, sellerStore, gigStore, handleGigClick, lowestPrice }
    },
    props: {
        gig: {
            type: Object,
            required: true
        }
    },
    components: {
      FavButton,
        StarIcon, InstagramIcon, HeartIcon
    }
}
</script>


<style scoped>

.freelancer_card {
  padding: 0;
  display: flex;
  flex-direction: column;
  /* border-radius: 15px; */
}

/* .freelancer_card_img {
    margin: 7px;
    margin-top: 8px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: rgba(12, 12, 12, 0.089) 0px 7px 29px 0px;
} */

.star_icon {
    margin-right: 1rem;
}

.gig_name {
    margin-left: 1rem;
    min-height: 47px;
    font-size: 20px;
    margin-right: 10px;

}



.gig_price {
        margin-left: 1rem;
        margin-bottom: 1rem;
        font-size: 12px;
        
}

.gig_price_number {
    font-size: 18px;
    margin-left: 1px;
}

.gig_heart {
    margin-right: 1rem;
}

.gig_user_name {
    font-size: 12px;
    font-weight: 500;
}

.gig_label {
    font-size: 10px;
}

.gig_insta {
    display: none;
}
</style>