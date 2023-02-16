import { defineNuxtPlugin } from '#app'
import axios from 'axios'


const wrapperToken = { token: undefined }

export function setSessionToken(token: string) {
    wrapperToken.token = token;
}


export default defineNuxtPlugin(() => {

    const ax = axios.create({
        baseURL: `https://devapi.democharts.org`
    })

    ax.interceptors.request.use(function (config) {
        console.log("interceptor axios use called.")
        if (wrapperToken.token) {
        	config.headers.authorization = `${wrapperToken.token}`;
        }
        return config;
    }, function (err) {
        return Promise.reject(err);
    });

    return {
        provide: {
            axios: ax
        }
    }
})