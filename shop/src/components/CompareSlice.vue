<template>
  <div class="compare_slices">
    <div class="compare_slice_box">
      <div class="compare_slice_wrapper">
        <h3>Standard Samples</h3>
        <div class="compare_slice_texte">
          <div class="compare_slice_text">
            <img src="/x.png" alt="Single Audio Files" />
            <p>Single audio files</p>
          </div>
          <div class="compare_slice_text">
            <img src="/x.png" alt="Music Samples" />
            <p>Not exclusive</p>
          </div>
          <div class="compare_slice_text">
            <img src="/x.png" alt="Melody Loops" />
            <p>Random audio quality</p>
          </div>
          <div class="compare_slice_text">
            <img src="/x.png" alt="Guitar" />
            <p>No money back guarantee</p>
          </div>
        </div>
      </div>
    </div>
    <div class="compare_slice_box" id="compare_box_2">
      <div class="compare_slice_wrapper">
        <h3><span class="compare_democharts"> Pro Packs</span></h3>
        <div class="compare_slice_texte">
          <div class="compare_slice_text">
            <img src="/Check1.png" alt="Limited and Rare" />
            <p>Multiple, matched audio files</p>
          </div>
          <div class="compare_slice_text">
            <img src="/Check1.png" alt="" />
            <p>Strictly limited and super rare</p>
          </div>
          <div class="compare_slice_text">
            <img src="/Check1.png" alt="" />
            <p>Pro audio quality</p>
          </div>
          <div class="compare_slice_text">
            <img src="/Check1.png" alt="" />
            <p>30 days money back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.compare_slices {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 100px;
}

.compare_slice_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32%;
  border-radius: 15px;
  min-height: 450px;
  background-color: #0f0f0f;
}

.compare_slice_wrapper {
  width: 75%;
}

#compare_box_2 {
  background-color: black;
  margin-left: 5vw;
  border: 1px solid rgb(255, 255, 255);
}

.compare_slice_texte {
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  margin-bottom: 30px;
}

.compare_slice_text > img {
  height: 35px;
  margin-right: 20px;
}

.compare_slice_text {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 90%;
  color: white;
  margin-top: 2px;
  margin-bottom: 2px;
  min-height: 65px;
}

.compare_slice_text > p {
  text-align: left;
  font-weight: 300;
  font-size: 18px;
}

.compare_slice_wrapper > h3 {
  font-family: "font1", "Josefin Sans";
  text-align: left;
  font-size: 32px;
  color: white;
  margin-top: 40px;
  margin-right: 40px;
}

.compare_democharts {
  background: linear-gradient(to right, #e73a39 1%, #c7df3f 40%, #e73a39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite, cool-shadow 4s;
  display: inline-block;
  z-index: 2;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}

@media (max-width: 1200px) {
  .compare_slice_box {
    width: 35%;
  }
}

@media (max-width: 1000px) {
  .compare_slice_box {
    width: 40%;
  }

  .compare_slice_wrapper > h3 {
    font-size: 28px;
  }
}

@media (max-width: 800px) {
  .compare_slices {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .compare_slice_box {
    width: 60%;
  }

  #compare_box_2 {
    margin-left: 0px;
    margin-top: 30px;
  }

  .compare_slice_wrapper > h3 {
    font-size: 34px;
    margin-bottom: 40px;
  }
}

@media (max-width: 800px) {
  .compare_slice_box {
    width: 80%;
  }
}

@media (max-width: 500px) {
  .compare_slice_box {
    width: 85%;
    min-height: none;
  }
  .compare_slice_wrapper > h3 {
    font-size: 28px;
  }
  .compare_slice_box {
    margin-top: -40px;
    margin-bottom: 20px;
}
}

@media (max-width: 380px) {
  .compare_slice_wrapper > h3 {
    font-size: 26px;
  }

}
</style>
