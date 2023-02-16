import { createRouter, createWebHistory } from 'vue-router';
import useAuth from './use/Auth';

import Admin from './pages/Admin.vue';
import AdminConfigs from "./pages/AdminConfigs.vue";
import CouponConfigs from "./pages/CouponConfigs.vue";
import Login from './pages/Login.vue';
import Orders from "./pages/Orders.vue";
import Products from "./pages/Products.vue";
import Songs from './pages/Songs.vue';
import Users from './pages/Users.vue';

const routerHistory = createWebHistory();

const router = createRouter({
	history: routerHistory,
	routes: [
		{
			path: '/',
			component: Login,
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/users',
			name: 'users',
			beforeEnter: loginGuard,
			component: Users,
		},
		{
			path: '/products',
			name: 'products',
			beforeEnter: loginGuard,
			component: Products,
		},
		{
			path: '/couponConfigs',
			name: 'couponConfig',
			beforeEnter: loginGuard,
			component: CouponConfigs,
		},
		{
			path: '/songs',
			name: 'songs',
			beforeEnter: loginGuard,
			component: Songs,
		},
		{
			path: '/admin',
			name: 'admin control',
			beforeEnter: loginGuard,
			component: Admin,
		},
		{
			path: '/admin-configs',
			name: 'admin configs',
			beforeEnter: loginGuard,
			component: AdminConfigs,
		},
		{
			path: '/orders',
			name: 'orders',
			beforeEnter: loginGuard,
			component: Orders,
		},

	],
});

function loginGuard(to, from, next) {
	if (useAuth().isLoggedIn()) {
		next();
	} else {
		console.log('not logged in');
		next('login');
	}
}

export default router;
