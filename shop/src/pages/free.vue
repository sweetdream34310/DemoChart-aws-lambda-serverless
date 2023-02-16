<template>
    <div class="free_screen">
^   <div class="free_screen_left">
    <img src="/DC_Edit_4.jpg" alt="edit" />
    </div>
    <div class="free_screen_right">
        <div class="free_screen_inputs">
            <SubscribeForm
            title-small= "FREE PRO PACK:" 
            title-big="Urban and Pop Micro Bundle"
            text="  Never call them Sample Packs! This collection gives you a mix of layered urban sounds mixed with pop & radio classics."
            />
        </div>
    </div>
    </div>
      <Footer />

</template>


<script>
import SubscribeForm from "../components/SubscribeForm.vue";
import Footer from "../components/Footer.vue";


export default {
    components: {
    SubscribeForm,
    Footer,
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


@media (max-width: 1000px) {
    .free_screen {
    display: flex;
    flex-direction: column;
}

.free_screen_left {
    display: flex;
     width: 80%;
     height: 100%;
     margin-top: 30px;
     margin-bottom: -25px;
}

.free_screen_left > img {
    display: flex;
     width: 100%;
     height: 100%;
}
.free_screen_right {
    align-items: center;
    justify-content: center;
     width: 85%;
     padding-bottom: 100px;
}
}
</style>