<template>
  <div>
    <div class="home_screen">
      <!-- <Bundle v-if="!cartItems.find(item => item.uid == bumpItem.uid)" :item="bumpItem" />
      <Angebot
        :year="2022"
        :month="9"
        :date="15"
        :hour="0"
        :minute="0"
        :second="0"
        :millisecond="0"
      /> -->
  
      <home-banner-pro-2
        img="/Pro_Pack_Logo.png"
        title="Create Beats like a Pro"
        text="Never call them Sample Packs! The new way to produce great sounding beats and instrumentals."
      ></home-banner-pro-2>
          <ProductNavigation
        :nav_products="nav_products"
        :categories="categories"
        :products_nav="products_nav"
        @nav-click="navigate($event)"
      />
      <right-banner
        header="Your Tracks need a"
        fancyHeader="supercharge?"
        text="From artists, for artists. Be different and create pro level songs with Democharts."
        button1="Our Packs"
        button2="How to use"
        button1Link="/packs"
        button2Link="/mission"
        @emit-scroller="() => pageScroller('firstScroll')"
        @emit-scroll2="() => pageScroller3('productScroll')"
        img="/pop_3.jpg"
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
        title="Give Pro Packs a listen"
      ></MusicSamples>
            <TrippleReview :trippleArtists="trippleArtists" />

      <!-- <div ref="productScroll"><h1>Currently Available Products:</h1></div>

      <div class="home_screen_products">
        <div v-for="product in products" :key="product">
          <ProductCard v-if="product.name" :product="product"> </ProductCard>
        </div>
      </div> -->
      <CompareSlice />

      <div ref="firstScroll">
        <left-banner
          header="Create a hit song within"
          fancyHeader="10 Minutes"
          text="We bet that you can build a pro beat or song concept within 10 minutes with our pro packs. If not you get your money back and we' ll still be cool."
          button1="Latest drops"
          button2="Try for free"
          button2Link="/free"
          button1Link="/packs"
          img="/urban_2.jpg"
          @emit-scroller="() => pageScroller2('secondScroll')"
          @emit-scroll2="() => pageScroller3('productScroll')"
        ></left-banner>
      </div>
      <ReferenceSlice />

      <InfoSlice />
      <DemoSlice />

      <!-- <div ref="secondScroll"> <HomeInfoSlice></HomeInfoSlice> </div> -->

      <HomeSlice
        title1="Loops & Sounds that"
        titleColor="hit big"
        title2=""
        text="You won't find our samples anywhere but here. Our sounds and plugins are optimized for any DAW including Bandlab, Soundacity or Soundtrap."
        img="/floating_packs.jpg"
        @bottom-scroller="() => pageScroller3('productScroll')"
      />
    </div>
    <ArtistBanner />
    <Footer />
  </div>
</template>

<script>
import HomeBannerPro2 from "../components/HomeBannerPro2.vue";
import Angebot from "../components/Angebot.vue";
import ProductCard from "../components/ProductCard.vue";
import ProductMagic from "../components/ProductMagic.vue";
import HomeInfoSlice from "../components/HomeInfoSlice.vue";
import apiClient from "../api/apiClient";
import { watchEffect, computed, ref, onMounted } from "vue";
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
import TrippleReview from "../components/TrippleReview.vue";
import SingleMusicSample from "../components/SingleMusicSample.vue";
import Bundle from "../components/Bundle.vue";
import ProductNavigation from "../components/ProductNavigation.vue";

import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();
instance?.proxy?.$forceUpdate();
export default {
  name: "index.vue",
  components: {
    HomeInfoSlice,
    ProductCard,
    HomeBannerPro2,
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
    ProductNavigation,
    DemoSlice,
    ReferenceSlice,
    MusicSamples,
    Bundle,
    SingleMusicSample,
    TrippleReview
  },
  setup() {
    const store = useStore();
    const firstScroll = ref();
    const secondScroll = ref();
    const productScroll = ref();
    let nav_products = ref();
    let products_nav = ref();

    // const products = computed(() => {
    //   return store.state.products
    //
    // });
    const artist = {
      img: "/artist_demo.jpg",
      artist_name: "Julian Propst",
      artist_desc: "Producer",
      country: "Austria",
      production_time: "58 min",
      quote:
        "At any given moment we have two choices: to step forward into growth or step back into safety.",
      audio_filename: "Song Produced by @Edhardboys",
      audio_file: "../Urban_Beats/Latin1.mp3",
    };

        const trippleArtists = [
      {
        img: "/bluffle_artist.jpg",
        artist_name: "@bluffle",
        artist_desc: "Producer",
        country: "Germany",
        production_time: "25 min",
        quote: "Various selection of sounds trapping your mind into cooking up",
        audio_filename: "Created with Pro Packs",
        audio_file: "../Reference_Beats/bluffle.mp3",
      },
      {
        img: "meadow20.jpg",
        artist_name: "@meadow",
        artist_desc: "Producer",
        country: "Austria",
        production_time: "28 min",
        quote: "authentic and dope!",
        audio_filename: "Created with Pro Packs",
        audio_file: "../Reference_Beats/meadow.mp3",
      },
      {
        img: "/tyler.png",
        artist_name: "@Tylergothat",
        artist_desc: "Beatmaker",
         production_time: "58 min",
        country: "Marrocco",
        quote: "I instantly felt travis vibes, was really fun creating this beat around it",
        audio_filename: "Created with Pro Packs",
        audio_file: "../Reference_Beats/tylassire.mp3",
      },
    ];

    const bumpItem = {
      brand: "Democharts Audio",
      category: "Guitars",
      copiesAvailable: 500,
      copiesSold: 86,
      countInStock: 500,
      description:
        "The Bedroom Trap package provides you with a selection of high intensity guitar and synth loops.  A great starter package to kick your urban beats to the next level.",
      imageUrl: "/products/video_3.mp4",
      name: "The Baby Bundle",
      numReviews: 45,
      price: 9,
      priceOld: 39,
      rating: 10,
      songBy: "Song Produced by @Edhardboys",
      songDescription:
        "Your beats need more spice? The Bedroom Trap Package is inspired by modern hiphop and trap productions in the mainstream area. Recorded in excellent, authentic quality and of course strictly limited.",
      songFile: "/peps.mp3",
      songTags:
        "Instant Download, 405 Wav Files, 100% Royalty Free for Artists, Limited to 499 Downloads ",
      songUrl: "https://devapi.democharts.com",
      tags: "Guitars, Bass, Layered, Atmospheric, 141 Premium Loops, Latin, Drums",
      uid: "5211d041-c9e5-41a7-83e0-3e84823dcb54",
      isBump: true,
    };

    store.dispatch("fetchCoupons");

    const products = computed(() => {
      return store.state.products.filter(
        el => el.uid !== "5211d041-c9e5-41a7-83e0-3e84823dcb54" && el.imageUrl !== null
      );
    });

    console.log("Products:::", products);

    const categories = computed(() => {
      const categories = ["All Available"];
      store.state.products.map(item => {
        if (!categories.includes(item.category) && item.category !== null) {
          categories.push(item.category);
        }
      });
      return categories;
    });

    watchEffect(() => navigate("All Available"));

    function navigate(nav) {
      console.log("nav::::::::::::", nav);
      products_nav.value = nav;
      if (nav === "All Available") {
        nav_products.value = store.state.products.filter(
          item =>
            item.uid !== "5211d041-c9e5-41a7-83e0-3e84823dcb54" && item.imageUrl !== null
        );
      } else {
        nav_products.value = store.state.products.filter(item => item.category === nav);
        console.log("sss", nav_products);
      }
    }
    console.log("nav_products", nav_products);

    // navigate("All Available");

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
      artist,
      navigate,
      products_nav,
      nav_products,
      categories,
      trippleArtists
    };
  },

  // methods: {
  //   navigate() {
  //     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  //   };
  // }
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
