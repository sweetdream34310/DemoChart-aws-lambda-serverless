import {defineNuxtPlugin, useCookie, useRequestHeaders, useRuntimeConfig} from "#app";
import {setSessionToken} from "~/plugins/axios";
import AmazonCognitoIdentity, {ICognitoStorage} from 'amazon-cognito-identity-js'
import {CookieStorage} from "cookie-storage";


if (typeof (window as any).global === 'undefined') {
    (window as any).global = window;
}

// const fetchWithCookie = async (url: string, cookieName: string) => {
//     const cookie = useCookie(cookieName);
//     const response = await $fetch.raw(url);
//     if (process.server) {
//         // @ts-ignore
//         // @ts-ignore
//         const cookies = Object.fromEntries(response.headers
//                 .get("set-cookie")
//                 ?.split(",")
//                 .map((a) => a.split("="))
//         );
//         if (cookieName in cookies) {
//             cookie.value = cookies[cookieName];
//         }
//     }
//     return response._data;
// };


/**
 * We use a custom function here because the 'normal' cognito function does not work ssr.
 */
function createCognitoStorage(): ICognitoStorage {
    const storage: any = {};

    return {
        setItem(key: string, value: string): void {
            storage[key] = value;
        },
        getItem(key: string): string | null {
            return storage[key] ?? null;
        },
        removeItem(key: string): void {
            delete storage[key];
        },
        clear(): void {
            Object.keys(storage).forEach(key => {
                delete storage[key];
            });
        },
    };
}

/**
 * Prepare cookies on ssr
 */
function prepareSSRCookieStorage() {
    const ssrCookies = useRequestHeaders()
    const cookieStorage = createCognitoStorage();

    const splitted = ssrCookies.cookie?.split(';');
    const splittedInKeysAndValues: any[] = [];

    splitted?.forEach(el => {
        const keyAndValue = el.split("=");
        splittedInKeysAndValues.push({ key: keyAndValue[0].trim(), value: keyAndValue[1].trim()})
        cookieStorage.setItem(keyAndValue[0].trim(), keyAndValue[1].trim())
    })

    return cookieStorage;
}



export default defineNuxtPlugin(async nuxtApp => {

    const { CognitoUserPool } = await import('amazon-cognito-identity-js');

    return new Promise((resolve, reject) => {

        const cookieStorage = process.server
            ? prepareSSRCookieStorage()
            : new CookieStorage({ secure: false, domain: "democharts.org" });

        const config = useRuntimeConfig()

        let userPool = new CognitoUserPool({
            UserPoolId: config.userPoolId,
            ClientId: config.clientId,
            Storage: cookieStorage,
        });

        let cognitoUser = userPool.getCurrentUser();

        if (cognitoUser !== null) {
            cognitoUser.getSession((error, session) => {
                setSessionToken(session.getIdToken().getJwtToken())
                resolve()
            })
        } else {
            resolve()
        }

    })
})