import { useUserStore } from './user';
import { IOrder, IGigServiceOffers } from './types';
import Swal from 'sweetalert2';
import { defineStore } from 'pinia'
import {useNuxtApp} from "#app";


export const useOrderStore = defineStore('order', {
    state: () => ({
        currentOrder: {} as IOrder,
        currentBuyer: {},
        doneLoadingOrders: false,
        doneLoadingOrder: false,
        allOrders: [] as IOrder[],
        activeOrder: undefined as IOrder | undefined,
        modalOpened: false,
        activeOffer: {} as IGigServiceOffers
    }),
    getters: {
        getCurrentOrder(state) {
            return state.currentOrder
        },
        getCurrentBuyer(state) {
            return state.currentBuyer
        },
        getAllOrders(state) {
            return state.allOrders
        },
        checkIfLoadingOrders(state) {
            return state.doneLoadingOrders
        },
        getServiceOfferUid(state) {
            return state.currentOrder.serviceOfferUid;
        },
        getActiveOffer(state) {
            return state.activeOffer
        }
    },
    actions: {
        /**
         * fetch a seller with his gigs and set to active Seller
         * @param slug the seller slug to identify the seller
         */
        async fetchOrders() {
            const { $axios } = useNuxtApp();
            this.doneLoadingOrders = false
            await $axios.post("/marketplace/getOrders").then((res) => {
                this.allOrders = res.data
                this.doneLoadingOrders = true
            }).catch((e) => {
                console.error(e)
            });
        },
        async fetchOrder(id: string) {
            const { $axios } = useNuxtApp();
            this.doneLoadingOrder = false
            const order = await $axios.post("/marketplace/getOrder", {
                orderUid: id
            })

            this.setActiveOrder(order.data);
        },
        toggleOrderModal() {
            this.modalOpened = !this.modalOpened
        },
        setActiveOffer(offer: IGigServiceOffers) {
            this.activeOffer = offer
        },
        async deleteOrder(uid:string) {
            const { $axios } = useNuxtApp();
            await $axios.post("/marketplace/deleteOrder", {orderUid:uid} );
        },
        setActiveOrder(order: IOrder) {
            this.currentOrder = order;
        },
        async updateOrderStatus(orderUid: string, status: string) {
            const { $axios } = useNuxtApp();
            await $axios.post("/marketplace/updateOrderStatus", { orderUid: orderUid, status } );
        },
        setBuyer(buyer:any) {
            this.currentBuyer = buyer;
        },
        /**
         * upsert the seller in the db
         */
        async placeOrder() {
            const { $axios } = useNuxtApp();
            const res = await $axios.post("/marketplace/placeOrder", this.currentOrder)

            return res;
        }
    }
});

