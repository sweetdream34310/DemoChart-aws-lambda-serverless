<template>
  <div class="check_out">
    <div class="check_out_steps">
      <p><span>Information</span></p>
      <hr />
      <p>Payment</p>
      <hr />
      <p>Download</p>
    </div>
    <div class="check_out_text"></div>
    <form @submit.prevent="submitForm" class="check_out_form">
      <img src="/logo.png" alt="" />
      <h2>Where should we send your order?</h2>
      <div class="check_out_input">
        <label for="fullname">Full Name</label>
        <input
          type="text"
          placeholder="Type in your Name"
          id="name"
          v-model="enteredName"
          required
        />
      </div>
      <div class="check_out_input">
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Type in your Email"
          v-model="enteredEmail"
          name="email"
          ref="emailInput"
        />
      </div>
      <button
        id="_form_1_submit"
        :class="!showColor ? '_submit' : '_submit active'"
        type="submit"
        :disabled="emailValid === false || nameValid === false"
      >
        Continue with Payment
        <img class="button_img" src="/download.png" alt="" />
      </button>
    </form>
    <p v-if="noItemsinCart">You do not have any products in your cart</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enteredName: "",
      enteredEmail: "",
      showColor: false,
      nameValid: false,
      emailValid: false,
      showAlarm: false,
      noItemsinCart: false,
    };
  },
  watch: {
    enteredName(value) {
      if (value.length > 3) {
        this.nameValid = true;
      } else if (!value.length < 3) {
        this.nameValid = false;
        this.showColor = false;
      }
    },
    enteredEmail(value) {
      if (value.includes("@") && this.nameValid) {
        this.showColor = true;
        this.emailValid = true;
      } else if (!value.includes("@")) {
        this.showColor = false;
        this.emailValid = false;
      }
    },
    showColor() {
      if (!this.enteredEmail.includes("@")) {
        this.showColor = false;
      }
    },
  },
  methods: {
    alarm() {
      if (this.showColor === false) {
        this.showAlarm = true;
      } else if (this.showColor === true) {
        this.showAlarm = false;
      }
    },
    submitForm() {
      const cartItems = this.$store.state.shoppingCart;
      if (cartItems.length === 0) {
        this.noItemsinCart = true;
      } else {
        this.$store.commit("setUserEmail", this.enteredEmail);
        this.$store.commit("setFullName", this.enteredName);
        // console.log("state", this.$store.state);

        return this.$router.push("/payment");
      }
    },
  },
};
</script>

<style scoped>
.check_out {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  padding-top: 100px;
  min-height: 100vh;
  background: white;

}

.check_out_steps {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  color: rgb(151, 150, 150);
  font-weight: 400;
}

.check_out_steps > p > span {
  font-weight: 700;
  color: rgb(0, 0, 0);
}

.check_out_steps > hr {
  border: none;
  height: 1px;
  width: 10%;
  background-color: rgb(150, 150, 150);
}

.check_out_form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  margin-top: 40px;
  padding: 40px;
  border-radius: 10px;
  color: black;
  font-size: 24px;
  width: 400px;
    background: linear-gradient(90deg, rgb(235, 235, 235) 5%, rgb(214, 214, 214) 71%);

}

.check_out_form > img {
  width: 40px;
  margin-bottom: 10px;
}

.check_out_input {
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  width: 350px;
  font-size: 12px;
}

.check_out_input > label {
  margin-bottom: 5px;
  margin-top: 20px;
  color: rgb(7, 7, 7);
  font-weight: 300;
}

.check_out_input > input {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 2px;
  font-family: 'Open Sans';
  color: rgb(0, 0, 0);
  padding-left: 12px;
}
input:focus {
        outline: none;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgb(95, 95, 95);
  font-family: 'Open Sans';
  opacity: 1; /* Firefox */
}

._submit {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 100px;
  border: none;
  transition: ease-in-out 100ms;
  background-color: #a7a7a7;
  color: white;
  padding-left: 25px;
  margin-top: 30px;
}

.active {
  background-color: rgb(41, 41, 196);

}
.active:hover {
  transform: scale(1.03);
  cursor: pointer;
}

.button_img {
  height: 20px;
  margin: 13px 14px;
  transform: rotateZ(-90deg);
}

@media (max-width: 550px) {

  .check_out {
    padding-bottom: 0;
  }

.check_out_form {
width: 320px;
}
.check_out_input {
  font-size: 12px;
  margin-right: 12px;
}
.check_out_input > input {
  background-color: rgba(124, 124, 124, 0.123);
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 2px;
  font-family: "Josefin Sans", "font2", "Helvetica" "sans-serif" inherit;
  color: white;
  padding-left: 12px;
}
.check_out_steps {
  width: 85%;
  font-size: 12px;
}

}

@media (max-width: 450px) {

  .check_out {
    padding-bottom: 0;
  }

.check_out_form {
width: 270px;
}
.check_out_input {
  font-size: 12px;
  margin-left: 50px;
}
.check_out_input > input {
  background-color: rgba(124, 124, 124, 0.123);
  width: 85%;
}
.check_out_steps {
  width: 80%;
}
}

@media (max-width: 370px) {

  .check_out {
    padding-bottom: 0;
  }

.check_out_form {
width: 240px;
}
.check_out_input {
  font-size: 12px;
  max-width: 100%;
  margin-left: -25px;
}
.check_out_input > input {
  background-color: rgba(124, 124, 124, 0.123);
  width: 110%;
}
.check_out_steps {
  width: 80%;
}
}


</style>
