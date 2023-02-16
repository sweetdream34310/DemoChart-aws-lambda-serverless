<template>
<div class="imprint">
    <img src="/Democharts_Logo_White.png" alt="">
    <div class="text_wrapper">
  <a href="https://www.iubenda.com/privacy-policy/60582838"  style="text-decoration: none; color: inherit;" target="_blank"> <h4 class="imprint_text_1"> Privacy policy </h4> </a>
    </div>
        <div class="text_wrapper">
  <a href="https://www.iubenda.com/terms-and-conditions/60582838"  style="text-decoration: none; color: inherit;" target="_blank"> <h4 class="imprint_text_2"> Terms & Conditions </h4> </a>
    </div>
    </div>
</template>

<style scoped>
    .imprint {
        background-color: rgb(8, 8, 8);
        height: 50px;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        width: 100vw;
        color: rgb(109, 109, 109);
        text-decoration: underline;
        width: 100%;

    }

    .imprint > img {
        position: block;
        width: 120px;
        margin-right: 20px;
    }

    .imprint_text_1 {
            font-weight: 400;
            color: rgb(145, 145, 145);
            margin-right: 10px;
    }
       .imprint_text_2 {
            font-weight: 400;
            color: rgb(148, 148, 148);
            margin-left: 10px;
    }

@media (max-width: 700px) {
        .imprint > img {
        position: block;
        width: 120px;
        margin-right: 20px;
    }
    
    .imprint {
        font-size: 11px;
    }
}


</style>