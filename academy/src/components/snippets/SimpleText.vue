<template>
    <div class="simple_text">
        <h2>{{title}}</h2>
        <p>{{text}}</p>
        <h6>{{text2}}</h6>
    </div>
</template>

<script>

export default {
    props: ['title', 'text'],
}

</script>


<style scoped>

.simple_text {
    width: 100%;
    padding: 5vh 0 5vh 0;
}

.simple_text > h2 {
    margin-left: 10vw;
    color: var(--democharts);
    max-width: 60%;
}

.simple_text > p {
    margin-top: 2vh;
    font-family: 'Josefin Sans', 'Sans-Serif';
    margin-left: 10vw;
    max-width: 70%;
    font-weight: 300;
    font-size: 20px;
    line-height: 140%;
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