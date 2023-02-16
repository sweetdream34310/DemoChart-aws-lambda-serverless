import { useOrderStore } from './orders';

import { defineStore } from 'pinia'
import {useNuxtApp} from "#app";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        isLoggedIn: undefined as boolean | undefined,
    }),
    getters: {
        getUser(state) {
            return state.user
        },
        isNotLoggedIn(state) {
            return state.isLoggedIn === false;
        }
    },
    actions: {
        /**
         * fetch user (currently no idea why we need this)
         * @returns the user
         */
        async fetchUser() {
            try {
                const {$axios} = useNuxtApp();
                console.log("FETCHING USER")
                const user: any = await $axios.post("/marketplace/getUser");

                this.user = user.data
                this.isLoggedIn = true;
                console.log("FETCH USER CURRENT", this.user);
                return user.data
            } catch (err: any) {
                this.isLoggedIn = false;
                // todo refactor: only set loggedin to false if network error is 401.
            }
        },
        async fetchBuyer(buyerUid:string) {
            const { $axios } = useNuxtApp();
            const orderStore = useOrderStore()
            const buyer: any = await $axios.post("/marketplace/getUser", {buyerUid: buyerUid});
            orderStore.setBuyer(buyer.data)
            return buyer.data
        }
    }

})

