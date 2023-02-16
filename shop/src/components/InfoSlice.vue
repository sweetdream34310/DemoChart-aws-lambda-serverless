<template>
    <div class="info_slice">
        <div class="info_slice_box">
            <img src="/Check1.png" alt="Secure Payment" />
            <div class="info_slice_box_header">
            <h2>SECURE PAYMENT</h2>
            </div>
            <hr>
            <p>Pay with credit card & Paypal. Your information is secured with the latest 128-bit SSL encryption.</p>
        </div>
          <div class="info_slice_box" id="money_back">
            <img src="/money_back.svg" alt="Money Back Guarantee" class="money_back_img"/>
                    <div class="info_slice_box_header">
            <h2> MONEY BACK GUARANTEE</h2>
            </div>
            <hr>
            <p>We are confident that you will love our samples that you will get a full refund within 30 days if your not 100% satisfied.</p>
        </div>
          <div class="info_slice_box">
            <img src="/Check1.png" alt="Royalty Free" />
              <div class="info_slice_box_header">
            <h2>100% ROYALTIES</h2>
             </div>
            <hr>
            <p>Your pack, your sounds. Use them for anything including commercial use. Only reselling is prohibited.</p>
        </div>
    </div>
</template>


<style scoped>
    .info_slice {
        display: flex;
        align-items: space-around;
        justify-content: center;
        margin-top: 15vh;
        margin-bottom: 15vh;
    }

    .info_slice_box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        width: 30%;
        color: white;
        padding-top: 25px;
        padding-bottom: 25px;
        margin: 0 1vw 0 1vw;
    }

    #money_back {
        border-radius: 15px;
        margin-top: -45px;
        background-color: rgb(14, 14, 14);
    }

    .money_back_img {
        width: 80px !important;
    }

    .info_slice_box_header {
        display: flex;
        align-items: top;
        justify-content: center;
    }

    .info_slice_box_header > h2 {
        font-family: 'font1', 'Josefin Sans', 'sans-serif'; 
        text-align: center;
        max-width: 80%;
}

    .info_slice_box > p {
        text-align: center;
        max-width: 80%;
        font-weight: 300;
        line-height: 130%;
}

    .info_slice_box > hr {
            width: 80%;
            border: none;
            height: 1px;
            background-color: rgb(97, 97, 97);
     }

     .info_slice_box > img {
         width: 35px;
     }

     .info_money_back {
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
  z-index: 2;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }

     }

     @media (max-width: 1100px) {
        .info_slice {
        display: flex;
        align-items: space-around;
        justify-content: center;
        margin-top: 25vh;
        margin-bottom: 15vh;
    }
      
}

@media (max-width: 800px) {
        .info_slice {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 3vh;
        margin-bottom: -20px;
    }
      .info_slice_box {
        width: 85%;
        border-radius: 15px;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: rgb(14, 14, 14);
    }

        #money_back {
        border-radius: 15px;
         margin-top: 10px;
        margin-bottom: 10px;
    }
}

    
</style>