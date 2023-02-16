import { useAppStore } from '~/stores/app';
import { useUserStore } from './user';
import { defineStore } from 'pinia'
import {useRoute} from "#imports";
import {CATEGORIES} from "../../lib/types/Categories";
import getPageNameFromUrl from "~/utils/getPageNameFromUrl";

export const useNavigationStore = defineStore('navigationStore', {
    state: () => ({
        isFixedMobile: true,
        isFixedDesktop: true,
        backgroundUrl: '',
        showBackButton: false,
        navigationTitle: '',
        showSearchbar: true,
        topBarHidden: false,
        hideLogoDots: false,
        navigationLoaded: false,
        mode: "" as "explore" | "hide" | "default" | "order" | "back-on-mobile",
        generalNavigationBarHidden: false,

        /**
         * Mobile
         */
        mobileTitle: '',

        /**
         * Bottom navigation bar
         */
        bottomNavigationMode: "" as "shown" | "hidden" | "show-on-scroll",
        // If the navigation is set in "show-on-scroll" mode, this variable toggles the navigation.
        bottomNavigationScrollVisibility: "" as "shown" | "hidden",

        extendedInitial: false,
        bottomOrderPlacementHidden: true,
        showBackdrop: false,
        modalMode: "" as "order" | "login",
        showModalWrapper: false,
        mobileOrderModalLimit: "" as any,
        bottomModalOpened: false as boolean,
        currentModalPage: 1
    }),
    actions: {
        setIsFixed(bool: boolean) {
            this.isFixedMobile = bool;
            this.isFixedDesktop = bool;
        },
        setModalPage(page:number) {
            this.currentModalPage = page
        },
        setIsFixedMobile(bool: boolean) {
            this.isFixedMobile = bool;
        },
        setIsFixedDesktop(bool: boolean) {
            this.isFixedDesktop = bool;
        },
        setMobileOrderModalLimit(element:any) {
            this.mobileOrderModalLimit = element
        },
        setBackgroundUrl(url: string) {
          this.backgroundUrl = url;
        },
        setShowBackButton(bool: boolean) {
          this.showBackButton = bool;
        },
        setNavigationTitle(str: string) {
          this.navigationTitle = str;
        },
        setShowSearchbar(str: boolean) {
            this.showSearchbar = str;
        },
        setHideLogoDots(bool: boolean) {
            this.hideLogoDots = bool;
        },
        toggleBackdrop() {
            document.body.classList.toggle("no-scroll")
            this.showBackdrop = !this.showBackdrop;
        },
        toggleModal() {
            const appStore = useAppStore()

            this.toggleBackdrop()

            if (appStore.getWindowWidth < 640) {
                console.log("TOGGLE MODAL?!?!?")
                this.bottomModalOpened =!this.bottomModalOpened
            } else {
                this.showModalWrapper = !this.showModalWrapper
            }

        },
        toggleOrderModal() {
            this.toggleBackdrop()
            
            this.showModalWrapper = !this.showModalWrapper
        },
        showBottomNavigationBar(mode: "shown" | "hidden" | "show-on-scroll") {
            this.bottomNavigationMode = mode
        },
        setBottomNavigationScrollVisibility(mode: "shown" | "hidden") {
            this.bottomNavigationScrollVisibility = mode;
        },
        setToImageSliderMode() {
            this.isFixedMobile = false;
            this.isFixedDesktop = false;
            this.showBackButton = true;
            this.backgroundUrl = 'url man';
            this.showSearchbar = false;
            this.hideLogoDots = true;
            this.navigationLoaded = true;
        },
        setExploreMode(backgroundUrl:string, navigationTitle: string, extendedInitial = false){
          this.mode = "explore";
          this.isFixedMobile = false;
          this.isFixedDesktop = true;
          this.extendedInitial = extendedInitial;
          this.backgroundUrl = backgroundUrl || '';
          this.showBackButton = true;
          this.bottomNavigationMode = "show-on-scroll";
          this.navigationTitle = navigationTitle || '';
        },
        setGoBackOnMobileMode(mobileNavTitle: string) {
            this.mode = "back-on-mobile";
            this.navigationTitle = mobileNavTitle;
            this.showBackButton = true;
            this.bottomNavigationMode = "shown";
        },
        setHideMode() {
            this.mode = "hide";
            this.topBarHidden = true;
            this.generalNavigationBarHidden = true
            this.bottomOrderPlacementHidden = false; //temp
        },
        setModalMode(mode: "order" | "login") {
            this.modalMode = mode
        },
        setOrderMode() {
            this.mode = "order";
            this.modalMode = "order";
            this.generalNavigationBarHidden = true;
            this.topBarHidden = true;
            this.bottomOrderPlacementHidden = false
        },
        reset() {
            this.mode = "default";
            this.isFixedMobile = true;
            this.isFixedDesktop = true;
            this.topBarHidden = false;
            this.generalNavigationBarHidden = false;
            this.bottomOrderPlacementHidden = true;
            this.extendedInitial = false;
            this.bottomNavigationMode = "show-on-scroll";
            this.bottomNavigationScrollVisibility = "hidden";
            this.backgroundUrl = '';
            this.showBackButton = false;
            this.navigationTitle = '';
            this.showSearchbar = true;
            this.hideLogoDots = false;
        },
        initOnPageLoad() {
            const route = useRoute();

            console.log("INIT ON PAGE LOAD", route.name);
            this.reset()
            switch (route.name) {
                case 'freelancer-slugparent-gig': this.setOrderMode(); break;
                case 'index': {
                    this.setExploreMode(
                        'https://cdn.shopify.com/s/files/1/0246/2259/6168/files/artist-header-lady-skollie_2048x1250.jpg?v=4418695401200863796',
                        'Work with the experts that get you signed.',
                        true
                    )
                } break;
                case 'e-category-category': {
                    const category = getPageNameFromUrl();
                    const activeCategory = CATEGORIES.find(cat => cat.name === category);
                    this.setExploreMode(activeCategory?.image!, activeCategory?.header!);
                } break;
                case 'saved': {
                    this.setGoBackOnMobileMode('Saved gigs')
                } break;
                case 'orders': {
                    this.setGoBackOnMobileMode('Your orders')
                } break;
                default: this.reset(); break;
            }

        }
    },
    getters: {
        getMobileOrderModalLimit: (state) => {
            return state.mobileOrderModalLimit
        }
    }
})

