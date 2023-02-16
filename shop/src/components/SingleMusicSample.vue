<template>
  <div class="titles_wrapper">
    <h2 class="music_samples_title">{{ title }}</h2>
    <hr />
  </div>
  <div class="samples_wrapper">
    <div class="music-sample-con">
      <!--   <div class="music-sample-pic">
      <img :src="img" alt="" />
    </div> -->
      <div class="music-samples">
        <div class="compare_slice_box">
          <div class="compare_slice_wrapper">
            <div class="artist_header">
              <div class="main_info">
                <div>
                  <img class="artist_img skeleton" :src="artist.img" />
                </div>
                <div style="margin-left: 10px">
                  <p class="artist_text">{{ artist.artist_name }}</p>
                  <p class="artist_text">
                    {{ artist.artist_desc }} / {{ artist.country }}
                  </p>
                </div>
              </div>
              <p class="artist_production">
                Production Time: {{ artist.production_time }}
              </p>
            </div>
            <p class="artist_text_2">"{{ artist.quote }}"</p>
            <div class="compare_slice_texte">
              <WaveSurfer :file-path="artist.audio_file" :genre="artist.audio_filename"
                >f
              </WaveSurfer>
            </div>
          </div>
        </div>
        <!--      <Surfer :id-key="'1'" :file-path="'../Urban_Beats/Latin1.mp3'" />-->
        <!--      <WaveSurfer :id-key="'2'" :file-path="'../Urban_Beats/Latin2.mp3'" />-->
        <!--      <WaveSurfer :id-key="'3'" :file-path="'../Urban_Beats/Sad1.mp3'" />-->
        <!--      <WaveSurfer :id-key="'4'" :file-path="'../Urban_Beats/Sad2.mp3'" />-->
        <!--      <WaveSurfer :id-key="'5'" :file-path="'../Urban_Beats/Urban1.mp3'" />-->
        <!--      <WaveSurfer :id-key="'6'" :file-path="'../Urban_Beats/Urban2.mp3'" />-->
        <!--      -->
      </div>
    </div>
  </div>
</template>

<script>
import WaveSurfer from "../components/WaveSurferComp.vue";

export default {
  components: { WaveSurfer },
  props: {
    artist: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
  created() {
    console.log("MMMMMMMM", this.artist);
  },
};
</script>

<style scoped>
.artist_production {
  font-size: 15px;
  color: white;
  font-family: "Open Sans";
  font-weight: 600;
}

.main_info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.compare_slice_box {
  width: 57%;
  min-height: 350px;
  padding: 10px 70px;
}

.compare_slice_wrapper {
  width: 100%;
}

.artist_text {
  color: white;
  font-size: 17px;
  text-align: left;
  margin-left: 20px;
  font-weight: 500;
}
.artist_header {
  display: flex;
  justify-content: space-between;
}
.artist_img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
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
  font-size: 24px;
  font-weight: 400;
  margin-top: 100px;
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
    font-size: 24px;
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
    font-size: 24px;
  }
}
</style>
