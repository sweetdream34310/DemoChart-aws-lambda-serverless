<template>
    <div class="end_snippet">
        <hr/>
        <h4>{{title}}</h4>
     <p>{{text}}</p>
    <div class="end_snippet_buttons">
    <router-link class="end_button" :to="link1">{{button1}}</router-link>
    </div>
</div>

</template>

<script>
export default {
    props: ['text', 'title', 'button1', 'button2', 'link1'],
}
</script>

<style scoped>
.end_snippet {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10vh 0 10vh 0;
}

.end_snippet > h4 {
    font-size: 40px;
    margin: 0 4vw 1vh 4vw;
}

.end_snippet > hr {
    width: 20vw;
    margin-bottom: 2vh;
    border: none;
    height: 1px;
    background: rgb(104, 104, 104);
}

.end_snippet > p {
    font-family: 'font2', 'Josefin Sans', 'Sans-Serif';
    font-weight: 300;
}


.end_snippet_buttons {
    display: flex;
    align-items: center;
    justify-content: center;
}

.end_button {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    font-family: 'font1';
    padding: 12px 35px 12px 35px;
    border-radius: 100px;
    border: none;
    transition: ease-in-out 200ms;
    text-decoration: none;
    background-color: white;
    color: var(--democharts)
}

.end_button:hover {
    transform: scale(1.03);
    background-color: var(--democharts);
    color: white;
    cursor: pointer;
}

@media (max-width: 800px) {

}

</style>

