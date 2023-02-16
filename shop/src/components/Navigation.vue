<template>
  <div class="header">
    <div class="header_desktop">
      <div class="header_left">
        <router-link class="header_img" to="/"
          ><img src="/Democharts_Logo_White.png" alt="Democharts Logo"
        /></router-link>
      </div>
      <div class="header_right">
        <nav>
          <!-- <router-link class="header_right_font" to="/" style="text-decoration: none">
            <p>All Genres</p>
          </router-link> -->
          <router-link
            class="header_right_font"
            to="/mission"
            style="text-decoration: none"
          >
            <p>How To Use</p>
          </router-link>
          <router-link class="header_right_font" to="/packs" style="text-decoration: none; margin-right: 30px">
            <p>Pro Packs</p>
          </router-link>

          <!--     <a class="header_right_font" href="https://academy.democharts.org"> <p>Pop & Radio</p> </a>  -->
          <router-link
            class="header_right_top_button"
            to="/free"
            style="text-decoration: none"
          >
            <p>Try for free</p>
          </router-link>

          <router-link class="header_right_font" to="/cart">
            <img class="cart_bag" src="/bag.svg" alt="Shopping Cart" />
            <p class="shopping_cart_length">({{ shippingCartLength }})</p>
          </router-link>
        </nav>
      </div>
    </div>

    <div :class="!isActive ? 'header_mobile' : 'header_mobile_menu'">
      <div class="header_left">
        <router-link class="header_img_mobile" to="/"
          ><img src="/Democharts_Logo_2020_3.png" alt="Democharts Logo"
        /></router-link>
      </div>

      <div class="header_middle" @click="isActive = !isActive" v-if="!isActive">
        <img class="icon_middle" src="/menu-button.svg" alt="menu icon" />
        <div></div>
      </div>
      <div @click="isActive = false" class="header_middle" v-if="isActive">
        <img class="close_icon" src="/close-button.svg" alt="close" />
      </div>
      <div class="header_right_mobile">
        <router-link
          to="/cart"
          class="header_right_icons"
          @click="isActive = false"
          style="text-decoration: none; color: inherit"
        >
          <img class="cart_bag" src="/bag.svg" alt="menu icon" />
          <p>({{ shippingCartLength }})</p>
        </router-link>
      </div>
    </div>
    <transition name="route" mode="out-in">
      <div v-if="isActive" class="header_mobile_popup">
        <router-link class="header_right_font" to="/packs" @click="isActive = !isActive">
          <p>Latest Drops</p>
        </router-link>
        <router-link class="header_right_font" to="/mission" @click="isActive = !isActive">
          <p>How to use</p>
        </router-link>
        <router-link class="header_right_font" to="/" @click="isActive = !isActive">
          <p>Home</p>
        </router-link>
        <router-link class="header_right_font" to="/cart" @click="isActive = !isActive">
          <p>My Cart</p>
        </router-link>
        <hr />
        <div class="header_special_bar">
          <router-link to="/free" id="free_pack" @click="isActive = !isActive">
            <p>Free Pack</p>
          </router-link>
          <a href="https://www.tiktok.com/@democharts" id="linker">
            <img class="header_special_barrius" src="/tik.svg" alt="tiktok"
          /></a>
          <a href="https://www.instagram.com/democharts" id="linker">
            <img id="tick_2" class="header_special_barrius" src="/insta.svg" alt="" />
          </a>
        </div>
        <hr />

        <img class="dc_logo" src="/Democharts_Logo_White.png" alt="" />
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "navigation",
  setup() {
    const store = useStore();

    const isActive = ref(false);

    const shippingCartLength = computed(() => {
      return store.state.shoppingCart.length;
    });

    return {
      shippingCartLength,
      isActive,
    };
  },
};
</script>

<style scoped>
.dc_logo {
  width: 200px !important;
}

.header_special_bar {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
}

.header_special_barrius {
  width: 30px;
  filter: invert(1);
}

.shopping_cart_length {
  font-family: 'Open Sans';
}

#scouter {
  margin-top: 20px;
}

#tick_2 {
  margin-right: 30px;
}

#free_pack {
  padding: 5px 50px 5px 50px;
  margin-left: 30px;
  text-decoration: none;
  color: white;
  background-color: #e73939;
  border-radius: 100px;
}

.header_desktop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  height: 60px;
  top: 0;
  z-index: 1000;
  background-color: black;
  border-bottom: solid 1px rgb(39, 39, 39);
  width: 100vw;
}

.header_mobile_popup {
  display: none;
}

.header_right_top_button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  color: rgb(255, 255, 255);
  background-color: #e73939;
  font-weight: 700;
  transition: ease-in-out 100ms;
  max-height: 30px;
  padding: 2px 22px 2px 22px;
  font-size: 13px;

}

.header_right_top_button:hover {
  transform: scale(1.03);
  cursor: pointer;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}

.header_mobile {
  display: none;
}

.header_mobile_menu {
  display: none;
}

.header_img > img {
  width: 280px;
  margin: 5px 0 0 3vw;
}

.header_right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header_right > nav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3vw 0 0;
}

.header_right_font {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  margin: 0 20px 0 20px;
  min-width: 41px;
  font-family: 'font1', 'Josefin Sans';
}

.header_right_font {
  font-size: 12px;
}

.header_right_font.router-link-active {
  color: #e73939;
  margin-top: 2px;
}

.header_right_font:hover {
  transform: scale(1.03);
}

.shopping_cart_length {
  font-size: 12px;
  margin-top: -4px;
}

.cart_bag {
  height: 25px;
  filter: invert(1);
  position: relative;
  margin-left: -8px;
  margin-top: -2px;
}

@media (max-width: 950px) {
  .header_desktop {
    display: none;
  }
  .header_mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    top: 0;
    z-index: 1000;
    background-color: rgb(0, 0, 0);
    border-bottom: solid 1px rgb(39, 39, 39);
    width: 100%;
  }

  .header_mobile_menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    top: 0;
    z-index: 1000;
    background-color: rgb(0, 0, 0);
    width: 100%;
  }

  .header_mobile_popup {
    background-color: black;
    position: fixed;
    display: flex;
    align-items: center;
    flex-direction: column;
    top: 0;
    margin-top: 50px;
    padding-top: 70px;
    width: 100%;
    min-height: 100%;
    z-index: 2000;
    transition: ease-in-out 100ms;
    animation: Pedro 300ms;
  }

  .header_mobile_popup > hr {
    border: none;
    height: 1px;
    background-color: rgb(102, 102, 102);
    width: 80%;
    margin: 5vh 0 5vh 0;
  }

  .header_right_font {
    font-size: 24px;
    max-width: 90%;
  }

  .header_img_mobile > img {
    height: 45px;
    margin: 0 0 0 30px;
  }

  .header_img_mobile > img:hover {
    cursor: pointer;
    transform: scale(1.03);
  }

  .icon_middle {
    height: 30px;
    filter: invert(1);
    transition: ease-in-out 100ms;
    animation: Pedro 300ms;
  }

  .icon_middle:hover {
    cursor: pointer;
    transform: scale(1.03);
  }

  .header_right_mobile {
    display: flex;
    align-items: center;
  }

  .header_right_icons > img {
    height: 30px;
    filter: invert(1);
    position: relative;
  }

  .header_right_icons > img:hover {
    cursor: pointer;
    transform: scale(1.03);
  }

  .header_right_icons > p {
    font-size: 12px;
    margin-top: -3px;
    color: white;
    margin-left: -2px;
  }

  .header_right_icons {
    margin-right: 20px;
    display: flex;
    height: 100%;
  }

  .close_icon {
    height: 25px;
    filter: invert(1);
    position: relative;
    transition: ease-in-out 100ms;
    animation: Pedro 300ms;
  }

  .cart_bag {
    margin-top: -4px;
  }

  @keyframes Pedro {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .route-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .route-leave-active {
    transition: all 0.2s ease-in;
  }

  .route-enter-to,
  .route-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .close_icon:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
}
</style>
