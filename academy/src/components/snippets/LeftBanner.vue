<template>
    <div class="left_banner">
        <div class="left_banner_left">
            <h2><span>{{title1}}</span>{{title2}}</h2>
            <p>{{text}}</p>
             <h6>{{text2}}</h6>

        </div>
        <div class="left_banner_right">
            <div class="img_banner"  :style="{ 'background-image': 'url(' + img + ')'}"></div>
            <p>{{description}}</p>
        </div>
    </div>
</template>


<script>
export default {
     props: ['title1', 'title2', 'text', 'text2', 'img','description'],
}
</script>





<style scoped>

.left_banner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3vw 10vw 3vw 10vw;
    margin-bottom: 1vh;
    background-color: rgb(24, 24, 24);
}

.left_banner_left {
    width: 50%;
}
.left_banner_left > p, h6 {
    font-family: 'Josefin Sans', 'Sans-Serif';
    font-size: 18px;
    max-width: 100%;
    line-height: 130%;
    font-weight: 300;
    margin-top: 2vh;
}


.left_banner_left > h2 {
    font-size: 20px;
    max-width: 100%;
}

.left_banner_left > h2 > span {
    color: var(--democharts);
}

.left_banner_right {
    width: 50%;
    margin: 0 0 0 4vw;
    min-height: 350px;
    text-align: right;

}

.left_banner_right > p {
     font-family: 'Josefin Sans', 'Sans-Serif';
    font-size: 14px;
    line-height: 130%;
    font-weight: 300;
    margin-top: 1vh;
}

.img_banner {
    min-height: 350px;
    object-fit: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}


@media (max-width: 1000px) {
    .left_banner {
    display: flex;
    flex-direction: column;
    margin: 0 0 2vh 0;
    padding: 3vw 7vw 3vw 7vw;
    }

    .left_banner_left > h2 {
        margin-top: 4vh;
    }

      .left_banner_left > p {
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
    .left_banner_left {
        width: 100%;
    }
    .img_banner {
        margin-top: 2vh;
        min-height: none;
    }

    .left_banner_right {
        width: 100%;
        margin: 0 0vw 0 0vw;
    }
}
</style>