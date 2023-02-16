<template>
    <div class="demo_slice">
        <div class="demo_slice_wrapper">
            <div class="demo_slice_text_wrapper">
         <h2>WANNA TRY PRO PACKS FOR FREE?</h2>
        <hr>
        <p>Get a sneak peak of our unique Pro Pack collection.</p>
        <router-link to="/free" class="fake_button"> Download now</router-link>
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
       align-items: right;
       justify-content: right;
       width: 85%;
       background-position: center;
       background-repeat: no-repeat;
       background-size: cover;
       background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.767)), url("/Artist_Studio.jpg");
       padding: 17vh 0 17vh 0;
       margin: 8vh 0 5vh 0;
       border-radius: 20px;
       color: white;
   }

    .demo_slice_text_wrapper {
        display: flex;
        flex-direction: column;
        justify-content: right;
        align-items: flex-end;
        text-align: right;
        margin-right: 50px;
        width: 100%
    }

      .demo_slice_text_wrapper > p {
          line-height: 120%;
      }

       .demo_slice_text_wrapper > h2 {
          font-size: 32px;
          font-family: 'font1', 'font2', 'Josefin Sans';
          margin-bottom: 0px;
          width: 400px;
          text-align: right;
      }

    .demo_slice_text_wrapper > hr {
        margin-right: 0%;
        width: 30%;
        border: none;
        height: 1px;
        margin-top: 20px;
        background-color: rgb(94, 94, 94);
    }
       .demo_slice_text_wrapper > a {
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

       .demo_slice_text_wrapper > a:hover {
           transform: scale(1.03);
           cursor: pointer;
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
    .demo_slice {
                margin: -50px 0 0px 0;
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

             .demo_slice {
            margin-top: 0px;    }

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