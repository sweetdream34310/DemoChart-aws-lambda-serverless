<template>
<div class="home_slice_wrapper">
    <img :src="img" alt="" />
    <h2>{{title1}} <span class="moving_font">{{titleColor}}</span> {{title2}} </h2>
    <hr>
    <p>{{text}} </p>
    <div class="home_slice_buttons">
        <router-link to="/packs" class="home_slice_button"><p>Buy Pro Packs</p></router-link>
        <router-link to="/mission" class="home_slice_button"><p>How it works</p></router-link>
    </div>
</div> 
</template>

<script>
export default {
    props: ['title1', 'titleColor', 'title2', 'text', 'img'],
    methods: {
           bottomScroller() {
             this.$emit('bottom-scroller')
        }
    }
}
</script>


<style scoped>

.home_slice_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 7vh 0 7vh 0;
}

.home_slice_wrapper > h2 {
    font-size: 48px;
    font-family: 'font1';
    margin-bottom: 0px;
    margin-top: 0px;
    max-width: 84%;
}

.home_slice_wrapper > p {
    font-size: 22px;
    max-width: 50%;
    font-weight: 300;
    line-height: 150%;
}

.home_slice_wrapper > hr {
    border: none;
    height: 1px;
    background-color: rgb(73, 73, 73);
    width: 50%;
    margin: 2vh 0 2vh 0;

}

.home_slice_wrapper > img {
    width: 300px;
    margin-bottom: 30px;
}

.home_slice_buttons {
    display: flex;
}


.home_slice_button {
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
    transition: 200ms ease-in-out;
    min-width: 100px;

}

.fake_button:hover {
    transform: scale(1.01);
    border-color: red;
    cursor: pointer;
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
  animation: textclip 3s linear infinite ;
  display: inline-block;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}

@media (max-width: 800px) {
 

    .home_slice_wrapper {
              padding: 5vh 0 0vh 0;

    }
.home_slice_wrapper > p {
    max-width: 80%;
}
.home_slice_wrapper > h2 {
    font-size: 32px;
  
}

.home_slice_wrapper > img {
    width: 200px;
}
.home_slice_wrapper > hr {
    width: 80%;
}
@media (max-width: 800px) {
    .home_slice_button {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 0px 25px 0px 25px;
    border-radius: 100px;
    font-size: 14px;
    border: none;
    transition: ease-in-out 200ms;
    text-decoration: none;
    color: white;
    border: 1px solid white;
    transition: 200ms ease-in-out;
    min-width: 60px;

}
}
}




</style>