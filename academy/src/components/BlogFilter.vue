<template>
  <div class="blog_filter">
      <div class="blog_filter_links">
          <h3>ARTICLES FOR MUSIC ARTISTS</h3>
          <img src="/img/down.svg" alt="arrow down" >
      </div>
      <div class="blog_filter_rechts">
          <h4>Filter Articles:</h4>
            <p @click="resetFilter" :class="[inputId === '' ? 'highlight' : '']">All</p>
        <p id="Marketing" isActive @click="setFilter" :class="[inputId === 'Marketing' ? 'highlight' : '']"> Marketing</p>
        <p id="Recording" isActive @click="setFilter" :class="[inputId === 'Recording' ? 'highlight' : '']">Recording</p>
        <p id="Producing" isActive @click="setFilter" :class="[inputId === 'Producing' ? 'highlight' : '']">Producing</p>
      </div>
  </div>
</template>

<script>
export default {
    emits:['change-filter', 'reset-filter'],
data() {
    return {
        inputId: '',
    
    }
}, 
    methods: {
        
  /*       setFilter(event) {
                    console.log(this.filters)
            const inputId = event.target.id;
            const isActive = !this.filters;

            const updatedFilters = {
                ...this.filters, 
                [inputId]: isActive
            };
            this.filters = updatedFilters;
            this.$emit('change-filter', updatedFilters)
                   
            console.log(inputId)
        }, */

        setFilter(event) {
             const inputId = event.target.id
             this.$emit('change-filter', inputId)
             this.inputId = inputId
        },
        resetFilter() {
            const inputId = ''
             this.$emit('reset-filter', inputId)
             this.inputId = inputId
        }
     
 }

}



</script>

<style scoped>

    .blog_filter {
        display: flex;
        width: 100vw;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        margin-bottom: -20px;
        margin-top: -10px;
    }
    .blog_filter_links {
        margin-left: 3vw;
        font-size: 18px;
        display: flex;
        align-items: center;
        width: 50%;
    }

    .blog_filter_links > img {
        width: 45px;
        filter: invert(1);
        margin-left: 10px;
    }

      .blog_filter_rechts {
        margin-left: 2vw;
        display: flex;
        margin-right: 1vw;
        align-items: center;
    }

    .blog_filter_rechts > p {
        padding: 5px 15px 5px 15px;
        border: 1px solid white;
        margin: 40px 5px 40px 5px;
        font-size: 10px;
        border-radius: 100px;
        transition: ease-in-out 200ms;
    }

        .blog_filter_rechts > h4 {
        font-family: 'font2', 'sans-serif';
        padding: 5px 10px 5px 15px;
        margin: 40px 5px 40px 5px;
        font-size: 10px;
        border-radius: 100px;
        transition: ease-in-out 200ms;
    }

    .blog_filter_rechts > p:hover {
        cursor: pointer;
        transform: scale(1.02);
        color: var(--democharts)
    }

    .highlight {
        background-color: var(--democharts);
        color: white;
        border: 1px solid var(--democharts) !important;
    }
      .highlight:hover {
        background-color: var(--democharts);
        color: white !important;
        border: 1px solid var(--democharts) !important;
    }

    @media (max-width: 1200px) {

        .blog_filter_rechts {
            width: 60%;
            justify-content: flex-end;
            margin-left: 0;
        }
        .blog_filter_rechts > p {
            text-align: center;
            margin-left: 0;
            
        }
        .blog_filter_links > h3 {
            font-size: 16px;
            margin-left: 20px;
        }
    }


    @media (max-width: 980px) {
        .blog_filter {
            display: flex;
            flex-direction: column;
            margin-top: 0;
        }

        .blog_filter_links {
            width: 100%;
           justify-content: center;
            margin-left: 0px;
            margin-right: 0px;
        }
        .blog_filter_links > h3 {
            margin-top: 2vh;
            font-size: 25px;
            margin-left: 0;
            margin-right: 0;
    
        }
        .blog_filter_rechts {
            margin: 0;
            justify-content: center;
            width: 100%;

        }

        .blog_filter_links > img {
            display: none;
        }

         .blog_filter_rechts > p {
            margin-top: 10px;
        }

        .blog_filter_rechts > h4 {
            margin-top: 10px;
        }

        @media (max-width: 600px) {

        .blog_filter_links > h3 {
            font-size: 20px;
            margin-bottom: 10px;
        }

        .blog_filter_rechts > h4 {
            display: none;
        }
        }

          @media (max-width: 420px) {

        .blog_filter_links > h3 {
            font-size: 12px;
            margin-top: 20px;
        }

         .blog_filter_rechts > p {
        padding: 4px 12px 4px 12px;
        border: 1px solid white;
        font-size: 7px;
        border-radius: 100px;
        transition: ease-in-out 200ms;
    }
        }
}


</style>