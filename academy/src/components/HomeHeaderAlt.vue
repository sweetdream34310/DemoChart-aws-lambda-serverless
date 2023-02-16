<template>
    <section>
        <div class="home_header">
            <div class="home_header_title">
                <h2>/MUSIC PRODUCTION BLOG, TUTORIALS & MORE/</h2>
                <h1>DEMOCHARTS</h1>
             <h1 ><span>ACADEMY</span></h1>
         <!--     <router-link  class="home_header_link" to="/">
            <p>Apply to our scouting platform</p>
            <img src="/img/right_1.svg" alt="right" />
             </router-link> -->
            </div>
        </div>
    </section>
        
</template>

<style scoped>

.home_header {
    width: 90vw;
    min-height: 400px;
    display: flex;
    align-items: center;
    margin-left: 2vw;
}

.home_header_link {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease-in-out 200ms;
     margin-left: 4vw;
     width: fit-content;
}
.home_header_link:hover {
    transform: scale(1.03);
}

.home_header_link > p {
    font-family: 'font2', 'sans-serif';
    color: white;
    text-decoration: none;
    font-size: 14px;
}
.home_header_title > h2 {
    font-size: 20px;
}

.home_header_title > h1 {
    font-size: 80px;
    line-height: 90%;
    width: 90%;
}

.home_header_title > h1 > span {
    color: var(--democharts);
    animation-name: cool-shadow ;
    animation: cool-shadow 5500ms;
    animation-iteration-count: 1;
}
.home_header_link {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.home_header_link > img {
    height: 25px;
    filter: invert(1);
    margin-left: 20px;
}


@keyframes cool-shadow {
   0% { text-shadow: 0 0 -10px #dadada; 
        transform: scale(1);
    
    }
    5% {
        opacity: 1;
    }
      6% {
        opacity: 0;
    }
     7% {
        opacity: 1;
        color: var(--democharts);
    }
      9% {
        opacity: 0;
            color: #e25959;
    }
      10% {
        opacity: 1;
    }


  40% { text-shadow: 0 0 20px #c4002a; }

    12% {
        opacity: 1;
    }
     13% {
        opacity: 0;
    }
     14% {
        opacity: 1;
    }

  60% { text-shadow: 0 0 20px #c24242; }
  100% { 
      text-shadow: 0 0 -10px #c4000a; }
    
}




@media (max-width: 900px) {

    .home_header {
        padding-top: 100px;
        justify-content: center;
        text-align: center;
        min-height: 300px;
        margin-left: 0px;
        width: 100%;
        background-image: linear-gradient(rgba(0, 0, 0, 0.418), rgb(16, 15, 13)), url("/img/flash.jpg");
        height: 25%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }
    .home_header_title > h1 {
    font-size: 60px;
    line-height: 90%;
    width: 100%;

}
}

@media (max-width: 650px) {

    .home_header {
        padding-top: 50px;
        justify-content: center;
        text-align: center;
        min-height: 300px;
    }
    .home_header_title > h1 {
    font-size: 40px;
    line-height: 90%;

    }
    .home_header_title > h2 {
    font-size: 15px;
}


}

@media (max-width: 500px) {

    .home_header_title > h1 {
    font-size: 30px;
    line-height: 130%;

    }

     .home_header_title > h1 > span {
         margin: 0;
         font-size: 45px;
     }

    .home_header_title > h2 {
        font-family: 'font2';
    font-size: 12px;
}


}



</style>