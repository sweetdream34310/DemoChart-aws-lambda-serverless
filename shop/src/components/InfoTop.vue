<template>
  <div className="background">
    <div className="foreground">
      <div className="banner_left">
        <!-- <p>PRO PACKS</p> -->
        <h1>
          <span>Next level sound</span> <br />
          is our mission <br />
        </h1>
        <h4>Learn More</h4>
        <img src="down.svg" alt="" />
      </div>
    </div>
    <!-- <img className="video_clip" src="/Automat_2.jpg" alt=""> -->

    <video className="video_clip" autoplay loop playsinline muted>
      <source src="/floating.mp4" type="video/mp4" />
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
  align-items: center;
  min-height: 700px;
  max-height: 710px;
  margin-top: 60px;
  margin-bottom: -50px;
}

.banner_left {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100vw;
  z-index: 1;
  color: white;
}

.banner_left > img {
  width: 40px;
  filter: invert(1);
  opacity: 1;
  animation: beat 1.8s infinite;
}

.banner_left > h1 > span {
  font-weight: 700;
  background: linear-gradient(to right, #e73a39 1%, #c7df3f 40%, #e73a39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 10s linear infinite, cool-shadow 4s;
  display: inline-block;
  z-index: 1;
  font-family: "font1";
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}

@keyframes beat {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
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
  font-size: 56px;
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
  width: 80vw;
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
  margin-top: 190px;
  opacity: 0.2;
  height: 800px;
  object-fit: cover;
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
    height: 100vh;
    margin-top: 140px;
  }
}
</style>
