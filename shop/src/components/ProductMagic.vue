<template>
<div class="product_background">
  <div class="product" >
    <div :class="dataToggle ? 'product_wrapper_alt' : 'product_wrapper'" :style="dataToggle ? ' background-image: url(../public/Blurred_BG.jpg);' : ''">
     <div class="top_bars">
       <div class="top_bar"> </div>
       <div class="prog_bar"> </div>
      <div class="sold_text"> <p>Sold: 345/499</p> </div>
      </div>
   
        <div class="product_left">
          <div class="product_left_wrapper">
          <h2>Abstract Samplepack</h2>
          <hr />
          <div class="product_card_tags">
            <div class="product_tag">  <p>Guitars</p> </div>
             <div class="product_tag">  <p>Bass</p> </div>
              <div class="product_tag">  <p>Layered</p> </div>
               <div class="product_tag">  <p>141 Premium Loops</p> </div>
                <div class="product_tag">  <p>Latin</p> </div>
            <div class="product_tag">  <p>Drums</p> </div>
          </div>
          <h5>
            Available for Democharts Members only, available for a limited time. Buy today to get your exclusive discount.
          </h5>
          <div class="product_prices">
            <hr /> 
            <p>$24.99</p>
               <h6>$94.99</h6>
               <hr />
          </div>
          <div class="product_buttons">
            <button class="button_1">Add To Cart</button>
            <button @click="dataToggler" class="button_2" v-if="!dataToggle">More Info</button>
            <button @click="dataToggler" class="button_2" v-else="dataToggle">Less Info</button>
          </div>
          </div>
        </div>


        <div class="product_right">
                   <transition name="box" mode="out-in" > 
           <div v-if="!dataToggle" class="product_right_uno">
           <div class="product_right_img">
              <img src="../img/test_1.png" alt="">    
           </div>
          </div>
             <div v-else="dataToggle" class="product_right_dos">
               <div class="product_right_dos_wrapper">
              <audio-player></audio-player>
              <h6>Song Produced by @Edhardboys</h6>
              <p>
                „Especcially Crafted for your Artists who want to make more
        of their sound than just average. Recorded in the Bedroom 
        for the extra feels from a Pro. With this Sample Pack you can 
        Spice up your sounds drastically.“
              </p>
           </div>
           <div class="product_right_bottom">
               <transition name="pico" mode="out-in" > 
              <img src="../img/test_1.png" alt="">
               </transition>
              <div class="product_right_bottom_container">
              <div class="product_right_bottom_box">  <img src="../img/check.svg" alt=""> <p>Instant Download</p> </div>
               <div class="product_right_bottom_box">  <img src="../img/check.svg" alt=""> <p>405 Wav Files</p> </div>
                <div class="product_right_bottom_box">  <img src="../img/check.svg" alt=""> <p>100% Royalty Free for Artists</p> </div>
             <div class="product_right_bottom_box">  <img src="../img/check.svg" alt=""> <p>Limited to 499 Downloads</p> </div>
            </div>
           </div>
          </div>
                </transition>
                           </div>

    </div>
  </div>
  </div>
</template>

<script>
import AudioPlayer from './AudioPlayer.vue'
import {ref} from "vue";
export default {
  name: 'ProductMagic',
  components: {AudioPlayer},
  setup() {
    const dataToggle = ref(false);

    const dataToggler = () => {
      dataToggle.value = !dataToggle.value;
    }

    return {
      dataToggle,
      dataToggler
    }
  },
}

</script>

<style scoped>

button {
    font-family: 'Josefin Sans', Helvetica, Arial, sans-serif;

}

.product_background {
  width: 100%;
  display: flex;
  justify-content: center;
}

.product {
  display: flex;
  justify-content: center;
  width: 92vw;
}

.top_bar {
  position: absolute;
  width: 92vw;
  background-color: rgb(66, 66, 66);
  height: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 1;
}

.prog_bar{
  position:absolute;
  width: 70%;
  background-color: #E73A39;
  height: 15px;
  z-index: 2;
  border-top-left-radius: 10px;
}

.sold_text {
  position: absolute;
  width: 92vw;
  text-align: right;
}

.sold_text > p {
  margin: 24px 10px 0 0;
  font-size: 14px;
  color: rgb(214, 214, 214);
}

.product_wrapper {
  display: flex;
  width: 92vw;
  background-image: linear-gradient(rgb(19, 19, 19), rgba(14, 14, 14, 0.856));
  margin:20px 0 20px 0;
  min-height: 700px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.product_wrapper_alt {
  display: flex;
  width: 92vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin:20px 0 20px 0;
  min-height: 700px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

}

.product_left {
display: flex;
align-items: center;
justify-content: center;
width: 42vw;
border-top-left-radius: 10px;

}


.product_left_wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.product_left_wrapper > h2 {
  font-size: 36px;
  color: white;
  margin-bottom: 0px;
}

.product_left_wrapper > h5 {
  font-size: 18px;
  font-weight: 300;
  width: 80%;
  color: white;
}

.product_left_wrapper > hr {
  width: 80%;
}

.product_prices {
  display: flex;
  align-items: center;
  width: 80%;

}

.product_prices > p {
  padding: 0 10px 0 20px;
  color: white;
  font-weight: 500;
  font-size: 18px;
}

.product_prices > h6 {
  padding: 0 18px 0 10px;
  color: #E73A39;
  font-size: 14px;
}



hr {
  width: 50%;
  margin: 4% 0 4% 0;
  border: none;
  height: 1px;
  background-color: rgb(44, 44, 44);
}



.product_card_tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;

}

.product_tag {
  text-align: center;
  padding: 0 10px 0 10px;
  align-items: center;

}

.product_tag > p {
  font-size: 14px;
  color: rgb(180, 180, 180);
  border: solid 1px rgb(94, 94, 94);
  border-radius: 100px;
  margin-top: 10px;
  padding: 5px 7px 5px 7px;
  width: 100%;
  text-align: center;
  align-self: center;

}

.product_buttons {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 10px 0 0 0;
}

.button_1 {
  border-radius: 100px;
  height: 50px;
  width: 40%;
  border: none;
  font-size: 16px;
  font-weight: 700;
  background-color: #E73A39;
  color: white;
  margin-right: 10px;
  transition: ease-in-out 200ms;
  max-width: 250px;
}

.button_2 {
  border-radius: 100px;
  height: 50px;
  width: 40%;
  border: none;
  font-size: 16px;
  font-weight: 300;
  background-color: rgb(26, 26, 26);
  color: white;
  transition: ease-in-out 200ms;
  max-width: 250px;
}

.button_2:hover {
  transform: scale(1.03);
  cursor: pointer;
}

.button_1:hover {
  transform: scale(1.03);
  cursor: pointer;
}


.product_right_uno {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50vw;
    border-top-right-radius: 10px;

}

.product_right_dos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50vw;
    border-top-right-radius: 10px;
}

.product_right_dos_wrapper {
  width: 70%;
}

.product_right_dos_wrapper > h6 {
  color: rgb(196, 196, 196);
}

.product_right_dos_wrapper > p {
  font-size: 18px;
  color: white;
  margin: 30px 0 30px 0;
  line-height: 150%;
  font-weight: 300;
}

.product_right_img >  img {
  width: 85%;
  max-height: 700px;
  box-shadow: rgba(83, 83, 83, 0.15) 0px 8px 20px 0px;
}

.product_right_img > h6 {
 color: rgb(214, 214, 214);
}

.product_right_bottom > img {
  width: 220px;
  animation: pico 0.8s ease-in-out;
  object-fit: cover;
  height: 220px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 9px 10px 0px;

}

.product_right_bottom {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.product_right_bottom_box {
  display: flex;
  margin: 2vh 0 2vh 0;
}

.product_right_bottom_box > img {
  width: 18px;
  filter: invert(1);
  margin: 0 0 0 45px; 
}

.product_right_bottom_box > p {
  color: white;
  font-size: 18px;
  margin: 0 0 0 15px;
  font-weight: 400;
}



.box-enter-active {
  animation: appear 0.5s ease-in;
  transition: smooth;
}



@keyframes appear {
  0% {
    transform:  scale(0.99);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 100;
  }
}
@keyframes pico {
  0% {
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 100;
  }
}



@media screen and (min-width: 1800px) {
  .product_right_img >  img {
    width: 850px;
    height: 550px;
    object-fit: cover;
  }
  .sold_text > p {
  font-size: 16px;
}
.product_left_wrapper > h5{
  font-size: 22px;
}
.product_tag > p {
  font-size: 18px;
}

.product_left_wrapper > h2{
  font-size: 45px;
}
.product_prices > p {
  font-size: 20px;
}

.product_prices > h6 {
  font-size: 14px;
}
.product_left_wrapper {
  
  width: 90%;
  
}
}

@media screen and (max-width: 1100px) {

.product_wrapper {
  display: flex;
  flex-direction: column;
  width: 85vw;
  padding-bottom: 6vh;
}

    .product_left_wrapper > h2{
      margin: 40px 20px 0px 20px;
  font-size: 42px;
}

.product_wrapper_alt {
  display: flex;
  flex-direction: column;
  width: 85vw;
  padding-bottom: 6vh;
}

.top_bar {
  width: 85vw;
}

.sold_text {
  width: 85vw;
}

.sold_text > p {
  font-size: 17px;
  margin-top: 22px;
}

.product_left {
  margin: 4vh 0 0 0;
width: 85vw;

}

.product_right {
margin: 4vh 0 0 0;
width: 85vw;

}
.product_right_uno {
    width: 85vw;
}
.product_right_dos {
    width: 85vw;
}


.product_right_img >  img {
  margin: 2vh 0 0 0;
  height: 85%;
    box-shadow: rgba(182, 179, 192, 0.15) 0px 48px 100px 0px;

}

.product_prices > p {
  font-size: 20px
}

.product_prices > h6 {
  font-size: 15px
}

}

@media screen and (max-width: 650px)  {
  .product_right_bottom {
    align-items: center;
    justify-content: center;
    text-align: center;
  }

.product_right_bottom_box {
   align-items: center;
   justify-content: center;
   margin-left: -18px;
}

.product_right_bottom_box > img {
  margin: 0;
}

.product_right_bottom_box > p {
  font-size: 18px;
  font-weight: 600;
}

.product_right_bottom > img {
  display: none;
}
.sold_text > p {
  font-size: 16px;
  margin-top: 24px;
}
.product_right_img >  img {
  margin: 0 0 0 0;

}
.product_wrapper {
  display: flex;
  flex-direction: column;
  width: 85vw;
  padding-bottom: 2vh;
}

}




</style>