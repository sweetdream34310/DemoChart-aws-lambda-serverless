<template>
  <div class="header">
    <div class="header_desktop">
    <div class="header_left">
      <router-link class="header_img" to="/"><img src="/img/Democharts_Logo_White.png" alt="Democharts Logo" /></router-link>
    </div>
    <div class="header_right">
      <nav>
           <a class="header_right_font" href="https://www.democharts.org" target="_blank"> <p>Scouting Platform</p> </a>
         <router-link to="/" class="header_right_font_2" href="https://academy.democharts.org"> <p>Music Academy</p> </router-link>
       <a href="https://shop.democharts.org" class="header_right_font"><p>Sample Packs</p> </a>
 <a href="https://shop.democharts.org" class="header_right_font"> <img class="cart_bag" src="/img/bag.svg" alt="Cart"></a>
      <p class="shopping_cart_length"></p> 
      </nav>
    </div>
    </div>
      <div :class="!isActive? 'header_mobile' : 'header_mobile_menu'">
    <div class="header_left">
      <router-link class="header_img_mobile" to="/"><img src="/img/Democharts_Logo_2020_3.png" alt="Democharts Logo" /></router-link>
    </div>
   
    <div class="header_middle" @click="isActive = !isActive" v-if="!isActive">
      <img class="icon_middle" src="/img/menu-button.svg"  alt="menu icon"/>
      <div>
      </div>
    </div>
      <div @click="isActive = false" class="header_middle" v-if="isActive">
          <img class="close_icon" src="/img/close-button.svg" alt="close" />
          </div>
    </div>
      <transition name="route" mode="out-in">
    <div v-if="isActive" class="header_mobile_popup">
              <router-link class="header_right_font" to="/"  @click="isActive = !isActive"> <p>Music Academy</p> </router-link>
                 <a class="header_right_font" href="https://shop.democharts.org"> <p>Sample Packs</p> </a>
       <a class="header_right_font" href="https://www.democharts.org" target="_blank"> <p>Scouting Platform</p> </a>
    </div>
      </transition>
  </div>
</template>


<script>
import {ref} from "vue";

export default {
  name: "navigation",
  setup() {

    const isActive = ref(false);


  return{
    isActive
  }
  }
}
</script>

<style scoped>

.header_desktop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  height: 9vh;
  top: 0;
  z-index: 1000;
  background-color: rgb(0, 0, 0);
  border-bottom: solid 1px rgb(39, 39, 39);
  width: 100vw;
  font-family: 'Josefin Sans', 'font2', 'sans-serif';
}

.header_mobile_popup {
  display: none;
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
}

.header_right_font_2 {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--democharts);
  margin: 0 20px 0 20px;
  min-width: 41px;
}

.header_right_font {
  font-size: 16px;
}


.header_right_font.router-link-active {
  color: #E73939;
}

.header_right_font:hover {
  transform: scale(1.03);
}

.header_right_font_2:hover {
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
  height: 9vh;
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
  height: 9vh;
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
  padding-top: 9vh;
  width: 100%;
  height: 100%;
  z-index: 2000;
  transition: ease-in-out 100ms;
  animation: Pedro 300ms;
  font-family: 'Josefin Sans';
}

.header_mobile_popup > hr {
  border: none;
  height: 1px;
  background-color: rgb(102, 102, 102);
  width: 80%;
  margin: 10vh 0 10vh 0;
}

.header_right_font {
  font-size: 28px;
  max-width: 90%;
  margin-top: 10vh;
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
  margin-right: 20px;
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
margin-right: 20px;
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