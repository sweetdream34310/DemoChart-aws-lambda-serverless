<template lang="">
    <div class="flex pageMarkerParent pt-4 no-scrollbar  bg-[#f4f5f5] py-2 gap-4 z-10 overflow-x-scroll md:justify-between">
        <a :data-target="Marker.selector" v-for="(Marker, index) in PageMarkers" @click="scrollTo($event), (isActive = index)" :class="{ 'activePageMarker': isActive === index }" class="py-2 shrink-0 px-4 font-semibold rounded-full cursor-pointer bg-[#f4f5f5] ">
            {{Marker.name}}
        </a>
    </div>
</template>

<script>

import scrollToElement from "../utils/scrollToElement"

export default {
    setup() {
        const PageMarkers = [
            {
                name: "Overview",
                selector: "overview"
            },
            {
                name: "Description",
                selector: "description"
            },
            {
                name: "About the Seller",
                selector: "aboutTheSeller"
            },
            {
                name: "References",
                selector: "references"
            },
            {
                name: "FAQ",
                selector: "faq"
            },
            {
                name: "Reviews",
                selector: "reviews"
            }
        ];

        const isActive = ref(0)

        function scrollTo(e) {
            const element = document.querySelector("#" + e.target.getAttribute("data-target"))
            const bodyRect = document.body.getBoundingClientRect(),
                elemRect = element.getBoundingClientRect(),
                offset = elemRect.top - bodyRect.top;
            scrollToElement(offset - 250, 400)
        }

        //TODO: add active change on scroll

        return { PageMarkers, isActive, scrollTo }
    },
}
</script>
