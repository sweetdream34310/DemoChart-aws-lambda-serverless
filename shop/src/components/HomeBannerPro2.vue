<template>
  <div class="home_banner">
    <div class="home_banner_content">
      <img :src="img" alt="Pro Packs By Democharts">
      <h1>{{title}}</h1>
         <h4>{{text}}</h4>
      <hr />
        <div class="home_banner_bar_2">
         <router-link to="/free" class="fake_button_3" id="hover" >
        <p>Free download</p> 
        <!-- <img src="/down.svg" alt="Download Free Pack"> -->
         </router-link>
         
      </div>
      
    </div>
    <div class="home_banner_bar">
    </div>
      <img class="home_pic" src="/floating_packs_2.jpg" alt="Hiphop & Rnb">    
  </div>
</template>

<script>
  export default {
    props: ['title', 'text', 'img'],
}
</script>

<style scoped>

.home_pic {
    width: 450px;
    margin-top: 20px;
    margin-right: 15vw;
}

.home_banner {
  display: flex;
background-color: rgb(0, 0, 0);
  justify-items: center;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 80px;
width: 100vw;
  z-index: 20;
}

.home_banner_content > img {
  width: 120px;
  margin-bottom: -40px;
  margin-top: 40px;
}

.home_banner_content {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 50vw;
  justify-content: center;
  margin-left: 15vw;  
}

.home_banner_content > h1 {
  color: #ffffff;
  font-size: 48px;
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
  z-index: 1;
  width: 500px;
  margin-top: 60px;
  text-align: left;
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
  text-align: left;
  font-weight: 300;
  font-size: 24px;
  margin-top: -20px;
  line-height: 140%;
  width: 500px;
}

.home_banner_content > hr {
  align-self: center;
  width: 100px;
  color: white;
  background-color: white;
  border: none;
}

.home_banner_bar {
  display: flex;
  align-items: center;
  justify-content: center;
}



.fake_button_3 {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    font-size: 17px;
    border: none;
    transition: 200ms ease-in-out;
    text-decoration: none;
    color: white;
    margin-top: -20px;
    margin-bottom: 20px;
    width: 200px;
    background-color: #E73A39;
}

.fake_button_3 > img {
    filter: invert(1);
    height: 30px;

}

.fake_button_3:hover {
  transform: scale(1.03) !important;
}

@media (max-width: 1250px) {
  
  .home_banner_content {
    margin-left: 120px;
  }

}

@media (max-width: 1100px) {
  .home_banner {
    display: flex;
    flex-direction: column-reverse;
    padding-top: 70px;
      margin-bottom: 50px;
      min-height: 600px;
  }

  .home_pic {
    width: 400px;
    margin-top: 40px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 40px;

}

.home_banner_content {
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
}



.home_banner_content > h1 {
  text-align: center;
  margin: 50px 4vw 30px 4vw;
}

.home_banner_content > h4 {
  text-align: center;
}


}








@media (max-width: 600px) {

.home_banner {
  margin-bottom: -10px;
}

  .home_banner_content {
        margin: 0;

  }
  .home_banner_content > h1 {
    font-size: 42px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    margin-top: -20px;
    max-width: 80vw;
  }
}

@media (max-width: 510px) {


  .home_banner_content > h1 {
    font-size: 42px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
}

@media (max-width: 450px) {

    .home_pic {
    width: 240px;
    margin-top: 20px;
    margin-bottom: 0px;
}


.home_banner_content > img {
  height: 24px;
  margin-top: 40px;
  object-fit: contain;
}

  .home_banner {
    padding-bottom: 80px;
    min-height: 0;
  }


  .home_banner_content {
        margin: 0;


  }
  .home_banner_content > h1 {
    font-size: 28px;
        width: 350px;
        margin-bottom: 30px;

  }

    .home_banner_content > h4 {
    font-size: 17px;
    width: 300px;
    margin-bottom: 35px;

  }

}

@media (max-width: 370px) {


    .home_pic {
    width: 240px;
    margin-top: 20px;
}

  .home_banner {
    min-height: 0px;
    padding-bottom: 80px;
  }

  .home_banner_content {
        margin: 0;

  }
  .home_banner_content > h1 {
    font-size: 28px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
}

</style>