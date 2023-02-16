<template>
    <div class="sticky top-40">
        <div class="bg-white relative px-4 pb-8 md:px-8 pt-24 mt-16 md:mt-0 md:pt-16 rounded-3xl ">
            <side-menu-header
                :user="user"
                :seller="seller || {}"
            >
              <side-menu-header-country
                  v-if="headerInformation === 'country' && isLoggedIn"
                  :user="user"
                  :seller="seller"
              ></side-menu-header-country>

              <side-menu-header-review
                  v-if="headerInformation === 'ratings' && seller"
              >
              </side-menu-header-review>
            </side-menu-header>

          <slot></slot>
        </div>
    </div>
</template>
<script>
import { useSellerStore } from '~~/stores/seller'
import { useSettingsStore } from '~~/stores/settings'
import StarIcon from '../../Icons/StarIcon.vue'
import { useUserStore } from '~~/stores/user'
export default {
  name: "SideMenuWrapper",
  components: {StarIcon },
  props: {
    seller: {
      type: Object,
      required: false
    },
    headerInformation: {
      type: String,
      default: "country",
      validator(value) {
        return ["country", "ratings"].includes(value);
      }
    },
    showNavigationBelow: {
      tpye: Boolean,
      default: false
    }
  },
    setup() {
        const sellerStore = useSellerStore();
        const settingsStore = useSettingsStore();
        const userStore = useUserStore()

        const activeTab = computed(() => {
            return settingsStore.getActiveTab;
        });

        let seller = computed(() => {
            return sellerStore.getSeller;
        });

        let user = computed(() => {
            return userStore.getUser;
        });


        const isLoggedIn = computed(() => {
          return userStore.isLoggedIn
        })

        return { seller, user, activeTab, isLoggedIn };
    },
}
</script>