<template>
    <section>
        <div class="home_header">
            <div class="home_header_title">
                <h4>DEMOCHARTS</h4>
             <h1 ><span>ACADEMY</span></h1>
            </div>
        <h2>GET YOUR MUSIC CAREER TO THE NEXT LEVEL</h2>
        </div>
    </section>
        
</template>

<style scoped>

.home_header {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(rgba(34, 34, 34, 0.329), rgba(238, 238, 238, 0)),  url('../img/Democharts_BG_1.jpg');
    height: 25%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 50vh;
    color: white;
}

.home_header_title {
    font-size: 30px;
    text-align: center;
}
.home_header_title > h1 {
    font-size: 100px;
    text-align: center;
    color: var(--democharts)
}

.home_header > h2 {
    font-family: 'font2';
}

.home_header_title > h1 {
  color: #ffffff;
  font-size: 72px;
  text-transform: uppercase;
  font-weight: 700;
  background: linear-gradient(to right, #E73A39 1%, #9c2929 40%, #E73A39 70%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 10s linear infinite;
  display: inline-block;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}



</style>