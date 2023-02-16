<template>
    <div class="right_banner">
        <div class="right_banner_left">
        </div>
         <div class="right_banner_right">
             <h2><span class="right_banner_right_span moving_font">Step 2</span> <br>Create a hit song within 10 minutes.</h2>
<hr>
             <p>
Thats right, you just got <b> 10 Minutes and our FREE Micro Beats</b>. 
You won’t need more to produce a hit
Song. Simply drag and drop them in Logic Pro X, 
Ableton Live, FL Studio or any other DAW and get started. </p>
                <div class="right_banner_button">
        <router-link to="/contest" class="fake_button"> <p>Try for free</p> </router-link>
        <!-- <div class="fake_button_container"> <div class="fake_button_3" @click="emitScroller"><p>More Info</p> <img src="/Down.svg" class="banner_icon" alt="down" /> </div> </div> -->
        </div>
        </div>
        
    </div>
</template>

<script>
export default {
    methods: {
           emitScroller() {
             this.$emit('emit-scroller')
        },
         emitScroller2() {
             this.$emit('emit-scroll2')
        }
    }
}
</script>


<style scoped>

.right_banner {
    min-height: 50vh;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    width: 100vw;
    margin-bottom: 2vh;
    margin-top: -15vh;
    padding-top: 4vh;
    padding-bottom: 4vh;
}

.right_banner_left {
    object-fit: contain;
    width: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.37)), url("/Music_Artist_3.jpg");
    height: 550px;
    margin-right: 5vw;
}

.right_banner_right {
    width: 50%;
    text-align: center;
    margin-left: 5vw;
    margin-right: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.right_banner_right > h2 {
    width: 85%;
    font-family: 'font1';
    color: white;
    font-size: 36px;
    margin-bottom: 12px;

}

.right_banner_right_span {
    color: #E73A39;
    font-size: 24px;
}


.right_banner_right > p {
    width: 85%;
    line-height: 150%;
    font-size: 18px;
    color: rgb(218, 218, 218);
    font-weight: 300;
}

hr {
    border: none;
    height: 1px;
    background-color: rgb(54, 54, 54);
    width: 92%;
}

.banner_icon {
    height: 25px;
    filter: invert(1);
    margin-left: 5px;
    opacity: 0;
    transition: ease-in-out 200ms;
    margin-top: -3px;
}

.fake_button_3:hover .banner_icon {
    opacity: 1;
}

.fake_button {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 0px 35px 0px 35px;
    border-radius: 100px;
    font-size: 14px;
    border: none;
    transition: ease-in-out 200ms;
    text-decoration: none;
    color: white;
    border: 1px solid white;
    transition: ease-in-out 200ms;
    min-width: 100px;

}

.fake_button:hover {
    transform: scale(1.03);
    border-color: #E73A39;
    cursor: pointer;
}

.fake_button_2 {
    margin-top: 10px;
    margin-left: 10px;
    padding: 0px 0px 0px 35px;
    border-radius: 100px;
    font-size: 14px;
    border: none;
    transition: ease-in-out 200ms;
    text-decoration: none;
    color: white;
    min-width: 100px;

}

.fake_button_3 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-left: 10px;
    padding: 0px 0px 0px 35px;
    border-radius: 100px;
    font-size: 14px;
    border: none;
    transition: ease-in-out 200ms;
    text-decoration: none;
    color: white;
    min-width: 100px;
}

.fake_button_2:hover {
    transform: scale(1.03);
    cursor: pointer;
}

.fake_button_3:hover {
    transform: scale(1.03);
    cursor: pointer;
}

.right_banner_button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.fake_button_container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.moving_font {
  background: linear-gradient(to right, #E73A39 1%, #c7df3f 40%, #E73A39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite ;
  display: inline-block;
}


@keyframes textclip {
  to {
    background-position: 200% center;
  }
}




@media (max-width: 1100px) {
    .right_banner {
        flex-direction: column;
    }

    .right_banner_right {
        width: 90%;
    }

       .right_banner_left {
        max-width: 600px;
        width: 80%;
        margin-right: 0;
    }

    hr {
        width: 80%;
    }
}

@media (max-width: 600px) {
    .right_banner {
        flex-direction: column;
        padding-bottom: 0px;
    }

    .right_banner_right {
        width: 90%;
        margin-left: 0px;
        margin-right: 0px;
    }

       .right_banner_left {
        max-width: 480px;
        width: 90%;
    }

    hr {
        width: 80%;
    }
    .banner_icon {
        opacity: 1
    }
    .right_banner_button{
        display: none;
    }
}

@media (max-width: 500px) {
    .right_banner {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .right_banner_right {
        width: 90%;
    }

       .right_banner_left {
           width: 350px;
           height: 350px;
        }

    hr {
        width: 80%;
    }

    .fake_button {
        font-size: 14px;
            padding: 0px 25px 0px 25px;
    }

      .fake_button_3 {
        font-size: 14px;
            padding: 0px 25px 0px 25px;
    }
}





</style>