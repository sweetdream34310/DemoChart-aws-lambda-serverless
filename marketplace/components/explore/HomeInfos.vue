<template>
<div class="home_infos">

    <div class="home_info_top_banner">
        <img src="/Democharts_logo_white.png" alt="">
        <div class="home_info_text">
        <h1>The Record Label <span>Marketplace</span></h1>
        <div>
        <p>Sign Up</p>
        <img src="/down.svg" alt="">
        </div>
        </div>
    </div>

    <div class="home_info_service">
        <h3>Book Freelance Services</h3>
        <div class="home_info_mini_services">
            <div class="home_info_mini_service">
                <div class="home_info_mini_service_box">
                    <img src="/dance.svg" alt="">
                </div>
                <p>Influencers</p>
            </div>
             <div class="home_info_mini_service">
                <div class="home_info_mini_service_box">
                    <img src="/cd.svg" alt="">
                </div>
                <p>Business</p>
            </div> 
            <div class="home_info_mini_service">
                <div class="home_info_mini_service_box">
                    <img src="/megaphone.svg" alt="">
                </div>
                <p>Design</p>
            </div>
             <div class="home_info_mini_service">
                <div class="home_info_mini_service_box">
                    <img src="/handshake.svg" alt="">
                </div>
                <p>Music-Promo</p>
            </div>
        </div>
    </div>

    <div class="home_info_containers">
        <div class="home_info_container bg-black" id="home_info_container_img_2">
            <h4>Influencer Promotion</h4>
            <div>
            <p>Explore Influencers</p>
             <img class="home_info_img_1" src="/down.svg" alt="">
             </div>
        </div>
         <div class="home_info_container bg-black" id="home_info_container_img">
            <h4>Mentoring and Feedback</h4>
            <div>
            <p>Explore Mentors</p>
            <img class="home_info_img_2" src="/down.svg" alt="">
            </div>
           
        </div>
    </div>

    </div>
</template>


<style scoped>

@media (min-width: 400px) {
.home_infos {
    display: none;
}
}


.home_info_service > h3 {
    margin-left: 34px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
}
.home_info_top_banner {
    display: flex;
    flex-direction: column;
    height: 150px;
    background-color: gray;
    margin:20px 1rem;
    border-radius: 1rem;
    background-image: url('../public/Background_Red.jpg');
    background-size: 100%;
}

.home_info_top_banner > img {
    width: 180px;
}

.home_info_text {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.home_info_text > h1 {
    font-size: 22px;
    font-weight: bold;
    margin: 0 0 0 25px;
    color: white;
}

.home_info_text > h1 > span {
    font-weight: 400;
}

.home_info_text > div {
    display: flex;
    align-items: center;
    width: 120px;
    margin-top: 40px;
}

.home_info_text > div > p {
    font-size: 13px;
    font-weight: 500;
    color: white;
}

.home_info_text > div > img {
    width: 16px;
    rotate: 270deg;
    filter: invert(1);
}

.home_info_mini_service {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10px;
}

.home_info_mini_service_box {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(240, 240, 240);
    width: 60px;
    height: 60px;
    border-radius: 15px;
    border: 1px solid white;
    margin-bottom: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 19px 0px;
}

.home_info_mini_services {
    display: flex;
    align-items: center;
    justify-content: center;
}

.home_info_mini_service > p {
    font-size: 11px;
}

.home_info_mini_service_box > img {
    width: 28px;
}

.home_info_containers {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-left: 20px;
}

.home_info_container {
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 230px;
    width: 200px;
    margin-right: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}

#home_info_container_img {
        background-image: url('../public/imgs_2.jpg');
        background-size: 130%;
}

#home_info_container_img_2 {
        background-image: url('../public/imgs_1.jpg');
        background-size: 130%;
}

.home_info_container {
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 230px;
    width: 200px;
    margin-right: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.home_info_container > h4 {
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
    color: white;
    margin-bottom: 10px;
}

.home_info_container > div > p {
    font-size: 13px;
    color: white;
    margin-left: 10px;
} 

.home_info_container > div {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
}

.home_info_container > div > img {
    width: 14px;
    rotate: 270deg;
    margin-top: 2px;
    filter: invert(1);
}

.home_info_gig_header {
    display: flex;
    margin-left: 1rem;
    font-size: 18px;
    font-weight: 700;
    align-items: center;
    margin-bottom: 10px;
}


</style>