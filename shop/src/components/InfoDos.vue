<template>
       <div class="infoscreen_dos">
        <div class="infoscreen_dos_left">
         <img src="/daw.png" alt="edit" />

        </div>
         <div class="infoscreen_dos_right">
             <h2> <span>Use with your</span> favorite workstation</h2>
             <hr>
             <p>Simply Drag and Drop the Audio Samples and Midi Files into any DAW (Digital Audio Workstation) of your choice. </p>
        </div>
    </div>
</template>




<style scoped>


.infoscreen_dos {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    background-color: rgb(19, 19, 19);
    margin-top: -50px;
    height: 500px;
}

.infoscreen_dos_left {
        width: 50%;
        margin-left: 30px;
}


.infoscreen_dos_right {
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    color: white;
    margin-left: 4vw;
}

.infoscreen_dos_right > h2 > span {
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

.infoscreen_dos_right > hr {
    width: 100%;
    border: none;
    height: 1px;
    background-color: rgb(119, 119, 119);

}

.infoscreen_dos_right > h2 {
    font-size: 32px;
    font-family: 'font1';
}

.infoscreen_dos_right > p {
    font-family: 'Open Sans';
}


.infoscreen_dos_left {
    margin-left: 0px;
}

.infoscreen_dos_left > img {
    width: 470px;
}


@media (max-width:900px) {
    .infoscreen_dos {
        display: flex;
        flex-direction: column-reverse;
        height: 700px;
    }
    .infoscreen_dos_left {
    width: 100%;
}

    .infoscreen_dos_left > img {
    width: 400px;
}

.infoscreen_dos_right {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-bottom: 30px;
        text-align: right;

}
}

@media (max-width:450px) {
    .infoscreen_dos {
        display: flex;
        flex-direction: column-reverse;
        height: 700px;
    }
    .infoscreen_dos_right > h2 {
    font-size: 28px;
}

    .infoscreen_dos_left > img {
    width: 300px;
}

.infoscreen_dos_right {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-bottom: 30px;
}
}

</style>