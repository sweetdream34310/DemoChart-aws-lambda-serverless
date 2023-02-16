<template>
        <div class="blog_preview" id="container" :to="contactLink"> 
       <router-link :to="link" class="blog_preview_link"  style="text-decoration: none; color: inherit;"> 
                 <transition name="blog">
           <div class="blog_preview_box" :style="{ 'background-image': 'url(' + img + ')'}" >
           <span v-if="isNew"> <p>{{neu}}</p> </span>
            <p>{{tag}}</p>
        </div>
        </transition>
        </router-link>
        <div class="blog_preview_title">
            <p>{{title}}</p>
        </div>
        </div>
</template>

<script>
export default {
    props: ['title', 'neu', 'tag','img','isNew','link'],
    methods: {
         contactLink() {
         return this.$route.path + '/' + this.link;
     },
    }

}

</script>

<style>





.blog_preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 40vh;
    max-height: 500px;
    
}



.blog_preview_link {
    display: flex;
    width: 100%;
    border: none;
}

.blog_preview_box {
    display: flex;
    min-height: 400px;
    inline-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: black;
    transition: ease-in-out 200ms;
    box-sizing: border-box;
    border: solid 2px rgb(19, 19, 19);
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
}

.blog_preview_box:hover {
    transform: scale(1.02);
    cursor: pointer;
    border: solid 2px var(--democharts);
    
}

.blog_preview_box > p {
    font-family: 'font1';
    padding: 5px 15px 5px 15px;
    border: 1px solid white;
    border-radius: 100px;
    margin: 10px;
    height: fit-content;
    font-size: 10px;
}

.blog_preview_box > span > p {
    font-family: 'font1';
    padding: 5px 15px 5px 15px;
    border: 1px solid var(--democharts);
    background-color: var(--democharts);
    border-radius: 100px;
    margin: 10px 0px 10px 10px;
    height: fit-content;
    font-size: 10px;
}

.blog_preview_title {
    margin: 20px 10px 0px 10px;
    font-size: 19px;
    font-family: 'Josefin Sans';
    height: 50px;
    text-align: center;
}


@media (max-width: 1100px) {
    .blog_preview_box {
        height: 600px;
}

    .blog_preview {
        min-height: 650px;
    }

}



@media (max-width: 1200px) {
    .blog_preview_box > p {
        font-size: 8px;
    }
      .blog_preview_box > span > p {
        font-size: 8px;
    }
    .blog_preview_title {
    margin: 20px 10px 0px 10px;
    font-size: 15px;
    font-family: 'Josefin Sans';
}
}

@media (max-width: 500px) {


.blog_preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 40vh;    
}


.blog_preview_box {
        height: 400px;
}
}
    


</style>