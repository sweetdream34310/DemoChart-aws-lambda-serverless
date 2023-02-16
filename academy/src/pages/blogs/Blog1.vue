<template>
    <div>
       <BlogTopper 
        title="3 Simple ways to improve the quality of your sound"
        author="Marie Schneidereit"
        tag="Recording"
        img="/img/img12.jpg"
        />
        <SimpleText 
        title="The Story"
        text="I know how thrilling, but also how tough it can be to start your career in music. Especially if you've tried multiple ways and are still waiting to get the recognition you deserve. What I found out, always kept me from finally making it in the music industry, were my own limitations on how I approached music making. Sometimes even the smallest changes can make a huge difference. It took me years to grow & learn and finally get where I am today. That's why I wanted to share some practical and valuable advice to help you get there faster."
        />
        <LeftBanner 
        title1="1. "
        title2="Find the flavor of success"
        text="If you want to create great music, you should listen to what is deemed as great sounding. Listen to what music you like and are inspired by, actually sounds like and take notes. Do the same with the classics or current chart toppers, even if they're not right up your ally. Understand the anatomy of those kind of songs, by paying attention to all the different parts of the track from lyrics to melody and mixing. We're not saying you should simply copy other's, but learn and take influence from various different sources to ultimately create your own sound. "
        img="/img/img13.jpg"
        />
        <RightBanner 
        title1="2. "
        title2="Learn the ABC's of producing & mixing"
        text="While having professionals with years of experience mix your work will definitely take it to another level, learning at least the basics of producing and mixing will give you more freedom in creating songs and ultimately make you more independent. This way you can easily record demos on your own and improve your sound much faster. "
        img="/img/img6.jpg"
        />
           <LeftBanner 
        title1="3. "
        title2="Work with high quality Samples"
        text="If you've been involved in the music scene for more than a hot minute you'll probably have worked with samples. It can really transform your song from good to brilliant. Problem is - high quality samples are not easy to find, as there are quite a lot of platforms on the market. If they are high quality - everyone else will have used them too. Which is why you'll hear similar sounds throughout a lot of songs, over and over again. "
        img="/img/img11.jpg"
        />
            
        <Flusstext 
        text="That's why we've created something very special for you, that you'll only find at Democharts."
        text2="In our exclusive Sample Store we provide you with premium samples recorded by professional musicians that are completely royalty free."

        />
           
         <SimpleBigText 
        title="Excited to try them out? "
        text="Our samples are 50% off for the first 4 weeks after release. Check it out our store to see if there is a discount."
        :isClicked="true"
        buttonText="SAMPLESTORE"
        link="https://www.youtube.com/watch?v=cQy6cUFpULU"
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
import SimpleText from "../../components/snippets/SimpleText.vue"
import LeftBanner from "../../components/snippets/LeftBanner.vue"
import RightBanner from "../../components/snippets/RightBanner.vue"
import Flusstext from "../../components/snippets/Flusstext.vue"
import ChallengeBanner from "../../components/snippets/ChallengeBanner.vue"
import SimpleBigText from "../../components/snippets/SimpleBigText.vue"
import BlogPreviews from "../../components/BlogPreviews.vue"

export default {
  components: {
    BlogTopper,
    SimpleText,
    LeftBanner,
    RightBanner,
    Flusstext,
    ChallengeBanner,
    SimpleBigText,
    BlogPreviews
}
}
</script>



<style scoped>
    
    

</style>