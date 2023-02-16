<template>
    <div id="faq" class="mt-16">
        <h4 class="subtitle font-bold">FAQ</h4>
        <div class="mt-4 divide-y-2">
            <div class="w-full " v-for="(faq, index) of Faqs">
                <details class="group open:bg-[#3f50ba] rounded-lg transitian-all open:text-white select-none	">
                    <p class="p-4">
                        {{faq?.answer}}
                    </p>
                    <summary class="list-none p-4 transition-all cursor-pointer flex justify-between items-center  text-lg font-bold">
                        {{faq?.question}}
                        <p class="group-open:transform group-open:rotate-180 group-open:text-white transition-all">
                            <arrow-down-icon/>
                        </p>
                    </summary>
                </details>
            </div>
        </div>
    </div>
</template>
<script>
import ArrowDownIcon from "../Icons/ArrowDownIcon.vue";
export default {
    setup() {
        const frequentlyAskedQuestions = [
            {
                quesiton: "Why is it so expensive?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam accusamus doloribus repudiandae numquam explicabo provident dolor ea, deserunt nostrum aliquid libero odit quos maxime reiciendis. Nisi expedita dolore sapiente itaque?"
            },
            {
                quesiton: "What do i need to know about the process?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam accusamus doloribus repudiandae numquam explicabo provident dolor ea, deserunt nostrum aliquid libero odit quos maxime reiciendis. Nisi expedita dolore sapiente itaque?"
            },
            {
                quesiton: "How much monry do i have to spend?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam accusamus doloribus repudiandae numquam explicabo provident dolor ea, deserunt nostrum aliquid libero odit quos maxime reiciendis. Nisi expedita dolore sapiente itaque?"
            },
            {
                quesiton: "How long dies it take?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam accusamus doloribus repudiandae numquam explicabo provident dolor ea, deserunt nostrum aliquid libero odit quos maxime reiciendis. Nisi expedita dolore sapiente itaque?"
            },
            {
                quesiton: "How are you today?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam accusamus doloribus repudiandae numquam explicabo provident dolor ea, deserunt nostrum aliquid libero odit quos maxime reiciendis. Nisi expedita dolore sapiente itaque?"
            },
        ];
        return {
            frequentlyAskedQuestions
        };
    },
    components: { ArrowDownIcon },
    props: {
        Faqs: {
            type: Object
        }
    }
}
</script>
<style lang="">
    
</style>

