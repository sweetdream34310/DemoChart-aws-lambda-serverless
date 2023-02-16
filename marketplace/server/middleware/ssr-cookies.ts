import {defineEventHandler} from "h3";
// import {useRequestHeaders} from "#app";


export default defineEventHandler((event) => {

    // console.log("DEFINE EVENT HANDLER SSR-COOKIES", event.context)
    //
    // const test = useRequestHeaders()
    // console.log(test, "?!?!?!")
    // const clientSideRoutes = !event.req.url.startsWith('/api');
    // if (clientSideRoutes) {
    //     return;
    // } else if (!event.req.headers.authorization) {
    //     sendError(event, new Error('Unathorized'));
    // }
    // event.context.auth = {
    //     authenticated: true,
    //     user: event.req.user,
    // };
});