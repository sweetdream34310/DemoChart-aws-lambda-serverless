<template>
  <div className="review">
    <h2>What other producers say:</h2>
    <div style="display: flex; justify-content: center" class="review_flexer">
      <div v-for="(artist, key) in trippleArtists" className="reviews">
        <div className="review_wrapper">
          <img class="skeleton" :src="artist.img" alt="" />
          <h4>{{ artist.artist_name }}</h4>
          <p>{{ artist.artist_desc }} / {{ artist.country }}</p>
          <div class="artist_review">
          <h3>"{{ artist.quote }}"</h3>
          </div>
          <WaveSurfer
            :id-key="`${key + 10}`"
            :file-path="artist.audio_file"
            :genre="artist.audio_filename"
            >
          </WaveSurfer>
                  <h5>Production Time: {{artist.production_time}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WaveSurfer from "../components/WaveSurferComp.vue";

export default {
  components: { WaveSurfer },
  props: {
    trippleArtists: {
      type: Array,
    },
  },
  created() {
    console.log("%%%%%%", this.trippleArtists);
  },
};
</script>

<style scoped>

.artist_review {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}


.review {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  min-height: 550px;
  width: 100%;
}


.review_flexer {
  display: flex;
  flex-wrap: wrap;
}

.review > h2 {
  width: 100vw;
  text-align: center;
  color: white;
  font-size: 32px;
  font-family: 'font1';
  margin-bottom: 50px;
  margin-top: -40px;
}

.reviews {
  display: flex;
}

.artist_review > h3 {
  font-family: 'Open Sans';
  font-size: 14px;
  margin: 10px;  background: linear-gradient(to right, #E73A39 1%, #c7df3f 40%, #E73A39 70%);
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
  max-width: 90%;
  z-index: 1;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}

.review_wrapper {
    background: linear-gradient(90deg, rgb(15, 15, 15) 5%, rgb(17, 17, 17) 71%);
  width: 200px;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: flex-start;
  justify-content: top;
  height: 450px;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 40px 4px;
  margin: 30px;
  margin-bottom: 80px;
}

.review_wrapper > h5 {
  margin-top: 35px;
  font-size: 11px;
  font-weight: 500;
  font-family: 'Open Sans';
}

.review_wrapper > img {
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin-top: 15px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 40px 4px;
  border: 2px solid rgb(255, 255, 255);
}

.review_wrapper > h4 {
  color: white;
  font-size: 14px;
  font-family: "Josefin Sans";
  font-weight: 1000;
}

.review_wrapper > p {
  color: rgba(255, 255, 255, 0.384);
  font-size: 14px;
  margin-top: -10px;
}

.review_wrapper > h3 {
  color: white;
  font-size: 14px;
  font-family: "Open Sans", "Josefin Sans";
  font-weight: 600;
  margin: 20px;
}

.song_path {
  margin-top: 0px;
  width: 90%;
  margin-left: 30px;
}

@media (max-width: 1000px) {
  .review > h2 {
  width: 80vw;
  text-align: center;
  color: white;
  font-size: 32px;
  font-family: 'font1';
  height: 80px;
  margin-top: -40px;
}
.review_wrapper {
  background: linear-gradient(90deg, rgb(15, 15, 15) 5%, rgb(17, 17, 17) 71%);
  width: 240px;
  border: solid 1px white;
  margin-bottom: 20px;
}

.artist_review > h3 {
  font-size: 16px;
}
}
@media (max-width: 500px)  {
  .review > h2 {
  width: 80vw;
  text-align: center;
  color: white;
  font-size: 32px;
  font-family: 'font1';
  height: 80px;
  margin-top: -70px;
}
}
</style>
