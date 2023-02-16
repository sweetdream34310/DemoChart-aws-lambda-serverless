<template>
    <div class="simple_text" :style="{'background-color':colorVariable}">
        <h2>{{title}}</h2>
        <hr />
        <p>{{text}}</p>
        <h6>{{text2}}</h6>
    </div>
</template>

<script>

export default {
    props: ['title', 'text', 'color'],

  data() {
    return {
      colorVariable: this.color,
    }
  },
}

</script>


<style scoped>

.simple_text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 5vh 0 5vh 0;
}

.simple_text > h2 {
    color: var(--democharts);
    max-width: 80vw;
    text-align: center;
    font-size: 22px;
}

.simple_text > p {
    font-family: 'Josefin Sans', 'Sans-Serif';
    max-width: 80%;
    font-weight: 300;
    font-size: 18px;
    line-height: 140%;
    text-align: center;
}

.simple_text > hr {
    border: none;
    height: 1px;
    background-color: rgb(85, 85, 85);
    width: 5%;
    margin: 15px 0 15px 0;
}

.simple_text > h6 {
    margin-top: 2vh;
    font-family: 'Josefin Sans', 'Sans-Serif';
    margin-left: 10vw;
    max-width: 70%;
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
}



@media (max-width: 1000px) {
    .simple_text {
        padding: 2vh 0 2vh 0;
    }
    .simple_text > h2 {
    margin-left: 7vw;
    color: var(--democharts);
    max-width: 60%;
}
}

</style>