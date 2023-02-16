<template>
        <ContestTop @emit-scroller="() => pageScroller('firstScroll')"/>
    <div class="free_screen" ref="firstScroll">
^   <div class="free_screen_left">
    <img src="/DC_Edit_4.jpg" alt="" />
    </div>
    <div class="free_screen_right">
        <div class="free_screen_inputs">
            <SubscribeForm 
            title-small= "Step 1: GET FREE PACK" 
            title-big="Urban & Trap Micro Beats."
            text="  Never call them Sample Packs. This pack gives you a squirky mix of layered urban sounds mixed with pop & radio classics."
            />
        </div>
    </div>
    </div>
    <ContestLeft />
   <ContestRight />
    <ContestRewards />
     <div class="free_screen">
^   <div class="free_screen_left">
    <img src="/DC_Edit_3.jpg" alt="" />
    </div>
    <div class="free_screen_right">
        <div class="free_screen_inputs">
            <SubscribeForm
            title-small= "DOWNLOAD PACK TO START" 
            title-big="Urban & Trap Micro Beats."
            text="Way more than Sample Packs. This pack gives you a great blend of layered urban sounds for hiphop, trap and urban beat productions."
            />
        </div>
    </div>
    </div>
              <ContestMiddle />
                    <FAQ />
                <ArtistBanner />

            <!-- <Countdown 
      :year="2025"
      :month="5"
      :date="30"
      :hour="0"
      :minute="0"
      :second="0"
      :millisecond="0"
      /> -->
    <ContestBanner />
            <ReferenceSlice />
            <Footer />
</template>


<script>
import ContestLeft from '../components/ContestLeft.vue';
import ContestBanner from '../components/ContestBanner.vue';
import ContestRight from '../components/ContestRight.vue';
import SubscribeForm from "../components/SubscribeForm.vue";
import ContestRewards from '../components/ContestRewards.vue'
import ContestTop from '../components/ContestTop.vue'
import ReferenceSlice from '../components/ReferenceSlice.vue';
import Footer from '../components/Footer.vue';
import ArtistBanner from '../components/ArtistBanner.vue';
import {ref} from "vue";
import ContestMiddle from '../components/ContestMiddle.vue';
import FAQ from '../components/FAQ.vue';

// import Countdown from '../components/Countdown.vue';

export default {
    components: {
    SubscribeForm,
        ContestRight,
        ContestLeft,
        ContestRewards,
        ReferenceSlice,
        ContestBanner,
        Footer,
        ArtistBanner,
        ContestTop,
        ContestMiddle,
        FAQ

        // Countdown,
},
setup() {
    const firstScroll = ref(); 

    function pageScroller() {
       var element = firstScroll.value;
       element.scrollIntoView({behavior: 'smooth'});
    }
     return {
      pageScroller,
      firstScroll,
    }
}
}

</script>

,
        Countdown

<style s,
        ReferenceSlicecoped>
.free_screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.free_screen_left {
    display: flex;
     width: 55%;
     height: 100%;
}

.free_screen_left > img {
    display: flex;
     width: 100%;
     background-color: green;
     height: 100%;
}
.free_screen_right {
    align-items: center;
    justify-content: center;
     width: 45%;
}
</style>