
<template>
  <div class="enter_screen">
    <div class="enter_screen_links"></div>
    <div class="enter_screen_rechts">
      <img src="/DC_Icon_3.png" alt="" />
      <h2>MEMBERS ONLY</h2>
      <p>Enter with the email address you used to sign up for Democharts.</p>
      <input
          v-model="email"
        class="enter_input"
        type="text"
        placeholder="Your Email Address"
      />
      <button class="enter_button" @click="isEmailRegistered()">Enter</button>

      <div v-if="!emailExists && clicked" class="enter_screen_email_exists">
        Sorry, you are not registered on democharts.org.
        <a href="https://www.democharts.org">Signup here</a>
      </div>
    </div>
  </div>
</template>


<script>

import apiClient from "../api/apiClient";
import {ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  name: 'enter',
  setup() {
    const email = ref('');
    const store = useStore();
    const router = useRouter();

    const clicked = ref(false);
    const emailExists = ref(undefined);

    const isEmailRegistered = async () => {
      if (!email.value) {
        return;
      }

      const res = await apiClient.post( '/signup/userExists', { mail: email.value } )

      clicked.value = true;
      emailExists.value = res.data.exists

      if (res.data.exists) {
        store.commit('setUserEmail', email.value);
        router.push('/');
      }
    }

    return {
      isEmailRegistered,
      emailExists,
      email,
      clicked,
    }
  }
}

</script>


<style lang="scss">
.enter_screen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: black;
}

.enter_screen_links {
  display: flex;
  width: 50%;
  background-image: linear-gradient(rgba(12, 22, 15, 0), rgba(19, 11, 0, 0)),
    url("/Automat_4.jpg");
  height: 25%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 70vh;
}

.enter_screen_rechts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  min-height: 100vh;
}

.enter_screen_rechts > img {
  margin-top: -40px;
  width: 250px;
}

.enter_screen_rechts > h2 {
  font-family: 'font1', 'Josefin Sans';
  font-size: 24px;
  color: white;
  margin-bottom: -5px;
}

.enter_screen_rechts > p {
  font-family: 'Josefin Sans';
  font-size: 16px;
  color: white;
  font-weight: 300;
}

.enter_input {
  margin: 3vh 0 3vh 0;
  width: 400px;
  height: 45px;
  background-color: rgb(20, 20, 20);
  color: white;
  text-align: center;
  font-size: 15px;
  letter-spacing: 1px;
  font-family: "Josefin Sans", serif;
  font-weight: 400;
  border: none;

}

.enter_input:focus {
  outline: none;
    outline-width: 0;
}

.enter_button {
  font-family: 'font1', 'Josefin Sans';
  width: 300px;
  border-radius: 100px;
  border: 2px solid $demochartsRed;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 2vh;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: white;
  background-color: black;
  height: 50px;
  transition: ease-in-out 200ms;
}

.enter_button:hover {
  transform: scale(1.03);
  cursor: pointer;
}

.enter_screen_email_exists {
  margin-top: 16px;
  color: white;
}

@media (max-width:850px) {
  .enter_screen {
  display: flex;
  flex-direction: column-reverse;
}

.enter_screen_links {
  display: none;
}
.enter_screen_rechts {
  min-height: 100vh;
}

}

@media (max-width:450px) {
  .enter_button {
    width: 240px;
  }

.enter_input {
  margin: 3vh 0 3vh 0;
  width: 340px;
  height: 45px;
  background-color: rgb(20, 20, 20);
  color: white;
  text-align: center;
  font-size: 15px;
  letter-spacing: 1px;
  font-family: "Josefin Sans", serif;
  font-weight: 400;
  border: none;
  
}

}

@media (max-width:400px) {
  .enter_button {
    width: 240px;
  }

.enter_input {
  width: 310px;

  
}

}

@media (max-width:370px) {
  .enter_button {
    width: 240px;
  }

.enter_input {
  width: 290px;

  
}

}

</style>