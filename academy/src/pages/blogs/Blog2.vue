<template>
    <div>
       <BlogTopper 
        title="3 Mistakes to avoid as an Artist"
        author="Marie Schneidereit"
        tag="Marketing"
        img="/img/img12.jpg"
        />
        <SimpleBigText 
        title="While most musicians understand the art aspect, the business side remains a mystery to many."
        text="Music is not just an art form, it's an industry, and it's not only about how creative and talented you are. As much as we wish it was, it isn't. A lot of it is business, and if you're looking to make it as a musician, you need to be successful on both sides of it."
        text2="So, here are 5 pitfalls that almost every new artist makes:"
        />
        <LeftBanner 
        title1="1. "
        title2="Not building a brand"
        text=" Unlike most industries and careers, as a musician, you're your own product, you're showcasing yourself and your own talent, that's what you're trying to sell. You need to put a label on your work and to create music that sounds and feels like your own personality."
        img="/img/img31.jpg"
        />
        <RightBanner 
        title1="2. "
        title2="Failing to network"
        text="Yes, you can be the most talented artist in the room and still fail. Trying to make meaningful connections is a rule of thumb that life itself teaches us at the first occasion."
        text2=" The more people you get to know, the more you will find new opportunities to shine, be recommended, and find new gigs."
        img="/img/img21.jpg"
        />
           <LeftBanner 
        title1="3. "
        title2="Not having an online appearance"
        text="Most new artists make the mistake of relying solely on social media for fan engagement. But fans need more than a post or an Instagram story- they need to get to know the person behind the music, through behind-the-scenes footage, studio tours, thoughts and personal opinions on subjects away from music."
        img="/img/img34.jpg"
        />
  
           
         <SimpleBigText 
        title="Sounds too complicated to manage on your own?"
        text="Democharts supports you all the way. As an online platform for you to grow & connect with others, we want to guide you through the maze that is the music industry. If you want to learn more about connecting with music scouts check out our online platform. "
        :isClicked="true"
        link="https://www.democharts.org/"
        buttonText="OUR SCOUTING PLATFORM"
        />
        <ChallengeBanner 
        title="NEW SAMPLEPACKS AVAILABLE"
        headline="LIMITED TO 500PCS ONLY"
        buttonText="VISIT THE STORE"
        img="/img/packs.jpg"
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
    BlogPreviews
}
}
</script>



<style scoped>
    
    

</style>