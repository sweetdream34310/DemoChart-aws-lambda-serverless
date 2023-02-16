<template>
       <div class="infoscreen_uno">
        <div class="infoscreen_uno_left">
         <img src="/drag_drop.png" alt="edit" />

        </div>
         <div class="infoscreen_uno_right">
             <h2> <span>Drag and Drop</span> them everywhere</h2>
             <hr>
             <p>Simply Drag and Drop the Audio Samples and Midi Files into any DAW (Digital Audio Workstation) of your choice. </p>
        </div>
    </div>
</template>




<style scoped>


.infoscreen_uno {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    height: 600px;
    background: linear-gradient(0deg, rgb(22, 22, 22), rgb(0, 0, 0) 80%) no-repeat;
}

.infoscreen_uno_left {
    width: 50%;
}


.infoscreen_uno_right {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 35%;
    margin-right: 4%;
    text-align: left;
    color: white;
}

.infoscreen_uno_right > h2 > span {
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

.infoscreen_uno_right > hr {
    width: 100%;
    border: none;
    height: 1px;
    background-color: rgb(119, 119, 119);

}

.infoscreen_uno_right > h2 {
    font-size: 32px;
    font-family: 'font1';
}

.infoscreen_uno_right > p {
    font-family: 'Open Sans';
}




.infoscreen_uno_left > img {
    width: 470px;
}


@media (max-width:900px) {
    .infoscreen_uno {
        display: flex;
        flex-direction: column-reverse;
        height: 800px;
        margin-top: 0;
    }
    .infoscreen_uno_left {
    width: 100%;
}

    .infoscreen_uno_left > img {
    width: 400px;
}

.infoscreen_uno_right {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-bottom: 30px;
}
}

@media (max-width:450px) {
    .infoscreen_uno {
        display: flex;
        flex-direction: column-reverse;
        height: 800px;
    }
    .infoscreen_uno_right > h2 {
    font-size: 28px;
}

    .infoscreen_uno_left > img {
    width: 300px;
}

.infoscreen_uno_right {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-bottom: 30px;
}
}

</style>