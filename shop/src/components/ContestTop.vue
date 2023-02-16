<template>
    <div class="contest_top_banner">
        <!-- <h2>Urban Producers Needed!</h2> -->
        <h3>Join our <span>#10minbeat</span> challenge to win amazing prices!</h3>
                <div class="fake_button" @click="emitScroller"> <p>Join the challenge for free</p> </div>

       <!--  <div class="contest_top_objects">
            <div class="contest_top_object_1">
                <Countdown 
                countdownSize="1.2rem"
                labelSize="9px"
                :flipAnimation="false"
                mainColor="white"
                deadline="2022-05-18 0:0:0"
                labelColor="white"
                />
            </div>
             <div class="contest_top_object_2">
                <img src="tiktok_youtube.png" alt="" />
                <p>Enter by posting your 
        video on TikTok or Yotube & 
        <b>tag @democharts</b></p>
            </div>
             <div class="contest_top_object_3">
                <img src="present.png" alt="" />
                <h3>Prizes Worth: <br/>
                    <span>$ 5.000</span></h3>
            </div>
        </div> -->
    </div>
</template>

<script>
import {Countdown} from 'vue3-flip-countdown'
export default {
  components: {
    Countdown,
  },
  methods: {
           emitScroller() {
             this.$emit('emit-scroller')
        },
  }
}
</script>

<style scoped>
.contest_top_banner {
    background-color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
    color: white;
    padding-bottom: 30px;
    margin-bottom: 20px;
box-shadow: rgba(255, 255, 255, 0.25) 0px 2px 10px -1px, rgba(255, 255, 255, 0.3) 0px 1px 3px -1px;
}

.contest_top_banner > h2 {
    color: white;
    font-size: 28px;
    margin-bottom: -10px;
}


.contest_top_banner > h3 {
    color: white;
    font-size: 20px;
    font-weight: 300;
}


.contest_top_banner > h3 > span {
    color: white;
    font-size: 32px;
    font-weight: 700;
}

.contest_top_objects {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
}

.contest_top_object_1 {
    font-family: 'font1';
    width: 340px;
}

.contest_top_object_2 {
    margin: 10px;
    font-size: 14px;
    width: 340px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(221, 221, 221, 0.226);
    border-radius: 15px;
    padding: 10px;
}

.contest_top_object_2 > img {
    margin: 10px;
    font-size: 14px;
    width: 70px;
    object-fit: contain;
}

.contest_top_object_3 {
    display: flex;
    text-align: left;
    font-size: 14px;
    margin-left: 25px;
}


.contest_top_object_3 > img {
    width: 40px;
    object-fit: contain;
    margin-left: 10px;
    margin-right: 10px;
}

.contest_top_object_3 > h3 > span {
    font-family: 'font1';
    font-size: 18px;
}

.fake_button {
    margin-left: 10px;
    margin-right: 10px;
    padding: 0px 35px 0px 35px;
    border-radius: 100px;
    font-size: 14px;
    border: none;
    transition: ease-in-out 200ms;
    text-decoration: none;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.993);
    transition: ease-in-out 200ms;
    min-width: 100px;
}

.fake_button:hover {
    transform: scale(1.03);
    cursor: pointer;
    color: #ec4141;
}
</style>