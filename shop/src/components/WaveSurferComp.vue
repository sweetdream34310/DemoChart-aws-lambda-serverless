<template>
  <div class="forms">
    <div class="controls" :class="{ controls_1: isPlaying }">
      <p>{{ genre }}</p>
    </div>
    <div class="wave_wrapper">
      <!--     <div class="wave_play_pause">
      <button @click="pauseplay">
        <span v-if="isPlaying">Pause</span>
        <span v-else>Play</span>
      </button>
    </div> -->
      <div class="wave_play_pause" @click="pauseplay">
        <img v-if="isPlaying" src="/pause.svg" alt="pause" class="play_button" />
        <img v-else src="/plei.svg" alt="play" class="pause_button" />
      </div>
      <div :id="`waveform-${idKey}`" class="waveform"></div>
    </div>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";

export default {
  name: "WavesurferComp",
  props: {
    idKey: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    genre: {
      required: true,
    },
  },
  data() {
    return {
      wavesurfer: undefined,
    };
  },
  computed: {
    isPlaying() {
      return this.wavesurfer && this.wavesurfer.isPlaying();
    },
  },
  mounted() {
    this.wavesurfer = WaveSurfer.create({
      container: `#waveform-${this.idKey}`,
      waveColor: "white",
      progressColor: "red",
      hideScrollbar: true,
      responsive: true,
      height: 70,
    });
    // console.log("wavesurfer", wavesurfer);
    // this.wavesurfer.on("ready", function () {
    //   wavesurfer.play();
    // });
    this.wavesurfer.load(this.filePath);

    const _this = this;
    this.emitter.on("PAUSE_OTHER_SOUNDS", function (payLoad) {
      _this.wavesurfer && _this.wavesurfer.pause();
    });
  },
  methods: {
    pauseplay() {
      if (!this.wavesurfer.isPlaying()) {
        this.emitter.emit("PAUSE_OTHER_SOUNDS");
      }

      this.wavesurfer.playPause();
    },
  },
  // setup() {
  //   $(".controls .btn").on("click", function () {
  //     var action = $(this).data("action");
  //     console.log(action);
  //     switch (action) {
  //       case "play":
  //         wavesurfer.playPause();
  //         break;
  //       case "back":
  //         wavesurfer.skipBackward();
  //         break;
  //       case "forward":
  //         wavesurfer.skipForward();
  //         break;
  //       case "mute":
  //         wavesurfer.toggleMute();
  //         break;
  //     }
};
</script>

<style scoped>
.play_button {
  width: 14px;
  filter: invert(1);
  opacity: 1;
}

.play_button:hover {
  cursor: pointer; 
  transform: scale(1.2);
}

.pause_button:hover {
  cursor: pointer; 
  transform: scale(1.2);
}


.pause_button {
  width: 14px;
  filter: invert(1);
  opacity: 0.9;
}

.controls {
  display: flex;
}

.controls > p {
  color: rgb(221, 221, 221);
  margin-left: 15px;
  font-weight: 200;
}

.controls_1 {
  display: flex;
}

.controls_1 > p {
  color: rgb(255, 255, 255);
  margin-left: 15px;
  font-weight: 200;
  transition: 200ms ease-in-out;
}

.wave_play_pause {
  width: 50px;
  margin-right: 10px;
}

.wave_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 20px 0px 0px;
}

.forms {
  /*   flex: 33%;
  box-sizing: border-box;
  padding: 25px; */
}
#waveform {
  /* flex-wrap: wrap; */
}

.waveform {
  width: 300px;
}

@media (max-width: 450px) {
  .waveform {
    width: 250px;
  }
  .controls {
    display: flex;
  }

  .controls > p {
    color: rgb(122, 122, 122);
    margin-left: 15px;
    font-weight: 200;
  }

  .controls_1 {
    display: flex;
  }

  .controls_1 > p {
    color: rgb(255, 255, 255);
    margin-left: 15px;
    font-weight: 200;
    transition: 200ms ease-in-out;
  }
}
</style>
