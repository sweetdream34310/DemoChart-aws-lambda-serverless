import { Ref } from 'vue';
import { useAppStore } from "~~/stores/app";
/**
 * scrolls to a set page in the passed container
 * @param currentPage the page we are currently at
 * @param scrollContainer the container to sroll
 * @param page the target page
 * @param noAnimation if true, it will be scrolled instantly
 */
export default function scrollToPage( setPageFunction:Function, scrollContainer:HTMLElement, page:number, noAnimation?:boolean) {
    const appStore = useAppStore()
    setPageFunction(page)

    const scrollDistance = appStore.getWindowWidth * (page - 1);

    scrollContainer.scroll({
        left: scrollDistance,
        top: 0,
        behavior: noAnimation ? 'auto' : 'smooth'
    })
}