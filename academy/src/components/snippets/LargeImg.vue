<template>
    <div class="simple_text">
       <div class="simple_img"  :style="{ 'background-image': 'url(' + img + ')'}">
       </div>
        <p>{{description}}</p>
     </div>
</template>

<script>

export default {
    props: ['img', 'alt', 'description'],
}

</script>


<style scoped>

.simple_text {
    position: relative;
    width: 100vw;
   justify-content: center;
   text-align: right;
   padding: 1vh 0 1vh 0;
}
.simple_img {
    min-height: 600px;
    margin: 0 10vw 0 10vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1.5px solid white;

}

.simple_text > p {
    font-family: 'Josefin Sans', 'Sans-Serif';
    margin: 10px 10vw 15px 10vw;
    font-size: 14px;
    font-weight: 300;

}
</style>