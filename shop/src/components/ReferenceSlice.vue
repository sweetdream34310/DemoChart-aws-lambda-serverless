<template>
    <div class="reference_slice">
        <p>ALSO FEATURED IN:</p>
        <img id="feature_img_1" src="/mags_3.png" alt="references_1" />
        <img id="feature_img_2" src="/mags.png" alt="references_2" />
       <img id="feature_img_3" src="/featured_in.jpg" alt="references_3" />
    </div>
</template>


<style scoped>
 .reference_slice {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     width: 100%;
     height: 250px;
     color: white;
     background-color: rgb(0, 0, 0);
     font-size: 18px;
 }

  .reference_slice > p {
      margin-top: -20px;
      font-weight: 600;
  }

  #feature_img_1 {
      margin-top: 10px;
      max-width: 1000px;
  }

   #feature_img_2 {
      display: none;
  }

  #feature_img_3 {
      display: none;
  }

@media (max-width: 1100px) {
      #feature_img_1  {
      max-width: 800px;
  }

}

@media (max-width: 900px) {
      #feature_img_1  {
      max-width: 650px;
  }

}

@media (max-width: 800px) {
      #feature_img_1  {
      max-width: 650px;
      display: none;
  }
    #feature_img_2 {
        display: flex;
        max-width: 450px;
    }

    .reference_slice {
                margin: 120px 0 120px 0;
    }

}

@media (max-width: 600px) {

    #feature_img_2 {
        display: flex;
        max-width: 350px;
    }

}


@media (max-width: 420px) {

    #feature_img_2 {
        display: none;
    }

    #feature_img_3 {
        display: flex;
        width: 300px;
    }

     .reference_slice {
                margin: 120px 0 60px 0;
    }

}

@media (max-width: 350px) {

    #feature_img_3 {
        display: flex;
        width: 300px;
    }

}

</style>