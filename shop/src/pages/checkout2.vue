<template>
  <div class="check_out">
    <div class="check_out_steps">
    <router-link to="/checkout" class="check_out_information"><p> Information</p></router-link>
      <hr />
      <p><span>Payment</span></p>
      <hr />
      <p>Download</p>
    </div>
   <div class="over_paypal_cont">
 <div class="paypal_container_wrapper">
        <router-link class="check_out_description" to="/checkout" style="text-decoration: none;">
     <p>Great, your digital order will be sent to: <br> <br> <span>{{email}}</span> <span class="edit_button">Change</span></p> 
        </router-link>
      <p>Select a payment method:</p>
    <div class="paypal_container" id="paypal-button-container"></div>
    </div>
  </div>
   </div>
   
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import apiClient from "../api/apiClient";
import { store } from "./store";
import { useRouter } from "vue-router";
import CheckedOut from "./checkedOut.vue";

export default {
  name: "cart",
  components: { CheckedOut },
  setup() {
    const showCheckedOut = ref(false);
    const router = useRouter();

    let paypalOrderId: any = undefined;

    const store = useStore();

    const email = computed(() => {
      return store.state.userEmail;
    });

    const fullName = computed(() => {
      return store.state.fullName;
    });

    const cartItems = computed(() => {
      return store.state.shoppingCart;
    });

    const setupPaypal = () => {
      window.paypal
        .Buttons({
          env: process.env.NODE_ENV === "production" ? "production" : "sandbox",
          createOrder: async (data: any, actions: any, err: any) => {
            // do not create order on frontend side: https://medium.com/@savannahar68/pain-with-paypal-payment-gateway-integration-f084eb47f9cd

            const res: any = await apiClient.post("/shop/placeOrder", {
              email: email.value,
              productIds: cartItems.value.map((el: any) => el.uid),
            });

            paypalOrderId = res.data;

            return res.data;
          },
          onApprove: async (data: any, actions: any) => {
            const res: any = await apiClient.post("/shop/confirmOrder", {
              fullName: fullName.value,
              paypalOrderId,
            });

            store.commit("setLastOrder", res.data.order);
            router.push("/checkedOut");
          },
          onError: (err: any) => {
            console.log(err);
          },
        })
        .render("#paypal-button-container");
    };

    onMounted(() => {
      if (!window.paypal) {
        // console.log("NUXT MODE: ", process.env.NODE_ENV);

        const prodPaypal =
          "AbFVEOSXmVfeGkdQCgWrOQeAgEkijN51QlUA2_3KEOTdfSUH-716WqY9WxOjYTEKiZHmfidpFxFP0ItG";
        const devPaypal =
          "AdgjLpPYtXpWjBt6nUutJxZkWi3nMYxrI98k7tii9s6cspDNho1vg2hpnKV3JdDrkrz80J4QkUvPGNBe";

        const clientId =
          process.env.NODE_ENV === "production" ? prodPaypal : devPaypal;

        const paypalScript = document.createElement("script");
        paypalScript.src =
          "https://www.paypal.com/sdk/js?client-id=" + clientId;
        paypalScript.async = true;
        paypalScript.onload = () => {
          setupPaypal();
        };
        document.head.appendChild(paypalScript);
      } else {
        setupPaypal();
      }
    });

    return {
      cartItems,
      email,
      showCheckedOut,
    };
  },
};
</script>

<style scoped>

.edit_button {
  font-size: 9px !important;
  background-color: rgb(41, 41, 196);
  color: white;
  border-radius: 100px;
  padding: 3px 8px;
  font-family: 'Open Sans';
  margin-left: 5px;
}

.over_paypal_cont {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 640px;
  background: linear-gradient(90deg, rgb(235, 235, 235) 5%, rgb(214, 214, 214) 71%);
  border-radius: 15px;
  margin-top: 20px;
  min-height: 500px;
}

.check_out {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  padding-top: 100px;
  min-height: 100vh;
  background: white;

}

.check_out_steps {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  color: rgb(175, 175, 175);
  font-weight: 400;
}

.check_out_description {
  margin: 20px;
  line-height: 150%;

}

.check_out_information {
  text-decoration: none;
  color: rgb(163, 163, 163);
}

.check_out_information > p {
  font-weight: 700;
  color: black;
}

.check_out_steps > p > span {
  font-weight: 700;
  color: rgb(0, 0, 0);
}

.check_out_steps  > span {
  font-weight: 700;
  color: rgb(0, 0, 0);
}

.check_out_steps > hr {
  border: none;
  height: 1px;
  width: 10%;
  background-color: rgb(179, 179, 179);
}

.check_out_form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  margin-top: 40px;
  background-color: #1d1d1d;
  padding: 40px;
  border-radius: 10px;
  color: white;
  font-size: 24px;
  width: 400px;
}

.check_out_form > img {
  width: 60px;
  margin-bottom: 10px;
}

.check_out_input {
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  width: 350px;
  font-size: 12px;
}

.check_out_input > label {
  margin-bottom: 5px;
  margin-top: 20px;
  color: white;
  font-weight: 300;
}

.check_out_input > input {
  background-color: rgba(124, 124, 124, 0.123);
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 2px;
  font-family: "Josefin Sans", "font2", "Helvetica" "sans-serif" inherit;
  color: white;
  padding-left: 12px;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgb(228, 228, 228);
  opacity: 1; /* Firefox */
}

._submit {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 100px;
  border: none;
  transition: ease-in-out 100ms;
  background-color: #414141;
  color: white;
  padding-left: 25px;
  margin-top: 30px;
}

.active {
  background-color: #e73939;
}
.active:hover {
  transform: scale(1.03);
  cursor: pointer;
}

.button_img {
  height: 20px;
  margin: 10px 14px;
  transform: rotateZ(-90deg);
}

.paypal_container {
  margin-top: 40px;
}

.check_out_description {
  margin-top: 30px;
  color: rgb(0, 0, 0);
    margin-bottom: 40px;
    font-size: 16px;
    font-family: 'Open Sans';

}
.check_out_description > p > span {
 font-weight: 700;
 font-size: 18px;
}

.check_out_description > p {
  margin-top: -40px;
}

.paypal_container_wrapper > p {
  margin-bottom: -20px;
  font-size: 14px;
  color: rgb(0, 0, 0);
  font-family: 'Open Sans';
}

.paypal_container_wrapper {
  width: 300px;
  height: 400px;
  border-radius: 12px;
  margin-top: 20px;
}


@media (max-width: 550px) {

  .check_out {
  padding-bottom: 0;
  }
  
.check_out_form {
width: 320px;
}
.check_out_input {
  font-size: 12px;
  margin-right: 12px;
}
.check_out_input > input {
  background-color: rgba(124, 124, 124, 0.123);
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 2px;
  font-family: "Josefin Sans", "font2", "Helvetica" "sans-serif" inherit;
  color: white;
  padding-left: 12px;
}
.check_out_steps {
  width: 85%;
  font-size: 12px;
}

}

@media (max-width: 450px) {

  .check_out {
    padding-bottom: 0;
  }

.check_out_form {
width: 270px;
}
.check_out_input {
  font-size: 12px;
  margin-left: 50px;
}
.check_out_input > input {
  background-color: rgba(124, 124, 124, 0.123);
  width: 85%;
}
.check_out_steps {
  width: 80%;
}
}

@media (max-width: 370px) {

  .check_out {
    padding-bottom: 0;
  }

.check_out_form {
width: 240px;
}
.check_out_input {
  font-size: 12px;
  max-width: 100%;
  margin-left: -25px;
}
.check_out_input > input {
  background-color: rgba(124, 124, 124, 0.123);
  width: 110%;
}
.check_out_steps {
  width: 80%;
}
}

</style>
