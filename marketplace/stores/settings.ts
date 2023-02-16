
import { defineStore } from 'pinia'
import { useSellerStore } from './seller'
import { IActiveGig } from './types'
import { useUserStore } from './user'

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    settings: {
      gigSettingsTabs: [
        { name: "Overview", done: false, slug: "overview" },
        { name: "References", done: false, slug: "references" },
        { name: "Description", done: false, slug: "description" },
        { name: "Media", done: false, slug: "media" },
        { name: "Offers & Features", done: false, slug: "offers" },
        { name: "FAQ", done: false, slug: "faq" },
        { name: "Extra", done: false, slug: "extras" },
        { name: "Publish", done: false, slug: "publish" },
      ],
      activeTab: 1,
      activeGig: {} as IActiveGig,
      activeGigSetting: "overview",
      activeCategory: 0,
      activeSubCategory: 0
    },
  }),
  getters: {
    getSettingsTabs(state) {
      return state.settings.gigSettingsTabs;
    },
    getActiveTab(state) {
      return state.settings.activeTab;
    },
    getActiveGigSetting(state) {
      return state.settings.activeGigSetting;
    },
    getActiveCategory(state) {
      return state.settings.activeCategory;
    },
    isOverviewDone(state) {
      const activeGig = state.settings.activeGig;
      return (
        activeGig.gigCategories &&
        activeGig.name != "" &&
        activeGig.gigCategories[0].categoryCode != null &&
        activeGig.gigCategories[1].categoryCode != null &&
        activeGig.gigGenres[0].genreId != undefined &&
        activeGig.gigGenres[1].genreId != undefined &&
        activeGig.experienceYears != undefined
      );
    },
    isReferencesDone(state) {
      const activeGig = state.settings.activeGig;
      return (
        activeGig.gigReferences &&
        activeGig.gigReferences?.[0].name != "" &&
        activeGig.gigReferences?.[0].description != "" &&
        activeGig.gigReferences?.[0].img != "" &&
        activeGig.gigReferences?.[1].name != "" &&
        activeGig.gigReferences?.[1].description != "" &&
        activeGig.gigReferences?.[1].img != ""
      );
    },
    isDescriptionDone(state) {
      const activeGig = state.settings.activeGig;
      return (
        activeGig.description &&
        activeGig.description != null &&
        activeGig.description != "" &&
        activeGig.description !=
          "<p>Describe your <span>Service</span> here</p>" &&
        activeGig.description != "<p></p>"
      );
    },
    isMediaDone(state) {
      const activeGig = state.settings.activeGig;
      return activeGig.gigMedias && activeGig.gigMedias?.length >= 2;
    },
    isOffersDone(state) {
      const activeGig = state.settings.activeGig;
      return (
        activeGig.gigServiceOffers &&
        checkIfOffersEmpty(activeGig.gigServiceOffers)
      );
    },
    isFaqsDone(state) {
      const activeGig = state.settings.activeGig;
      return (
        activeGig.gigFaqs &&
        activeGig.gigFaqs?.length >= 2 &&
        checkIfFaqEmpty(activeGig.gigFaqs)
      );
    }, 
    isExtrasDone(state) {
      const activeGig = state.settings.activeGig;
      return (
        activeGig.welcomeMessage &&
        activeGig.welcomeMessage != null &&
        activeGig.welcomeMessage != ""
      );
    },
    isTabDone(state) {
      return (tabName: string) => {
        switch (tabName) {
          case "Overview":
            return this.isOverviewDone;
            break;
          case "References":
            return this.isReferencesDone;
            break;
          case "Description":
            return this.isDescriptionDone;
            break;
          case "Media":
            return this.isMediaDone;
            break;
          case "Offers & Features":
            return this.isOffersDone;
            break;
          case "FAQ":
            return this.isFaqsDone;
            break;
          case "Extra":
            return this.isExtrasDone;
            break;
          default:
            return false;
            break;
        }
      };
    },
    checkNotDoneTabs(state) {
      return () => {
        const allTabs = [
          { id: "Overview", done: this.isOverviewDone },
          { id: "References", done: this.isReferencesDone },
          { id: "Description", done: this.isDescriptionDone },
          { id: "Media", done: this.isMediaDone },
          { id: "Offers", done: this.isOffersDone },
          { id: "Faq", done: this.isFaqsDone },
          { id: "Extras", done: this.isExtrasDone },
        ];

        return allTabs.filter((tabDone) => {
          return !tabDone.done;
        });
      };
    },
  },
  actions: {
    /**
     * set settings view (Personal Settings, Your Gigs & Gig Settings)
     * @param tab the tab to set active
     */
    setActiveTab(tab: number) {
      this.settings.activeTab = tab;
    },
    /**
     * set the tab to done if all required fields are filled out
     * @param index the index of the tab
     * @param status true | false depends
     */
    setTabStatus(index: number, status: boolean) {
      this.settings.gigSettingsTabs[index].done = status;
    },
    /**
     * set the gig settings tab you want to see
     * Example: Overview, FAQs, Description etc
     * @param tab the gig settings tab to set active
     */
    setActiveGigSetting(tab: string) {
      this.settings.activeGigSetting = tab;
    },
    setActiveGig(gig: IActiveGig) {
      this.settings.activeGig = gig;
    },
    setActiveCategory(cat: number) {
      this.settings.activeCategory = cat;
    },
    setActiveSubCategory(cat: number) {
      this.settings.activeSubCategory = cat;
    },
    async uploadSettings() {
      const sellerStore = useSellerStore();
      const userStore = useUserStore();
      
      const { $axios } = useNuxtApp();
      const { firstName, lastName, jobTitle, countryID } = userStore.user

      const payLoad = {
        seller: sellerStore.activeSeller,
        user: {
            firstName,
            lastName,
            jobTitle,
            countryID,
        }
      };

      const res: any = await $axios.post(
        "/marketplace/upsertSeller",
        payLoad
      );
      if (res.status === 200) {
        firePopup({
            position: "center",
            toast: true,
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            html: `Your Settings have been updated successfully`,
          });
      }
    },
  },
});

