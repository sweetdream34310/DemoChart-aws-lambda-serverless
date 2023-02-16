<template>
<div class="titles_wrapper">
  <h2 class="music_samples_title"> {{title}} </h2>
  <!-- <hr> -->
</div>
<div class="samples_wrapper"> 
  <div class="music-sample-con">
  <!--   <div class="music-sample-pic">
      <img :src="img" alt="" />
    </div> -->
    <div class="music-samples">
<!--      <Surfer :id-key="'1'" :file-path="'../Urban_Beats/Latin1.mp3'" />-->
<!--      <WaveSurfer :id-key="'2'" :file-path="'../Urban_Beats/Latin2.mp3'" />-->
<!--      <WaveSurfer :id-key="'3'" :file-path="'../Urban_Beats/Sad1.mp3'" />-->
<!--      <WaveSurfer :id-key="'4'" :file-path="'../Urban_Beats/Sad2.mp3'" />-->
<!--      <WaveSurfer :id-key="'5'" :file-path="'../Urban_Beats/Urban1.mp3'" />-->
<!--      <WaveSurfer :id-key="'6'" :file-path="'../Urban_Beats/Urban2.mp3'" />-->
<!--      -->

      <WaveSurfer
        v-for="(url, key) in fileUrls"
          :file-path="url" :id-key="`${key}`" :genre="setGenre[key]"
          >f
      </WaveSurfer>

    </div>
  </div>
  </div>
</template>

<script>
import WaveSurfer from "../components/WaveSurferComp.vue";

export default {
  components: { WaveSurfer },
  props: {
    img: {
      type: String,
      required: true,
    },
    fileUrls: {
      type: Array,
      required: true,
    },
     setGenre: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
    }
  },
};
</script>

<style scoped>

.titles_wrapper > hr {
  width: 250px;
  border: none;
  height: 1px;
  background-color: rgb(54, 54, 54);

}

.samples_wrapper {
  margin-left: 6vw;
  margin-right: 6vw;
  padding: 2vw;
  border-radius: 25px;
  margin-bottom: 100px;

}

.music_samples_title {
  align-items: center;
  margin-left: 6vw;
  margin-right: 6vw;
  color: rgb(250, 250, 250);
  font-size: 32px;
  font-weight: 400;
  margin-top: 100px;
      font-family: 'font1';

  background: linear-gradient(to right, #E73A39 1%, #c7df3f 40%, #E73A39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 10s linear infinite, cool-shadow 4s ;
  display: inline-block;
  max-width: 85%;
  z-index: 1;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}



.music-sample-con {
  display: flex;
  flex-direction: row;
}

img {
  width: 400px;
  height: 400px;
}

.music-samples {
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex: 1; */
  /* flex: 0 33.33%; */
  flex-wrap: wrap;
  width: 100%;
  /* overflow: hidden; */
  box-sizing: border-box;
  
}

@media (max-width: 950px) {
.samples_wrapper {
  background-color: rgb(0, 0, 0);
  margin-left: 3vw;
  margin-right: 3vw;
  padding: 2vw;
  border-radius: 25px;
  margin-bottom: 0px;

}
.music_samples_title {
  font-size: 32px;
    margin-top: 70px;
  }

  .music-samples {
    margin-bottom: 50px;
  }
}

@media (max-width: 450px) {
.samples_wrapper {
  background-color: rgb(0, 0, 0);
  margin-left: 6vw;
  margin-right: 6vw;
  padding: 2vw;
  border-radius: 25px;
}
.music_samples_title {
  font-size: 32px;
  }
}
</style>
