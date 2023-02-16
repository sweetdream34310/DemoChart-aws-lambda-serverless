<template>
    <div class="contest_top_banner">
        <h2>Deadline: <span>30.April.2022</span></h2>
        <div class="contest_top_objects">
            <div class="contest_top_object_1">
                <Countdown 
                countdownSize="1.5rem"
                labelSize="9px"
                :flipAnimation="false"
                mainColor="white"
                deadline="2022-05-18 0:0:0"
                labelColor="white"
                />
            </div>
             <div class="contest_top_object_2">
                <img src="/tiktok_youtube.png" alt="Democharts Tiktok" />
                <p>Enter by posting your 
        video on TikTok or Yotube & 
        <b>tag @democharts</b></p>
            </div>
             <div class="contest_top_object_3">
                <img src="/present.png" alt="" />
                <h3>Prizes Worth: <br/>
                    <span>$ 5.000</span></h3>
            </div>
        </div>
    </div>
</template>

<script>
import {Countdown} from 'vue3-flip-countdown'
export default {
  components: {
    Countdown
  }
}
</script>

<style scoped>
.contest_top_banner {
    /* background-color: #111111; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    padding-bottom: 75px;
    padding-top: 50px;
    margin-bottom: 20px;
}

.contest_top_banner > h2 {
    color: white;
    font-size: 38px;
    margin-bottom: 40px;
}

.contest_top_banner > h2 > span {
    font-weight: 300;
}



.contest_top_banner > h3 {
    color: white;
    font-size: 34px;
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
    background-color: rgba(221, 221, 221, 0.082);
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
</style>