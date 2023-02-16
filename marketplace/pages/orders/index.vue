<template>
  <div class="grid p-4 grid-cols-5 gap-16 min-h-screen">
    <div class="col-span-5 mt-12 md:mt-0 md:col-span-2 xl:col-span-1">
      <SideMenuOrder></SideMenuOrder>
    </div>
    <div v-if="ordersArr.length > 0" class="col-span-5 pt-14 md:col-span-3 xl:col-span-4">
      <div class="flex justify-between bg-white rounded-xl py-6 px-12">
        Active Orders
        <select name="test" id=""></select>
      </div>
      <div class="mt-8 flex flex-wrap gap-4">
        <Order
            v-for="order in ordersArr"
            :key="order"
            :order="order"
            @deleteOrder="deleteOrderFromOrders" />

        <pre>{{ ordersArr}}</pre>
      </div>
    </div>
    <LoadingSpinnerIcon :class="'text-demo-red pt-14 col-span-5 md:col-span-3 xl:col-span-4 w-80 mx-auto'"  v-if="!isLoading" />
    <div class="pt-14 col-span-3" v-if="isLoading && ordersArr.length === 0">
      <h4 class="text-2xl">
        You have no Orders
      </h4>
    </div>
  </div>
</template>
<script lang="ts">
import SelectInput from '~/components/Inputs/SelectInput.vue';
import ClockIcon from '~/components/Icons/ClockIcon.vue'
import Order from '~/components/Orders/OrderCard.vue'
import { useOrderStore } from '~/stores/orders';
import { useSellerStore } from '~/stores/seller';
import { useUserStore } from '~/stores/user';
import LoadingSpinnerIcon from '~/components/Icons/LoadingSpinnerIcon.vue';
import {computed, onBeforeMount, onMounted, ref, watchEffect} from "vue";
import {useNavigationStore} from "~/stores/navigation";
export default {
  components: { SelectInput, ClockIcon, Order, LoadingSpinnerIcon },
  setup() {
    const orderStore = useOrderStore();
    const sellerStore = useSellerStore();
    const userStore = useUserStore()

    const seller = computed(() => {
      return sellerStore.getSeller;
    })

    const user = computed(() => {
      return userStore.getUser;
    })

    const isLoading = computed(() => {
      return orderStore.checkIfLoadingOrders;
    })


    const navigationStore = useNavigationStore();
    onBeforeMount(() => {
      navigationStore.initOnPageLoad();
    })

    onMounted(() => {
      orderStore.fetchOrders()
    })

    const orders = computed(() => {
      return orderStore.getAllOrders;
    })

    const ordersArr = ref(orders.value)

    watchEffect(() => ordersArr.value = orders.value);

    const deleteOrderFromOrders = (uid: string) => {
      ordersArr.value = ordersArr.value.filter((obj) => {
        return obj.uid != uid
      })
    }

    return { ordersArr,orders, deleteOrderFromOrders, isLoading }
  }
}
</script>