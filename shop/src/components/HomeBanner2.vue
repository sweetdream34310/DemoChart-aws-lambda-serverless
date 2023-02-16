<template>


  <div class="home_banner">
    <div class="home_banner_content">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt="">
      <div class="stars"></div>
<div class="twinkling"></div>
<div class="clouds"></div>
      <h1>Presenting: Micro Beats.</h1>
         <h4>Available for Democharts Members only, available for a limited time.</h4>
      <hr />
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
  height: 75vh;
  background-color: rgb(0, 0, 0);
  justify-items: center;
  align-items: center;
  margin-top: 9vh;
  max-width: 100vw;
}

.home_banner_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  z-index: 2;
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




@media (max-width: 800px) {


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
    font-size: 72px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
}

@media (max-width: 600px) {


  .home_banner_content {
        margin: 0;

  }
  .home_banner_content > h1 {
    font-size: 68px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    margin-top: -20px;
    max-width: 80vw;
  }
}

@media (max-width: 500px) {


  .home_banner_content > h1 {
    font-size: 58px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
}

@media (max-width: 400px) {


  .home_banner_content {
        margin: 0;

  }
  .home_banner_content > h1 {
    font-size: 52px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
}

@media (max-width: 370px) {


  .home_banner_content {
        margin: 0;

  }
  .home_banner_content > h1 {
    font-size: 50px;
  }

    .home_banner_content > h4 {
    font-size: 18px;
    max-width: 80vw;
  }
}




@keyframes move-background {
  from {
		-webkit-transform: translate3d(0px, 0px, 0px);
	}
	to { 
		-webkit-transform: translate3d(1000px, 0px, 0px);
	}
}
@-webkit-keyframes move-background {
  from {
		-webkit-transform: translate3d(0px, 0px, 0px);
	}
	to { 
		-webkit-transform: translate3d(1000px, 0px, 0px);
	}
}

@-moz-keyframes move-background {    
	from {
		-webkit-transform: translate3d(0px, 0px, 0px);
	}
	to { 
		-webkit-transform: translate3d(1000px, 0px, 0px);
	}
}

    @-webkit-keyframes move-background {
	from {
		-webkit-transform: translate3d(0px, 0px, 0px);
	}
	to { 
		-webkit-transform: translate3d(1000px, 0px, 0px);
	}
}

.background-container{
	position: fixed;
	top: 0;
	left:0;
	bottom: 0;
	right: 0;
}

.stars {
 background: black url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat;
 position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: block;
  	z-index: 0;
    max-height: 600px;
}

.twinkling{
	width:10000px;
	height: 100%;
	background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png") repeat;
	background-size: 1000px 1000px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    
    -moz-animation:move-background 70s linear infinite;
  -ms-animation:move-background 70s linear infinite;
  -o-animation:move-background 70s linear infinite;
  -webkit-animation:move-background 70s linear infinite;
  animation:move-background 70s linear infinite;
	
}

.clouds{
	width:10000px;
	max-height: 800px;
	background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/clouds_repeat.png") repeat;
	background-size: 1000px 1000px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;

   -moz-animation:move-background 150s linear infinite;
  -ms-animation:move-background 150s linear infinite;
  -o-animation:move-background 150s linear infinite;
  -webkit-animation:move-background 150s linear infinite;
  animation:move-background 150s linear infinite;
}
img{
  top: 150px;
  left: 100px;
  height: 20vh;
  width:20vh;
  position: absolute;
  z-index: 3;
  right: 20px;
}


</style>