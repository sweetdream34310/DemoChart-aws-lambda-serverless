import { createRouter, createWebHistory } from "vue-router";
import isLoggedIn from "../middleware/isLoggedIn";
import Baby from "../pages/baby.vue";
import Cart from "../pages/cart.vue";
import CheckedOut from "../pages/checkedOut.vue";
import Checkout from "../pages/checkout.vue";
import Checkout2 from "../pages/checkout2.vue";
import Contest_1 from "../pages/contest_1.vue";
import Enter from "../pages/enter.vue";
import Free from "../pages/free.vue";
import freeSent from "../pages/freeSent.vue";
import FreeTok from "../pages/freeTok.vue";
import Index from "../pages/index.vue";
import Index2 from "../pages/index2.vue";
import Pop from "../pages/pop.vue";
import Urban from "../pages/urban.vue";
import Urban1 from "../pages/urban1.vue";
import Mission from "../pages/mission.vue";
import Drops from "../pages/drops.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Index,
        meta: {
            middleware: isLoggedIn
        }
    },
    {
        path: "/home",
        name: "Home2",
        component: Index2,
        meta: {
        }
    },
    {
        path: "/enter",
        name: "Enter",
        component: Enter,
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart,
    },
    {
        path: "/packs",
        name: "Packs",
        component: Drops,
    },
    {
        path: "/mission",
        name: "Mission",
        component: Mission,
    },
    
    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout,
    },
    {
        path: "/payment",
        name: "Checkout2",
        component: Checkout2,
    },
    {
        path: "/free",
        name: "Free",
        component: Free,
    },
    {
        path: "/free-tiktok",
        name: "FreeTok",
        component: FreeTok,
    },
    {
        path: "/urban",
        name: "Urban",
        component: Urban,
        meta: { gtm: 'Urban Page' },
    },

    {
        path: "/urban_classics",
        name: "Urban1",
        component: Urban1,
        meta: { gtm: 'Urban Page 1' },
    },    
    {
        path: "/pop_essentials",
        name: "PopEssentials",
        component: Urban1,
        meta: { gtm: 'Pop Page 1' },
    },    
    {
        path: "/pop",
        name: "Pop",
        component: Pop,
        meta: { gtm: 'Pop Page' },
    },
    {
        path: "/baby",
        name: "Baby",
        component: Baby,
    },
    {
        path: "/confirmationSend",
        name: "FreeSent",
        component: freeSent,
    },
    {
        path: "/contest",
        name: "Contest_1",
        component: Contest_1,
    },
    {
        path: "/checkedOut",
        name: "CheckedOut",
        component: CheckedOut,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,

    scrollBehavior(_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { left: 0, top: 0 }
    }
});





function nextFactory(context: any, middleware: any, index: any) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters: any) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];
        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});



export default router;