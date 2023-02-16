<template>
    <div className="contest_rewards">
        <div className="contest_header"> 
            <h4 class="moving_font">Step 4</h4>
            <h2>Win worldclass prizes</h2>
            <p>We'll make sure the best beats get heard by the right people. And more.</p>
        </div>
        <div className="contest_rewards_board">
           <ContestReward
                tag= 'Anleitung'
                price = '1.'
                tagColor= ''
                img='/urban_artist.jpg'
                title='Record Label Shoutout'
                text= 'We will directly share your music with over 350+ high class record labels & scouts.'
                link= '/contest'
                worth = "2500"
           />
                 <ContestReward
                tag= 'Anleitung'
                price = '2.'
                tagColor= ''
                img='/stage_performer.jpg'
                title='Democharts Platform Spotlight'
                text= 'We will put your Video in front of hundreds of industry experts with a special placement on the democharts.org platform.'
                link= '/contest'
                worth = "1500"
           />
                       <ContestReward
                tag= 'Anleitung'
                price = '3.'
                tagColor= ''
                img='/DC_Edit.jpg'
                title='Democharts Surprise Pack + 200$ Cash (*5)'
                text= 'Wir zeigen Ihnen wie Sie kinderleicht eine neue Ressource hinzufügen können.'
                worth = "5* 300"
                link= '/contest'
           />

        </div>
        <div class="contest_hinweis" >
     <h4>Start with free Download </h4> 
        <img src="/down.svg" alt="down_icon" />
        </div>
    </div>
</template>

<script>
import ContestReward from '../components/ContestReward.vue'

export default {
  components: { ContestReward },
}
</script>

<style scoped>
.contest_rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.contest_rewards_board {
    display: flex;
    margin-top: 40px;
}

.contest_header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 90%;
}

.contest_header > h2 {
    font-size: 48px;
    color: white;
    font-family:'font1', 'Josefin Sans', 'Helvetica', 'Sans Serif';
    margin: 0;
}

.contest_header > p {
    font-size: 18px;
    color: white;
    font-family:'Josefin Sans', 'Helvetica', 'Sans Serif';
    margin: 10px 0 0 0;

}

.moving_font {
    font-size: 28px;
    font-family: 'font1', 'font1', 'Josefin Sans', 'Helvetica', 'Sans Serif';
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
  margin: 0;
}

.contest_hinweis {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 120px;
    margin-bottom: -60px;
    font-size: 24px;
    animation: cool-shadow 8000ms infinite; 
}

.contest_hinweis > h4 {
    font-weight: 300;
    color: white;
    margin-right: 10px;
}

.contest_hinweis > img {
    filter: invert(1);
    width: 30px;
    margin-top: -4px;
}


@keyframes cool-shadow {
   0% { text-shadow: 0 0 -10px #dadada; 
        transform: scale(0.95);
    
    }
    5% {
        opacity: 1;
    }
      6% {
        opacity: 0;
    }
     7% {
        opacity: 1;
    }
      9% {
        opacity: 0;
    }
      10% {
        opacity: 1;
    }


  40% { text-shadow: 0 0 20px #e7e7e7; }

    12% {
        opacity: 1;
    }
     13% {
        opacity: 0;
    }
     14% {
        opacity: 1;
    }

  50% { text-shadow: 0 0 20px #e4e4e4; 
  transform: scale(1);}
  100% { 
      text-shadow: 0 0 -10px #e7e7e7; 
      transform: scale(0.95);}
    
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}


</style>