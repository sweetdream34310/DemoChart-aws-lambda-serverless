<template>
    <div>
       <BlogTopper 
        title="Democharts FAQ"
        author="Marie Schneidereit"
        tag="Marketing"
        img="/img/img12.jpg"
        />

        <SimpleText 
        title="Frequently asked questions"
        text="I'm Marie - Democharts Scout, here to answer all your questions. We've recently received a lot of awesome feedback from you guys, as well as some questions. Thank you so much for the positive vibes and interest in our platform! So here are some of the most requested faqs answered:"
        />

        <SimpleBigText 
        title="“What can I expect from Democharts?”"
        text="Democharts is an online network that brings together passionate artists, record labels, curators, and scouts in a very exclusive community. On our platform you can showcase your talent and  build an online presence away from the crowded spaces of social media."
        text2="But there is more, of course. As a Democharts member you will always have exclusive access to our continuously growing collection of samples, workbooks, tutorials and more. We will also keep on providing you valuable information, tips & tricks about music production and the music industry."
        color="white"
        isBold="true"
        />

          <SimpleBigText 
        title="“Do I have to apply a second time?”"
        text="If you've signed up already, but are still on the waiting list, you don't have to re-apply. At least not for the first 90 days. If you haven't been onboarded by then, we will then notify you where to re-apply for our Chartlist."
        color="white"
        />

            <SimpleBigText 
        title="“Can I only upload unreleased demos?”"
        text="When applying to Democharts, you can use tracks that are already released. On the platform it is best to use brand new material, since our experts are always looking for fresh new sounds from unsigned artists."
        color="white"

        />

                 <SimpleBigText 
        title="“What is the expected quality of a demo?”"
        text="If you are looking to get the attention of an established label or agency, we'd recommend to record and produce something professional and pretty close to a finished production."
        color="white"
        />

                     <SimpleBigText 
        title="“What if I don't get contacted?”"
        text="You might not get contacted right away. But don't give up - patience is key. Scouting through a large collection of songs can take a little time. You will get noticed though, don't worry. Plus you might get rated into our Top 30, which will increase your chances immensely."
        color="white"
        />
    
   
         <BlogPreviews />
  
   

     
    </div>
</template>


<script>

import BlogTopper from "../../components/snippets/BlogTopper.vue"
import SimpleBigText from "../../components/snippets/SimpleBigText.vue"
import BlogPreviews from "../../components/BlogPreviews.vue"
import SimpleText from "../../components/snippets/SimpleText.vue"

export default {
  components: {
    BlogTopper,
    SimpleBigText,
    BlogPreviews,
    SimpleText
}
}
</script>



<style scoped>
    
    

</style>