<template>
  <div class="menu">
    <h1 class="title" style="display: flex; align-items: center">
      <Crocs @onClick="onCrocs" style="margin-right: 16px"></Crocs>
      <router-link to="users">Users</router-link>
      <router-link to="songs">Songs</router-link>
      <router-link to="admin-configs">Configs</router-link>
      <router-link to="products">Products</router-link>
      <router-link to="orders">Orders</router-link>
      <router-link to="couponConfigs">Coupon Configs</router-link>
      <router-link to="admin">Settings</router-link>
    </h1>
  </div>
</template>

<script>
import Crocs from "../components/Crocs.vue";
export default {
  name: "Menu",
  components: { Crocs },
  methods: {
    onCrocs() {
      alert("I wish you a happy day!");
    },
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #efefef;
  margin-bottom: 64px;
  padding-bottom: 32px;
  margin-top: 32px;
}
a {
  background: #efefef;
  padding: 8px 16px;
  border-radius: 5px;
  margin: 8px;
  display: inline-block;
}
</style>
