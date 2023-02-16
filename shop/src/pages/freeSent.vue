<template>
    <div class="free_screen">
^   <div class="free_screen_left">
    <img src="/DC_Edit_4.jpg" alt="" />
    </div>
    <div class="free_screen_right">
        <div class="free_screen_inputs">
        <img src="/mail.gif" alt="mail sent">
         <h2>AMAZING.</h2>
         <h3>Your Pro Pack has been sent to your inbox. <br> Please make sure to check your spam.</h3>
        <h3>It can take 5-10 minutes till you receive the pack. <br> All mails are sent with love ♥️</h3>
         <router-link to="/" class="fake_button">Back to home</router-link>
        </div>
    </div>
    </div>
</template>


<script>
import SubscribeForm from "../components/SubscribeForm.vue";

export default {
    components: {
    SubscribeForm,
}
}

</script>



<style scoped>
.free_screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.free_screen_left {
    display: flex;
     width: 55%;
     height: 100%;
}

.free_screen_left > img {
    display: flex;
     width: 100%;
     background-color: green;
     height: 100%;
}
.free_screen_right {
    align-items: center;
    justify-content: center;
    width: 45%;
}

.free_screen_inputs > img {
    width: 160px;
    margin-bottom: -25px;
    margin-top: -50px;
}

.free_screen_inputs > h2 {
    font-family: 'font1';
    color: #E73A39;
    font-size: 42px;
    margin: 20px 20px 10px 20px;
}

.free_screen_inputs > h3 {
    font-size: 18px;
    font-weight: 300;
    color: white;
    margin: 0px 20px 30px 20px;
    line-height: 120%;
}

.fake_button {
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px 30px 10px 30px;
    border-radius: 100px;
    font-size: 14px;
    border: none;
    transition: ease-in-out 200ms;
    text-decoration: none;
    color: white;
    border: 1px solid white;
    transition: ease-in-out 200ms;
}

.fake_button:hover {
    transform: scale(1.03);
    border-color: #E73A39;
    cursor: pointer;
}

@media (max-width: 1000px) {
    .free_screen_left {
    display: none;
}
.free_screen_right {
     width: 100%;
     margin-top: -100px;
}
.free_screen_inputs > h3 {
    font-size: 18px;
    font-weight: 300;
    color: white;
    margin: 0px 0px 30px 0px;
    line-height: 120%;
}
}
</style>