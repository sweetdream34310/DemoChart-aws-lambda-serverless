<template>
       <div class="blog_topper">
        <div class="blog_topper_img"  :style="{ 'background-image': 'url(' + img + ')'}">
          <router-link to="/"  style="text-decoration: none; color: inherit;">  
           <div class="blog_topper_back">
  <p>OTHER ARTICLES</p>  
   <img class="blog_arrow" src='/img/arrow.svg' alt="left_arrow"/>
            </div>
            </router-link> 
        </div>
        <div class="blog_topper_font">
    <h1>{{title}}</h1>
        <p>{{author}}</p>
        </div>
        <div class="blog_topper_tag">
            <p>{{tag}}</p>
            <hr>
        </div>
       
    </div>
</template>

<script>
export default {
     props: ['title', 'author', 'tag','img'],
}
</script>


<style scoped>

.blog_topper_back {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-top: 2vh;
    justify-content: start;
    margin-left: 2vw;
    width: fit-content;
    height: fit-content;
    transition: ease-in-out 200ms;
    color: white;
    font-size: 12px;
}
.blog_topper_back > p {
    text-decoration: none;

}

.blog_topper_back:hover {
    cursor: pointer;
    transform: scale(1.03);
}

.blog_topper_back > img {
    width: 20px;
    margin-right: 20px;
    filter:invert(1)
}



.blog_topper_img {
    display: flex;
    width: 100vw;
    min-height: 30vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.blog_topper_img > div > p {
    font-size: 12px;
}

.blog_topper_font {
    display: flex;
    flex-direction: column;
    text-align: right;
    margin: 2vw 10vw 2vw 2vw;
    align-items: flex-end;
}

.blog_topper_font > h1 {
    font-size: 70px;
    max-width: 75%;
    line-height: 100%;
}

.blog_topper_font > p {
    margin-top: 10px;
    font-size: 12px;
}

.blog_topper_tag > p {
    padding: 5px 15px 5px 15px;
    margin-left: 10vw;
    color: white;
    border: white 1px solid; 
    border-radius: 100px;
    width: fit-content;
    font-size: 10px;
    margin-bottom: 10px;
    margin-top: -10px;

}

.blog_topper_tag {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
}

.blog_topper_tag > hr {
    height: 1px;
    border: none;
    background: rgb(121, 121, 121);
    margin-bottom: 10px;
    margin-left: 10vw;
    margin-right: 10vw;
}

@media (max-width: 1000px) {
    .blog_topper_font > h1 {
        font-size: 40px;
        margin-top: 10px;
        max-width: 80%;
        margin-left: 2vw;
    }
    .blog_topper_tag > hr {
   
    margin-left: 7vw;
    margin-right: 7vw;
}

 .blog_topper_tag > p {
     margin-left: 7vw;
 }

.blog_topper_font {
    display: flex;
    flex-direction: column;
    text-align: right;
    margin: 2vw 7vw 2vw 2vw;
    align-items: flex-end;
}
}

@media (max-width: 800px) {

    .blog_topper_font > h1 {
        max-width: 90%;
        margin-top: 20px;
    }
    .blog_topper_tag {
        margin-top: 30px;
    }
    .blog_arrow {
        margin-left: 20px;
    }
    .blog_topper_back > p {
        margin-left: -10px
    }
}

@media (max-width: 600px) {

    .blog_topper_font > h1 {
        max-width: 90%;
        margin-top: 20px;
        font-size: 30px;

    }

}

</style>