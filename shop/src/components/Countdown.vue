<template>
         <transition name="route" mode="out-in">
    <div class="angebot_wrapper_2">
        <p class="flickerer">{{displayDays}} :</p>
        <p class="flickerer">{{displayHours}} :</p>
        <p class="flickerer">{{displayMinutes}} :</p>
        <p class="flickerer">{{displaySeconds}}</p>

    </div>
        </transition>
</template>

<script>
export default ({
    props:['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'],
   data(){
  return {
    isActive: false,
    isSecondActive: true,
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
    expired: false
  }
},
    computed: {
     _seconds: () => 1000,
     _minutes() {
         return this._seconds * 60
     },
     _hours() {
         return this._minutes * 60
     },
     _days() {
         return this._hours * 24
     },
     end() {
         return new Date (
             this.year, 
             this.month,
             this.date,
             this.hour,
             this.minute,
             this.second,
             this.millisecond
         )
     }
    },
    methods: {
        showRemaining() {
            const timer = setInterval(() => {
                const now = new Date();
                const distance = this.end.getTime() - now.getTime();

            ///// HIER WÄRE EINE FUNKTION MEGA DIE DEN COUNTER AUTOMATISCH IMMER UM 24H AKTUALISIERT SOBALD ER AUF NULL FÄLLT ////
                if(distance < 0) {
                    clearInterval(timer);
                    this.expired = true; 
                    return
                }

                const days = Math.floor((distance / this._days));
                const hours = Math.floor((distance % this._days) / this._hours);
                const minutes = Math.floor((distance % this._hours) / this._minutes);
                 const seconds = Math.floor((distance % this._minutes) / this._seconds);
                 this.displayMinutes = minutes < 10 ? "0" + minutes : minutes;
                this.displaySeconds = seconds < 10 ? "0" + seconds : seconds;
                 this.displayHours = hours < 10 ? "0" + hours : hours;
                this.displayDays = days < 10 ? "0" + days : days;
            }, 1000)
        }
    }
    })
</script>


<style scoped>
    .angebot_wrapper {
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #d31e1e;
        color: white;
        font-family: 'font1', 'font2', 'Josefin Sans';
        z-index: 100;
    }

    .angebot_wrapper > p {
        font-size: 14px;
        animation: pulsate 3000ms infinite;
    }

        .angebot_wrapper_2 {
        width: 100vw;
        height: 500px;
        margin-top: -150px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000000;
        color: white;
        font-family: 'font1', 'font2', 'Josefin Sans';
        z-index: 100;
    }

    .angebot_wrapper_2 > p {
        font-size: 70px;
        animation: cool-shadow 3000ms infinite;
        animation-delay: 1650ms;
        margin-left: 4px;
        margin-right: 4px;
        min-width: 30px;
    }

    @keyframes pulsate {
        0% {
            transform: scale(0.99);
        }
        10% {
            transform: scale(0.991);
        }

        50% {
            transform: scale(1);
        }
        90% {
            transform: scale(0.988);
        }
        100% {
            transform: scale(0.99);
        }
    }


.route-enter-from {
 opacity: 0;
 transform: translateY(-30px);
}

.route-leave-to {
 opacity: 0;
 transform: translateY(-30px);
}

.route-enter-active {
 transition: all 0.5s ease-out;
}

.route-leave-active {
 transition: all 0.5s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
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

  50% { text-shadow: 0 0 20px #e4e4e4; }
  100% { 
      text-shadow: 0 0 -10px #e7e7e7; }
    
}


    @media (max-width: 700px) {
        .angebot_wrapper > p {
            font-size: 10px;
        }
    }
</style>