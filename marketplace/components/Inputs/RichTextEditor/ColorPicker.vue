<template lang="">
    <label :style="'background-color:' + color " :class="'  bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'" for="colorPicker">
        <input id="colorPicker" @change="(e) => color = e.target.value" class="w-40 invisible h-40 rounded-full"
        type="color" @input="event => editor.chain().focus().setColor(event.target.value).run()"
        :value="(editor.getAttributes('textStyle').color, color = editor.getAttributes('textStyle').color)" />
    </label>
</template>
<script>
export default {
    setup() {

        const color = ref("")
        function changeColor() {
            document.getElementById("colorPicker")
        }
        return { changeColor, color }
    },
    props: {
        editor: {
            type: [Object, null],
            required: false
        }
    }
}
</script>
<style lang="">
    
</style>