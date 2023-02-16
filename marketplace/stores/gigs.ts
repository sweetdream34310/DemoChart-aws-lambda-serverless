import { IActiveGig, IGigCategory, IGigReferences, IGigGenres, IGigServiceOffers, IGigFaqs } from './types';
import { checkIfOffersEmpty, checkIfFaqEmpty } from './../utils/validation';
import { defineStore } from 'pinia'
import { useSellerStore } from './seller'
import { useSettingsStore } from './settings'
import Swal from 'sweetalert2';
import _ from 'lodash';
import {useNuxtApp} from "#app";
import {useUserStore} from "~/stores/user";

export const useGigsStore = defineStore('gigs', {
    state: () => ({
        /**
         * Explore gigs
         */
        page: 0,
        gigsPerPage: 20,
        gigs: [] as any[],


        /**
         * Saved gigs
         */
        savedGigs: [],
        savedGigsPerPage: 20,
        savedGigsPage: 0,
        initSavedGigsLoading: true,

        /**
         * Active gig
         */
        activeGig: {} as IActiveGig,
        activeGigCheck: {},
        activeGigCount: 0,
        isActiveGigLoading: false,


        /**
         * Others (not grouped yet)
         */
        uploadAllowed: true,
        stillUploading: false,
        initGigsLoading: true,
        selectedGig: "",
        gigCategoriesTemplate: [{categoryCode: 1}, {categoryCode: 1}] as IGigCategory[],
        gigReferencesTemplate: [{name: "", description: "", img: "", arrayPosition: 0}, {name: "", description: "", img: "", arrayPosition: 1}] as IGigReferences[],
        gigGenresTemplate: [{genreId: undefined}, {genreId: undefined}] as IGigGenres[],
        gigServiceOffersTemplate: [{offerName:'Basic', features: [{name: '', arrayPosition: 0}, {name: '', arrayPosition: 1}, {name: '', arrayPosition: 2}, {name: '', arrayPosition: 3}], arrayPosition: 0}, {offerName:'Premium', features: [{name: '', arrayPosition: 0}, {name: '', arrayPosition: 1}, {name: '', arrayPosition: 2}, {name: '', arrayPosition: 3}], arrayPosition: 1}, {offerName:'Deluxe', features: [{name: '', arrayPosition: 0}, {name: '', arrayPosition: 1}, {name: '', arrayPosition: 2}, {name: '', arrayPosition: 3}], arrayPosition: 2}] as IGigServiceOffers[],
        gigFaqsTemplate: [{ arrayPosition: 0, question: "", answer: "" }, { arrayPosition: 1, question: "", answer: "" }] as IGigFaqs[],

    }),
    getters: {
        getAllGigs: (state) => {
            return state.gigs
        },
        getGigsPerPage: (state) => {
            return state.gigsPerPage
        },
        getPage: (state) => {
            return state.page
        },
        getActiveGig: (state) => {
            return state.activeGig
        },
        getActiveGigCount: (state) => {
            return state.activeGigCount
        },
        getLowestPriceDeliveryTime: (state) => {
            const lowestPrice = state.activeGig?.gigServiceOffers?.reduce(function (prev, curr) {
                return prev.offerPrice! < curr.offerPrice! ? prev : curr;
            }).offerPrice
            const deliveryTime = state.activeGig?.gigServiceOffers?.reduce(function (prev, curr) {
                return prev.offerPrice! < curr.offerPrice! ? prev : curr;
            }).deliveryTime
            return { price: lowestPrice, deliverTime: deliveryTime}
        },
        checkUnsaveChanges: (state) => {
            const checkArr = compareObject(JSON.parse(JSON.stringify(state.activeGig)), JSON.parse(JSON.stringify(state.activeGigCheck)))
            return Object.keys(checkArr).length > 0 ? false : true
        }
    },
    actions: {
        /**
         * fetch all gigs paginated
         * @param page which page from the pagination to fetch
         * @param gigsPerPage how many gigs per page to fetch
         */
        async fetchGigs(loadMore?:boolean) {
            const userStore = useUserStore();
            const { $axios } = useNuxtApp();
            try {
                if (loadMore) {
                    this.gigsPerPage += this.gigsPerPage
                } else {
                    this.initGigsLoading = true;
                }

                console.log("FETCHING GIGS")
                const gigs: any = await $axios.post(userStore.isLoggedIn ? "/marketplace/getGigsAuthorized" : "/marketplace/getGigsPublic", {
                    gigsPerPage: this.gigsPerPage,
                    page: this.page
                });

                this.initGigsLoading = false;
                // console.log("Gigs Res", gigs);
                this.gigs = gigs.data.gigsRes;
                
                this.activeGigCount = gigs.data.gigCount
            } catch(e) {
                console.error(e)
            }
        },

        /**
         * fetch saved gigs paginated
         * @param page which page from the pagination to fetch
         * @param gigsPerPage how many gigs per page to fetch
         */
        async fetchSavedGigs(loadMore?:boolean) {
            const { $axios } = useNuxtApp();
            try {
                if (loadMore) {
                    this.savedGigsPage += 1;
                } else {
                    this.initSavedGigsLoading = true;
                }

                const gigs: any = await $axios.post("/marketplace/getSavedGigs", {
                    gigsPerPage: this.savedGigsPerPage,
                    page: this.savedGigsPage,
                });

                this.initSavedGigsLoading = false;
                this.savedGigs = gigs.data.gigsRes;

                // this.activeGigCount = gigs.data.gigCount
            } catch(e) {
                console.error(e)
            }
        },

        /**
         * If the gig was saved before, it get's unsaved. If the gig was not saved yet, it get's saved.
         * @param gigUid
         */
        async toggleFavorite(gigUid: string) {
            console.log("Toggling fav gigUid", gigUid);
            const { $axios } = useNuxtApp();

            const res: any = await $axios.post("/marketplace/saveGig", {
                gigUid
            });

            console.log("Found gigs", this.gigs, res.data);
            const updatedGigs = this.gigs.filter(el => el.uid === gigUid)
            if (this.activeGig && this.activeGig.uid === gigUid) this.activeGig.savedByUser = !!res.data.added;
            updatedGigs.forEach(el => el.savedByUser = !!res.data.added)
        },

        /**
         * assigns passed data to current active Gig
         * @param gigData the data to be updated
         * TODO: remove this method, is useless (has to be refactored in media & tiptap)
         */
        updateNewGig(gigData:object){
            this.activeGig = Object.assign(this.activeGig, gigData)
        },
        setSelectedGig(uid:string){
            this.selectedGig = uid;
        },
        /**
         * resets activeGig to empty Gig
         * used when creating a new gig
         */
        resetActiveGig(){
            const settingsStore = useSettingsStore();
            const resettedActiveGig:IActiveGig = {
                gigCategories: [...this.gigCategoriesTemplate],
                gigReferences: [...this.gigReferencesTemplate],
                gigGenres: [...this.gigGenresTemplate],
                gigFaqs: [...this.gigFaqsTemplate],
                gigMedias: [],
                gigVideos: [],
                gigServiceOffers: [...this.gigServiceOffersTemplate],
            };
            this.activeGig = resettedActiveGig;
            this.activeGigCheck = JSON.parse(JSON.stringify(resettedActiveGig));
            settingsStore.setActiveGig(resettedActiveGig)
        },
        /**
         * uploads current active Gig to database
         */
        async uploadGig(published?:boolean, message?:string){
            const settingsStore = useSettingsStore();
            const { $axios } = useNuxtApp();
            
            const incompleteTabs = settingsStore.checkNotDoneTabs().map(tab => {
                return tab.id
            })
            if (this.activeGig.name === undefined || this.activeGig.name === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    html: message ? message : `The gig can only be saved, when a name is defined`
                })
                this.uploadAllowed = false
            } else if (incompleteTabs.length != 0) {
                this.activeGig.completed = false
                this.uploadAllowed = true;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    html: message ? message : `Tabs <b>${incompleteTabs.join(", ")}</b> are not completed. <br/>Your gig will be saved, but can only be published when all tabs are completed`
                })
            } else {
                this.activeGig.completed = true;
                this.uploadAllowed = true;
                this.activeGigCheck = JSON.parse(JSON.stringify(this.activeGig))
                firePopup({
                    position: 'center',
                    toast: true, 
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    html: message ? message : `Gig <b>${this.activeGig.name}</b> successfully uploaded${published ? ' & published' : ''}`
                })
            }

            if (this.uploadAllowed && !this.stillUploading) {
                this.stillUploading = true
                return await $axios.post("/marketplace/upsertGig", this.activeGig).then((res) => {
                    this.stillUploading = false
                    return res.data[0].slug
                })
            }
        },
        /**
         *
         * @param gigName the name of the gig to fetch
         * @param sellerId optional Seller Id, if not passed, current Seller will be used
         */
        async fetchGig(slug:string, sellerId?:string) {
            try {
                const { $axios } = useNuxtApp();
                
                const settingsStore = useSettingsStore();
                const sellerStore = useSellerStore();

                this.isActiveGigLoading = true;

                const activeSeller = sellerStore.getSeller
                const gig: any = await $axios.post("/marketplace/getGig", {
                    sellerUid: sellerId || activeSeller?.uid,
                    slug: slug
                });
                settingsStore.setActiveGig(gig.data);

                this.isActiveGigLoading = false;

                this.activeGig = gig.data
                this.activeGigCheck = JSON.parse(JSON.stringify(gig.data))
            } catch(e) {
                console.error(e)
            }
        }
    }
})

function compareObject(obj1:object, obj2:object) {
    return _.fromPairs(_.differenceWith(_.toPairs(obj1), _.toPairs(obj2), _.isEqual))
}