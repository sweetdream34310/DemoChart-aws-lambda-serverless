<template>
  <div class="product_page">
    <div class="product_page_left">
        <TopProduct 
        productName="Urban Classics Bundle"
        text="The only pack you need to produce hit worthy songs"
        priceNew="34"
        priceOld="69"
        :product="bumpItem"
        />
      <feature-banner-2
      genre1="Trap"
      genre2="Hiphop"
      genre3="Latin"
      feat1="One of a kind Sample Pack"
      feat2="Premium guality recordings"
      feat3="7 Files/Sample"
      feat4="100% Royalty Free"
      feat5=".Midi included"
      feat6="3,2GB Size"
      soundsLike="The Weeknd, Bad Bunny ⁃ Justin Bieber ⁃ Harry Styles ⁃ Taylor Swift ⁃ Maroon 5 ⁃ Chris Brown ⁃ Bruno Mars ⁃ Ed Sheeran ⁃ Adele ⁃ Ariana Grande ⁃ Dua Lipa ⁃ BTS ⁃ The Kid Laroi ⁃ Olivia Rodrigo ⁃ Halsey ⁃ Joji ⁃ Billie Eilish ⁃ Sia ⁃ Lana Del Rey ⁃ Khalid ⁃ Flo Rida ⁃ Coldplay ⁃ Imagine Dragons"
      
      ></feature-banner-2>

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
      <div class="product_text">
        <h1>"The Only Pack you'll need to produce Hit Songs!"</h1>
      </div>
            <feature-banner
            mainFeature="Matched Files"
            featureDescription="7 key matched files for each Sample"
            fileNumber1="1000+"
            fileText1="WAV Files"
            fileNumber2="2000+"
            fileText2="MIDI Files"
            secondFeature="HQ SOUND"
            
            
            ></feature-banner>
      <TrippleReviewProduct :trippleArtists="trippleArtists" />
        <ProductNavigation
        :nav_products="nav_products"
        :categories="categories"
        :products_nav="products_nav"
        @nav-click="navigate($event)"
        background="black"
      />
    </div>

    <div class="product_page_right">
      <productCTA :product="bumpItem"></productCTA>
    </div>
  </div>
</template>

<script>
import FeatureBanner from "../components/FeatureBanner.vue";
import ProductCTA from "../components/ProductCTA.vue";
import MusicSamples from "../components/MusicSamples.vue";
import FeatureBanner2 from "../components/FeatureBanner2.vue";
import TopProduct from "../components/TopProduct.vue";
import { watchEffect, computed, ref } from "vue";
import { useStore } from "vuex";
import TrippleReviewProduct from '../components/TrippleReviewProduct.vue';
import EndCTA from '../components/EndCTA.vue';
import ProductNavigation from "../components/ProductNavigation.vue";



export default {
  components: {
    FeatureBanner,
    ProductCTA,
    MusicSamples,
    FeatureBanner2,
    TopProduct,
    TrippleReviewProduct,
    EndCTA,
    ProductNavigation
  },
  setup(props) {
    const store = useStore();
    let nav_products = ref();
    let products_nav = ref();
    navigate("all");
    // const products = computed(() => {
    //   return store.state.products
    //
    // });

    const bumpItem =  
      {
    uid: "10b0e931-f450-4cdb-8372-f135f323332a",
    name: "Urban Classics Bundle",
    imageUrl: "/products/video_1.mp4",
    description: "This bundle is everything you need in your Producer toolkit. Top notch emotional guitar loops and more.",
    brand: "urban_classics",
    category: "Guitars",
    price: 34,
    priceOld: 69,
    countInStock: 500,
    rating: 10,
    numReviews: 100,
    tags: "Guitars, Bass, Synth, Atmospheric, Layered, 141 Premium Loops",
    copiesSold: 98,
    copiesAvailable: 500,
    songFile: "/peps.mp3",
    songUrl: "https://devapi.democharts.com",
    songDescription: "This bundle provides you with everything you need to produce top-notch urban beats. Premium guitar sounds, synth melodies and more will take your productions to the next level. This bundle is a must have for every music producer.",
    songTags: "Instant Download, 405 Wav Files, 100% Royalty Free for Artists, Limited to 500 Downloads ",
    isBump: true,
    };

        const trippleArtists = [
      {
        img: "/bluffle_artist.jpg",
        artist_name: "@bluffle",
        artist_desc: "Producer",
        country: "Germany",
        production_time: "12 min",
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
     const categories = computed(() => {
      const categories = ["All Available"];
      store.state.products.map(item => {
        if (!categories.includes(item.category) && item.category !== null) {
          categories.push(item.category);
        }
      });
      return categories;
    });

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

    console.log("categories:::", categories);

    watchEffect(() => navigate("All Available"));

    return {
      bumpItem,
      trippleArtists,
      navigate,
      products_nav,
      nav_products,
      categories,
    };
  },
};
</script>

<style scoped>
.product_text {
  width: 100%;
}

/* .product_text > img {
    position: fixed;
    width: 200px;
    left: 270px;
    bottom: 155px;
    z-index: 1;
    animation: glow 5s infinite;
}

@keyframes glow {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
} */

.product_page {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.product_page_left {
  width: 70%;
  min-height: 100vh;
}

.product_page_left > div > h1 {
  margin: -30px 10vw 100px 10vw;
  font-family: "font1";
  font-size: 48px;
  background: linear-gradient(rgb(30, 76, 230), rgb(239, 236, 250));
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 10s linear infinite, cool-shadow 4s;
  display: inline-block;
  max-width: 85%;
  z-index: 1;
  position: relative;
   margin-top: -40px;
    margin-bottom: 80px;
}

.product_page_right {
  right: 0;
  position: fixed;
  margin-top: 30px;
  width: 30%;
  min-height: 100vh;
}

@media (max-width: 1100px) {
  .product_page_right {
    display: none;
  }

  .product_page_left {
    width: 100vw;
  }
    .product_page_left > div > h1 {
    margin-top: 20px;
    margin-bottom: 60px;
    font-size: 42px;
  
  }
}


@media (max-width: 500px) {


  .product_page_left > div > h1 {
    margin-top: 20px;
    margin-bottom: 60px;
    font-size: 42px;
  
  }
}

</style>
