<template>
    <div class="faq">
        <div class="faq_font">
            <h3> <span>Rules</span> <br> How it works.</h3>
        </div>
        <div class="faq_questions">
            <div class="faq_question" @click="q1 = !q1">
                <div class="faq_question_banner">
                <h4>Agreement to rules</h4>
                <img src="/down.svg" alt="" :class="q1 ? 'up' : 'down' "/>
                </div>
                <transition transition name="route" mode="out-in">
                <p v-if="q1">The winners will be announced via E-Mail and Instagram</p>
                </transition>
            </div>
              <div class="faq_question" @click="q2 = !q2">
                <div class="faq_question_banner">
                <h4>Prices </h4>
                <img src="/down.svg" alt="" :class="q2 ? 'up' : 'down' "/>
                </div>
                <transition transition name="route" mode="out-in">
                <p v-if="q2">The winners will be announced via E-Mail and Instagram</p>
                </transition>
            </div>
              <div class="faq_question" @click="q3 = !q3">
                <div class="faq_question_banner">
                <h4>Contest Date </h4>
                <img src="/down.svg" alt="" :class="q3 ? 'up' : 'down' "/>
                </div>
                <transition transition name="route" mode="out-in">
                <p v-if="q3">The winners will be announced via E-Mail and Instagram</p>
                </transition>
            </div>
              <div class="faq_question" @click="q4 = !q4">
                <div class="faq_question_banner">
                <h4>Odds </h4>
                <img src="/down.svg" alt="" :class="q4 ? 'up' : 'down' " />
                </div>
                <transition transition name="route" mode="out-in">
                <p v-if="q4">The winners will be announced via E-Mail and Instagram</p>
                </transition>
            </div>
              <div class="faq_question" @click="q5 = !q5">
                <div class="faq_question_banner">
                <h4>Winner Selection and Notification </h4>
                <img src="/down.svg" alt="" :class="q5 ? 'up' : 'down' "/>
                </div>
                <transition transition name="route" mode="out-in">
                <p v-if="q5">The winners will be announced via E-Mail and Instagram</p>
                </transition>
            </div>
              <div class="faq_question" @click="q6 = !q6">
                <div class="faq_question_banner">
                <h4>Troubleshooting </h4>
                <img src="/down.svg" alt="" :class="q6 ? 'up' : 'down' "/>
                </div>
                <transition transition name="route" mode="out-in">
                <p v-if="q6">The winners will be announced via E-Mail and Instagram</p>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import {Countdown} from 'vue3-flip-countdown'
export default {
  data() {
    return {
        q1: false,
        q2: false,
        q3: false,
        q4: false,
        q5: false,
        q6: false,
    }
  },
  methods: {
           emitScroller() {
             this.$emit('emit-scroller')
        },
  }
}
</script>

<style scoped>
.faq {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10vh;
}

.faq_font {
    width: 85%;
    text-align: left;
    font-size: 45px;
    margin-bottom: -60px;
    color: white;
    line-height: 150%;
    max-width: 1200px;
}

.faq_questions {
    text-align: left;
    width: 85%;
    padding: 30px;
    border-radius: 30px;
        max-width: 1200px;
}

.faq_question {
        margin-top: 10px;
        transition: ease-in-out 200ms;
        font-size: 20px;
}

.faq_question > p {
    margin-left: 16px;
    color: white;
    font-weight: 300;
    -moz-user-select: none;
-webkit-user-select: none;
user-select: none;
}

.faq_question_banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(29, 29, 29);
    height: 60px;
    color: white;
    padding-left: 16px;
    padding-right: 6px;
    border-radius: 2px;
    transition: ease-in-out 50ms;

}

.faq_question_banner:hover {
    transform: scale(1.01);
    cursor: pointer;
}

.down {
    height: 40px;
    filter: invert(1);
    transition: ease-out 150ms;
    pointer-events: none;
    -moz-user-select: none;
-webkit-user-select: none;
user-select: none;
}


.up {
    height: 40px;
    filter: invert(1);
    transform: rotateX(180deg);
    transition: ease-out 150ms;
    pointer-events: none;
    -moz-user-select: none;
-webkit-user-select: none;
user-select: none;

}



.route-enter-from {
 opacity: 0;
 transform: translateY(-10px);
}

.route-leave-to {
 opacity: 0;
 transform: translateY(-10px);
}

.route-enter-active {
 transition: all 0.1s ease-out;
}

.route-leave-active {
 transition: all 0.1s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}


</style>