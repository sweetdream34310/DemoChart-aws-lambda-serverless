<template>
    <div>
       <BlogTopper 
        title="3 pro tips for achieving a professional quality recording"
        author="Marie Schneidereit"
        tag="Marketing"
        img="/img/img12.jpg"
        />
        <SimpleBigText 
        title="Recording Studios"
        text="Remember when you used to see a big ass recording studio in every other music video in the 80s? Or the infamous Beatles' Abby Road Studio? Oh the nostalgia..."
        text2="Nowadays we don't really need those big studios anymore. That's because creating a professional recording from your own home is as simple as writing an email. Well maybe not as simple. With the right tricks and knowledge though, basically everyone can achieve that polished sound we're used to hearing from only the best artists."
        text3="We're here to give you 3 tips on how achieve that high quality sound:"

        />
    
        <LeftBanner 
        title1="1. "
        title2="Improve on your recording skills"
        text="Being as self-sufficient as possible will allow you to take the full creative rein over your project, as well as save you time and money. So go on and teach yourself as many recording skills as possible. You will grow with the experience as an artist and improve your overall composition skills. This way you'll be much more confident on what you want, when it comes to working with a producer, as well."
        img="/img/img14.jpg"
        />
        <RightBanner 
        title1="2. "
        title2="Don't Overproduce your song"
        text="This is a common mistake made by self-recording artists. Adding a ton of fancy effects  can seem like a quick fix to make the recording sound more professional by adding a ton of fancy effects. However, it often leads to the music sounding 'too much' and actually hard to hear. Using too many effects can take away from the experience and sense of authenticity of the song. Granted - it depends on the musical genre as well, how much leeway there really is for effects. BTW - a hit song won't need 100 edits. The best songs usually take the least amount of work. If you need to try too hard to find that perfect sound, you'll probably not find it at all. Just go with the flow. Worst case you'll have to try it with a different song."
        img="/img/img6.jpg"
        />
           <LeftBanner 
        title1="3. "
        title2="Find the right team to work with"
        text="Unless you are a producer yourself, it’s best to not undertake the whole recording process alone. Even if you are, it can always help getting a separate set of ears to go over your work. They should be equally as excited about your project as you and experienced within your genre."
        text2="The longer a listener will stay with your song, the better it is for the algorithm. 30 seconds is also the point at which the stream gets monetized. If you want to make the algorithm work in your favor, you should take that into account."
        img="/img/img8_1.jpg"
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