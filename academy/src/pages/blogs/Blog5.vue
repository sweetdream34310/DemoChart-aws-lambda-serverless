<template>
    <div>
       <BlogTopper 
        title="Stream me up - 4 Sure-Fire Hacks to Streaming Success! "
        author="Marie Schneidereit"
        tag="Marketing"
        img="/img/img12.jpg"
        />
        <SimpleBigText 
        title="“Growth-Hack needed?”"
        text="Do you want to know the easiest way to build an online following and gain more clout? Well, you've come to the right place. Or at least opened the right blog... anyways, here are the best hacks for perfecting your streaming presence."
   
        />
    
        <LeftBanner 
        title1="1. "
        title2="Get boosted "
        text="Are you already using Spotify for Artists? No? Well head on over and register, before you continue reading. Done? Good. "
        text2="Now, when submitting your tracks to Spotify - pitch and tag them. This will help to determine who they are suggested to and what playlists they'd suit. These meta tags include genres, mood and more. If they're labelled wrong, however, they'll appear to the wrong people and get skipped. So beware."
        img="/img/img18.jpg"
        />
        <RightBanner 
        title1="2. "
        title2="Sharpen up your Artist Profile "
        text="Streaming is great for music lovers to discover new music - just like yours. That's why your profile should be updated regularly. It should include important information for your fans as well as for music scouts. We'd recommend grabbing everyone's attention with dope artwork and using features like the artist's pick. Always remember to leave your socials, too."
        img="/img/img8_1.jpg"
        />
           <LeftBanner 
        title1="3. "
        title2="The 30-second-rule"
        text="Did you know that the more people skip your song, the less likely it will be recommended to others? While we can’t guarantee no one skipping your track, we can tell you about the 30-second-rule. "
        text2="The longer a listener will stay with your song, the better it is for the algorithm. 30 seconds is also the point at which the stream gets monetized. If you want to make the algorithm work in your favor, you should take that into account."
        img="/img/img29.jpg"
        />
         <RightBanner 
        title1="4. "
        title2="Use the Pre-Save feature"
        text="Pre-Save is essentially an algorithm hack. The first 12 to 24 hours after your release drops are the most important. Spikes in listeners, low skip rates and listening times matter most during this time. Racking up pre-saves in the run up to the release date is the easiest way to make the algorithm take notice of you. When your song or album finally drops, it'll automatically get a boost."
        img="/img/img36.jpg"
        />
  
           
         <SimpleBigText 
        title="Not ready for Spotify & Co. ? "
        text="Before you upload a song to Spotify, try pitching it to world-renowned experts on our scouting platform. If your song shines, it will lead you to new contacts who will support you in your future releases."
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