const prod_api_base_path = 'https://api.democharts.org';
const dev_api_base_path = 'https://devapi.democharts.org';


export default {
	target: 'static',
	publicRuntimeConfig: () => {

		console.log("NUXT MODE: ", process.env.NODE_ENV);


		if (process.env.NODE_ENV === 'development') {
			// DEV ENV
			console.log("NUXT BUILD DEVELOPMENT MODE");
			return {
				MARKETPLACE_BASE_PATH: process.env.MARKETPLACE_BASE_PATH || 'http://local-marketplace.democharts.org:8000',
				UserPoolId: 'eu-central-1_S7UxTQO3p',
				ClientId: '54n0hvgs4ms42ki4s7h0dm7sft',
				mailchimpPopupID: 'ac2fa18f1c2f7748293c0f13a',
				API_BASE_PATH: dev_api_base_path,
				APP_BASE_PATH: 'https://dev-app.democharts.org/'
			};
		} else {
			// PROD ENV
			console.log("NUXT BUILD PROD MODE");

			return {
				MARKETPLACE_BASE_PATH: 'https://democharts.org:8000',
				UserPoolId: 'eu-central-1_wB8KxCHC2',
				ClientId: 'pgm1t7mnh29r2qb6p0qrc7so2',
				mailchimpPopupID: '52dd69c115c2eb7aa99088007',
				API_BASE_PATH: prod_api_base_path,
				APP_BASE_PATH: 'https://app.democharts.org'
			};
		}
	},
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'Democharts',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || '',
			},
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&display=swap',
			},
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap',
			},
		],
		__dangerouslyDisableSanitizers: ['script'],
		script: [
			// {
			// 	id: 'hotjar',
			// 	hid: 'hotjar',
			// 	innerHTML: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={
			// 		hjid:${process.env.DEV === 'TRUE' ? '1955972' : '1955958'},hjsv:6};
			// 		a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
			// 		a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
			// 	type: 'text/javascript',
			// 	charset: 'utf-8',
			// 	defer: true
			// },
			{
				hid: 'gtm-script1',
				src: "https://www.googletagmanager.com/gtag/js?id=AW-702295508",
				defer: true
			},
			{
				hid: 'gtm-script2',
				innerHTML: `window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date()); gtag('config', 'AW-702295508');
				`,
				type: 'text/javascript',
				charset: 'utf-8'
			},
			{
				id: 'fbpixel',
				hid: 'fbpixel',
				src: `!function(f,b,e,v,n,t,s)
					{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};
					if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
					n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t,s)}(window, document,'script',
					'https://connect.facebook.net/en_US/fbevents.js');
					fbq('init', ${process.env.DEV === 'TRUE' ? '' : '1483394891865396'});
					fbq('track', 'PageView');`,
				type: 'text/javascript',
				charset: 'utf-8',
				defer: true
			},
		],
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	/*
	 ** Global CSS
	 */
	/*css: [
    '@/assets/css/includes_once.scss'
  ],*/
	css: [
		'@/assets/scss/utils.scss',
		'@/assets/scss/fonts.scss',
		'@/assets/scss/colors.scss',
		'node_modules/spinkit/scss/spinners/3-wave',
	],
	styleResources: {
		scss: [
			'@/assets/scss/responsive.scss',
			'~/assets/scss/_variables.scss',
			'~/node_modules/rfs/scss.scss',
		],
	},
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: ['@nuxt/typescript-build'],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		'@nuxtjs/style-resources',
		[
			'@nuxtjs/google-analytics',
			{
				id: `${
					process.env.DEV === 'TRUE'
						? 'UA-171544319-2'
						: 'UA-171544319-1'
				}`,
			},
		],
		'@nuxtjs/sitemap',
		'@nuxtjs/axios',
	],
	axios: {
		baseURL: process.env.NODE_ENV === 'development'
			? `https://devapi.democharts.org`
			: `https://api.democharts.org`,
	},
	sitemap: {
		hostname: 'https://www.democharts.org/',
		exclude: ['/thank-you'],
	},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {},
	},
};
