<template>
  <div>
    <div class="container" style="margin-bottom: 36px">
      <h2>{{ countedCouponConfigs }} Coupon Configs</h2>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>UID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Discount</th>
            <th>Product</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="couponConfig in couponConfigs"
            :key="couponConfig.uid"
            style="font-size: 12px"
          >
            <td>{{ couponConfig.uid }}</td>
            <td><input v-model="couponConfig.name" /></td>
            <td><input v-model="couponConfig.type" /></td>
            <td><input v-model="couponConfig.discount" /></td>
            <td><input v-model="couponConfig.product" /></td>
            <td>
              <button @click="upsertCouponConfig(couponConfig)">
                {{ couponConfig.uid ? "update" : "add" }}
              </button>
            </td>
            <td v-if="couponConfig.uid">
              <button @click="deleteCouponConfig(couponConfig)">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <pre>
      {{ couponConfigs }}
    </pre>

    <div style="height: 150px; overflow: scroll">{{ users }}</div>

    <GrantCredits
      v-if="grantCreditProps"
      :emailInput="grantCreditProps.email"
      @onClose="postGrantCredits"
    >
    </GrantCredits>
  </div>
</template>

<script>
import useAuth from "../use/Auth";
const auth = useAuth();

const APP_PATH = import.meta.env.VITE_APP_BASE_PATH;

import { COUNTRIES } from "../lib/Countries";
import { GENRES } from "../lib/Genres";
import { INDUSTRIES } from "../lib/Industries";

const basePath = import.meta.env.VITE_API_BASE_PATH;

export default {
  name: "couponConfigs",
  components: {},
  data() {
    return {
      couponConfigs: [],
      activeShowUser: undefined,
      grantCreditProps: undefined,
      countries: COUNTRIES,
      industries: INDUSTRIES,
      genres: GENRES,
      appPath: APP_PATH,
    };
  },
  mounted: function () {
    this.getCouponConfigs().then(res => {
      this.couponConfigs = res;
    });
  },
  computed: {
    countedCouponConfigs() {
      return this.couponConfigs.length;
    },
  },
  methods: {
    grantCredits(email) {
      this.grantCreditProps = {
        email,
      };
    },
    postGrantCredits() {
      this.grantCreditProps = undefined;

      this.getUsers().then(res => {
        this.users = res;
      });
    },
    async getCouponConfigs() {
      const res = await fetch(basePath + "shop/getCouponConfigs", {
        method: "GET",
        headers: auth.getAuthHeader(),
        mode: "cors",
      });

      const resJson = (await res.json()) || [];
      console.log(resJson);

      resJson.push({});

      return resJson;
    },
    async upsertCouponConfig(couponConfig) {
      try {
        const res = await fetch(basePath + "shop/upsertCouponConfig", {
          method: "POST",
          headers: auth.getAuthHeader(),
          mode: "cors",
          body: JSON.stringify(couponConfig),
        });

        alert("success");
      } catch (err) {
        alert("error" + JSON.stringify(err));
        console.error(err);
      }
    },
    async deleteCouponConfig(couponConfig) {
      try {
        const res = await fetch(basePath + "shop/deleteCouponConfig", {
          method: "POST",
          headers: auth.getAuthHeader(),
          mode: "cors",
          body: JSON.stringify(couponConfig),
        });

        alert("success");

        this.getCouponConfigs().then(res => {
          this.couponConfigs = res;
        });
      } catch (err) {
        alert("error" + JSON.stringify(err));
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100vw;
  overflow-x: auto;
}

input {
  min-width: unset;
  width: 150px;
}

.table-container {
  width: 100vw;
  overflow-x: auto;
}
</style>
