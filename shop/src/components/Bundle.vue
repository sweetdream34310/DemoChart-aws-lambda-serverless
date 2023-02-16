<template>
  <div class="main">
    <div class="item-detail">
      <div class="item-img">
        <video class="mp4" width="100" height="100" autoplay loop muted>
          <source :src="item.imageUrl" type="video/mp4" />
        </video>
      </div>
      <div class="item-title">
        <div class="title">{{ item.name }}</div>

        <div class="subtitle">
          <div class="sub-detail">
            <img src="../img/checked.svg" alt="" /><span style="color: white">3,2GB</span>
          </div>
          <div class="sub-detail">
            <img src="../img/checked.svg" alt="" /><span style="color: white"
              >999 files</span
            >
          </div>
          <div class="sub-detail">
            <img src="../img/checked.svg" alt="" /><span style="color: white"
              >Available</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="item-price">
      <div class="save">
        <div class="discount">SAVE 60%</div>
        <div class="price">
          <span style="font-size: 12px">${{ item.priceOld }}</span>
          <span style="color: #e73a39; font-size: 20px; margin-left: 10px">
            ${{ item.price }}
          </span>
        </div>
      </div>
      <div class="add-cart">
        <button @click="addItemToStore(item)" class="button_1">
          ADD TO CART
          <img style="width: 25px; margin-left: 10px" src="../img/cart.png" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
export default {
  name: "CartItem",
  props: {
    item: {
      type: Object,
    },
    isBump: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  setup() {
    const store = useStore();

    const removeFromCart = (product: any) => {
      store.commit("removeItem", product);
    };

    const addItemToStore = (product) => {
      store.commit("addItem", product);
    };

    return {
      removeFromCart,
      addItemToStore,
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: space-around;
  margin-top: 31px;
  align-items: center;
  background-color: rgb(34, 38, 26);
  position: fixed;
  width: 100%;
  z-index: 9999;
}

.item-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
}

.item-title {
  margin-left: 20px;
}

.title {
  font-size: 20px;
  font-family: "font1";
  color: white;
}

.sub-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.subtitle {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.item-price {
  display: flex;
  justify-content: center;
  align-items: center;
}

.price {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.save {
  display: block;
  justify-content: center;
  align-items: center;
}

.add-cart {
  margin-left: 10px;
}

.discount {
  font-size: 10px;
  background-color: gray;
  padding: 4px;
  color: white;
  margin-bottom: 4px;
}

.mp4 {
  width: 100px !important;
  height: 100px !important;
  object-fit: cover;
  padding: 0px !important;
}

.button_1 {
  border-radius: 100px;
  height: 45px;
  width: 100%;
  border: none;
  font-size: 14px;
  font-weight: 700;
  background-color: #e73a39;
  color: white;
  margin-right: 25px;
  transition: ease-in-out 100ms;
  max-width: 250px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button_1:hover {
  transform: scale(1.03);
  cursor: pointer;
}

.button_1:disabled {
  background-color: rgb(26, 26, 26);
  color: #e73a39;
}

@media (max-width: 650px) {
  .button_1 {
    border-radius: 100px;
    height: 45px;
    width: 100%;
    border: none;
    font-size: 14px;
    font-weight: 700;
    background-color: #e73a39;
    color: white;
    margin-right: 25px;
    transition: ease-in-out 200ms;
    max-width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
