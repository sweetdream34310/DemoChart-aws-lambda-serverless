import { useUserStore } from "./user";
import {  defineStore } from "pinia";
import { useSettingsStore } from "./settings";

export const useSellerStore = defineStore("seller", {
  state: () => ({
    sellerBoilerPlate: {
      user: {
        firstName: "",
        countryId: 0,
        jobTitle: "",
        name: "",
      },
      profileImageSrc: "",
      aboutMe: "",
      customLabel: "",
      customValue: "",
    },
    activeSeller: {},
    gigSeller: {},
  }),
  getters: {
    getSeller(state) {
      return state.activeSeller;
    },
    getGigSeller(state) {
      return state.gigSeller;
    },
  },
  actions: {
    /**
     * fetch a seller with his gigs and set to active Seller
     * @param slug the seller slug to identify the seller
     */
    async fetchSeller(userUid?: string) {
      try {
        const userStore = useUserStore();
        let user = userStore.getUser;

        const router = useRouter();
        const settingsStore = useSettingsStore();
        const { $axios } = useNuxtApp();
        
        if (!!user.reseller) {
            var seller: any = await $axios.post("/marketplace/getSeller", {
              userUid: user.uid,
            });
            this.activeSeller = seller.data;
        } else {
            this.activeSeller = false
        }
      } catch (e) {
        console.error(e);
      }
    },
    async fetchSellers(userUid: string) {
      const { $axios } = useNuxtApp();

      var seller: any = await $axios.post("/marketplace/getSellers", {userUid: userUid });
      console.log("seller   ", seller.data);
    },
    /**
     * set gig seller
     * TODO: remove as there is the seller in the gig
     * @param seller the seller to set
     */
    setGigSeller(seller: string) {
      this.gigSeller = seller;
    },
    /**
     * upsert the seller in the db
     */
    async uploadSeller() {
      const { $axios } = useNuxtApp();
      const res: any = await $axios.post(
        "/marketplace/upsertSeller",
        this.activeSeller
      );
      firePopup({
        position: "center",
        toast: true,
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        html: `Gig <b>${this.activeSeller}</b> successfully uploaded`,
      });
    },

    /**
     * Apply as a seller
     */
    async applyAsSeller(applicationObj: any) {
      const { $axios } = useNuxtApp();
      const res: any = await $axios.post("/marketplace/applySeller", applicationObj);

      firePopup({
        position: "center",
        toast: true,
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        html: `Application <b>${this.activeSeller}</b> successfully submitted. We will reach out to you in 1-2 weeks.`,
      });
    }
  },
});
