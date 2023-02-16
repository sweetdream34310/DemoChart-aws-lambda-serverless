<template>
    <div class="simple_big_text">
        <h2 :style="{ 'color': color}">{{title}}</h2>
        <p>{{text}}</p>
        <h5>{{text2}}</h5>
        <h6 :class="isBold === 'true' ? 'simple_bold' : 'simple_not'">{{text3}}</h6>
        <a :href="link" class="simple_big_button" v-if="isClicked" target="_blank">{{buttonText}}</a>
    </div>
</template>

<script>

export default {
    props: ['title', 'text','text2', 'text3', 'link', 'isClicked', 'buttonText', 'color', 'isBold'],
}

</script>


<style scoped>

.simple_big_text {
    width: 100%;
    padding: 5vh 0 5vh 0;
}

.simple_big_text > h2 {
    margin-left: 10vw;
    margin-right: 10vw;
    font-size: 40px;
    color: var(--democharts);
    max-width: 60%;
}

.simple_big_text > p, h5 {
    margin-top: 2vh;
    font-family: 'Josefin Sans', 'Sans-Serif';
    margin-left: 10vw;
    max-width: 70%;
    font-weight: 300;
    font-size: 20px;
    line-height: 140%;
}

.simple_bold {
    margin-top: 2vh;
    font-family: 'Josefin Sans', 'Sans-Serif';
    margin-left: 10vw;
    max-width: 70%;
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
}

.simple_not {
    margin-top: 2vh;
    font-family: 'Josefin Sans', 'Sans-Serif';
    margin-left: 10vw;
    max-width: 70%;
    font-weight: 300;
    font-size: 20px;
    line-height: 140%;
}

.simple_big_button {
    display: flex;
    width: fit-content;
    margin-top: 4vh;
    font-family: 'font1';
    padding: 12px 35px 12px 35px;
    background-color: white;
    border-radius: 100px;
    border: none;
    transition: ease-in-out 200ms;
    color: var(--democharts);
    margin-left: 10vw;
    text-decoration: none;
}
.simple_big_text > a:hover {
    transform: scale(1.03);
    background-color: var(--democharts);
    color: white;
    cursor: pointer;
}

@media (max-width: 1000px) {
    .simple_big_text {
        padding: 4vh 0 4vh 0;
    }
     .simple_big_text > h2 {
         font-size: 32px;
         max-width: 80%;
        }
        .simple_big_text > h2 {
    margin-left: 7vw;
    margin-right: 7vw;
}

.simple_big_button {
    font-size: 12px;
    margin-left: 7vw;
    margin-top: 2vh;
}


.simple_big_text > p, h5 {

    margin-left: 7vw;
}
}

</style>