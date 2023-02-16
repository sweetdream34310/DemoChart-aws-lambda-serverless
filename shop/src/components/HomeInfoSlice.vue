<template>
  <div class="home_info_slice">
    <div class="home_info_slice_container" id="container_1">
      <img src="/public/DC_Icon_3.png" alt="" />
      <h2>Members Only</h2>
      <h4>Our Products are available for Democharts Members only. So if you are seing this screen - you’re one of the lucky ones.</h4>
    </div>
    <div class="home_info_slice_container" id="container_2">
       <img src="/public/DC_Icon_2.png" alt="" />
      <h2>Limited Availability</h2>
      <h4>Tired of using samples that thousands of other artists used before? Our packs are limited to 499 downloads. So better be fast.</h4>
    </div>
    <div class="home_info_slice_container" id="container_3">
       <img src="/public/DC_Icon_1.png" alt="" />
      <h2>Premium Audio Quality</h2>
      <h4>We only work with top quality producers and soundengineers. This way we can garantee you superb audio quality for your creations.

      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeInfoSlice"
}
</script>

<style scoped>
.home_info_slice {
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0 0 0;
}

.home_info_slice_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2% 0 2% 0;
  width: 28vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin: 0px 5px 20px 5px;
  border: 1px solid rgb(29, 29, 29);
  border-radius: 5px;
}


.home_info_slice_container > h2{
  text-align: center;
  font-size: 24px;
  max-width: 70%;
  margin-bottom: 10px;
  color: white;
    font-family: 'font2';


}

.home_info_slice_container > img {
  width: 200px;
}

.home_info_slice_container > h4 {
  max-width: 20vw;
  text-align: center;
  color: white;
  font-weight: 300;

}

/* #container_1 {
  background-image: linear-gradient(rgb(0, 0, 0), rgba(0, 0, 0, 0.301)), url("/members_clube.jpg");
}

#container_2 {
  background-image: linear-gradient(rgb(0, 0, 0), rgba(0, 0, 0, 0.301)), url("/producer.jpg");

}

#container_3 {
  background-image: linear-gradient(rgb(0, 0, 0), rgba(14, 14, 14, 0.301)), url("/high_quality.jpg");
} */


#container_4 {
  background-image: linear-gradient(rgb(0, 0, 0), rgba(0, 0, 0, 0.301)), url("/Musiker.jpg");
}

#container_5 {
  background-image: linear-gradient(rgb(0, 0, 0), rgba(0, 0, 0, 0.301)), url("/player.jpg");

}

#container_6 {
  background-image: linear-gradient(rgb(0, 0, 0), rgba(0, 0, 0, 0.301)), url("/Klavier.jpg");
}

@media (max-width: 1000px) {
  .home_info_slice {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .home_info_slice_container {
    width: 86%;
    margin: 20px 0 0 0;
  }
  .home_info_slice_container > h2{
  text-align: center;
  font-size: 2.5rem;
  max-width: 90%;

}

.home_info_slice_container > h4 {
  max-width: 50vw;
  text-align: center;
  color: white;
  font-weight: 300;

}
}


@media (max-width: 600px) {
  .home_info_slice {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .home_info_slice_container {
    width: 86%;
    margin: 20px 0 0 0;
  }
  .home_info_slice_container > h2{
  text-align: center;
  font-size: 2.0rem;
  max-width: 90%;
  margin: 10px 10px 10px 10px

}

.home_info_slice_container > h4 {
  max-width: 70vw;
  font-size: 18px;
  line-height: 130%;
 
}
}

</style>