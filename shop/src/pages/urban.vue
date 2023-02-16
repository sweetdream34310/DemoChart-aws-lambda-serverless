<template>
  <div>
    <div class="home_screen">
      <Bundle
        v-if="!cartItems.find((item) => item.uid == bumpItem.uid)"
        :item="bumpItem"
      />
      <Angebot
        :year="2022"
        :month="4"
        :date="15"
        :hour="0"
        :minute="0"
        :second="0"
        :millisecond="0"
      />

      <home-banner
        img="/Pro_Pack.png"
        title="Urban Classics"
        text="Create beats like a pro without music theory or fancy equipment. Try for free."
      ></home-banner>

      <right-banner
        header="Never call them"
        fancyHeader="Sample Packs"
        text="Our bundles include everything you need to up your music production game. Formatted for seamless integration with your favorite DAW."
        button1="Try For Free"
        button2="More Info"
        button2Link="/free"
        img="/urban_2.jpg"
        @emit-scroller="() => pageScroller('firstScroll')"
        @emit-scroll2="() => pageScroller3('productScroll')"
      ></right-banner>
      <MusicSamples
        img="/urban_2.jpg"
        :file-urls="[
          '../Urban_Beats/Latin1.mp3',
          '../Urban_Beats/Latin2.mp3',
          '../Urban_Beats/Sad1.mp3',
          '../Urban_Beats/Sad2.mp3',
          '../Urban_Beats/Urban1.mp3',
          '../Urban_Beats/Urban2.mp3',
        ]"
        :set-genre="[
          'Camilla (Latin)',
          'Rosalia (Latin)',
          'Postie (Emo)',
          'Kurt (Emo)',
          'Ufo (Urban)',
          'Travis (Urban)',
        ]"
        title="A sneak peak of our urban bundle"
      ></MusicSamples>
      <div ref="productScroll"><h1>Currently Available Products:</h1></div>

      <div class="home_screen_products">
        <ProductCard v-for="product in products" :product="product" :key="product">
        </ProductCard>
      </div>
      <CompareSlice />

      <div ref="firstScroll">
        <left-banner
          header="Create a hit song within"
          fancyHeader="10 Minutes"
          text="We bet that you can build a pro beat or song concept within 10 minutes with our pro packs. If not you get your money back and we' ll still be cool."
          button1="Buy Now"
          button2="Try For Free"
          button2Link="/free"
          img="/urban_3.jpg"
          @emit-scroller="() => pageScroller2('secondScroll')"
          @emit-scroll2="() => pageScroller3('productScroll')"
        ></left-banner>
      </div>
      <ReferenceSlice />

      <InfoSlice />
      <DemoSlice />

      <!-- <div ref="secondScroll"> <HomeInfoSlice></HomeInfoSlice> </div> -->

      <HomeSlice
        title1="Mixed by"
        titleColor="Pro's."
        title2=""
        text="We've curated the finest collection of high quality sounds that perfectly suit your needs. The pack you won't find on Splice."
        img="/floating_packs.jpg"
        @bottom-scroller="() => pageScroller3('productScroll')"
      />
    </div>
    <right-banner
      header="Inspired by"
      fancyHeader="Travis, Drake, Wayne..."
      text="Create dope tracks and hit big. Get to the top faster using our unique and limited Democharts Pro Packs. Import them into any DAW including Fl Studio, Soundtrap or Soundation. "
      button1="Try For Free"
      button2="More Info"
      button2Link="/free"
      img="/total_trap.jpg"
      @emit-scroller="() => pageScroller('firstScroll')"
      @emit-scroll2="() => pageScroller3('productScroll')"
    ></right-banner>
    <ArtistBanner />
    <Footer />
  </div>
</template>

<script>
import HomeBanner from "../components/HomeBanner.vue";
import MusicSamples from "../components/MusicSamples.vue";
import Angebot from "../components/Angebot.vue";
import ProductCard from "../components/ProductCard.vue";
import ProductMagic from "../components/ProductMagic.vue";
import HomeInfoSlice from "../components/HomeInfoSlice.vue";
import apiClient from "../api/apiClient";
import { computed, ref } from "vue";
import HomeSlice from "../components/HomeSlice.vue";
import { useStore } from "vuex";
import CheckedOut from "./checkedOut.vue";
import RightBanner from "../components/RightBanner.vue";
import LeftBanner from "../components/LeftBanner.vue";
import Footer from "../components/Footer.vue";
import InfoSlice from "../components/InfoSlice.vue";
import DemoSlice from "../components/DemoSlice.vue";
import CompareSlice from "../components/CompareSlice.vue";
import ArtistBanner from "../components/ArtistBanner.vue";
import ReferenceSlice from "../components/ReferenceSlice.vue";
import Bundle from "../components/Bundle.vue";

export default {
  name: "index.vue",
  components: {
    HomeInfoSlice,
    ProductCard,
    HomeBanner,
    ProductMagic,
    CheckedOut,
    RightBanner,
    LeftBanner,
    HomeSlice,
    Footer,
    InfoSlice,
    CompareSlice,
    ArtistBanner,
    Angebot,
    DemoSlice,
    ReferenceSlice,
    MusicSamples,
    Bundle,
  },
  setup() {
    const store = useStore();
    const firstScroll = ref();
    const secondScroll = ref();
    const productScroll = ref();
    const products = computed(() => {
      return store.state.products.filter(
        (el) => el.uid.toString() === "5a7f6fc8-6eaa-4213-a033-09b224520ea0"
      );
    });

    const bumpItem = {
      brand: "Democharts Audio",
      category: "Guitars",
      copiesAvailable: 500,
      copiesSold: 98,
      countInStock: 500,
      description:
        "This bundle is everything you need in your Producer toolkit. Top notch emotional guitar loops and more. Influences range from emo to trap and international sounds.",
      imageUrl: "/products/video_1.mp4",
      name: "Urban Classics Bundle",
      numReviews: 100,
      price: 34,
      priceOld: 69,
      rating: 10,
      songBy: "Song Produced by @Democharts",
      songDescription:
        "This bundle provides you with everything you need to produce top-notch urban beats. Premium guitar sounds, synth melodies and more will take your productions to the next level. This bundle is a must have for every music producer.",
      songFile: "/peps.mp3",
      songTags:
        "Instant Download, 405 Wav Files, 100% Royalty Free for Artists, Limited to 500 Downloads ",
      songUrl: "https://devapi.democharts.com",
      tags: "Guitars, Bass, Synth, Atmospheric, Layered, 141 Premium Loops",
      uid: "10b0e931-f450-4cdb-8372-f135f323332a",
    };

    function pageScroller() {
      var element = firstScroll.value;
      element.scrollIntoView({ behavior: "smooth" });
    }

    function pageScroller2() {
      var element = secondScroll.value;
      element.scrollIntoView({ behavior: "smooth" });
    }

    function pageScroller3() {
      var element = productScroll.value;
      element.scrollIntoView({ behavior: "smooth" });
    }
    function bottomScroller() {
      var element = productScroll.value;
      element.scrollIntoView({ behavior: "smooth" });
    }

    const cartItems = computed(() => {
      return store.state.shoppingCart;
    });

    return {
      products,
      pageScroller,
      pageScroller2,
      pageScroller3,
      firstScroll,
      secondScroll,
      productScroll,
      bottomScroller,
      bumpItem,
      cartItems,
    };
  },
};
</script>

<style scoped>
.home_screen {
  background-color: black;
  width: 100vw;
}

.home_screen > div > h1 {
  color: rgb(226, 226, 226);
  text-align: center;
  margin-bottom: 45px;
  margin-top: 6vh;
  font-size: 18px;
  font-weight: 500;
}
</style>
