<template>
    <div>
    <blog-filter @change-filter="setFilter" @reset-filter="setFilter"></blog-filter>
    </div>
        <ul class="media-scroller snaps-inline">
    <blog-preview 
    v-for="prev in filteredBlogs" 
    :key="prev.id" 
    :title="prev.title"
    :img="prev.img"
    :isNew="prev.isNew"
    :neu="prev.neu"
    :tag="prev.tag"
    :link="prev.link"
     >
     </blog-preview>
        </ul>
    
</template>

<script>
import BlogPreview from './BlogPreview.vue'
import BlogFilter from './BlogFilter.vue'

export default {
  components: { BlogPreview, BlogFilter },

  data() {
      return {
            newId: '',

                previewItems: [
                     {
                id: '5',
                img: '../img/img29.jpg',
                imgHover: '',
                title: '4 Sure-Fire Hacks to Streaming Success',
                isNew: true,
                neu: 'NEW',
                tag: 'Marketing',
                link: '/4-Sure-Fire-Hacks-To-Streaming-Success'
            },
                    
            {
                id: '1',
                img: '../img/img25.jpg',
                imgHover: '',
                title: '3 Simple ways to improve the quality of your sound',
                isNew: true,
                neu: 'NEW',
                tag: 'Recording',
                link: '/3-Ways-To-Improve-Your-Sound'
            },
              {
                id: '2',
                img: '../img/img34.jpg',
                imgHover: '',
                title: '3 Mistakes to avoid as an Artist',
                isNew: true,
                neu: 'NEW',
                tag: 'Marketing',
                link: '/3-Mistakes-To-Avoid-As-An-Artist'
            },
              {
                id: '3',
                img: '../img/img10.jpg',
                imgHover: '',
                title: 'Are you ready for a Record Label?',
                isNew: true,
                neu: 'NEW',
                tag: 'Marketing',
                link: '/Ready-For-A-Record-Label'
            },
                      {
                id: '4',
                img: '../img/img35.jpg',
                imgHover: '',
                title: 'Democharts: FAQ',
                isNew: false,
                neu: '',
                tag: 'Marketing',
                link: '/Democharts-FAQ'
            },
                
                      {
                id: '6',
                img: '../img/img27.jpg',
                imgHover: '',
                title: '3 pro tips for achieving a professional quality recording',
                isNew: true,
                neu: 'NEW',
                tag: 'Recording',
                link: '/3-Pro-Tips-For-Professional-Audio-Quality'
            },
                  {
                id: '7',
                img: '../img/BLOG7/page_portrait.jpg',
                imgHover: '',
                title: '30 Logic Pro hacks that level up your productions',
                isNew: true,
                neu: 'NEW',
                tag: 'Producing',
                link: '/30-Logic-Pro-Hacks'
            },

               ]
      }
  },
  methods: {
      setFilter(updatedFilters) {
          this.newId = updatedFilters;
      },
  },
  computed: {
 
      filteredBlogs() {
          return this.previewItems.filter((blog) => {
              if(this.newId === '') {
                  return this.previewItems;
              }
              return blog.tag.match(this.newId)
          })
      }
  }

}

</script>

<style>


.media-scroller {
    display: grid;
    grid-auto-flow: column;
    gap: 20px;
    grid-auto-columns: 36%;
    padding: 10px 20px 20px 20px;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    margin-left: 10px;
}

.media-scroller::-webkit-scrollbar {
  display: none;
}

.snaps-inline {
    scroll-snap-type: inline mandatory;
    scroll-padding-inline: 20px;
}

.snaps-inline > * {
    scroll-snap-align: start;
}

@media (max-width: 1000px) {
    .media-scroller {
        grid-auto-columns: 56%;
    }
}


@media (max-width: 600px) {
    .media-scroller {
        grid-auto-columns: 76%;
    }
}

@media (max-width: 500px) {
    .media-scroller {
        grid-auto-columns: 90%;
    }
}


</style>