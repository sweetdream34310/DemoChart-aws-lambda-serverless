<template>
  <div class="product_nav" :style="style">
    <div className="header_component">
      <div>
   <!-- <img src="/punkt.png" alt=""> -->
      <p class="title">Our Latest Drops </p>
      </div>
      <div class="nav_bar">
        <a
          v-for="category in categories"
          :key="category"
          class="navigation"
          :class="products_nav === category ? 'navigation-active' : ''"
          @click="() => clickNavigate(category)"
        >
          {{ category }}
        </a>
      </div>
    </div>
    <div class="cat_products">
      <div
        v-for="product in nav_products"
        style="
          margin: 10px;
          margin-top: 50px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
        "
        className="product_container"
      >
        <div
          style="
            color: white;
            text-align: left;
            margin-left: 20px;
            width: fit-content;
            padding: 5px 10px 5px 10px;
            border-radius: 100px;
            margin-top: 10px;
            display: flex;
            align-items: center;
          "
        >
          <img className="punkt" src="/Logo.png" alt="" />
          <p
            style="
              margin-block-end: 0px;
              margin-block-start: 0px;
              font-size: 11px;
              text-transform: uppercase;
              font-family: 'Josefin Sans';
              font-weight: 600;
              margin-left: 3px;
            "
          >
            {{ product.category }}
          </p>
        </div>

        <video
          v-if="product.imageUrl && product.imageUrl.slice(-3) === 'mp4'"
          autoplay
          loop
          playsinline
          muted
        >
          <!--              <video width="450" height="450" autoplay loop muted>-->
          <source :src="product.imageUrl" type="video/mp4" />
        </video>
        <div
          v-if="product.imageUrl && product.imageUrl.slice(-3) === 'jpg'"
          style="padding: 15px"
        >
          <img
            :src="product.imageUrl"
            width="270"
            height="270"
            style="background-color: white; border-radius: 15px"
            alt=""
            class="skeleton"
          />
        </div>
        <p style="color: white; text-align: left; margin-left: 20px; font-weight: 500">
          {{ product.name }}
        </p>
        <div
          style="display: flex; justify-content: left; align-items: center; margin: 20px"
        >
          <span
            style="
              margin-right: 20px;
              color: grey;
              font-size: 14px;
              margin-top: -40px;
              font-family: 'Open Sans';
            "
          >
            1/{{ product.countInStock }}
          </span>
          <!-- <span style="color: red; font-size: 20px; font-weight: bold">
            ${{ product.price }}
          </span> -->
        </div>
        <router-link className="router_link" :to="product.brand"><p>Check availability</p></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  props: {
    categories: {
      type: Array,
    },
    nav_products: {
      type: Array,
    },
    products_nav: {
      type: String,
    },
     background: {
      type: String,
    },
  },
    computed: {
      style () {
        return 'background: ' + this.background;
      }
   },
  
  methods: {
    clickNavigate(category) {
      this.$emit("nav-click", category);
    },
  },
};
</script>

<style scoped>
.product_nav {
  padding-top: 30px !important;
  justify-content: center;
  padding-bottom: 100px;
  padding: 0 25px 80px 25px;
  background: linear-gradient(0deg, rgb(0, 0, 0), rgb(19, 19, 19) 80%) no-repeat
}

.router_link {
  text-decoration: none;
  color: white;
  font-size: 12px;
  width: fit-content;
  border-radius: 12px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
  border: 1px solid rgb(41, 41, 196);
  background-color: rgb(41, 41, 196);
}

.router_link:hover {
  text-decoration: none;
  color: white;
  border: 1px solid white;
  font-size: 12px;
  width: fit-content;
  border-radius: 12px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
  background-color: rgb(41, 41, 196);
}

.product_container {
  transition: 100ms ease-in-out;
  margin: 40px 1.0vw 0px 1.0vw !important;
  background-color: #0a0a0a;
    background: linear-gradient(90deg, rgb(17, 17, 17) 5%, rgb(14, 14, 14) 71%);
      border: 1px rgb(32, 32, 32) solid;


}

.product_container:hover {
  transform: scale(1.01);
  cursor: pointer;
  box-shadow: rgba(123, 123, 128, 0.171) 0px 10px 20px 0px;
  border: 1px white solid;
}

.router_link > p {
  padding: 0px 10px 0px 10px;
}

.punkt {
  width: 5px;
  object-fit: contain;
  margin-right: 5px;
  width: 10px;
  border-radius: 100px;
  background-color: #251f25;
  padding: 6px 8px;
  margin-right: 6px;
  margin-left: -8px;
}

.header_component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header_component > div > p {  
  font-family: 'font1';
}

.header_component > div {
  display: flex;
}

.header_component > div > img {
  object-fit: contain;
  width: 12px;
  margin-right: 30px;
}

.nav_bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
}

.nav_bar > a {
  margin-bottom: 20px;
}

.navigation {
  margin-left: 30px;
  margin-right: 30px;
  color: white;
  cursor: pointer;
  font-size: 13px;
  margin-top: 10px;
}
.navigation-active {
  color: #e73939;
  text-decoration: underline;
  ;text-underline-offset: 8px;
}

video {
  width: 270px;
  padding: 10px;
  animation: pico 0.8s ease-in-out;
  object-fit: cover;
  height: 270px;
  border-radius: 25px;
}
.title {
  color: white;
  font-size: 36px;
}

.title > span {
  font-family: 'Josefin Sans';
}

.cat_products {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 1000px) {
  .title {
  color: white;
  font-size: 32px;
}
}
</style>
