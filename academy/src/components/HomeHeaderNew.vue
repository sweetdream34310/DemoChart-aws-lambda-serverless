<template>


  <div class="home_banner">
    <div class="home_banner_content">
          <h4>The free online learning ressource for music artists.</h4>
      <h1>NEWCOMER MUSIC ACADEMY</h1>
    </div>

  </div>
</template>

<script>
export default {
  name: "HomeBanner"
}
</script>

<style scoped>
.home_banner {
  display: flex;
  min-height: 50vh;
  background-color: black;
  justify-items: center;
  align-items: center;
  margin-top: 9vh;
  max-width: 100vw;
}

.home_banner_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  justify-content: center;
  height: 100%;
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
  text-align: center;
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
  font-family: 'Josefin Sans';
  color: white;
  text-align: center;
  font-weight: 200;
  font-size: 24px;
  margin-bottom: 20px;
}



@media (max-width: 1200px) {

.home_banner {
    align-items: center;
        justify-content: center;
        min-height: 50vh;
}
  .home_banner_content {
        margin: 0;
  }
  .home_banner_content > h1 {
    font-size: 62px;
    margin-top: 0;
  }

    .home_banner_content > h4 {
    font-size: 24px;
    margin: 0 30px 0 30px;
    margin-top: 0;
  }
}

@media (max-width: 800px) {


  .home_banner_content > h1 {
    font-size: 62px;
    margin-top: 0;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    margin-top: 0;
    max-width: 80vw;
  }
}

@media (max-width: 700px) {


  .home_banner_content > h1 {
    font-size: 54px;
    margin-top: 0;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    margin-top: 0;
    max-width: 80vw;
  }
}

@media (max-width: 600px) {

.home_banner {
    align-items: center;
        justify-content: center;
        min-height: 40vh;
}

  .home_banner_content > h1 {
    font-size: 48px;
    margin-top: 0;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    margin-top: 0;
    max-width: 80vw;
  }
}

@media (max-width: 500px) {

  .home_banner_content {
      flex-direction: column-reverse;
  }

  .home_banner_content > h1 {
    font-size: 34px;  }

    .home_banner_content > h4 {
    font-size: 18px;
    margin-top: 10px;
    max-width: 90vw;
  }
}

@media (max-width: 370px) {


  .home_banner_content {
        margin: 0;
        flex-direction: column-reverse;

  }
  .home_banner_content > h1 {
    font-size: 32px;
    margin-top: 0;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    margin-top: 10px;
    max-width: 80vw;
    line-height: 120%;
  }
}

</style>