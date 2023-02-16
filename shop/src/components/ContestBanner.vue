<template>
    <div class="demo_slice">
        <div class="demo_slice_wrapper">
            <div class="demo_slice_text_wrapper">
         <h2>WANNA KNOW MORE ABOUT US?</h2>
        <hr>
        <p>Our music-scouting platform connects newcomer artists with leading music industry experts & scouts.</p>
        <div>
         <a class="contest_button_1" href="https://www.democharts.org" target="_blank" >Visit our Scouting Platform</a>
        <router-link class="contest_button_1" id="const_alt" to="/">Check out Micro Beats</router-link>
        </div>
        </div>
        </div>
    </div>
</template>


<style scoped>

   .demo_slice {
       width: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
   }

   .demo_slice_wrapper {
       display: flex;
       width: 85%;
       background-position: center;
       background-repeat: no-repeat;
       background-size: cover;
       background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.534)), url("/Artist_Studio.jpg");
       padding: 17vh 0 17vh 0;
       margin: 8vh 0 5vh 0;
       border-radius: 20px;
       color: white;
   }

    .demo_slice_text_wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 60%;
        margin-bottom: -5vh;
        margin-left: 7vh;
        text-align: left;
    }

      .demo_slice_text_wrapper > p {
          width: 80%;
          line-height: 120%;
          margin-bottom: 30px;
      }

       .demo_slice_text_wrapper > h2 {
          font-size: 32px;
          font-family: 'font1', 'font2', 'Josefin Sans';
          margin-bottom: 0px;
          max-width: 90%;
      }

    .demo_slice_text_wrapper > hr {
        width: 100%;
        border: none;
        height: 1px;
        background-color: rgb(94, 94, 94);
    }
       .contest_button_1 {
            margin-top: 10px;
             margin-right: 10px;
             padding: 13px 35px 13px 35px;
             border-radius: 100px;
             font-size: 14px;
             border: none;
             transition: ease-in-out 200ms;
             text-decoration: none;
             color: white;
             transition: ease-in-out 200ms;
             min-width: 100px;
             width: fit-content;
             background-color: #E73A39;
             font-weight: 600;
       }

       #const_alt {
           background-color: transparent;
           border: 1px solid white;
       }


       @media (max-width: 1250px) {
        .demo_slice_text_wrapper > h2 {
          max-width: 90%;
      }
       }


       @media (max-width: 700px) {
        .demo_slice_text_wrapper > h2 {
          max-width: 100%;
          text-align: right;
      }

          .demo_slice_text_wrapper {
        align-items: flex-end;
        width: 50%;
        text-align: right;
        margin-right: 5vw;
    }
        .demo_slice_wrapper {
            justify-content: flex-end;
        }

      .demo_slice_text_wrapper > p {
          width: 90%;
      }
         .demo_slice_text_wrapper > a {
             margin-right: 0;
         }
       }


       @media (max-width: 450px) {

           .demo_slice_wrapper {
               margin-top: 5vh;
               margin-bottom: 5vh;
           }


        .demo_slice_text_wrapper > h2 {
          max-width: 100%;
          text-align: right;
      }

          .demo_slice_text_wrapper {
        align-items: flex-end;
        width: 80%;
        text-align: right;
        margin-right: 5vw;
    }
        .demo_slice_wrapper {
            justify-content: flex-end;
        }

      .demo_slice_text_wrapper > p {
          width: 90%;
      }
         .demo_slice_text_wrapper > a {
             margin-right: 0;
         }
       }

</style>