<template>
    <div>
       <BlogTopper 
        title="Are you ready for a Record Label?"
        author="Marie Schneidereit"
        tag="Marketing"
        img="/img/img12.jpg"
        />
        <SimpleBigText 
        title="“How do I get a record deal?”"
        text="That's been the gnawing question on the lips of almost every singer, songwriter and band on the planet for generations."
        text2=" The endgame, the golden ticket, and the promised land for all aspiring music artists. The one record deal that will turn all their dreams of having a successful career in music into a reality. While landing a record deal can certainly open up a lot of doors for you as an artist, there's no point in sugar-coating it: getting signed to a label is more challenging than ever."
        text3="So, how can you maximize your chances of landing a record deal?"
        isBold="true"
        />
    
        <LeftBanner 
        title1="1. "
        title2="Give it everything you've got"
        text="The music industry is more competitive than ever, which means you can’t just deliver a “good” song or a “presentable” demo. You need outstanding songs with great hooks that are professionally recorded, mixed, and mastered."
        img="/img/img19.jpg"
        />
        <RightBanner 
        title1="2. "
        title2="Build a solid following"
        text=" Record labels pay attention to the fires that produce the most smoke. You need to play in as many shows as you can, develop a social networking presence. Put your songs on YouTube & streaming services, and gather a decent amount of hype and excitement around your productions."
        img="/img/img10.jpg"
        />
           <LeftBanner 
        title1="3. "
        title2="Break the ice "
        text="In this business, it really is about who you know. Go to every industry event you can afford to attend, go to shows, go to where the music business people hang out, make connections and build relationships. Industry folks are much more likely to listen to your stuff if they already know you."
        img="/img/img13.jpg"
        />
  
           
         <SimpleBigText 
        title="And we're glad that, you are already on the right track!"
        text="Since the easiest way to do all the things we just mentioned is through Democharts. Our online platform that brings together passionate artists, record labels, curators, and scouts in a very exclusive community. It allows you to create your own online identity to showcase for record labels and connect with important industry people from all around the world."
        :isClicked="true"
        link="https://www.democharts.org/"
        buttonText="APPLY NOW"
        />
        <ChallengeBanner 
        title="NEW SAMPLEPACKS AVAILABLE"
        headline="LIMITED TO 500PCS ONLY"
        buttonText="VISIT THE STORE"
        img="/img/raise.jpg"
        />

   
         <BlogPreviews />
  
   

     
    </div>
</template>


<script>

import BlogTopper from "../../components/snippets/BlogTopper.vue"
import LeftBanner from "../../components/snippets/LeftBanner.vue"
import RightBanner from "../../components/snippets/RightBanner.vue"
import ChallengeBanner from "../../components/snippets/ChallengeBanner.vue"
import SimpleBigText from "../../components/snippets/SimpleBigText.vue"
import BlogPreviews from "../../components/BlogPreviews.vue"

export default {
  components: {
    BlogTopper,
    LeftBanner,
    RightBanner,
    ChallengeBanner,
    SimpleBigText,
    BlogPreviews,
}
}
</script>



<style scoped>
    
    

</style>