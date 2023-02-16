export default function getPageNameFromUrl() {
    const route = useRoute();
    const pathArr = route.fullPath.split("/")
    return decodeURI(pathArr[pathArr.length - 1]);
}