<template>
  <div class="mission_component">
    <info-top></info-top>
    <info-uno></info-uno>
    <info-dos></info-dos>
    <info-tres></info-tres>

    <div class="free_screen">
      ^
      <div class="free_screen_left">
        <img src="/pop_3.jpg" alt="edit" />
      </div>
      <div class="free_screen_right">
        <div class="free_screen_inputs">
          <SubscribeForm
            title-small="FREE PRO PACK:"
            title-big="Urban and Pop Micro Bundle"
            text="  Never call them Sample Packs! This collection gives you a mix of layered urban sounds mixed with pop & radio classics."
          />
        </div>
      </div>
    </div>

    <ProductNavigation
      :nav_products="nav_products"
      :categories="categories"
      :products_nav="products_nav"
      @nav-click="navigate($event)"
    />
  </div>

  <Footer />
</template>

<script>
import SubscribeForm from "../components/SubscribeForm.vue";
import Footer from "../components/Footer.vue";
import InfoUno from "../components/InfoUno.vue";
import InfoDos from "../components/InfoDos.vue";
import InfoTres from "../components/InfoTres.vue";
import InfoTop from "../components/InfoTop.vue";
import { useStore } from "vuex";
import { watchEffect, computed, ref, onMounted } from "vue";
import ProductNavigation from "../components/ProductNavigation.vue";

export default {
  components: {
    SubscribeForm,
    Footer,
    InfoUno,
    InfoDos,
    InfoTres,
    InfoTop,
    ProductNavigation,
  },
  setup() {
    const store = useStore();
    const firstScroll = ref();
    const secondScroll = ref();
    const productScroll = ref();
    let nav_products = ref();
    let products_nav = ref();

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
      cartItems,
      navigate,
      products_nav,
      nav_products,
      categories,
    };
  },
};
</script>

<style scoped>
.mission_component {
  display: flex;
  flex-direction: column;
}

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

@media (max-width: 1000px) {
  .free_screen {
    display: flex;
    flex-direction: column;
  }

  .free_screen_left {
    display: flex;
    width: 80%;
    height: 100%;
    margin-top: 30px;
    margin-bottom: -25px;
  }

  .free_screen_left > img {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .free_screen_right {
    align-items: center;
    justify-content: center;
    width: 85%;
    padding-bottom: 100px;
  }
}
</style>
