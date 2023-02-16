<template>
    
    <div class="feature_wrapper">
            <div class="cluster_1">
                <div class="box_1">
                    <h3>{{mainFeature}}</h3>
                    <p>{{featureDescription}}e</p>
                </div>
                <div class="inbox_cluster_1">
                     <div class="box_2">
                    <h3>{{fileNumber1}}</h3>
                    <p>{{fileText1}}</p>
                </div>
                  <div class="box_3">
                    <h3>{{fileNumber2}}</h3>
                    <p>{{fileText2}}</p>
                </div>
                </div>
                
            </div>
            

                     <div class="cluster_2">
                  <div class="inbox_cluster_2">

                <div class="box_4">
                    <h3>Use with any DAW</h3>
                    <img src="/compatible.png" alt="compatible">
                </div>
                     <div class="box_5">
                    <h3>Ultra Rare Pack</h3>
                     <img src="/rare.png" alt="compatible">
                     </div>
                </div>
                  <div class="box_6">
                    <img src="/pro_pack_logo.png" alt="compatible">
                    <p>Original</p>
                </div>
                
            </div>
            




                     <div class="cluster_3">

                <div class="box_7">
                    <h3>{{secondFeature}}</h3>
                </div>
                      <div class="inbox_cluster_3">

                     <div class="box_8">
                    <h3>100% Royalty Free</h3>
                     <img src="/brown.png" alt="compatible">
                     </div>
                  <div class="box_9">
                    <h3>Surprise Inside</h3>
                     <img src="/surprise.png" alt="compatible">
                                    </div>
                </div>
                
            </div>
            



            
    </div>


</template>

<script>
export default {
    props: ['mainFeature', 'featureDescription', 'fileNumber1', 'fileText1', 'fileNumber2', 'fileText2', 'secondFeature'], 
   
}
</script>

<style scoped>






 .feature_wrapper {
     display: flex;
     align-items: center;
     justify-content: center;
     background: rgb(0, 0, 0);
     font-family: 'font1', 'Josefin Sans';
     font-size: 9px;
     color: white;
     margin-bottom: 120px;
 }

 .cluster_1 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
 }

  .cluster_2 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-left: 10px;
 }

  .cluster_3 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
 }

 .box_1 {
     background-color: rgb(15, 15, 15);
     width: 280px;
     height: 150px;
     border-radius: 20px;
 }

 .box_1 > h3 {
     font-size: 22px;
     margin-bottom: -10px;
     margin-top: 50px;
  background: linear-gradient(to right, #E73A39 1%, #c7df3f 40%, #E73A39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 5s linear infinite, cool-shadow 4s ;
  display: inline-block;
  max-width: 85%;
  z-index: 1;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}


  .box_1 > p {
      font-family: 'Open Sans';
     font-size: 12px;
 }

  .box_2 {
     background-color: rgb(15, 15, 15);
     width: 135px;
     height: 90px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
 }

 .box_2 > h3 {
     font-family: 'Open Sans', 'Josefin Sans';
     font-size: 28px;
     margin-bottom: -5px;
     margin-top: 16px;
     color: transparent;
    background: linear-gradient(rgb(255, 255, 255), rgb(92, 167, 236));
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

 }

  .box_3 {
     background-color: rgb(15, 15, 15);
     width: 135px;
     height: 90px;
     border-radius: 20px;
    margin-left: 5px;
         margin-top: 10px;
 }

  .box_3 > h3 {
     font-family: 'Open Sans', 'Josefin Sans';
     font-size: 28px;
     margin-bottom: -5px;
     margin-top: 16px;
     color: transparent;
    background: linear-gradient(rgb(255, 255, 255), rgb(92, 167, 236));
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

 }

 .box_4 {
     background-color: rgb(15, 15, 15);
     width: 135px;
     height: 150px;
     border-radius: 20px;
 }

 .box_4 > img {
    width: 75px;
    margin-top: -8px;
}

.box_4 > h3 {
    margin: 20px 10px 20px 10px;
}

  .box_5 {
     background-color: rgb(15, 15, 15);
     width: 135px;
    height: 150px;
     border-radius: 20px;
     margin-left: 10px;
 }


 .box_5 > img {
    width: 75px;
    margin-top: -8px;
}

.box_5 > h3 {
    margin: 20px 10px 20px 10px;
}

  .box_6 {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
     width: 280px;
     height: 90px;
     border-radius: 20px;
     margin-top: 10px;
    background-image: url("/background_bliss.jpg");
    background-size: 100%;

 }

 .box_6 > img {
     width: 200px;
     margin-top: 18px;
 }

  .box_6 > p {
      font-family: 'Josefin Sans';
      font-size: 14px;
  }

 .box_7 {
     background-color: rgb(15, 15, 15);
     width: 280px;
     height: 90px;
     border-radius: 20px;
     margin-left: 10px;
    background-image: url("/background_hq.jpg");
    background-size: 100%;
 }

 .box_7 > h3 {
     font-size: 28px;
     font-family: 'Josefin Sans';
     margin-top: 33px;
 }

  .box_8 {
     background-color: rgb(15, 15, 15);
     width: 160px;
     height: 150px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
    margin-left: 10px;
 }

  .box_8 > img {
    width: 80px;
    margin-top: -8px;
}

.box_8 > h3 {
    margin: 20px 15px 20px 15px;
}

 

  .box_9 {
     background-color: rgb(15, 15, 15);
     width: 105px;
     height: 150px;
     border-radius: 20px;
      margin-left: 5px;
        margin-top: 10px;
 }

   .box_9 > img {
    width: 60px;
}

.box_9 > h3 {
    margin: 20px 15px 20px 15px;
}

  .inbox_cluster_1 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
 }

   .inbox_cluster_2 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
 }

   .inbox_cluster_3 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
 }






@media (max-width: 1230px) {
    .cluster_3 {
        display: none;
    }
}






@media (max-width: 900px) {
    


 .feature_wrapper {
     flex-direction: column;
 }

 .cluster_1 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 10px;

 }

  .cluster_2 {
        margin-left: 0px;
        margin-top: 10px;
 }

  .cluster_3 {
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
                margin-top: 10px;

 }

 .box_1 {
     background-color: rgb(15, 15, 15);
     width: 330px;
     height: 150px;
     border-radius: 20px;
 }

 .box_1 > h3 {
     font-size: 24px;
     margin-bottom: -10px;
     margin-top: 50px;
  background: linear-gradient(to right, #E73A39 1%, #c7df3f 40%, #E73A39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 5s linear infinite, cool-shadow 4s ;
  display: inline-block;
  max-width: 85%;
  z-index: 1;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}


  .box_1 > p {
      font-family: 'Open Sans';
     font-size: 12px;
 }

  .box_2 {
     background-color: rgb(15, 15, 15);
     width: 160px;
     height: 90px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
 }

 .box_2 > h3 {
     font-family: 'Open Sans', 'Josefin Sans';
     font-size: 28px;
     margin-bottom: -5px;
     margin-top: 16px;
     color: transparent;
    background: linear-gradient(rgb(255, 255, 255), rgb(92, 167, 236));
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

 }

  .box_3 {
     background-color: rgb(15, 15, 15);
     width: 160px;
     height: 90px;
     border-radius: 20px;
    margin-left: 5px;
         margin-top: 10px;
 }

  .box_3 > h3 {
     font-family: 'Open Sans', 'Josefin Sans';
     font-size: 28px;
     margin-bottom: -5px;
     margin-top: 16px;
     color: transparent;
    background: linear-gradient(rgb(255, 255, 255), rgb(92, 167, 236));
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

 }

 .box_4 {
     background-color: rgb(15, 15, 15);
     width: 160px;
     height: 150px;
     border-radius: 20px;
 }

 .box_4 > img {
    width: 75px;
    margin-top: -8px;
}

.box_4 > h3 {
    margin: 20px 10px 20px 10px;
}

  .box_5 {
     background-color: rgb(15, 15, 15);
     width: 160px;
    height: 150px;
     border-radius: 20px;
     margin-left: 10px;
 }


 .box_5 > img {
    width: 75px;
    margin-top: -8px;
}

.box_5 > h3 {
    margin: 20px 10px 20px 10px;
}

  .box_6 {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
     width: 330px;
     height: 90px;
     border-radius: 20px;
     margin-top: 10px;
    background-image: url("/background_bliss.jpg");
    background-size: 100%;

 }

 .box_6 > img {
     width: 200px;
     margin-top: 18px;
 }

  .box_6 > p {
      font-family: 'Josefin Sans';
      font-size: 14px;
  }

 .box_7 {
     background-color: rgb(0, 0, 0);
     width: 330px;
     height: 90px;
     border-radius: 20px;
     margin-left: 0px;
    background-image: url("/background_hq.jpg");
    background-size: 100%;
 }

 .box_7 > h3 {
     font-size: 28px;
     font-family: 'Josefin Sans';
     margin-top: 33px;
 }

  .box_8 {
     background-color: rgb(15, 15, 15);
     width: 190px;
     height: 150px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
    margin-left: 0px;
 }

  .box_8 > img {
    width: 80px;
    margin-top: -8px;
}

.box_8 > h3 {
    margin: 20px 15px 20px 15px;
}

 

  .box_9 {
     background-color: rgb(15, 15, 15);
     width: 125px;
     height: 150px;
     border-radius: 20px;
      margin-left: 5px;
        margin-top: 10px;
 }

   .box_9 > img {
    width: 60px;
}

.box_9 > h3 {
    margin: 20px 15px 20px 15px;
}

  .inbox_cluster_1 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
 }

   .inbox_cluster_2 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
 }

   .inbox_cluster_3 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
 }

}




@media (max-width: 380px) {
    


 .feature_wrapper {
     flex-direction: column;
 }

 .cluster_1 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
                margin-top: 10px;

 }

  .cluster_2 {
        margin-left: 0px;
        margin-top: 10px;
 }

  .cluster_3 {
        display: flex;
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
                margin-top: 10px;

 }

 .box_1 {
     background-color: rgb(0, 0, 0);
     width: 280px;
     height: 150px;
     border-radius: 20px;
 }

 .box_1 > h3 {
     font-size: 22px;
     margin-bottom: -10px;
     margin-top: 50px;
  background: linear-gradient(to right, #E73A39 1%, #c7df3f 40%, #E73A39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 5s linear infinite, cool-shadow 4s ;
  display: inline-block;
  max-width: 85%;
  z-index: 1;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}


  .box_1 > p {
      font-family: 'Open Sans';
     font-size: 12px;
 }

  .box_2 {
     background-color: rgb(0, 0, 0);
     width: 135px;
     height: 90px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
 }

 .box_2 > h3 {
     font-family: 'Open Sans', 'Josefin Sans';
     font-size: 28px;
     margin-bottom: -5px;
     margin-top: 16px;
     color: transparent;
    background: linear-gradient(rgb(255, 255, 255), rgb(92, 167, 236));
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

 }

  .box_3 {
     background-color: rgb(0, 0, 0);
     width: 135px;
     height: 90px;
     border-radius: 20px;
    margin-left: 5px;
         margin-top: 10px;
 }

  .box_3 > h3 {
     font-family: 'Open Sans', 'Josefin Sans';
     font-size: 28px;
     margin-bottom: -5px;
     margin-top: 16px;
     color: transparent;
    background: linear-gradient(rgb(255, 255, 255), rgb(92, 167, 236));
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

 }

 .box_4 {
     background-color: rgb(0, 0, 0);
     width: 135px;
     height: 150px;
     border-radius: 20px;
 }

 .box_4 > img {
    width: 75px;
    margin-top: -8px;
}

.box_4 > h3 {
    margin: 20px 10px 20px 10px;
}

  .box_5 {
     background-color: rgb(0, 0, 0);
     width: 135px;
    height: 150px;
     border-radius: 20px;
     margin-left: 10px;
 }


 .box_5 > img {
    width: 75px;
    margin-top: -8px;
}

.box_5 > h3 {
    margin: 20px 10px 20px 10px;
}

  .box_6 {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
     width: 280px;
     height: 90px;
     border-radius: 20px;
     margin-top: 10px;
    background-image: url("/background_bliss.jpg");
    background-size: 100%;

 }

 .box_6 > img {
     width: 200px;
     margin-top: 18px;
 }

  .box_6 > p {
      font-family: 'Josefin Sans';
      font-size: 14px;
  }

 .box_7 {
     background-color: rgb(0, 0, 0);
     width: 280px;
     height: 90px;
     border-radius: 20px;
     margin-left: 0px;
    background-image: url("/background_hq.jpg");
    background-size: 100%;
 }

 .box_7 > h3 {
     font-size: 28px;
     font-family: 'Josefin Sans';
     margin-top: 33px;
 }

  .box_8 {
     background-color: rgb(0, 0, 0);
     width: 160px;
     height: 150px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
    margin-left: 0px;
 }

  .box_8 > img {
    width: 80px;
    margin-top: -8px;
}

.box_8 > h3 {
    margin: 20px 15px 20px 15px;
}

 

  .box_9 {
        background-color: rgb(0, 0, 0);
     width: 105px;
     height: 150px;
     border-radius: 20px;
      margin-left: 5px;
        margin-top: 10px;
 }

   .box_9 > img {
    width: 60px;
}

.box_9 > h3 {
    margin: 20px 15px 20px 15px;
}

  .inbox_cluster_1 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
 }

   .inbox_cluster_2 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
 }

   .inbox_cluster_3 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
 }

}

</style>