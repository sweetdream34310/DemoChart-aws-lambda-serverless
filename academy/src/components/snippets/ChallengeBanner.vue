<template>
    <div class="challenge_banner">
      <div v-if="isChallenge" class="challenge_banner_left">
          <h5>{{challengeTop}}</h5>
          <h3>{{challengeTitle}}</h3>
          <p>{{challengeDescription}}</p>
          <div class="challenge_buttons" v-if="buttonCheck">
         <h6>Download Resources</h6>
             <button>{{button1}}</button>
          <button>{{button2}}</button>
          </div>
        
      </div>
      <div class="challenge_banner_right">
          <img class="challenge_right_img" :src="img" alt="" />
          <p>{{title}}</p>
          <h4>{{headline}}</h4>
          <router-link to="/">{{buttonText}}</router-link>
      </div>
    </div>
</template>

<script>

export default {
    props: ['img', 'challengeTop', 'challengeTitle', 'challengeDescription', 'button1', 'button2', 'buttonCheck', 'isChallenge', 'title', 'headline', 'buttonText'],
}

</script>


<style scoped>

.challenge_banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
}

.challenge_banner_left {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 88%;
    object-fit: cover;
    background-image: linear-gradient(rgba(15, 15, 15, 0), rgba(19, 11, 0, 0)), url('/img/img12.jpg');
    height: 25%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    margin-bottom: 8vh;
    margin-top: 6vh;
    border: 1.5px solid white;
}

.challenge_banner_left > h5 {
    color: var(--democharts);
    margin-top: 10vh;
}

.challenge_banner_left > h6 {
    margin-top: 2vh;
}

.challenge_banner_left > h3 {
    font-size: 25px;
    margin-bottom: 2vh;
}

.challenge_banner_left > p {
    font-family: 'Josefin Sans', 'Sans-Serif';
    font-size: 20px;
    font-weight: 300;
    max-width: 80%;
    margin-bottom: 2vh;
    margin-top: 2vh;
}

.challenge_buttons {
    display: flex;
    flex-direction: column;
     margin-bottom: 10vh;

}



.challenge_buttons  > button {
    margin-top: 20px;
    font-family: 'font1';
    padding: 12px 35px 12px 35px;
    border-radius: 100px;
    border: none;
    transition: ease-in-out 200ms;
    color: var(--democharts);
}
.challenge_buttons > button:hover {
    transform: scale(1.03);
    background-color: var(--democharts);
    color: white;
    cursor: pointer;
}

.challenge_banner_right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 80%;
    margin-bottom: 6vh;

}

.challenge_banner_right > h4 {
    font-size: 40px;
    margin: 0 10px 0 10px;
}


.challenge_banner_right > p {
    font-size: 18px;
    font-family: 'font2', 'sans-serif';
}
.challenge_banner_right > a {
    color: var(--democharts);
    animation: cool-shadow 5000ms infinite;
}


@keyframes cool-shadow {
   0% { text-shadow: 0 0   10px #c4000a; 
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
    89% {
        opacity: 1;
    }
     90% {
        opacity: 0;
    }
     91% {
        opacity: 1;
    }
  100% { 
      text-shadow: 0 0 10px #c4000a; }
    
}

.challenge_right_img {
    width: 80vw;
    max-width: 700px;
    margin-bottom: 4vh;
    margin-top: 0vh;
}

@media (max-width: 800px) {
    .challenge_banner_right {
        margin-top: 4vh;
        margin-bottom: 0vh;
    }
    .challenge_banner_right > h4 {
    font-size: 30px;
    margin: 10px 10px 10px 10px;
}


.challenge_banner_right > p {
    font-size: 14px;
    font-family: 'font2', 'sans-serif';
}
}


</style>