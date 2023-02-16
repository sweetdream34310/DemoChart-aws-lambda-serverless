import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
    app: {
        head: { link: [ {rel: 'icon', type: "image/x-icon", href: '/favicon.ico'} ] }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        public: {
            BucketUrl: "https://backend-s3buckets-dev-databucket-mnzmiczicq8f.s3.eu-central-1.amazonaws.com/marketplace/",
            userPoolId: "eu-central-1_S7UxTQO3p",
            clientId: "54n0hvgs4ms42ki4s7h0dm7sft",
            landingpageUrl: process.env.LANDING_PAGE_URL || 'http://local-landingpage.democharts.org:8000'
        }
    },
    plugins: [
        { src: "~/plugins/auth" },
        { src: "~/plugins/axios" }
    ],
})
