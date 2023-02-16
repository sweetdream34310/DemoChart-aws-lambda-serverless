<template>
  <div class="product_cta">
    <div className="product_box">
      <div className="product_vid_wrapper">
        <video
          className="video_clipper"
          src="/Web_Export.mp4"
          autoplay
          loop
          muted
          playsinline
        >
          <source src="/Web_Export.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="product_clip_tag">
        <img src="logo.png" alt="" />
        <p>Available: {{product.copiesAvailable - product.copiesSold}} pcs </p>
      </div>
      <h3>{{ product.name }}</h3>
      <div class="prices">
        <h4>${{ product.price }}</h4>
        <span>
          <h4>${{ product.priceOld }}</h4></span
        >
      </div>
      <div></div>
      <div class="checker">
        <div class="checks">
          <img src="/Check1.png" alt="" />
          <h4>3,2 GB</h4>
        </div>
        <div class="checks">
          <img src="/Check1.png" alt="" />
          <h4>100% Royalty Free</h4>
        </div>
        <div class="checks">
          <img src="/Check1.png" alt="" />
          <h4>30 Days Money Back</h4>
        </div>
      </div>
      <button class="available_button" to="/urban" @click="addItemToStore(product)">
        <img src="/carto.svg" alt="" /> Add To Cart <span>(34$)</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ProductCTA",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const addItemToStore = product => {
      console.log("######");
      store.commit("addItem", product);
    };

    return {
      addItemToStore,
    };
  },
};
</script>

<style scoped>
.checks {
  display: flex;
  margin-left: 20px;
  margin-right: 10px;
  width: 100%;
  margin-bottom: -20px;
}

.checker {
  margin-top: -15px;
  margin-bottom: 35px;
}

.checks > img {
  width: 22px;
  object-fit: contain;
  margin-right: 10px;
}

.checks > h4 {
  font-family: "Open Sans";
  font-size: 14px;
}

.prices {
  display: flex;
  height: fit-content;
  align-items: center;
}

.product_cta {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-right: 5vw;
  margin-top: -20px;
}

.product_box {
  width: 320px;
  background-color: #070707;
  height: 580px;
  border-radius: 20px;
  z-index: 2;
  text-align: left;
  color: white;
  margin-top: -50px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 40px 4px;
}

.product_box > h3 {
  margin-left: 20px;
  font-weight: 500;
  margin-top: 25px;
  margin-bottom: -15px;
}

.prices > h4 {
  margin-left: 20px;
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
  font-family: "Open Sans";
}

.prices > span > h4 {
  text-decoration: line-through;
  color: #818181;
  margin-left: 10px;
  font-weight: 400;
  font-size: 16px;
  font-family: "Open Sans";
}

.product_vid_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #251f25;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 40px 4px;
  max-height: 800px;
}

.video_clipper {
  position: sticky;
  width: 260px;
  height: 260px;
  margin-bottom: -20px;
  padding-top: 30px;
}

.product_clip_tag {
  position: absolute;
  margin-top: -282px;
  margin-left: 9px;
  background-color: #0e0e0e;
  color: rgb(255, 255, 255);
  height: fit-content;
  border-radius: 100px;
  height: 28px;
  width: 144px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product_clip_tag > p {
  font-size: 10px;
  font-weight: 800;
  font-family: "Open Sans";
  margin-left: 5px;
  margin-right: 10px;
}

.product_clip_tag > img {
  width: 9px;
  border-radius: 100px;
  background-color: #251f25;
  padding: 6px 8px;
  margin-right: 6px;
  margin-left: -8px;
}

.available_button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 270px;
  margin-left: 24px;
  height: 48px;
  border-radius: 100px;
  text-decoration: none;
  color: white;
    background-color: rgb(41, 41, 196);
  font-size: 13px;
  font-weight: 600;
  transition: 100ms ease-in-out;
  border: 1px rgb(0, 0, 0) solid;
}

.available_button > span {
  font-family: "Open Sans";
  margin-left: 7px;
  margin-top: -3px;
  font-weight: 300;
}

.available_button > img {
  width: 15px;
  filter: invert(1);
  margin-right: 10px;
  margin-top: -2px;
}

.available_button:hover {
  background-color: rgb(41, 41, 196);
  transform: scale(1.02);
  border: 1px white solid;
}

.button_6 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 155px;
  height: 44px;
  border: 1px solid rgb(128, 128, 128);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  margin-left: 10px;
  font-size: 13px;
  font-weight: 600;
}

.button_5 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 155px;
  height: 44px;
  background-color: rgb(37, 37, 206);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  font-size: 13px;
  transition: ease-in-out 100ms;
  font-weight: 600;
}

.button_5:hover {
  transform: scale(1.02);
}

.foreground > p {
  color: white;
}

@media (max-width: 900px) {
  .video_clip {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 180px;
    transform: translate(-50%, -50%);
    z-index: 0;
    height: 100vh;
    margin-top: 140px;
  }
}
@media (max-height: 580px) {
.checks {
  display: none;
  margin-left: 20px;
  margin-right: 10px;
  width: 100%;
  margin-bottom: -20px;
}

.checker {
  margin-top: -15px;
  margin-bottom: 35px;
}

.checks > img {
  width: 15px;
  object-fit: contain;
  margin-right: 10px;
}

.checks > h4 {
  font-family: "Open Sans";
  font-size: 12px;
}

.prices {
  display: flex;
  height: fit-content;
  align-items: center;
}

.product_cta {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-right: 5vw;
  margin-top: -20px;
}

.product_box {
  width: 240px;
  background-color: #070707;
  height: 350px;
  border-radius: 20px;
  z-index: 2;
  text-align: left;
  color: white;
  margin-top: -50px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 40px 4px;
}

.product_box > h3 {
  margin-left: 20px;
  font-weight: 500;
  margin-top: 25px;
  margin-bottom: -15px;
}

.prices > h4 {
  margin-left: 20px;
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
  font-family: "Open Sans";
}

.prices > span > h4 {
  text-decoration: line-through;
  color: #818181;
  margin-left: 10px;
  font-weight: 400;
  font-size: 16px;
  font-family: "Open Sans";
}

.product_vid_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #251f25;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 40px 4px;
  max-height: 800px;
}

.video_clipper {
  position: sticky;
  width: 180px;
  height: 180px;
  margin-bottom: -20px;
  padding-top: 30px;
}

.product_clip_tag {
  position: absolute;
  margin-top: -282px;
  margin-left: 9px;
  background-color: #0e0e0e;
  color: rgb(255, 255, 255);
  height: fit-content;
  border-radius: 100px;
  height: 28px;
  width: 144px;
  display: none;
  align-items: center;
  justify-content: center;
}

.product_clip_tag > p {
  font-size: 10px;
  font-weight: 800;
  font-family: "Open Sans";
  margin-left: 5px;
  margin-right: 10px;
}

.product_clip_tag > img {
  width: 9px;
  border-radius: 100px;
  background-color: #251f25;
  padding: 6px 8px;
  margin-right: 6px;
  margin-left: -8px;
}

.available_button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin-left: 16px;
  height: 48px;
  border-radius: 100px;
  text-decoration: none;
  color: white;
  background-color: #e73a39;
  font-size: 13px;
  font-weight: 600;
  transition: 100ms ease-in-out;
  border: 1px rgb(0, 0, 0) solid;
  margin-top: -50px;
}

.available_button > span {
  font-family: "Open Sans";
  margin-left: 7px;
  margin-top: -3px;
  font-weight: 300;
}

.available_button > img {
  width: 15px;
  filter: invert(1);
  margin-right: 10px;
  margin-top: -2px;
}

.available_button:hover {
  background-color: #e73a39;
  transform: scale(1.02);
  border: 1px white solid;
}

.button_6 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 155px;
  height: 44px;
  border: 1px solid rgb(128, 128, 128);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  margin-left: 10px;
  font-size: 13px;
  font-weight: 600;
}

.button_5 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 155px;
  height: 44px;
  background-color: rgb(37, 37, 206);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  font-size: 13px;
  transition: ease-in-out 100ms;
  font-weight: 600;
}

.button_5:hover {
  transform: scale(1.02);
}

.foreground > p {
  color: white;
}

}


</style>
