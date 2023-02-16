<template>
        <div>
            <router-link class="reward_component" :to="link" style="text-decoration: none; color: inherit;">
            <div class="reward_component_top">
                <div class="reward_component_tags">
         <p class="super_price_tag"> <span>{{price}}</span> Price </p>
         <p class="super_worth_tag"> Worth: <span>{{worth}} $</span></p>
                </div>
        
            <img :src="img" alt=""/>
            </div>
            <div class="reward_component_bottom">
            <h3>{{title}}</h3>
            <!-- <hr> -->
            <p>{{text}}</p>
            </div>
            </router-link>
        </div>
</template>

<script>
export default {
    props: ['tag', 'tagColor', 'micro', 'img', 'title', 'text', 'link', 'hide', 'price', 'worth']
}

</script>



<style scoped>

.reward_component {
    display: flex;
    flex-direction: column;
    width: 310px;
    background-color: rgb(20, 20, 20);
    align-items: center;
    padding: 0 0 0 0;
    border-radius: 15px;
    margin: 20px 30px 0 30px ;
    transition: ease-in-out 200ms;
    border: 2px solid rgb(rgb(255, 255, 255));
        box-shadow: rgba(68, 68, 71, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }

.reward_component:hover {
    transform: scale(1.02);
    transition: ease-in-out 200ms;
    cursor: pointer;

}

.super_price_tag {
    font-weight: 700 !important;
    background-color: rgb(61, 61, 61) !important;
    border-radius: 100px !important;
    margin-left: 10px;
    text-align: center;
}

.super_worth_tag {
    font-weight: 400 !important;
    border-radius: 100px !important;
    margin-left: 10px;
    text-align: center;
    
}

.super_price_tag > span {
    color: rgb(32, 32, 32) !important;
    font-family: 'font1';
    padding: 4px 4px 4px 7px;
    background: #C8FF5F;
    border-radius: 100px;
    font-size: 10px !important;
}

.super_worth_tag > span {
    color: rgb(32, 32, 32) !important;
    font-family: 'font1';
    padding: 4px 5px 4px 7px;
    background: #C8FF5F;
    border-radius: 100px;
    font-size: 10px !important;
}
.reward_component:hover img {
    opacity: 1;
}

.reward_component_tags {
    display: flex;
    justify-content: space-between;
}
.reward_component_tags > p {
    position: relative;
    padding: 5px 10px 3px 0px;
    width: fit-content;
    font-weight: 600;
    font-size: 12px;
    z-index: 4;
    color: white;
    text-transform: uppercase;
}


.hidden {
        position: relative;
    left: -5px;
    background-color: rgb(240, 248, 255);
    padding: 3px 10px 3px 10px;
    width: fit-content;
    font-weight: 600;
    font-size: 12px;
    border-top-left-radius: 9px;
         border-bottom-right-radius: 10px;
         z-index: 4;
         color: black;
      text-transform: uppercase;
        visibility: hidden;
}


.reward_component_top > img {
    margin-top: -45px;
    width: 310px;
    height: 240px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    opacity: 0.75;
}

.reward_component_bottom {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: top;
    align-items: center;
    width: 95%;
    min-height: 180px;
    color: white;
}

.reward_component_bottom > h5 {
    margin-top: 20px;
    font-weight: 500;
    border-radius: 100px;
    padding: 5px 10px 5px 10px;
    width: fit-content;
}


.reward_component_bottom > h3 {    
    margin: 30px 0 0 0;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: 'font1';
}

.reward_component_bottom > p {
    margin: 20px 15px 0 15px;
    font-size: 15px;
    font-weight: 400;
    font-weight: 300;
    color: white
}

.reward_component_blue {
    font-size: 14px;
    text-decoration: underline;
    text-underline-offset: 2px;
    font-weight: 600;
    color: var(--mcw);
}


.reward_component_blue:hover {
   transform: scale(1.03);
   color: var(--mcwLight);
}


</style>