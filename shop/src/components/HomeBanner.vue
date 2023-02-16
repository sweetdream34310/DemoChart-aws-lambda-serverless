<template>
  <div class="home_banner">
    <div class="home_banner_content">
      <img :src="img" alt="Pro Pack">
      <h1>{{title}}</h1>
         <h4>{{text}}</h4>
      <hr />
    </div>
    <div class="home_banner_bar">
       <div class="home_banner_bar_2">
         <router-link to="/free" class="fake_button_3" id="hover" >Free Download</router-link>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'text', 'img'],
}
</script>

<style scoped>

.home_banner {
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  background-color: rgb(0, 0, 0);
  justify-items: center;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 80px;
  max-width: 100vw;
  z-index: 20;
}

.home_banner_content > img {
  height: 34px;
  margin-bottom: -40px;
  margin-top: 40px;
}

.home_banner_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  justify-content: center;
}

.home_banner_content > h1 {
  color: #ffffff;
  font-size: 82px;
  text-transform: uppercase;
  font-weight: 700;
  font-family: "font1", sans-serif;
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


@keyframes cool-shadow {
   0% { text-shadow: 0 0 -10px #dadada; 
        transform: scale(1);
    
    }
    5% {
        opacity: 1;
    }
      6% {
        opacity: 0;
    }
     7% {
        opacity: 1;
        color: var(--democharts);
    }
      9% {
        opacity: 0;
            color: #e0e259;
    }
      10% {
        opacity: 1;
    }


  40% { text-shadow: 0 0 20px #d9e626; }

    12% {
        opacity: 1;
    }
     13% {
        opacity: 0;
    }
     14% {
        opacity: 1;
    }

  50% { text-shadow: 0 0 20px #e6d92f; }
  100% { 
      text-shadow: 0 0 -10px #d4e025; }
    
}

.home_banner_content > h4 {
  color: white;
  text-align: center;
  font-weight: 200;
  font-size: 24px;
  margin-top: -35px;
}

.home_banner_content > hr {
  align-self: center;
  width: 100px;
  color: white;
  background-color: white;
  border: none;
  margin: 5vh 0 5vh 0;
}

.home_banner_bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -60px;
}



.fake_button_3 {
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 10px;
    padding: 18px 45px 18px 45px;
    border-radius: 100px;
    font-size: 16px;
    border: none;
    transition: 200ms ease-in-out;
    text-decoration: none;
    color: white;
    background-color: #E73A39;
}

.fake_button_3:hover {
  transform: scale(1.03) !important;
}


@media (max-width: 800px) {

  .home_banner {
    padding-top: 40px;
      margin-bottom: 0px;
      min-height: 600px;
  }


  .home_banner_content {
        margin: 0;
        flex-direction: column;

  }
  .home_banner_content > h1 {
    font-size: 72px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
}

@media (max-width: 700px) {


  .home_banner_content > h1 {
    font-size: 58px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
  .home_banner_content > img {
    margin-top: 50px;
    margin-bottom: -10px;
  }
}

@media (max-width: 600px) {

.home_banner {
  margin-bottom: 50px;
}

  .home_banner_content {
        margin: 0;

  }
  .home_banner_content > h1 {
    font-size: 58px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    margin-top: -20px;
    max-width: 80vw;
  }
}

@media (max-width: 510px) {

 .home_banner {
    margin-bottom: -200px !important;
  }
  .home_banner_content > h1 {
    font-size: 42px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
}

@media (max-width: 400px) {

  .home_banner {
    padding-bottom: 50px;
  }


  .home_banner_content {
        margin: 0;


  }
  .home_banner_content > h1 {
    font-size: 42px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
    margin-bottom: 35px;
  }

}

@media (max-width: 370px) {

  .home_banner {
    padding-bottom: 100px;
  }

  .home_banner_content {
        margin: 0;

  }
  .home_banner_content > h1 {
    font-size: 40px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
}

</style>