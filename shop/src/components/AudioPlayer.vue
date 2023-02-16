<template>
    <div class="player_box">
       <audio controls>
           <source :src="product.songFile" type="audio/mpeg">
       </audio>
        </div>
</template>

<script lang="ts">

export default {
    props: {
        product: {
        type: Object,
        required: true
        }
    },
    setup() {
        
    },
}
</script>


<style scoped >

.player_box {
    display: flex;
    background-color: rgba(240, 248, 255, 0.068);
    align-items: center;
    justify-content: center;
    border-radius: 100px;   
    transition: ease-in-out 200ms;

}

.player_box:hover {
    transform: scale(1.01);
}


audio {
    width: 100%;
}

audio::-webkit-media-controls-panel {
    width: 500px;
}

audio::-webkit-media-controls-enclosure {
    background: none;
}

audio::-webkit-media-controls-play-button {
    background-color: rgb(28, 193, 199);
    border-radius: 100px;
    filter: invert(1);
    
}

audio::-webkit-media-controls-play-button:hover {
    transform: scale(1.03);
    
}

audio::-webkit-media-controls-mute-button {
    background-color: rgb(30, 196, 174);
    border-radius: 100px;
    filter: invert(1);
    
}

audio::-webkit-media-controls-current-time-display {
    display: none;
}

audio::-webkit-media-controls-time-remaining-display {
    display: none;
}

audio::-webkit-media-controls-timeline {
    filter: invert(1);
}




</style>