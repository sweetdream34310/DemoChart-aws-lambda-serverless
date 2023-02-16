<template>
    <div id="reviews" class="mt-16">
        <div>
            <div class="flex items-baseline gap-4">
                <h4 class="subtitle font-bold">
                    Reviews
                </h4>
                <div class="flex items-center gap-2">
                    <star-icon />
                    <star-icon />
                    <star-icon />
                    <star-icon />
                    <star-icon />
                    <p class="font-bold">
                        (17)
                    </p>
                </div>
            </div>
            <p class="mt-2">What other artists say about Martin.</p>
            <div class="flex flex-col mt-8 divide-y-2">
                <review v-for="(review, index) in Reviews" :reviewObject="review"/>
            </div>
        </div>
      <outline-button class="mt-8">show more</outline-button>
    </div>
</template>
<script>
import StarIcon from '../Icons/StarIcon.vue';
import Review from './Review.vue';
import OutlineButton from "~/components/buttons/OutlineButton";
export default {
    setup() {
        const Reviews = [
            {
                artist:  {
                    name: "Don Turbo",
                    profileImage: "https://cdn.fstoppers.com/styles/full/s3/media/2022/01/28/wayne_tucker11040_copy.jpg",
                    country: "Germany"
                },
                review: {
                    stars: 5,
                    text: "AWESOME Delivery!! I’m very happy with the seller. Thank you so much"
                }
            },
            {
                artist:  {
                    name: "Peter Miller",
                    profileImage: "https://media.istockphoto.com/photos/guitar-player-picture-id488557206?k=20&m=488557206&s=612x612&w=0&h=joSiYFKsRLuFeuxFem1uxMQBUf4Y2JINYxwpR36Qtf8=",
                    country: "Austria"
                },
                review: {
                    stars: 4,
                    text: "Martin is great. Very quick and he knows the mind of the customer. What I like most about him is that he took the material that I wrote and made it better. So its much simpler to work with him than other copywriters who seem to want you to rewrite everything so that they can then write something which may or may not sound like your true voice."
                }
            }
        ]
        return { Reviews }
    },
    components: {OutlineButton, StarIcon, Review }
}
</script>
