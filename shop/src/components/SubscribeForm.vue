<template>
<form method="POST" action="https://democharts.activehosted.com/proc.php" id="_form_1_" class="_form _form_1 _inline-form  _dark" novalidate>
    <input type="hidden" name="u" value="1" />
    <input type="hidden" name="f" value="1" />
    <input type="hidden" name="s" />
    <input type="hidden" name="c" value="0" />
    <input type="hidden" name="m" value="0" />
    <input type="hidden" name="act" value="sub" />
    <input type="hidden" name="v" value="2" />
    <input type="hidden" name="or" value="07b98b1718362a84c041eee93e70c8b4" />
    <div class="_form-content">
      <div class="_form_element" >
        <div class="_form-title"> 
         <span class="moving_font">{{titleSmall}} </span><br> {{titleBig}} 
        </div>
      </div>
      <div class="_form_element"  >
        <div class="_html-code">
          <p class="subscribe_titel_2">
          {{text}}
          </p>
        </div>
      </div>
      <div class="_form_element" >
        <label for="firstname" class="subscribe_titel">
          Funny Nickname*
        </label>
        <div class="_field-wrapper">
          <input type="text" id="firstname" v-model="enteredName" name="firstname" placeholder="Type in a funny nickname" required/>
        </div>
        <!--  This STARTS the Custom Objects section  -->
        </div>
        <div class="_form_element" >
          <label for="email" class="subscribe_titel">
            Email*
          </label>
          <div class="_field-wrapper">
            <input type="text" id="email" v-model="enteredEmail" name="email" ref="emailInput" placeholder="Type in your email" required/>
          </div>
          <!--  This STARTS the Custom Objects section  -->
          </div>
          <div class="subscribe_newsletter">
              <input type="checkbox" checked="checked" onclick="return false;" />
          <p>I agree to be added to the free bonus club where I can unsubscribe anytime</p>
          </div>
          <div class="_button-wrapper _full_width">
            <button id="_form_1_submit" :class="!showColor ? '_submit' : '_submit active'" type="submit" :disabled="emailValid === false || nameValid === false">
              Download Free Pack 
              <img class="button_img" src="/download.png" alt="" />
            </button>
          </div>
          <div class="_clear-element">
          </div>
        </div>
        <div class="_form-thank-you" style="display:none;">
        </div>
      </form>
</template>


<script>
import { computed } from '@vue/runtime-core';
  export default {
      props: ['titleSmall', 'titleBig','text' ],
      data() {
          return {
              enteredName:'',
              enteredEmail:'',
              showColor: false,
              nameValid: false,
              emailValid: false,
              showAlarm: false,
          }
      },
     watch: {
         enteredName(value) {
           if(value.length > 3) {
               this.nameValid = true;
           } else if (!value.length < 3) {
            this.nameValid = false;
            this.showColor = false;
           }
         },
          enteredEmail(value) {
           if(value.includes('@') && this.nameValid) {
               this.showColor = true;
                this.emailValid = true;
           } else if (!value.includes('@')) {
            this.showColor = false; 
            this.emailValid = false;
           }
         },
           showColor() {
               if(!this.enteredEmail.includes('@')) {
                   this.showColor = false
               }
         }
     },
        methods: {
         alarm() {
             if(this.showColor === false) {
                 this.showAlarm = true
             } else if (this.showColor === true) {
                 this.showAlarm = false
             }
         }
     }
  }
</script>



<style scoped>

.button_img {
  height: 20px;
  margin: 10px 14px;
}


._form-content {
      width: 90%;

}

._form-title {
    color: white !important;
    text-align: left;
    font-size: 42px;
    font-weight: 500;
    font-family: 'font1';
}

._form-title > span {
    font-size: 20px;
    color: #E73939;
}

input:focus, 
textarea:focus, 
select:focus{
        outline: none;
}
._field-wrapper {
    color: white;
    width: 70%;
    margin-bottom: 10px;
        margin-top: 3px;
    
}

._field-wrapper > input {
    background-color: rgba(124, 124, 124, 0.123);
    width: 80%;
    height: 32px;
    border: none;
    border-radius: 2px; 
    font-family: 'Josefin Sans', 'font2', 'Helvetica' 'sans-serif' inherit;
    color: white;
    padding-left: 12px;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgb(228, 228, 228);
  opacity: 1; /* Firefox */
}

.subscribe_titel {
    color: rgb(136, 136, 136);
    text-align: left;
    font-size: 11px;
    font-weight: 400;
}

.subscribe_titel_2 {
    color: white;
    text-align: left;
    margin-bottom: 20px;
    width: 85%;
    line-height: 120%;
    font-size: 18px;
    color: rgb(218, 218, 218);
    font-weight: 300;
}

.subscribe_newsletter {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: rgb(148, 147, 147);
    font-weight: 400;
}

.subscribe_newsletter > input {
    margin-right: 10px;
}
._form-content {
    display: flex;
    flex-direction: column;
    align-items: left;
     text-align: left;
}

._form-element {
    display: flex;
    flex-direction: column;
    align-items: left;
}

._submit {
  display: flex;
  align-items: center;
  justify-content: center;
    margin-top: 10px;
    border-radius: 100px;
    border: none;
    transition: ease-in-out 100ms;
    background-color: #414141;
    color: white;
    padding-left: 25px;
}


.active {
    background-color: #E73939;
}
.active:hover {
    transform: scale(1.03);
    cursor: pointer;
}

.moving_font {
  background: linear-gradient(to right, #E73A39 1%, #c7df3f 40%, #E73A39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite ;
  display: inline-block;
}


@keyframes textclip {
  to {
    background-position: 200% center;
  }
}

@media (max-width: 1000px) {
  ._form-content {
      width: 100%;
}
._field-wrapper > input {
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 3px; 
    font-size: 15px;
}
.subscribe_titel_2 {
    width: 100%;

}
._field-wrapper {
    color: white;
    width: 90%;
    margin-bottom: 10px;
        margin-top: 3px;
    
}
._submit {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    border-radius: 100px;
    border: none;
    transition: ease-in-out 100ms;
    background-color: #414141;
    color: white;
    padding-left: 25px;
    width: 220px;
    height: 45px;
}

}

</style>
