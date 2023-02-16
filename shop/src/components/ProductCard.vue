<template>
  <div class="product_background">
    <div class="product">
      <div
        :class="dataToggle ? 'product_wrapper_alt' : 'product_wrapper'"
        :style="dataToggle ? ' background-image: url(../public/BG_01.jpg);' : ''"
      >
        <div class="top_bars">
          <div class="top_bar"></div>
          <div
            class="prog_bar"
            :style="`width: ${(product.copiesSold / product.copiesAvailable) * 100}%`"
          ></div>
          <div class="sold_text">
            <p>Sold: {{ product.copiesSold }}/{{ product.copiesAvailable }}</p>
          </div>
        </div>

        <div class="product_left">
          <div class="product_left_wrapper">
            <div class="product_mobile_vid">
              <video
                v-if="product.imageUrl.slice(-3) === 'mp4'"
                width="450"
                height="450"
                autoplay
                loop
                playsinline
                muted
                class="skeleton"
              >
                <!--              <video width="450" height="450" autoplay loop muted>-->
                <source :src="product.imageUrl" type="video/mp4" />
              </video>
              <img
                v-if="product.imageUrl.slice(-3) === 'jpg'"
                :src="product.imageUrl"
                alt=""
                style="width: 250px"
              />
            </div>
            <h2>{{ product.name }}</h2>
            <hr />
            <div class="product_card_tags">
              <ProductTag v-for="tag in tags" :text="tag" :key="tag" />
            </div>
            <h5>
              {{ product.description }}
            </h5>
            <div class="product_prices">
              <hr />
              <p>${{ product.price }}</p>
              <h6>${{ product.priceOld }}</h6>
              <hr />
            </div>
            <div class="product_buttons">
              <button
                @click="addItemToStore(product)"
                class="button_1"
                :disabled="isProductAdded"
              >
                {{ isProductAdded ? "Added to Cart" : "Add to Cart" }}
              </button>
              <button @click="dataToggler" class="button_2" v-if="!dataToggle">
                Play Demo
              </button>
              <button @click="dataToggler" class="button_2" v-else="dataToggle">
                Less Info
              </button>
            </div>
          </div>
        </div>

        <div class="product_right">
          <transition name="box" mode="out-in">
            <div v-if="!dataToggle" class="product_right_uno">
              <div class="product_right_img">
                <video
                  v-if="product.imageUrl.slice(-3) === 'mp4'"
                  width="450"
                  height="450"
                  autoplay
                  loop
                  playsinline
                  muted
                >
                  <!--              <video width="450" height="450" autoplay loop muted>-->
                  <source :src="product.imageUrl" type="video/mp4" />
                </video>
                <img
                  v-if="product.imageUrl.slice(-3) === 'jpg'"
                  :src="product.imageUrl"
                  alt=""
                />
                <!-- <img :src="product.imageUrl" alt="">     -->
              </div>
            </div>
            <div v-else="dataToggle" class="product_right_dos">
              <div class="product_right_dos_wrapper">
                <audio-player :product="product"></audio-player>
                <h6>{{ product.songBy }}</h6>
                <p>{{ product.songDescription }}</p>
              </div>
              <div class="product_right_bottom">
                <transition name="pico" mode="out-in">
                  <video width="250" height="250" autoplay loop muted>
                    <source :src="product.imageUrl" type="video/mp4" />
                  </video>
                  <!-- <img :src="product.imageUrl" alt=""> -->
                </transition>
                <div>
                  <div
                    class="product_right_bottom_container"
                    v-for="songTag in songTags"
                    :songTag="songTag"
                    :key="songTag"
                  >
                    <div class="product_right_bottom_box">
                      <img src="../img/check.svg" alt="" />
                      <p>{{ songTag }}</p>
                    </div>
                  </div>
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
import AudioPlayer from "./AudioPlayer.vue";
import ProductTag from "./ProductTag";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ProductCard",
  components: { ProductTag, AudioPlayer },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const dataToggle = ref(false);
    const dataToggler = () => {
      dataToggle.value = !dataToggle.value;
    };
    const tags = computed(() => {
      return props.product && props.product.tags && props.product.tags.split(", ");
    });
    const songTags = computed(() => {
      return (
        props.product && props.product.songTags && props.product.songTags.split(", ")
      );
    });

    const store = useStore();
    const addItemToStore = product => {
      store.commit("addItem", product);
    };

    const isProductAdded = computed(() => {
      // console.log("blabla",store.state.shoppingCart[0])
      let disableButton = false;
      if (store.state.shoppingCart.find(el => el === props.product)) {
        disableButton = true;
      }
      return disableButton;
    });

    return {
      dataToggle,
      dataToggler,
      tags,
      songTags,
      addItemToStore,
      isProductAdded,
    };
  },
};
</script>

<style scoped>
.product_mobile_vid {
  display: none;
}

button {
  font-family: "Josefin Sans", Helvetica, Arial, sans-serif;
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
  background-color: rgb(26, 26, 26);
  height: 8px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 1;
}

.prog_bar {
  position: absolute;
  width: 70%;
  background: linear-gradient(90deg, rgb(145, 7, 7) 5%, rgb(182, 23, 23) 71%);
  height: 8px;
  z-index: 2;
  border-top-left-radius: 10px;
}

.sold_text {
  position: absolute;
  width: 91vw;
  text-align: right;
}

.sold_text > p {
  margin: 24px 10px 0 0;
  font-size: 14px;
  color: rgb(214, 214, 214);
  display: none;
}

.product_wrapper {
  display: flex;
  width: 92vw;
  background-color: rgb(0, 0, 0);
  margin: 20px 0 20px 0;
  min-height: 700px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.product_wrapper_alt {
  display: flex;
  width: 92vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 20px 0 20px 0;
  min-height: 700px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid rgb(36, 36, 36);
}

.product_left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42vw;
  border-top-left-radius: 10px;
}

.product_left_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.product_left_wrapper > h2 {
  font-size: 28px;
  color: white;
  margin-bottom: 0px;
  font-weight: 400;
  font-family: "font1", "Josefin Sans";
}

.product_left_wrapper > h5 {
  font-size: 18px;
  font-weight: 200;
  width: 80%;
  color: white;
  text-align: center;
  line-height: 140%;
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
  font-weight: 500;
  font-size: 22px;
  color: #db2222;
}

.product_prices > h6 {
  padding: 0 18px 0 10px;
  font-size: 16px;
  color: rgb(163, 163, 163);
  font-weight: 400;
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

.product_buttons {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 10px 0 0 0;
}

.button_1 {
  border-radius: 100px;
  height: 45px;
  width: 30%;
  border: none;
  font-size: 14px;
  font-weight: 700;
  background-color: #e73a39;
  color: white;
  margin-right: 25px;
  transition: ease-in-out 100ms;
  max-width: 250px;
}

.button_2 {
  border-radius: 100px;
  height: 45px;
  width: 30%;
  border: none;
  font-size: 14px;
  font-weight: 300;
  background-color: rgb(26, 26, 26);
  color: white;
  transition: ease-in-out 100ms;
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

.button_1:disabled {
  background-color: rgb(26, 26, 26);
  color: #e73a39;
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

.product_right_img {
  display: flex;
  align-items: center;
  justify-content: center;
}
.product_right_img > img {
  width: 80%;
  max-height: 700px;
  height: 450px;
}

.product_right_img > h6 {
  color: rgb(214, 214, 214);
}

.product_right_bottom > video {
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
  font-size: 14px;
  margin: 0 0 0 15px;
  font-weight: 600;
  font-family: "Josefin Sans";
}

.box-enter-active {
  animation: appear 0.5s ease-in;
  transition: smooth;
}

@keyframes appear {
  0% {
    transform: scale(0.99);
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

@media (min-width: 1800px) {
  .product_right_img > img {
    width: 850px;
    height: 550px;
    object-fit: cover;
  }
  .sold_text > p {
    font-size: 16px;
  }
  .product_left_wrapper > h5 {
    font-size: 22px;
  }
  .product_left_wrapper > h2 {
    font-size: 45px;
  }
  .product_prices > p {
    font-size: 20px;
  }
  .product_prices > h6 {
    font-size: 14px;
    text-decoration: line-through;
  }
  .product_left_wrapper {
    width: 90%;
  }
}

@media (max-width: 1100px) {
  .product_right {
    display: none;
  }
  .product_wrapper {
    display: flex;
    flex-direction: column;
    width: 85vw;
    padding-bottom: 6vh;
    min-height: 0px;
  }
  .product_left_wrapper {
    width: 90%;
  }
  .product_left_wrapper > h2 {
    margin: 40px 20px 0px 20px;
    font-size: 42px;
  }

  .product_left_wrapper > h5 {
    margin: 20px 20px 0px 20px;
  }
  .product_wrapper_alt {
    display: flex;
    flex-direction: column;
    width: 85vw;
    padding-bottom: 6vh;
  }

  .product_mobile_vid {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0px;
    width: 600px;
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
  .product_right_img > video {
    margin: 2vh 0 0 0;
    height: 85%;
    display: none;
  }
}

@media (max-width: 800px) {
  .product_right {
    display: none;
  }
  .product_mobile_vid > video {
    display: flex;
    margin-bottom: 0px;
    width: 500px;
  }
}

@media (max-width: 700px) {
  .product_right {
    display: none;
  }
  .product_mobile_vid > video {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0px;
    width: 500px;
  }
}

@media (max-width: 650px) {
  .product_right {
    display: none;
  }
  .product_mobile_vid {
    width: 10px;
  }

  .product_mobile_vid > video {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0px;
    width: 500px;
  }
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
    height: 12px;
  }
  .product_right_bottom_box > p {
    font-size: 16px;
    font-weight: 500;
  }

  .sold_text > p {
    font-size: 14px;
    margin-top: 18px;
  }
  .product_right_img > img {
    margin: 0 0 0 0;
  }
  .product_wrapper {
    display: flex;
    flex-direction: column;
    width: 85vw;
    padding-bottom: 2vh;
  }
  .product_left_wrapper > h2 {
    font-size: 36px;
  }

  .button_1 {
    border-radius: 100px;
    height: 45px;
    width: 40%;
    border: none;
    font-size: 14px;
    font-weight: 700;
    background-color: #e73a39;
    color: white;
    margin-right: 25px;
    transition: ease-in-out 200ms;
    max-width: 250px;
  }

  .button_2 {
    border-radius: 100px;
    height: 45px;
    width: 40%;
    border: none;
    font-size: 14px;
    font-weight: 300;
    background-color: rgb(26, 26, 26);
    color: white;
    transition: ease-in-out 200ms;
    max-width: 250px;
  }
  .product_right_dos_wrapper {
    width: 90%;
  }

  .product_right_dos_wrapper > p {
    display: none;
  }
}

@media (max-width: 480px) {
  .product_right {
    display: none;
  }
  .product_mobile_vid > video {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -30px;
    width: 400px;
  }
}

@media (max-width: 420px) {
  .product_right {
    display: none;
  }
  .product_mobile_vid > video {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -30px;
    width: 380px;
  }
}

@media (max-width: 390px) {
  .product_right {
    display: none;
  }
  .product_mobile_vid > video {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -30px;
    width: 340px;
  }
}

@media (max-width: 350px) {
  .product_right {
    display: none;
  }
  .product_mobile_vid > video {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -30px;
    width: 310px;
  }
}
</style>
