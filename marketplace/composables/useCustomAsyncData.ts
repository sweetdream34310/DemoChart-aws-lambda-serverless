import {useAsyncData, useLazyAsyncData} from "#app";
import {useAppStore} from "~/stores/app";

export interface FetchObj {
    name: string,
    handler: any,
    called: boolean,
}

/**
 * Depending on ssr or client mode, it returns useAsyncData or useLazyAsyncdata.
 * useLazyAsyncData does not wait for the data to be here.
 *
 * @param name of the action to identify the function
 * @param handler if you call a store function inside the handler,
 * don't use a try and catch in the handler itself but in the store function itself.
 */
export async function useCustomAsyncData(name: string, handler: any) {
    if (process.server) {
        return useAsyncData(name, (ctx) => {
            const appStore = useAppStore();
            appStore.skipClientsideFetchAction.push(name);
            return handler()
        });
    } else {
        return useLazyAsyncData(name, (ctx) => {
            const appStore = useAppStore();

            const ignoreArray = appStore.skipClientsideFetchAction;
            const index = ignoreArray.indexOf(name);
            if (index >= 0) {
                ignoreArray.splice(ignoreArray.indexOf(name), 1);
            } else {
                return handler()
            }
        });
    }
}