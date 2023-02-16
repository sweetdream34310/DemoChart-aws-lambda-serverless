<template>
    <div>
       <BlogTopper 
        title="3 SECRET TRICKS TO BOOST YOUR SPOTIFY"
        author="Marie Schneidereit"
        tag="Marketing"
        img="/img/img12.jpg"
        />
        <SimpleText 
        title="The Spotify Saga"
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        />
        <LargeImg 
        img="/img/img4.jpg"
        description="Dieses bild ist einfach nur wunderschön"
        />
         <SimpleText 
        title="The next Saga"
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        />
        <Flusstext 
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        />
        <LeftBanner 
        title1="Step 1."
        title2=" Conquer the music industry"
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        img="/img/img10.jpg"
        description="Das ist ja wirklich ein tolles bild"
        />
        <RightBanner 
         title1="Step 1."
        title2=" Conquer the music industry"
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        img="/img/img9.jpg"
        description="Das ist ja wirklich ein tolles bild"/>
              <SimpleText 
        title="The next Saga"
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        />
     <ChallengeBanner
     img="/img/img19.jpg"
     challengeTitle="BESTE CHALLENGE EVER"
     challengeTop="DEMOCHARTS CHALLENGE:"
     challengeDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
     buttonCheck="true"
     button1="PDF Workbook"
     button2="Cheatsheet"
      />
        <EndSnippet 
        title="Are you ready for more?"
        text="Ready to reach out for the stars? Show your music to hundreds of Experts."
        button1="More Blogs"
        button2="Apply to Democharts"
        link1="/"
        link2="/"
        />
   
  <SimpleBigText />
     
    </div>
</template>


<script>

import BlogTopper from "../../components/snippets/BlogTopper.vue"
import SimpleText from "../../components/snippets/SimpleText.vue"
import LargeImg from "../../components/snippets/LargeImg.vue"
import Flusstext from "../../components/snippets/Flusstext.vue"
import LeftBanner from "../../components/snippets/LeftBanner.vue"
import RightBanner from "../../components/snippets/RightBanner.vue"
import EndSnippet from "../../components/snippets/EndSnippet.vue"
import ChallengeBanner from "../../components/snippets/ChallengeBanner.vue"
import SimpleBigText from "../../components/snippets/SimpleBigText.vue"


export default {
  components: {
    BlogTopper,
    SimpleText,
    LargeImg,
    Flusstext,
    LeftBanner,
    RightBanner,
    EndSnippet,
    ChallengeBanner,
    SimpleBigText
}
}
</script>



<style scoped>
    
    

</style>