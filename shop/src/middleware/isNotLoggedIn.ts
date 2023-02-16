export default function isLoggedIn({ next, to }: { next: any, to: any}): any {

    const emailCookie = localStorage.getItem('email');

    if (!emailCookie || emailCookie.length === 0) {
        next();
    } else {
        next('/')
    }
}