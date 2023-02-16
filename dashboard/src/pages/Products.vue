<template>
  <div>
    <div class="container" style="margin-bottom: 36px">
      <h2>{{ countedProducts }} Products</h2>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>UID</th>
            <th>Name</th>
            <th>imageUrl</th>
            <th>description</th>
            <th>brand</th>
            <th>category</th>
            <th>price</th>
            <th>priceOld</th>
            <th>countInStock</th>
            <th>rating</th>
            <th>numReviews</th>
            <th>tags</th>
            <th>copiesSold</th>
            <th>copiesAvailable</th>
            <th>songFile</th>
            <th>songUrl</th>
            <th>songBy</th>
            <th>songDescription</th>
            <th>songTags</th>
            <th>downloadLink</th>
            <th>isBump</th>
            <th>bumpPrice</th>
            <th>active</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in products" :key="product.uid" style="font-size: 12px">
            <td>{{ product.uid }}</td>
            <td><input v-model="product.name" /></td>
            <td><input v-model="product.imageUrl" /></td>
            <td><input v-model="product.description" /></td>
            <td><input v-model="product.brand" /></td>
            <td><input v-model="product.category" /></td>
            <td><input v-model="product.price" /></td>
            <td><input v-model="product.priceOld" /></td>
            <td><input v-model="product.countInStock" /></td>
            <td><input v-model="product.rating" /></td>
            <td><input v-model="product.numReviews" /></td>
            <td><input v-model="product.tags" /></td>
            <td><input v-model="product.copiesSold" /></td>
            <td><input v-model="product.copiesAvailable" /></td>
            <td><input v-model="product.songFile" /></td>
            <td><input v-model="product.songUrl" /></td>
            <td><input v-model="product.songBy" /></td>
            <td><input v-model="product.songDescription" /></td>
            <td><input v-model="product.songTags" /></td>
            <td><input v-model="product.downloadLink" /></td>
            <td><input v-model="product.isBump" /></td>
            <td><input v-model="product.bumpPrice" /></td>
            <td><input type="checkbox" v-model="product.active" /></td>
            <td>
              <button @click="upsertProduct(product)">
                {{ product.uid ? "update" : "add" }}
              </button>
            </td>

            <!--				<td>{{user.lastName}} </td>-->
            <!--				<td>{{user.email}}</td>-->
            <!--				<td><strong>{{user.userType === 1 ? 'artist' + ` [${user.credits}C]` : 'expert'}}</strong><br />-->
            <!--					{{industries.find(el => el.id === user.industryID) && industries.find(el => el.id === user.industryID).name}}-->
            <!--					{{genres.find(el => el.id === user.genreID) && genres.find(el => el.id === user.genreID).name}}-->
            <!--				</td>-->
            <!--				<td>{{user.userType === 1 ? user.artistName : user.company}}</td>-->
            <!--				<td>{{new Date(user.createdAt).toLocaleString()}}</td>-->
            <!--				<td>-->
            <!--					<div v-if="user.applicationMusicProfileName">-->
            <!--						{{ user.applicationMusicProfilePlatform }}: {{ user.applicationMusicProfileName }}-->
            <!--					</div>-->
            <!--					<div v-if="user.applicationSocialProfileName">-->
            <!--						{{ user.applicationSocialProfilePlatform }}: {{ user.applicationSocialProfileName }}-->
            <!--					</div>-->
            <!--				</td>-->
            <!--				<td>-->
            <!--					{{-->
            <!--					countries.find(el => el.countryCode === user.countryID )-->
            <!--					&& countries.find(el => el.countryCode === user.countryID ).name-->
            <!--					}}-->
            <!--				</td>-->
            <!--				<td><div v-if="activeShowUser === user.uid"><pre>{{ user }}</pre></div>-->
            <!--					<div @click="activeShowUser !== user.uid ? (activeShowUser = user.uid) : (activeShowUser = undefined)">-->
            <!--						<span v-if="activeShowUser === user.uid">close</span>-->
            <!--						<span v-else>open</span>-->
            <!--					</div>-->
            <!--				</td>-->
            <!--				<td>-->
            <!--					<button v-if="!user.approvedByAdmin || user.declinedByAdmin" @click="approveUser(user)">approve</button>-->
            <!--					<button v-if="!user.approvedByAdmin && !user.declinedByAdmin" @click="approveUser(user, true)">decline</button>-->
            <!--					<div v-else>{{ user.declinedByAdmin ? `declined since ${declinedSince(user.declinedByAdmin)}` : 'approved'}}</div>-->
            <!--				</td>-->
            <!--				<td>-->
            <!--					<button @click="grantCredits(user.email)">add credits</button>-->
            <!--				</td>-->
          </tr>
        </tbody>
      </table>
    </div>

    <pre>
      {{ products }}
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
  name: "products",
  components: {},
  data() {
    return {
      products: [],
      activeShowUser: undefined,
      grantCreditProps: undefined,
      countries: COUNTRIES,
      industries: INDUSTRIES,
      genres: GENRES,
      appPath: APP_PATH,
    };
  },
  mounted: function () {
    this.getShopProducts().then((res) => {
      this.products = res;
    });
  },
  computed: {
    countedProducts() {
      return this.products.length;
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

      this.getUsers().then((res) => {
        this.users = res;
      });
    },
    async getShopProducts() {
      const res = await fetch(basePath + "dashboard/getShopProducts", {
        method: "GET",
        headers: auth.getAuthHeader(),
        mode: "cors",
      });

      const resJson = (await res.json()) || [];
      console.log("RECEIVED PRODUCTS");
      console.log(resJson);

      resJson.push({});

      return resJson;
    },
    async upsertProduct(product) {
      try {
        const res = await fetch(basePath + "shop/upsertProduct", {
          method: "POST",
          headers: auth.getAuthHeader(),
          mode: "cors",
          body: JSON.stringify(product),
        });

        alert("success");
      } catch (err) {
        alert("error" + JSON.stringify(err));
        console.error(err);
      }

      // this.getProducts().then(res => {
      // 	this.products = res
      // });
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
