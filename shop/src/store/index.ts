import { createStore } from "vuex";
import apiClient from "../api/apiClient";

interface Product {
  name: string;
  price: number;
}

interface Coupon {
  name: string;
  discount: string;
  type: string;
  product: string;
}

export const store = createStore({
  state() {
    return {
      userEmail: undefined,
      fullName: "",
      products: [],
      shoppingCart: [],
      lastOrder: {},
      couponConfigs: []
      // bumpCategory: "",
      // bumpProduct: {}
    };
  },
  mutations: {
    addItem(state: any, item) {
      state.shoppingCart.push(item);
    },
    setUserEmail(state: any, email) {
      state.userEmail = email;
      localStorage.setItem("email", email);
    },
    setFullName(state: any, name) {
      state.fullName = name;
      localStorage.setItem("name", name);
    },

    removeItem(state: any, item) {
      const i = state.shoppingCart.findIndex((el: any) => el.uid === item.uid);
      if (i >= 0) {
        state.shoppingCart.splice(i, 1);
      }
    },
    setLastOrder(state: any, item) {
      state.lastOrder = item;
    },
  },
  actions: {
    async fetchProducts({ state }: { state: any }) {
      const { data } = await apiClient.get("/shop/getProducts");


      const products: Product[] = data.map((el: any) => {
        return {
          ...el,
        };
      });

      state.products = products;
    },

    async fetchCoupons({ state }: { state: any }) {
      const { data } = await apiClient.get("/shop/getCouponConfigs");

      const coupons: Coupon[] = data.map((el: any) => {
        return {
          ...el,
        };
      });


      state.couponConfigs = coupons;
    },
  },
});
