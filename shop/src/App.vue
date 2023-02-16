<template>
  <Navigation></Navigation>
  <transition name="route" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent } from "vue";
import { store } from "./store";
import Navigation from "./components/Navigation.vue";

export default defineComponent({
  components: { Navigation },
  setup() {
    // Hotjar
    (function (h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: 1883719, hjsv: 6 };
      a = o.getElementsByTagName("head")[0];
      r = o.createElement("script");
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

    // Active Campaign
    (function (e, t, o, n, p, r, i) {
      e.visitorGlobalObjectAlias = n;
      e[e.visitorGlobalObjectAlias] =
        e[e.visitorGlobalObjectAlias] ||
        function () {
          (e[e.visitorGlobalObjectAlias].q = e[e.visitorGlobalObjectAlias].q || []).push(
            arguments
          );
        };
      e[e.visitorGlobalObjectAlias].l = new Date().getTime();
      r = t.createElement("script");
      r.src = o;
      r.async = true;
      i = t.getElementsByTagName("script")[0];
      i.parentNode.insertBefore(r, i);
    })(window, document, "https://diffuser-cdn.app-us1.com/diffuser/diffuser.js", "vgo");
    vgo("setAccount", "91420484");
    vgo("setTrackByDefault", true);
    vgo("process");

    store.dispatch("fetchProducts");
    store.dispatch("fetchCoupons");

    const emailCookie = localStorage.getItem("email");
    store.commit("setUserEmail", emailCookie);
  },
});
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@font-face {
  src: url(/Fonts/font2.otf);
  font-family: "font1";
}

@font-face {
  font-family: "font2";
  src: url(/Fonts/font3.otf);
}

@font-face {
  font-family: "Open Sans";
  src: url(/Fonts/OpenSans.ttf);
}

@font-face {
  font-family: "Open Sans Bold";
  src: url(/Fonts/OpenSans-Bold.ttf);
}


@import "./assets/styles/main.scss";

#app {
  font-family: "Josefin Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  width: 100vw;
  background-color: black;
}
</style>
