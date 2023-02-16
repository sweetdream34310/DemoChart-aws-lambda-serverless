<template>
    
<div class="top_product">
    <div class="top_product_left">
        <img src="/Render_35.jpg" alt="">
    </div>

     <div class="top_product_right">
         <h1>{{product.name}}</h1>
         <h2>{{product.description}}</h2>
         <div class="top_product_prices">
                      <h4>$ {{product.price}}</h4>
                    <h5>$ {{product.priceOld}}</h5>
         </div>
         <div>
  <button class="cta_button" to="/urban" @click="addItemToStore(product)">
        <img src="/carto.svg" alt="" /> Add To Cart <span></span>
      </button>
         </div>
    </div>
    </div>

</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ProductCTA",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const addItemToStore = product => {
      console.log("######");
      store.commit("addItem", product);
    };

    return {
      addItemToStore,
    };
  },
};
</script>

<style scoped>


        .cta_button > span {
    margin-left: 5px;
    }
    .top_product {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 60px;
        margin-bottom: -40px;
    }

        .top_product_left {
            width: 50%;
            display: flex;
            align-items: flex-end;
            justify-content: right;
        }

           .top_product_right > h1 {
               font-family: 'font1';
               font-size: 32px;
               font-weight: 300;
               margin-left: 50px;
               margin-right: 50px;
               
           }

           .top_product_right > h2 {
               font-family: 'Josefin Sans';
               font-size: 18px;
               font-weight: 300;
               margin: 0px 70px 40px 70px;
           }
           

           .cta_button {
               display: flex;
               align-items: center;
               justify-content: center;
               text-decoration: none;
               color: white;
            background-color: rgb(0, 0, 0);

               padding: 15px 50px;
               border-radius: 100px;
               width: fit-content;
               transition: 100ms ease-in-out;
               border: 1px solid white;
               font-family: 'Open Sans Bold';
           }

            .cta_button:focus {
            background-color: rgb(37, 37, 37);
            }

             .cta_button:hover {
                 transform: scale(1.01);
                 cursor: pointer;
             }

             .cta_button > img {
              width: 13px;
              filter: invert(1);
              margin-right: 8px;

    }
           .cta_inside {
                text-decoration: none;
               color: white;
           }

           .top_product_prices {
               display: flex;
               align-items: center;
               justify-content: center;
               height: 50px;
               margin-bottom: 20px;
               margin-top: -20px;
           }

            .top_product_prices > h4 {
                font-size: 22px;
                font-family: 'Open Sans';
            }

            .top_product_prices > h5 {
                margin-left: 10px;
                text-decoration: line-through;
                font-size: 18px;
                font-family: 'Open Sans';
                color: grey;
                margin-bottom: 28px;
            }

            .top_product_left > img {
            width: 450px;
            margin-right: -30px;
        }

           .top_product_right {
               display: flex;
               flex-direction: column;
               align-items: center;
               color: white;
            width: 50%;
            margin-left: -30px;
        }

        @media (max-width: 1100px) {


            .top_product_left > img {
            width: 420px;
        }

           .top_product_right {
               display: flex;
               flex-direction: column;
               align-items: center;
               color: white;
            width: 60%;
        }
        }

          @media (max-width: 850px) {


       .top_product_left > img { 
        margin: 0;
       }



    .top_product {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        margin-top: 60px;
        margin-bottom: -40px;
    }

        .top_product_left {
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

             .top_product_right {
               display: flex;
               flex-direction: column;
               align-items: center;
               color: white;
            width: 90%;
            margin: 0;
        }

         @media (max-width: 850px) {
             .top_product_left > img {
                 width: 320px;
                 margin-top: 20px;
             }
         }

        

    
           
          }

</style>