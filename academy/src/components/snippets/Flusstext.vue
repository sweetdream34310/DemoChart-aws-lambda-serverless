<template>
    <div class="simple_text">
        <p>{{text}}</p>
         <h5>{{text2}}</h5>
           <h6>{{text3}}</h6>
    </div>
</template>

<script>

export default {
    props: ['text', 'text2', 'text3'],
}

</script>


<style scoped>

.simple_text {
    width: 100%;
    padding: 2vh 0 0vh 0;
}

.simple_text > p, h5, h6 {
    margin-top: 1vh;
    font-family: 'Josefin Sans', 'Sans-Serif';
    margin-left: 10vw;
    max-width: 70%;
    font-weight: 300;
    font-size: 20px;
    line-height: 140%;
}



</style>