
import { defineStore } from 'pinia'
import imageToBase64 from '~~/utils/iamgeToBase64'

export const useAppStore = defineStore('app', {
    state: () => ({
        /**
         * When ssr fetches data, clientside hook is called as well unfortunately. As long as we got this problem,
         * we fix it with letting the client know that a certain action can be skipped for now.
         */
        skipClientsideFetchAction: [''],
        loginUrl: 'https://dev-app.democharts.org/login',
        signupUrl: 'https://dev-www.democharts.org/apply',
    }),
    actions: {
    },
    getters: {
        getSkipClientsideFetchAction: (state) => {
            return state.skipClientsideFetchAction
        },
        getWindowWidth: (state) => {
            return window.innerWidth;
        },
    }
})

