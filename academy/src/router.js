import {createRouter, createWebHistory} from 'vue-router'
import HomeScreen from './pages/HomeScreen.vue'
import BlogTester from './pages/blogs/BlogTester.vue'
import Blog1 from './pages/blogs/Blog1.vue'
import Blog2 from './pages/blogs/Blog2.vue'
import Blog3 from './pages/blogs/Blog3.vue'
import Blog4 from './pages/blogs/Blog4.vue'
import Blog5 from './pages/blogs/Blog5.vue'
import Blog6 from './pages/blogs/Blog6.vue'
import Blog7 from './pages/blogs/Blog7.vue'






/// Async bzw. Lazy Loading - > Ladet erst wenn gebraucht wird 


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeScreen},
        { path: '/test', component: BlogTester},
        { path: '/3-Ways-To-Improve-Your-Sound', component: Blog1},
        { path: '/3-Mistakes-To-Avoid-As-An-Artist', component: Blog2},
        { path: '/Ready-For-A-Record-Label', component: Blog3},
        { path: '/Democharts-FAQ', component: Blog4},
        { path: '/4-Sure-Fire-Hacks-To-Streaming-Success', component: Blog5},
        { path: '/3-Pro-Tips-For-Professional-Audio-Quality', component: Blog6},
        { path: '/30-Logic-Pro-Hacks', component: Blog7},





    ],
    scrollBehavior(_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { left: 0, top: 0 }
    }
});

export default router