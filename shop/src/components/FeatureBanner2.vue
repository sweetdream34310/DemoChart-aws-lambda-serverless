<template>
    
    <div class="feature_wrapper">
            <div class="cluster_1">
                <div class="box_1">
                                        <h3>Genres</h3>
                    <div class="box_genres">
                    <p>{{genre1}}</p>
                    <p>{{genre2}}</p>
                    <br> <p>{{genre3}}</p>
                    </div>
                  


                </div>
                <div class="inbox_cluster_1">
                     <div class="box_2">
                    <h3>What you get:</h3>
                    <div class="box_2_features">
                        <img src="punkt.png" alt="">
                        <p>{{feat1}}</p>
                    </div>
                      <div class="box_2_features">
                        <img src="punkt.png" alt="">
                        <p>{{feat2}}</p>
                    </div>
                      <div class="box_2_features">
                        <img src="punkt.png" alt="">
                        <p>{{feat3}}</p>
                    </div>
                      <div class="box_2_features">
                        <img src="punkt.png" alt="">
                        <p>{{feat4}}</p>
                    </div>
                      <div class="box_2_features">
                        <img src="punkt.png" alt="">
                        <p>{{feat5}}</p>
                    </div>
                      <div class="box_2_features">
                        <img src="punkt.png" alt="">
                        <p>{{feat6}}</p>
                    </div>
                </div>
                </div>
                
            </div>
            

                     <div class="cluster_2">
                  <div class="inbox_cluster_2">

                </div>
                  <div class="box_6">
                      <h2>SOUNDS LIKE:</h2>
                    <p>{{soundsLike}}
</p>
                </div>
                
            </div>
            




                     <div class="cluster_3">

                <div class="box_7">
                  <img src="/Lil_Gang.png" alt="compatible">
                    <h3>Made for:</h3>
                    <div>
                        <p>Beatmakers</p>
                        <hr>
                        <p>Producers</p>
                        <hr>
                        <p>Creators</p>
                    </div>
                </div>
                      <div class="inbox_cluster_3">

                     <div class="box_8">
                         <div class="box_8_30">
                         <h3>30 Days</h3>
                         </div>
                     <h4>Money Back <br> Guarantee</h4>
                     </div>
                  <div class="box_9">
                    <h3>Made by Pros</h3>
                     <img src="/fire.png" alt="compatible">
                                    </div>
                </div>
                
            </div>
            



            
    </div>


</template>


<script>
export default {
    props: ['genre1', 'genre2', 'genre3', 'feat1', 'feat2', 'feat3', 'feat4', 'feat5', 'feat6', 'soundsLike'], 
   
}
</script>






<style scoped>




 .feature_wrapper {
     display: flex;
     flex-direction: row-reverse;
     align-items: center;
     justify-content: center;
     background: rgb(0, 0, 0);
     font-family: 'font1', 'Josefin Sans';
     font-size: 9px;
     color: white;
     margin-top: 140px;
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
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     background-color: rgb(15, 15, 15);
     width: 280px;
     height: 120px;
     border-radius: 20px;
 }

 .box_1 > h3 {
     font-size: 15px;
     margin-top: -5px;
}

.box_genres {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
}

.box_genres > p {
    margin: 10px;
    font-size: 12px;
    background-color: #292929;
    color: #E73A39;
    border-radius: 100px;
    padding: 5px 10px 5px 10px;

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
     width: 280px;
     height: 250px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
 }

 .box_2 > h3 {
     font-family: 'font1', 'Josefin Sans';
     font-size: 20px;
     margin-bottom: 15px;
     margin-top: 20px;
   
 }

 .box_2_features {
     display: flex;
     align-items: center;
     margin-left: 35px;
     height: 28px;
 }

.box_2_features > img {
     display: flex;
     width: 7px;
     object-fit: contain;
     margin-right: 8px;
 }

 .box_2_features > p {
     font-family: 'Open Sans';
     font-weight: 500;
     font-size: 14px;
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


  .box_6 {
      display: flex;
      align-items: center;
      flex-direction: column;
     width: 280px;
     height: 380px;
     border-radius: 20px;
    background-image: url("/members_clube.jpg");
    background-size: 220%;
 }

 .box_6 > h2 {
     margin-top: 60px;
     font-size: 18px;
 }


  .box_6 > p {
      font-family: 'Open Sans';
      font-size: 14px;
      width: 80%;
      line-height: 180%;
  }

 .box_7 {
     background-color: rgb(15, 15, 15);
     width: 280px;
     height: 230px;
     border-radius: 20px;
     margin-left: 10px;
    background-size: 100%;
 }

 .box_7 > img {
     width: 100px;
     margin-top: 15px;
 }

  .box_7 > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: -20px 30px 0 30px;
  }

  .box_7 > div > hr {
      border: none;
      width: 5px;
      height: 5px;
      background-color: white;
      border-radius: 100px;
  }

    .box_7 > div > p {
        font-family: 'Open Sans Bold';
        font-size: 13px;
    }


 .box_7 > h3 {
     font-size: 22px;
     font-family: 'font1';
     margin-top: 10px;
 }

  .box_8 {
     background-color: rgb(15, 15, 15);
     width: 160px;
     height: 140px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
    margin-left: 10px;
 }

  .box_8 > img {
    width: 200px;
    margin-top: -8px;
}

.box_8_30 {
    display: flex;
    align-items: center;
    justify-content: center;
}

.box_8_30 > h3 {
  font-size: 28px;
  font-family: 'Open Sans Bold';
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


.box_8 > h4 {
    margin-top: -20px;
    font-size: 11px;
}


 

  .box_9 {
     background-color: rgb(15, 15, 15);
     width: 105px;
     height: 140px;
     border-radius: 20px;
      margin-left: 5px;
        margin-top: 10px;
 }

   .box_9 > img {
    width: 100px;
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





@media (max-width: 620px) {
    
 .feature_wrapper {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     background: rgb(0, 0, 0);
     font-family: 'font1', 'Josefin Sans';
     font-size: 9px;
     color: white;
     margin-top: 100px;
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
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     background-color: rgb(15, 15, 15);
     width: 320px;
     height: 120px;
     border-radius: 20px;
 }

 .box_1 > h3 {
     font-size: 22px;
     margin-top: 0px;
}

.box_genres {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
}

.box_genres > p {
    margin: 10px;
    font-size: 12px;
    background-color: #292929;
    color: #E73A39;
    border-radius: 100px;
    padding: 5px 10px 5px 10px;

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
     width: 320px;
     height: 250px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
 }

 .box_2 > h3 {
     font-family: 'font1', 'Josefin Sans';
     font-size: 20px;
     margin-bottom: 15px;
     margin-top: 20px;
   
 }

 .box_2_features {
     display: flex;
     align-items: center;
     margin-left: 35px;
     height: 28px;
 }

.box_2_features > img {
     display: flex;
     width: 7px;
     object-fit: contain;
     margin-right: 8px;
 }

 .box_2_features > p {
     font-family: 'Open Sans';
     font-weight: 500;
     font-size: 14px;
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
     width: 135px;
     height: 150px;
     border-radius: 20px;
 }


  .box_6 {
      display: flex;
      align-items: center;
      flex-direction: column;
     width: 320px;
     height: 380px;
     border-radius: 20px;
    background-image: url("/members_clube.jpg");
    background-size: 220%;
    margin-top: 10px;
 }

 .box_6 > h2 {
     margin-top: 60px;
     font-size: 18px;
 }


  .box_6 > p {
      font-family: 'Open Sans';
      font-size: 14px;
      width: 80%;
      line-height: 180%;
  }

 .box_7 {
     background-color: rgb(15, 15, 15);
     width: 320px;
     height: 230px;
     border-radius: 20px;
     margin-left: 10px;
    background-size: 100%;
 }

 .box_7 > img {
     width: 120px;
     margin-top: 15px;
 }

  .box_7 > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: -20px 30px 0 30px;
  }

  .box_7 > div > hr {
      border: none;
      width: 5px;
      height: 5px;
      background-color: white;
      border-radius: 100px;
  }

    .box_7 > div > p {
        font-family: 'Open Sans Bold';
        font-size: 13px;
    }


 .box_7 > h3 {
     font-size: 22px;
     font-family: 'font1';
     margin-top: 10px;
 }

  .box_8 {
     background-color: rgb(15, 15, 15);
     width: 190px;
     height: 140px;
     border-radius: 20px;
     margin-right: 5px;
     margin-top: 10px;
    margin-left: 10px;
 }

  .box_8 > img {
    width: 80px;
    margin-top: -8px;
}

.box_8_30 {
    display: flex;
    align-items: center;
    justify-content: center;
}

.box_8_30 > h3 {
  font-size: 28px;
  font-family: 'Open Sans Bold';
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


.box_8 > h4 {
    margin-top: -20px;
    font-size: 11px;
}


 

  .box_9 {
     background-color: rgb(15, 15, 15);
     width: 120px;
     height: 140px;
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
        align-items: center;
        justify-content: center;
        flex-direction: column;
                margin-top: 10px;

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