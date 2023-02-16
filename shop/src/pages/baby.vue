<template>
  <div>

    <div class="home_screen">
<!--       <Angebot 
      :year="2022"
      :month="4"
      :date="15"
      :hour="0"
      :minute="0"
      :second="0"
      :millisecond="0"
      />
      
      <home-banner
      title="The Baby Bundle"
      text="Create beats like a pro without music theory or fancy equipment. Try for free."
      ></home-banner>

      <right-banner
      header="Need that pro sound"
       fancyHeader="?"
       text="You want to create something truly unique, but only seem to find the same samples used over and over again? Be different and supercharge your tunes with Democharts."
       button1="Try For Free"
       button2="More Info"
       button2Link="/free"
      img="/urban_2.jpg"
       @emit-scroller="() => pageScroller('firstScroll')" 
        @emit-scroll2="() => pageScroller3('productScroll')"
        ></right-banner>
                        <CompareSlice /> -->

     <div ref="firstScroll"> 
       <left-banner 
       header="Get your first Pro Pack for"
       fancyHeader="only 9$"
       text=" The Baby Bundle is a selection of our best samples at a ridiculous price. Perfectly crafted for any DAW."
       button1="Buy Now"
       button2="All Packs"
       button2Link="/"
        img="/baby_1.jpg"

       @emit-scroller="() => pageScroller2('secondScroll')"  
         @emit-scroll2="() => pageScroller3('productScroll')"
         ></left-banner>
          </div>
     <div ref="productScroll"> <h1>Currently Available Products:</h1> </div>

      <div class="home_screen_products">
        <ProductCard
            v-for="product in products"
            :product="product"
            :key="product"
            >
          </ProductCard>
      </div> 
                                <ReferenceSlice />

                <InfoSlice />
                <DemoSlice />

           <!-- <div ref="secondScroll"> <HomeInfoSlice></HomeInfoSlice> </div> -->

      <HomeSlice
      title1=""
      titleColor="Big sound"
      title2="small price"
      text="The Baby Bundle get's your creativity flowing at a lower budget. You'll get over 450 well curated samples including backing tracks, bass, chords and more."
      img="/floating_packs.jpg"
       @bottom-scroller="() => pageScroller3('productScroll')" />
      </div>
      <ArtistBanner />
         <Footer />
  </div>
</template>

<script>
import HomeBanner from "../components/HomeBanner.vue";
import Angebot from "../components/Angebot.vue";
import ProductCard from "../components/ProductCard.vue";
import ProductMagic from '../components/ProductMagic.vue';
import HomeInfoSlice from "../components/HomeInfoSlice.vue";
import apiClient from "../api/apiClient";
import {computed, ref} from "vue";
import HomeSlice from '../components/HomeSlice.vue';
import {useStore} from "vuex";
import CheckedOut from './checkedOut.vue';
import RightBanner from '../components/RightBanner.vue';
import LeftBanner from '../components/LeftBanner.vue'
import Footer from '../components/Footer.vue';
import InfoSlice from '../components/InfoSlice.vue';
import DemoSlice from '../components/DemoSlice.vue';
import CompareSlice from '../components/CompareSlice.vue'
import ArtistBanner from '../components/ArtistBanner.vue'
import ReferenceSlice from '../components/ReferenceSlice.vue'



export default {
  name: "index.vue",
  components: {HomeInfoSlice, ProductCard, HomeBanner, ProductMagic, CheckedOut, RightBanner, LeftBanner, HomeSlice, Footer, InfoSlice, CompareSlice, ArtistBanner, Angebot, DemoSlice, ReferenceSlice},
  setup() {
    const store = useStore();
    const firstScroll = ref(); 
    const secondScroll = ref(); 
    const productScroll = ref();
    const products = computed(() => {

      return store.state.products.filter(el => el.uid.toString() === 'c7cfea20-bc74-4524-82bb-6909c8bbbbb0')

    });

    function pageScroller() {
       var element = firstScroll.value;
       element.scrollIntoView({behavior: 'smooth'});
    }

    function pageScroller2() {
       var element = secondScroll.value;
       element.scrollIntoView({behavior: 'smooth'});
    }

  function pageScroller3() {
       var element = productScroll.value;
       element.scrollIntoView({behavior: 'smooth'});
    }
    function bottomScroller() {
       var element = productScroll.value;
       element.scrollIntoView({behavior: 'smooth'});
    }

    return {
      products,
      pageScroller,
      pageScroller2,
      pageScroller3,
      firstScroll,
      secondScroll,
      productScroll,
      bottomScroller
    }
  }
}
</script>

<style scoped>

.home_screen {
  background-color: black;
  width: 100vw;
  padding-top: 50px;
}

.home_screen > div >  h1 {
  color: rgb(226, 226, 226);
  text-align: center;
  margin-bottom: 45px;
  margin-top: 6vh;
  font-size: 18px;
  font-weight: 500;
}

</style>