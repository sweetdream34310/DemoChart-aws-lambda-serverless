<template>
  <div v-if="isBump && item" class="angebot_wrapper">
    <p>Add the {{ item.name }} for just <span>${{ item.bumpPrice }}</span></p>

    <a href="#" @click.prevent="$emit('checked')">
      <img src="/Check1.png" alt="" />
    </a>
    <a href="#" @click.prevent="$emit('closed')">
      <img src="/x.png" alt="" />
    </a>
  </div>
  <div v-if="item" class="cart_screen_product">
    <video
      v-if="item.imageUrl.slice(-3) === 'mp4'"
      width="450"
      height="450"
      autoplay
      loop
      muted
    >
      <source :src="item.imageUrl" type="video/mp4" />
    </video>

    <div v-if="item.imageUrl.slice(-3) === 'jpg'" style="width: 77%">
      <img :src="item.imageUrl" alt="" class="skeleton" style="width: 40%" />
    </div>

    <!-- <img :src="item.imageUrl" :alt="item.name" /> -->
    <div class="cart_screen_product_text" style="padding: 40px">
      <div style="textdecoration: 'none'" class="cart_screen_product_text_h2">
        <h2>{{ item.name }}</h2>
      </div>
      <div class="cart_screen_product_text_price">
        <!-- <h3>${{ item.price }}</h3>
        <h4>${{ item.priceOld }}</h4> -->
        <h3>${{ !isBump ? item.price : item.bumpPrice }}</h3>
        <h4>${{ !isBump ? item.priceOld : item.price }}</h4>
      </div>
      <p>{{ item.description }}</p>
      <select
        class="product_screen_instock"
        :value="item.qty"
        @change="e => dispatch(addToCart(item.product, Number(e.target.value)))"
      >
        <!--              {[...Array(item.countInStock).keys()].map((x) => {-->
        <option v-for="x in [0, 1, 2, 3, 4]" :key="x + 1" :value="x + 1">
          {{ x + 1 }}
        </option>
        ;
        <!--              })}-->
      </select>

      <button v-if="!isBump" @click="() => removeFromCart(item)">Remove</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
export default {
  name: "CartItem",
  props: {
    item: {
      type: Object,
    },
    isBump: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  setup() {
    const store = useStore();

    const removeFromCart = (product: any) => {
      store.commit("removeItem", product);
    };
    return {
      removeFromCart,
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style >
.angebot_wrapper {
  margin-left: 5vw;
  margin-top: 30px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: end;
  background: linear-gradient(90deg,  rgb(40, 77, 146) 5%, rgb(41, 41, 196) 71%);
  color: white;
  z-index: 100;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-family: "Josefin Sans", Helvetica, Arial, sans-serif;
}

.angebot_wrapper > p {
  font-size: 16px;
  animation: pulsate 3000ms infinite;
  margin-right: 10px;
    font-family: 'Open Sans';

}

.angebot_wrapper > p > span {
  font-family: 'Open Sans';
}

.angebot_wrapper > a {
  width: 40px;
}

.angebot_wrapper > a > img {
  width: 32px;
}

.angebot_wrapper > a > img:hover {
  transform: scale(1.06);
}

.cart_screen_product {
  display: flex;
  flex-direction: row;
  width: 55vw;
  align-items: center;
  margin-bottom: 40px;
  max-width: 1000px;
  background: linear-gradient(90deg, rgb(0, 0, 0) 5%, rgb(0, 0, 0) 71%);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  margin-left: 5vw;
}

video {
  width: 280px;
  height: 280px;
  object-fit: cover;
  padding: 20px;
}
.product_screen_instock {
  display: none;
}
.cart_screen_product_text {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 30px;
}

.cart_screen_product_text_h2 {
  color: rgb(240, 240, 240);
  font-size: 14px;
  text-decoration: none;
  margin-bottom: -16px;
  font-family: "font1";
  text-align: left;
  margin-bottom: 10px;
}

.cart_screen_product_text_price > h3 {
  font-size: 20px;
  font-weight: 500;
  color: white;
  font-family: 'Open Sans';
}

.cart_screen_product_text_price > h4 {
  margin: 2px 0 0 8px;
  font-size: 16px;
  color: #575657;
  text-decoration: line-through;
  font-weight: 400;
  font-family: 'Open Sans';
}

.cart_screen_product_text_price {
  display: flex;
  align-items: center;
  margin-bottom: -15px;
  margin-top: -10px;
}

.cart_screen_product_text > p {
  font-size: 14px;
  color: rgb(182, 182, 182);
  font-weight: 300;
  margin-right: 20px;
  text-align: left;
}

.cart_screen_product_text > button {
  padding: 5px 5px 5px 5px;
  background-color: rgb(41, 41, 41);
  border: none;
  max-width: 60px;
  border-radius: 100px;
  height: 24px;
  color: #e73a39;
  font-size: 10px;
  margin-top: 10px;
  transition: ease-in-out 100ms;
}

.cart_screen_product_text > button:hover {
  transform: scale(1.03);
  cursor: pointer;
}

@media (max-width: 1150px) {
  .cart_left {
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  

.angebot_wrapper {
  margin-top: 30px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: end;
  background: linear-gradient(90deg, rgb(107, 107, 107) 5%, rgb(40, 77, 146) 71%);
  color: white;
  z-index: 100;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-family: "Josefin Sans", Helvetica, Arial, sans-serif;
}

.cart_screen_product {
  display: flex;
  margin-left: 0;
  justify-content: center;
  width: 90vw;
  align-items: center;
  margin-bottom: 40px;
  max-width: 1000px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
}

@media (max-width: 950px) {
  .cart_screen_product {
  display: flex;
  flex-direction: column;
  margin-left: 0;
  justify-content: center;
  width: 90%;
  align-items: center;
  margin-bottom: 40px;
  max-width: 700px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
video {
  width: 260px;
  height: 260px;
  object-fit: cover;
  margin-top: 100px;
}

.angebot_wrapper > p {
  font-size: 12px;
}
}



</style>
