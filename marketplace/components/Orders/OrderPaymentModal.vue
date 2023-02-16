<template >
    <div class="flex flex-col self-stretch h-auto bg-white pt-3 px-4">
        <div>
            <h4 class="text-2xl min-h-[60px]">
                Submit your order by checking out.
            </h4>
            <hr class="mt-4">
        </div>
        <div class="w-full mt-4">
          <div class="paypal_container" id="paypal-button-container"></div>
        </div>
        <div v-if="!isInModal" class="mt-auto flex justify-between">
            <button @click="() => $emit('cancelPayment')" class="button bg-demo-red text-white font-bold">Cancel</button>
            <button @click="() => placeOrder()" class="button bg-demo-violet text-white font-bold">Order</button>
        </div>
    </div>
</template>
<script lang="ts">

import {defineComponent, onMounted} from "vue";
import {useNuxtApp} from "#app";
import {useOrderStore} from "~/stores/orders";

export default defineComponent({
    emits: ['cancelPayment', 'acceptPayment', 'orderSuccessfullyPlaced'],
    props: {
        isInModal: {
            type: Boolean,
            default: false
        } 
    },
  setup(props, { emit }) {
    let paypalOrderId: any = undefined;
    const { $axios } = useNuxtApp();
    const orderStore = useOrderStore()

    const setupPaypal = () => {
      window.paypal
          .Buttons({
            env: process.env.NODE_ENV === "production" ? "production" : "sandbox",
            createOrder: async (data: any, actions: any, err: any) => {
              // do not create order on frontend side: https://medium.com/@savannahar68/pain-with-paypal-payment-gateway-integration-f084eb47f9cd

              const res = await orderStore.placeOrder()

              console.log("create order paypal res ", res)

              paypalOrderId = res.data;
              return res.data;
            },
            onApprove: async (data: any, actions: any) => {
              const res: any = await $axios.post("/marketplace/confirmOrder", {
                paypalOrderId,
              });

              console.log("res", res);

              emit('orderSuccessfullyPlaced')

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


      function placeOrder() {
        emit('orderSuccessfullyPlaced');
      }

      return {
        placeOrder,
      }
  }
})

</script>
