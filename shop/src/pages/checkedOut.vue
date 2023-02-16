<template>
  <div class="checked_out_wrapper">
    <h1>{{ firstName }}, your order is ready for download!</h1>
    <hr />
    <div
      class="checked_out_card"
      v-for="productOrder in order.productOrder"
      :product="productOrder"
      :key="productOrder"
    >
      <div class="checked_out_card_left">
        <img
          class="checked_out_img"
          :src="productOrder.product.imageUrl"
          alt=""
        />
        <div class="checked_out_card_left_text">
          <h3>{{ productOrder.product.name }}</h3>
          <p>
            # {{ productOrder.product.copiesSold }}/{{
              productOrder.product.copiesAvailable
            }}
          </p>
        </div>
      </div>
      <a
        class="button_3"
        :href="productOrder.product.downloadLink"
        target="_blank"
        >Download</a
      >
      <!-- <button class="button_3">Download</button> -->
    </div>
    <hr />
    <p>
      An e-mail with your download-link was sent to: <span>{{ email }}</span>
    </p>
    <p>The Invoice is sent to you via. Paypal</p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "checkedOut",
  setup() {
    const store = useStore();

    const email = computed(() => {
      return store.state.userEmail;
    });

    const firstName = computed(() => {
      return store.state.fullName.split(" ")[0];
    });

    const order = computed(() => {
      return store.state.lastOrder;
    });

    return {
      email,
      order,
      firstName,
    };
  },
};
</script>

<style scoped>
.checked_out_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  color: white;
  background-color: rgb(10, 10, 10);
  padding-bottom: 40px;
}

.checked_out_wrapper > h1 {
  font-size: 45px;
  font-weight: 400;
  text-align: center;
  margin-left: 30px;
  margin-right: 30px;
  line-height: 1.5;
}

.checked_out_wrapper > hr {
  border: none;
  background-color: rgb(92, 92, 92);
  height: 1px;
  width: 70%;
  max-width: 1000px;
  margin-bottom: 15px;
  margin-top: 15px;
}

.checked_out_wrapper > p {
  font-size: 20px;
  font-weight: 100;
  margin-bottom: -5px;
  text-align: center;
  margin-left: 30px;
  margin-right: 30px;
}

.checked_out_wrapper > p > span {
  color: #e73a39;
}

.checked_out_card_left > img {
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 5px;
}

.checked_out_card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  background: linear-gradient(90deg, rgb(26, 26, 26) 5%, rgb(19, 19, 19) 71%);
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  max-width: 1300px;
}

.checked_out_card_left {
  display: flex;
  align-items: center;
  margin: 20px 20px 20px 20px;
}

.checked_out_card_left_text {
  margin-left: 30px;
}

.checked_out_card_left_text > h3 {
  font-size: 25px;
  font-weight: 400;
  margin-bottom: -10px;
}

.checked_out_card_left_text > p {
  font-size: 20px;
  font-weight: 200;
}

.button_3 {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 100px;
  height: 55px;
  width: 20%;
  max-width: 200px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  background-color: #e73a39;
  color: white;
  transition: ease-in-out 200ms;
  margin-right: 40px;
  box-shadow: rgba(170, 170, 170, 0.1) 0px 10px 15px -3px,
    rgba(218, 218, 218, 0.05) 0px 4px 6px -2px;
}
.button_3:hover {
  transform: scale(1.03);
  cursor: pointer;
  font-weight: 700;
}

@media screen and (max-width: 800px) {
  .checked_out_wrapper > h1 {
    margin-top: 140px;
  }

  .checked_out_card {
    flex-direction: column;
  }
  .button_3 {
    margin-bottom: 30px;
    width: 40%;
    margin-right: 0;
    margin-top: -10px;
  }

  .checked_out_card {
    width: 80%;
  }

  .checked_out_card_left {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .checked_out_card_left > img {
    margin-top: 30px;
    width: 90%;
    height: 380px;
  }

  .checked_out_card_left_text {
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-left: 0;
  }

  @media screen and (max-width: 500px) {
    .checked_out_card_left > img {
      margin-top: 30px;
      width: 90%;
      height: 320px;
    }
  }
}
</style>
