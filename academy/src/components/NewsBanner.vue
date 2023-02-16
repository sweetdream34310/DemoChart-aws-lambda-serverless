<template>
    <section>
        <div class="news_banner">
            <div class="news_banner_text">
   <h1 class="news_banner_title">Exclusively for DEMOCHARTS MEMBERS <br> <span><h2>NEW SAMPLEPACKS OUT NOW.</h2></span></h1>
   <button>GO TO STHE STORE</button>
            </div>
     
        </div>
    </section>
        
</template>

<style scoped>

.news_banner {
    flex-direction: column;
    display: flex;
    align-items: left;
    justify-content: flex-end;
    background-image: linear-gradient(rgba(34, 34, 34, 0.329), rgba(238, 238, 238, 0)),  url('../img/img.jpg');
    height: 25%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 60vh;
    color: white;
    
}

.news_banner_text {
    margin-left: 2vw;
    max-width: 45%;
    margin-bottom: 7vh;
}
.news_banner_title {
    font-size: 16px;
    text-align: left;
}

.news_banner_title > span > h2 {
    font-size: 50px;
    text-align: left;
    margin-top: 10px;
}

.news_banner > h2 {
    font-family: 'font2';
}

.news_banner_text > button {
    margin-top: 20px;
    font-family: 'font1';
    padding: 12px 35px 12px 35px;
    border-radius: 100px;
    border: none;
    transition: ease-in-out 200ms;
}

.news_banner_text > button:hover {
    transform: scale(1.03);
    background-color: var(--democharts);
    color: white;
    cursor: pointer;
}

</style>