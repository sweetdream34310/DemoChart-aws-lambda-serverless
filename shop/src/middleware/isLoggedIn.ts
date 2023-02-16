export default function isLoggedIn({ next, to }: { next: any, to: any}): any {

    const emailCookie = localStorage.getItem('email');

    if (emailCookie && emailCookie.length > 0) {
        console.log("jup")
        next();
    } else {
        console.log("enter..")
        next('/enter')
    }
}