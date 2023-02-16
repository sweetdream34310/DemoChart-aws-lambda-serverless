<template>
<Navigation></Navigation>
 <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
       <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
</template>

<script>
import HomeScreen from './pages/HomeScreen.vue'
import Navigation from './components/Navigation.vue'

export default {
  data() {
    return {
      mode: 'dark'
    }
  },
  components: {
    HomeScreen,
    Navigation
  }
}
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
  font-family: 'font1';
  src: url(/Fonts/font1.otf);
}

@font-face {
  font-family: 'font2';
  src: url(/Fonts/font2.otf);
}

#app {
  font-family: 'font1', 'Josefin Sans', Helvetica, Arial, sans-serif;
    background-color: rgb(7, 7, 7);
    color: white;
    width: 100vw;
}

* {
  margin: 0;
}

:root {
  --democharts: #E73939; 
}

</style>
