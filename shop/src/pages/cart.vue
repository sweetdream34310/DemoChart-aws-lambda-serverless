<template>
  <div class="cart_screen">
    <div :class="cartItems.length === 0 ? 'cart_screen_top_2' : 'cart_screen_top'">
      <h1>Shopping Cart</h1>
      <div v-if="cartItems.length === 0" class="empty_cart_wrapper">
        <h2>Your Cart is empty</h2>
        <router-link to="/packs" class="fake_button"> Go to our Packs </router-link>
      </div>
      <div v-else>
        <div class="top_nav">
          <router-link class="back_nav" to="/packs">
          <img src="down.png" alt="">
          <p>Back to Products</p></router-link>
        <h2 class="cart_checkout_h2">Ready to checkout?</h2>
        </div>
        <hr class="hrr" />
      </div>
      <div class="cart_left">
        <CartItem :item="cartItems[0]" :is-bump="false" />
        <CartItem
          v-if="!closed && cartItems.length"
          :item="bumpProduct"
          :is-bump="true"
          @checked="onChecked(bumpProduct)"
          @closed="closed = true"
        />
        <div v-for="item in cartItems.slice(1)" :key="item.uid">
          <CartItem :item="item" :is-bump="false" />
        </div>
      </div>
    </div>

    <div
      :class="cartItems.length === 0 ? 'cart_screen_right_hidden' : 'cart_screen_right'"
    >
      <div class="cart_screen_summary">
        <div class="cart_screen_summary_text">
          <h2>
            <span class="moving_font">{{ cartItems.length }} items </span>
          </h2>
          <!-- <h2>{{cartItems.reduce((acc, item) => acc + item.qty, 0)}} items</h2> -->

          <div
            v-if="cartItems"
            class="cart_screen_summary_info"
            v-for="item in cartItems"
          >
            <img src="../img/check.svg" alt="" />
            <h4>1* {{ item.name }}</h4>
          </div>

          <!--     <div class="cart_screen_summary_info">
          <img src="../img/check.svg" alt="" />
          <h4> Royalty Free </h4>
        </div>
        <div class="cart_screen_summary_info">
          <img src="../img/check.svg" alt="" />
          <h4> Secure Payment </h4>
        </div> -->
          <!-- <hr class="hrrr" /> -->
          <div class="cart_screen_summary_info2"></div>
          <div class="cart_screen_summary_info2">
            <!--          {{/* Ist nur ein Placeholder &ndash;&gt; Soll später Dynamisch ersetzt werden */}}-->
            <!-- <h4>{{ email }}</h4> -->
          </div>

          <hr class="hrrr" />
          <div v-if="cartItems.length > 0" class="cart_screen_summary_oldprice">
            You Saved: $<span
              >{{ cartItems.reduce((acc, item) => acc + item.priceOld - item.price, 0) }}
            </span>
          </div>
          <div v-if="cartItems.length > 0" class="cart_screen_summary_standard">
            Standard Price: $<span>{{
              cartItems.reduce((acc, item) => acc + item.priceOld, 0)
            }}</span>
          </div>
          <div v-if="cartItems.length > 0" class="cart_screen_summary_price">
            Your Items: $<span>{{
              cartItems.reduce((acc, item) => acc + item.price, 0)
            }}</span>
          </div>
          <div v-if="couponPrice != 0" class="cart_screen_summary_price">
            Your Items with Coupon Code: $<span>{{ couponPrice }}</span>
          </div>

          <div v-if="couponConfig" class="cart_screen_summary_oldprice">
            <span>Coupon Name: {{ couponConfig.name }}</span
            ><br />
            <span>Coupon Type: {{ couponConfig.type }}</span
            ><br />
            <span>Coupon Discount: {{ couponConfig.discount }}</span
            ><br />
            <span>Coupon Product: {{ couponConfig.product }}</span>
          </div>

          <router-link to="/checkout" class="fake_button"> Go to Checkout </router-link>

          <!-- Das ist der richtige container -->
          <!-- <div id="paypal-button-container"></div> -->

          <img src="../img/payment_provider.png" alt="payment provider" />

       
        </div>
        
      </div>
   <div class="cart_screen_summary_coupon">
            <!-- <p>Got A Coupon?</p> -->
            <form>
              <input type="text" placeholder="Coupon Code" v-model="couponCode" />
              <button
                class="cart_screen_summary_coupon_button"
                @click.prevent="setCoupon(couponCode)"
              >
                Try
              </button>
              <p>
                {{
                  (coupon !== "" && coupon === "2001" && price === pricefirst) ||
                  coupon === ""
                    ? ""
                    : message
                }}
              </p>
            </form>
          </div>
      <checked-out v-if="showCheckedOut"></checked-out>
    </div>
  </div>
</template>

<script lang="ts">
import { useGtm } from "@gtm-support/vue-gtm";
import { computed } from "vue";
import { useStore } from "vuex";
import CartItem from "../components/CartItem.vue";
import CheckedOut from "./checkedOut.vue";

export default {
  name: "cart",
  components: { CheckedOut, CartItem },
  data() {
    return {
      isActive: false,
      closed: false,
      couponCode: "",
      couponPrice: 0,
      couponConfig: null,
    };
  },
  mounted() {
    console.log("couponConfigs", this.couponConfigs);
    this.$gtm.trackView("MyScreenName", "currentPath");
  },
  setup() {
    // const showCheckedOut = ref(false);
    // const router = useRouter();

    // let paypalOrderId: any = undefined;
    const store = useStore();
    const gtm = useGtm();

    const email = computed(() => {
      return store.state.userEmail;
    });

    let shoppingCartItems = store.state.shoppingCart;

    let bumpProduct = {};
    if (shoppingCartItems.length > 0) {
      let cartCategories = shoppingCartItems.map((item: any) => item.category);
      console.log("KKKKKKKKK", cartCategories);
      const count = (cartCategories: any) =>
        cartCategories.reduce((a: any, b: any) => ({ ...a, [b]: (a[b] || 0) + 1 }), {}); // don't forget to initialize the accumulator

      let bumpCategory = Object.keys(count(cartCategories)).reduce((a, b) =>
        count(cartCategories)[a] > count(cartCategories)[b] ? a : b
      );
      let sameTypeProducts = store.state.products.filter(
        (item: any) => item.category == bumpCategory && item.isBump == true
      );
      console.log("sameTypeProducts", sameTypeProducts);

      let restTypeProducts = sameTypeProducts.filter(
        (item: any) => !shoppingCartItems.filter((y: any) => y.uid === item.uid).length
      );
      console.log("restProducts", restTypeProducts);

      if (restTypeProducts.length > 0) {
        bumpProduct =
          restTypeProducts[Math.floor(Math.random() * restTypeProducts.length)];
        console.log("bumpProduct::::::::::", bumpProduct);
      } else {
        for (var i = 0; i < cartCategories.length; i++) {
          if (cartCategories[i] === bumpCategory) {
            cartCategories.splice(i, 1);
            i--;
          }
        }

        let restProducts = store.state.products.filter(
          (item: any) =>
            item.isBump == true &&
            !shoppingCartItems.filter((y: any) => y.uid === item.uid).length
        );

        bumpProduct = restProducts[Math.floor(Math.random() * restProducts.length)];
      }
    }

    const cartItems = computed(() => {
      return store.state.shoppingCart;
    });

    let couponConfigs = store.state.couponConfigs;

    console.log("IIIIIIII", couponConfigs);

    const addItemToStore = product => {
      gtm.trackEvent({
        event: "Adding product to cart!",
        category: "Adding cart",
        action: "Add product to cart",
        label: "My custom component trigger",
        value: product,
        noninteraction: false,
      });
      store.commit("addItem", product);
    };

    // const setupPaypal = () => {

    //   window.paypal
    //       .Buttons({

    //         env: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
    //         createOrder: async (data: any, actions: any, err: any) => {
    //           // do not create order on frontend side: https://medium.com/@savannahar68/pain-with-paypal-payment-gateway-integration-f084eb47f9cd

    //           const res: any = await apiClient.post('/shop/placeOrder', {
    //             email: email.value,
    //             productIds: cartItems.value.map((el: any) => el.uid),
    //           });

    //           paypalOrderId = res.data;

    //           // console.log("order received from backend", res.data)
    //           return res.data;

    //         },
    //         onApprove: async (data: any, actions: any) => {
    //           const res: any = await apiClient.post('/shop/confirmOrder', {
    //             paypalOrderId,
    //           });

    //           store.commit('setLastOrder', res.data.order);
    //           console.log("order im cart nach commiten",res.data.order)
    //           router.push('/checkedOut')
    //         },
    //         onError: (err: any) => {
    //           console.log(err);
    //         },
    //       }).render('#paypal-button-container');

    // }

    // onMounted(() => {
    //   if (!window.paypal) {

    //     console.log("NUXT MODE: ", process.env.NODE_ENV);

    //     const prodPaypal = 'AbFVEOSXmVfeGkdQCgWrOQeAgEkijN51QlUA2_3KEOTdfSUH-716WqY9WxOjYTEKiZHmfidpFxFP0ItG'
    //     const devPaypal = 'AdgjLpPYtXpWjBt6nUutJxZkWi3nMYxrI98k7tii9s6cspDNho1vg2hpnKV3JdDrkrz80J4QkUvPGNBe'

    //     const clientId = process.env.NODE_ENV === 'production' ? prodPaypal : devPaypal;

    //     const paypalScript = document.createElement("script");
    //     paypalScript.src = "https://www.paypal.com/sdk/js?client-id=" + clientId;
    //     paypalScript.async = true;
    //     paypalScript.onload = () => {

    //       setupPaypal();
    //     }
    //     document.head.appendChild(paypalScript);
    //   } else {
    //     setupPaypal();
    //   }
    // })

    return {
      cartItems,
      addItemToStore,
      bumpProduct,
      couponConfigs,
      // email,
      // showCheckedOut,
    };
  },
  methods: {
    track() {
      this.$gtag.pageview(this.$route),
        this.$gtag.event(this.addItemToStore, {
          event_category: "maximus",
          event_label: "leon",
          value: "max",
        });
    },
    onChecked(item: any) {
      this.$gtag.event("login", { method: "Google" }), (this.closed = true);
      let addedBumpProduct = item;
      addedBumpProduct.price = parseFloat(item.bumpPrice);
      addedBumpProduct.oldPrice = item.price;
      this.addItemToStore(addedBumpProduct);

      this.$gtm.trackEvent({
        event: null, // Event type [default = 'interaction'] (Optional)
        category: "Calculator",
        action: "click",
        label: "Home page SIP calculator",
        value: 5000,
        noninteraction: false, // Optional
      });
    },
    setCoupon(code: any) {
      let totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
      let couponConfig = this.couponConfigs.find((item: any) => item.name == code);
      this.couponConfig = couponConfig;
      console.log("couponConfig", couponConfig);
      //product = "ALL"
      if (couponConfig.product == "all") {
        if (couponConfig.type == "percent") {
          this.couponPrice =
            totalPrice -
            this.cartItems.reduce((acc, item) => acc + item.price, 0) *
              (couponConfig.discount / 100);
        }
        if (couponConfig.type == "fixed") {
          console.log("sdafsdfsadf", this.cartItems.length);
          this.couponPrice = totalPrice - couponConfig.discount;
        }
        //product = "EACH"
      } else if (couponConfig.product == "each") {
        if (couponConfig.type == "percent") {
          let discountedPrice = 0;
          this.cartItems.map(
            (item: any) => (discountedPrice += item.price * (couponConfig.discount / 100))
          );
          this.couponPrice = totalPrice - discountedPrice;
        }
        if (couponConfig.type == "fixed") {
          let discountedPrice = 0;
          this.cartItems.map((item: any) =>
            item.price > couponConfig.discount
              ? (discountedPrice += item.price - couponConfig.discount)
              : (discountedPrice += item.price)
          );
          this.couponPrice = discountedPrice;
        }
      } else {
        if (couponConfig.type == "percent") {
          let couponProduct = this.cartItems.find(
            (item: any) => item.name == couponConfig.product
          );
          if (couponProduct) {
            this.couponPrice =
              totalPrice -
              (couponProduct.price - couponProduct.price * (couponConfig.discount / 100));
            console.log("Checking", totalPrice);
            console.log("Checking", couponProduct.price);
            console.log("Checking", couponProduct.price * (couponConfig.discount / 100));
          } else {
            this.couponPrice = 0;
          }
        }
        if (couponConfig.type == "fixed") {
          let couponProduct = this.cartItems.find(
            (item: any) => item.name == couponConfig.product
          );
          if (couponProduct) {
            this.couponPrice = totalPrice - (couponProduct.price - couponConfig.discount);
          } else {
            this.couponPrice = 0;
          }
        }
      }
      console.log("couponPrice", this.couponPrice);
    },
  },
};
</script>

<style scoped>

.cart_checkout_h2 {
  font-size: 16px;
  color: white;
  font-weight: 400;
  margin-right: 4px;
}

.back_nav {
  display: flex;
  color: white;
  text-decoration: none;
}

.back_nav > img {
  width: 15px;
  margin-right: 5px;
  object-fit: contain;
  filter: invert(1);
  transform: rotate(90deg);
  transition: 100ms ease-in-out;
}

.back_nav:hover {
  transform: scale(1.03);
}
.top_nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 6vw;
  margin-bottom: -10px;
  margin-top: 30px;
}


.check-svg {
  width: 20px;
}
.button_3 {
  border-radius: 100px;
  height: 55px;
  max-width: 200px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  background-color: #111111;
  color: white;
  transition: ease-in-out 200ms;
  box-shadow: rgba(170, 170, 170, 0.1) 0px 10px 15px -3px,
    rgba(218, 218, 218, 0.05) 0px 4px 6px -2px;
}
.button_3:hover {
  transform: scale(1.03);
  cursor: pointer;
  font-weight: 700;
}

.fake_button {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 15px 35px 15px 35px;
  border-radius: 100px;
  font-size: 18px;
  border: none;
  transition: ease-in-out 200ms;
  text-decoration: none;
  color: white;
  background-color: rgb(41, 41, 196);
  transition: ease-in-out 200ms;
}

.fake_button:hover {
  transform: scale(1.03);
}

.empty_cart_wrapper {
  width: 100%;
}

#paypal-button-container {
  width: 100%;
}
.cart_screen {
  display: flex;
  margin-top: 60px;
  width: 100vw;
  display: flex;
  background-color: rgb(12, 12, 12);
  min-height: 100vh;
  justify-content: center;
}

.cart_screen_top {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  left: 5vw;
}

.cart_screen_top_2 {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

.cart_screen_top > h1 {
  color: white;
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 500;
  margin-left: 8vw;
  font-family: 'font1';
}
.cart_screen_top > h2 {
  color: white;
}

.cart_screen_top_2 > div > h2 {
  font-size: 20px;
  color: rgb(255, 255, 255);
  margin-bottom: 40px;
  font-weight: 300;
}

.cart_screen_top_2 > h1 {
  color: white;
  font-size: 48px;
  margin-bottom: 10px;
  font-weight: 500;
}
.cart_screen_top_2 > h2 {
  color: white;
}

.cart_screen_top > div > h2 {
  font-size: 18px;
  color: rgb(255, 255, 255);
  margin-bottom: 30px;
  font-weight: 300;
  margin-left: 8vw;
}

.cart_screen_summary {
  display: flex;
  align-items: center;
  width: 40vw;
  justify-content: center;
  margin-bottom: 100px;
}

.cart_screen_summary_text {
  display: flex;
  flex-direction: column;
  margin: 10vh 0 0 0;
  padding: 10% 10% 10% 10%;
  width: 50%;
  text-align: center;
  color: rgb(0, 0, 0);
  border: 1px solid rgb(80, 80, 80);
  align-items: center;
  border-radius: 15px;
  background: linear-gradient(0deg, rgb(155, 155, 155) 5%, rgb(214, 214, 214) 71%);
  box-shadow: rgba(61, 61, 61, 0.25) 0px 3px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.cart_screen_summary_text:hover {
  border: 1px solid rgb(41, 41, 196);
;
}

.cart_screen_summary_coupon {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -100px;
}

.cart_screen_summary_coupon > form > input {
  background-color: transparent;
  border: 1px solid rgb(73, 71, 71);
  height: 40px;
  margin-right: 8px;
  text-align: center;
  color: blanchedalmond;
  width: 250px;
  border-radius: 100px;
}
.cart_screen_summary_coupon > form > input:active {
  color: blanchedalmond;
}
.cart_screen_summary_coupon > form > input:focus {
  outline: solid 1px #e73a39;
}

.cart_screen_summary_coupon > p {
  margin-bottom: 15px;
}

.cart_screen_summary_coupon_button {
  background-color: #2c2c2c;
  border: none;
  color: rgb(131, 131, 131);
  padding: 5px 20px 5px 20px;
  height: 42px;
  transition: ease-in-out 200ms;
  border-radius: 100px;
  margin-top: 20px;
}

.cart_screen_summary_coupon_button:hover {
  background-color: #e73a39;
  color: white;
  cursor: pointer;
}

.cart_screen_summary_info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin-bottom: -10px;
  margin-top: -10px;
}

.cart_screen_summary_info > img {
  width: 15px;
  filter: invert(1);
  margin-right: 15px;
  display: none;
}

.cart_screen_summary_info > h4 {
  font-weight: 300;
  text-align: left;
  letter-spacing: 2px;
  font-size: 18px;
}

.cart_screen_summary_info2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.cart_screen_summary_info2 > h4 {
  text-align: center;
  margin: 5px 0 5px 0;
  font-weight: 500;
}

.cart_screen_summary_info2 > h3 {
  text-align: center;
  margin: 5px 0 5px 0;
  font-size: 15px;
  font-weight: 700;
}

.cart_screen_summary_text > img {
  max-width: 200px;
  margin-top: 20%;
}

.cart_screen_summary_text > h2 {
  margin-bottom: 20px;
  font-size: 32px;
}

.cart_screen_summary_oldprice {
  color: #e73a39;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: 'Open Sans';
}

.cart_screen_summary_standard {
  color: rgb(0, 0, 0);
  text-decoration: line-through;
  margin-bottom: 10px;
  font-size: 12px;
  font-family: 'Open Sans';
}

.cart_screen_summary_price {
  font-size: 22px;
  margin-bottom: 40px;
  margin-top: 10px;
  font-family: 'Open Sans';
}

.cart_screen_summary_price > span {
  font-weight: 700;

}
.cart_screen_summary_oldprice > span {
  font-weight: 700;
}

.cart_screen_right_hidden {
  display: none;
}

.cart_screen_button {
  margin-top: 20px;
}

.hrr {
  width: 89%;
  margin-bottom: 40px;
  border: none;
  background-color: rgb(70, 70, 70);
  height: 1px;
  margin-left: 6vw;
}

.hrrr {
  width: 100%;
  margin-bottom: 10%;
  margin-top: 10%;
  border: none;
  background-color: rgb(61, 61, 61);
  height: 1px;
}

@media screen and (max-width: 1150px) {
  .cart_screen {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .cart_screen_top {
    width: 100%;
    margin: 0;
    margin-top: 30px;
    justify-content: center;
    align-items: center;
    margin-left: 0px;
  }

  .cart_screen_top_2 {
    width: 100%;
    margin: 0;
    margin-top: -50vh;
    justify-content: center;
    align-items: center;
    margin-left: 0px;
  }

  .cart_screen_top > h1 {
    display: none;
  }

  .hrr {
    display: none;
  }

  .cart_checkout_h2 {
    text-align: center;
    display: none;
  }

  .cart_screen_product {
    width: 85%;
    margin-left: 0px;
  }

  .cart_left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .hrr {
    width: 90%;
  }

  .cart_screen_right {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .cart_screen_summary {
    width: 90%;
    max-width: 400px;
    margin: 30px 0 0 0;
  }

  .cart_screen_summary_text {
    width: 90%;
    margin: 0px;
  }

  .cart_screen_summary_text > h2 {
    font-size: 36px;
  }
  .cart_screen_summary_info > h4 {
    font-size: 25px;
    margin: 25px;
  }
  .cart_screen_summary_coupon {
    margin-top: 20px;
  }
  .cart_screen_summary_coupon > form > input {
    width: 400px;
  }
}

@media (max-width: 700px) {
  .cart_screen_product {
    width: 85vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .cart_screen_product > img {
    height: 400px;
    width: 90%;
    object-fit: cover;
  }
  .cart_screen_product_text {
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
  }

  .cart_screen_product_text > p {
    text-align: center;
  }
}

@media screen and (max-width: 500px) {
  .cart_screen_product {
    width: 85vw;
  }

  .cart_screen_summary_info > h4 {
    font-size: 16px;
    margin: 25px;
    text-align: center;
  }
}

.cart_screen_summary_coupon > form > input {
  width: 250px;
}

.moving_font {
  background: linear-gradient(to right, #e73a39 1%, #c7df3f 40%, #e73a39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 3s linear infinite;
  display: inline-block;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}
</style>
