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
        title="The Charts are yours"
        text="Create beats like a pro without music theory or fancy equipment. Try for free."
      ></home-banner>

      <right-banner
        header="Your ultimate"
        fancyHeader="hit making toolkit"
        text="If you're dreaming of making it big - this is the right bundle for you. Full of catchy melodies, emotional riffs and first-class guitar sounds to create the next No.1 hit."
        button1="Try For Free"
        button2="More Info"
        button2Link="/free"
        img="/pop_1.jpg"
        @emit-scroller="() => pageScroller('firstScroll')"
        @emit-scroll2="() => pageScroller3('productScroll')"
      ></right-banner>
      <MusicSamples
        img="/urban_2.jpg"
        :file-urls="[
          '../Pop_Beats/Lofi1.mp3',
          '../Pop_Beats/Lofi2.mp3',
          '../Pop_Beats/Pop1.mp3',
          '../Pop_Beats/Pop2.mp3',
          '../Pop_Beats/Rock1.mp3',
          '../Pop_Beats/Rock2.mp3',
        ]"
        :set-genre="[
          'Billie (Sad Pop)',
          'Harry (Sad Pop)',
          'Selena (Pop)',
          'Justin (Pop)',
          'Olivia (Pop Rock)',
          'Blink (Pop Rock)',
        ]"
        title="A sneak peak of our pop bundle"
      ></MusicSamples>
      <div ref="productScroll"><h1>Currently Available Products:</h1></div>

      <div class="home_screen_products">
        <ProductCard v-for="product in products" :product="product" :key="product">
        </ProductCard>
      </div>
      <div ref="firstScroll">
        <CompareSlice />

        <left-banner
          header="Loops & Sounds"
          fancyHeader="made by Pro's"
          text="You will only be able to last 10 minutes before you create your first hit with Pro Packs.  If not you get your money back and we' ll still be cool."
          button1="Buy Now"
          button2="Try For Free"
          button2Link="/free"
          img="/pop_2.jpg"
          @emit-scroller="() => pageScroller2('secondScroll')"
          @emit-scroll2="() => pageScroller3('productScroll')"
        ></left-banner>
      </div>
      <ReferenceSlice />

      <InfoSlice />
      <DemoSlice />

      <!-- <div ref="secondScroll"> <HomeInfoSlice></HomeInfoSlice> </div> -->

      <HomeSlice
        title1=""
        titleColor="Unlock"
        title2="your creativity"
        text="More than a Sample Library. Get royalty free Sounds, Loops and more. Easy to integrate with any DAW including Bandlab, Soundation or Soundtrap."
        img="/floating_packs.jpg"
        @bottom-scroller="() => pageScroller3('productScroll')"
      />
    </div>
    <right-banner
      header="Inspired by"
      fancyHeader="Justin, Ed, Harry..."
      text="Ready to produce your first hit single? Get to the top faster using Democharts Pro Packs."
      button1="Try For Free"
      button2="More Info"
      button2Link="/free"
      img="/pop_3.jpg"
      @emit-scroller="() => pageScroller('firstScroll')"
      @emit-scroll2="() => pageScroller3('productScroll')"
    ></right-banner>
    <ArtistBanner />
    <Footer />
  </div>
</template>

<script>
import HomeBanner from "../components/HomeBanner.vue";
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
import MusicSamples from "../components/MusicSamples.vue";
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
        (el) => el.uid.toString() === "6c8eff87-a435-4bbb-94ce-4a6118038c2c"
      );
    });

    const bumpItem = {
      brand: "Democharts Audio",
      category: "Guitars",
      copiesAvailable: 500,
      copiesSold: 84,
      countInStock: 500,
      description:
        '"Pop Essentials" is the ultimate sample pack for anyone who plans to rock the charts. You can expect hundreds of catchy melodies, emotional riffs and first-class guitar sounds.',
      imageUrl: "/products/video_2.mp4",
      name: "Pop Essentials Bundle",
      numReviews: 90,
      price: 34,
      priceOld: 69,
      rating: 10,
      songBy: "Song Produced by @Democharts",
      songDescription:
        "Have you always wanted to know how hits are produced? Well, there is no secret recipe, but our Pop Essentials Pack will definitely take you a giant step in the right direction. These loops will turn any of your songs into instant classics.",
      songFile: "/peps.mp3",
      songTags:
        "Instant Download, 405 Wav Files, 100% Royalty Free for Artists, Limited to 499 Downloads ",
      songUrl: "https://devapi.democharts.com",
      tags: "Guitars, Bass, Synth, Layered, 141 Premium Loops",
      uid: "2001156c-4cee-44d9-9b6f-03ca9564b146",
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
