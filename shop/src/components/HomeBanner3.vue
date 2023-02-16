<template>
  <div className="background">
    <div className="foreground">
      <div className="banner_left">
        <p>PRO PACKS</p>
        <h1>
          Your <br />
          next level <br />
          <span>sound packs.</span>
        </h1>
        <div className="banner_left_buttons">
          <router-link className="button_5" to="/"> TRY FOR FREE</router-link>
          <router-link className="button_6" to="/"> ABOUT PRO PACKS</router-link>
        </div>
        <h4>Super Sale 🔥 ends in:</h4>
        <div className="timer_wrapper">
          <div className="timer_comp">
            <!-- //// HERE IS THE COUNTER  -->
            <p>{{ days }}</p>
            <h5>Days</h5>
          </div>
          <hr />
          <div className="timer_comp">
            <p>{{ hours }}</p>
            <h5>Hours</h5>
          </div>
          <hr />
          <div className="timer_comp">
            <p>{{ minutes }}</p>
            <h5>Minutes</h5>
          </div>
        </div>
      </div>

      <div className="banner_right">
        <div className="product_box">
          <div className="product_vid_wrapper">
            <video
              className="video_clipper"
              src="/Web_Export.mp4"
              autoplay
              loop
              muted
              playsinline
            >
              <source src="/Web_Export.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="product_clip_tag">
            <img src="logo.png" alt="" />
            <p>PRO PACK</p>
          </div>
          <h3>Pop Essentials Bundle</h3>
          <h4>1 / 500</h4>
          <router-link class="available_button" to="/urban"> Available </router-link>
        </div>
      </div>
    </div>

    <video
      className="video_clip"
      autoplay
      loop
      muted
      playsinline
      ref="videoRef"
    >
      <source src="/democharts_clip.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  name: "HomeBanner3",
  props: {},
  data() {
    return {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
    };
  },
  created() {
    setInterval(this.countdown, 1000);
  },
  methods: {
    countdown() {
      let countdownDate = new Date("dec 11, 2023 11:22:33").getTime();
      let currentTime = new Date().getTime();
      let diff = countdownDate - currentTime;
      this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    },
  },
};
</script>


<style scoped>


.background {
  width: 100vw;
}

.foreground {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  min-height: 700px;
  max-height: 710px;
  margin-top: 60px;
}

.banner_left {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 9vw;
  width: 50vw;
  z-index: 1;
  color: white;
}

.banner_left > p {
  font-weight: 700;
  color: #e73a39;
  font-family: "font1";
  font-size: 12px;
}

.banner_left > h1 {
  margin-top: 0px;
  font-size: 56px;
  font-family: "font1", "Josefin Sans", "Arial";
}

.banner_left > h1 > span {
  font-size: 72px;
  font-family: "Josefin Sans", "Arial";
  font-weight: 400;
}

.banner_left_buttons {
  display: flex;
  margin-top: -20px;
}

.banner_left > h4 {
  font-weight: 400;
  font-size: 18px;
  margin-top: 80px;
}

.banner_right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50vw;
}

.product_box {
  width: 350px;
  background-color: #202020;
  height: 530px;
  border-radius: 20px;
  z-index: 2;
  text-align: left;
  color: white;
  margin-top: -50px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 40px 4px;
}

.product_box > h3 {
  margin-left: 20px;
  font-weight: 500;
  margin-top: 25px;
}

.product_box > h4 {
  margin-left: 20px;
  font-weight: 400;
  font-size: 12px;
  color: #acacac;
}

.product_vid_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #251f25;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 40px 4px;
  max-height: 800px;
}

.video_clip {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 180px;
  transform: translate(-50%, -50%);
  height: 100vh;
  max-height: 800px;
  margin-top: 190px;
  opacity: 0.4;
  min-height: 798px;
}

.video_clipper {
  position: sticky;
  width: 340px;
  height: 340px;
}

.timer_wrapper {
  display: flex;
  align-items: center;
  width: 230px;
  margin-top: -35px;
}

.timer_wrapper > hr {
  height: 35px;
  background-color: #757575;
  width: 1px;
  border: none;
}

.timer_comp > p {
  font-size: 26px;
  margin-bottom: -24px;
  font-weight: 500;
}

.timer_comp > h5 {
  font-size: 15px;
  font-weight: 500;
  color: #8f8f8f;
}

.product_clip_tag {
  position: absolute;
  margin-top: -40px;
  margin-left: 9px;
  background-color: #ffffff;
  color: black;
  height: fit-content;
  border-radius: 100px;
  height: 32px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product_clip_tag > p {
  font-size: 10px;
  font-weight: 800;
}

.product_clip_tag > img {
  width: 10px;
  border-radius: 100px;
  background-color: #251f25;
  padding: 6px 8px;
  margin-right: 6px;
  margin-left: -8px;
}

.available_button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 32px;
  border: 1px solid rgb(128, 128, 128);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  margin-left: 20px;
  font-size: 13px;
  font-weight: 600;
}

.available_button:hover {
  background-color: #e73a39;
}

.button_6 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 155px;
  height: 44px;
  border: 1px solid rgb(128, 128, 128);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  margin-left: 10px;
  font-size: 13px;
  font-weight: 600;
}

.button_5 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 155px;
  height: 44px;
  background-color: rgb(37, 37, 206);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  font-size: 13px;
  transition: ease-in-out 100ms;
  font-weight: 600;
}

.button_5:hover {
  transform: scale(1.02);
}

.foreground > p {
  color: white;
}

@media (max-width: 900px) {
  .video_clip {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 180px;
    transform: translate(-50%, -50%);
    z-index: 0;
    margin-top: 140px;
  }
  .product_box {
    display: none;
  }

   .banner_right {
    display: none;
  }

.banner_left {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 9vw;
  width: 100vw;
  z-index: 1;
  color: white;
}

.foreground {
  display: flex;
  width: 100vw;
  height: 100%;
  align-items: center;
  max-height: none;
  min-height: none;
  margin-top: 0px;
  margin-bottom: -10px;
}


@media (max-width: 500px) {

.banner_left {
  margin-top: 10vh;
}


.banner_left > h1 {
  margin-top: 0px;
  font-size: 42px;
  font-family: "font1", "Josefin Sans", "Arial";
}

.banner_left > h1 > span {
    font-size: 42px;
}

.banner_left_buttons {
  margin-top: 0px;
}


.button_6 {
  font-size: 11px;
  width: 125px;

}

.button_5 {
  font-size: 11px;
  width: 125px;

}



}
}


</style>
