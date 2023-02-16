<template>
    <div class="artist_banner">
        <img src="/DC_Artists.png" alt="Newcomer Music Artists">
        <h3>JOIN <span class="artist_banner_number">16.000+ </span></h3>
        <h4>NEWCOMER ARTISTS</h4>
        <p>On our platform we want to help you as a newcomer artist to create your next chart hit by simplifying your production process. Join the Club on Tiktok or Instagram: </p>
        <div class="social_icons">
            <div>
                
            </div>
          <a href="https://www.instagram.com/democharts" target="_blank"> <img class="icon_1" src="/insta.svg" alt=""> </a>
           <a href="https://www.tiktok.com/@democharts" target="_blank"> <img class="icon_2" src="/tik.svg" alt=""> </a>
        </div>
    </div>
</template>

<style scoped>

.artist_banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    margin-bottom: 100px;
    margin-top: 100px;
}

.icon_1 {
    filter: invert(1);
    width: 30px;
    margin-top: 25px;
}
.icon_2 {
    filter: invert(1);
    width: 30px;
    margin-left: 20px;
}

.artist_banner > img {
    width: 280px;
}

.artist_banner > h3 {
    font-family: 'font1', 'Josefin Sans', 'sans-serif';
    font-size: 32px;
    margin-bottom: -30px;
    max-width: 80%;

}

.artist_banner > h4 {
    font-family: 'font1', 'Josefin Sans', 'sans-serif';
    font-size: 32px;
    margin-top: 30px;
     max-width: 80%;
}

.artist_banner > p {
    font-family: 'Josefin Sans', 'sans-serif';
    width: 55%;
    font-weight: 300;
    font-size: 22px;
    margin-top: -20px;
    line-height: 150%;
    color: white;
    }

.artist_banner_number {
  background: linear-gradient(to right, #E73A39 1%, #c7df3f 40%, #E73A39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite, cool-shadow 4s ;
  display: inline-block;
  z-index: 2;  
}

@media (max-width: 600px) {

   .artist_banner {
       background-color: #0e0e0e;
       padding: 10vh 0 10vh 0;
       margin-bottom: 0;
   }

    .artist_banner > img {
    width: 300px;
}
.artist_banner > p {
    font-family: 'Josefin Sans', 'sans-serif';
    width: 75%;
    font-weight: 300;
    font-size: 22px;
    margin-top: -20px;
    line-height: 150%;
    color: white;
    }
}

@media (max-width: 420px) {

    .artist_banner > img {
    width: 250px;
}
.artist_banner > h3 {
    font-size: 32px;
}

.artist_banner > h4 {
    font-size: 32px;
}
}

</style>