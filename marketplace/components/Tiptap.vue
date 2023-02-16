<template>
    <div class="h-[50vh]">
        <div v-if="editor" class="flex flex-wrap px-2 py-3 gap-4">
            <editor-button :editor="editor"
                :class="editor?.isActive('bold') ? 'bg-[#929292] text-white': 'bg-[#e3e3e3] shrink-0' "
                @click="editor.chain().focus().toggleBold().run()">
                <bold-icon />
            </editor-button>
            <editor-button :class="editor?.isActive('italic') ? 'bg-[#929292] text-white': 'bg-[#e3e3e3] shrink-0' "
                @click="editor.chain().focus().toggleItalic().run()">
                <italic-icon />
            </editor-button>
            <editor-button :class="editor?.isActive('underline') ? 'bg-[#929292] text-white': 'bg-[#e3e3e3] shrink-0' "
                @click="editor.chain().focus().toggleUnderline().run()">
                <underline-icon />
            </editor-button>
            <editor-button :class="editor?.isActive('heading', {level: 4}) ? 'bg-[#929292] text-white': 'bg-[#e3e3e3] shrink-0' "
                @click="editor.chain().focus().toggleHeading({level:4}).run()">
                H1
            </editor-button>
            <editor-button :class="editor?.isActive('heading', {level: 5}) ? 'bg-[#929292] text-white': 'bg-[#e3e3e3] shrink-0' "
                @click="editor.chain().focus().toggleHeading({level:5}).run()">
                H2
            </editor-button>
            <editor-button :class="editor?.isActive('heading', {level: 6}) ? 'bg-[#929292] text-white': 'bg-[#e3e3e3] shrink-0' "
                @click="editor.chain().focus().toggleHeading({level:6}).run()">
                H3
            </editor-button>
            <editor-button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="editor?.isActive('orderedList') ? 'bg-[#929292] text-white': 'bg-[#e3e3e3] shrink-0' ">
                <ordered-list-icon />
            </editor-button>
            <editor-button @click="editor.chain().focus().toggleBulletList().run()"
                :class="editor?.isActive('bulletList') ? 'bg-[#929292] text-white': 'bg-[#e3e3e3] shrink-0' ">
                <bullet-list-icon />
            </editor-button>
            <div class="w-8 h-8 overflow-hidden rounded-full relative">
                <color-picker :editor="editor" />
            </div>
        </div>
        <div class="h-full">
            <editor-content class="h-full" :editor="editor" />
        </div>
    </div>

</template>
  
<script>
// Tip Tap (Rich Text Editor)
import { Editor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Color } from '@tiptap/extension-color'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import EditorButton from './Inputs/RichTextEditor/EditorButton.vue'

// Icons
import BoldIcon from './Icons/RichTextEditor/BoldIcon.vue'
import ItalicIcon from './Icons/RichTextEditor/ItalicIcon.vue'
import UnderlineIcon from './Icons/RichTextEditor/UnderlineIcon.vue'
import ColorPicker from './Inputs/RichTextEditor/ColorPicker.vue'
import OrderedListIcon from './Icons/RichTextEditor/OrderedListIcon.vue'
import BulletListIcon from './Icons/RichTextEditor/BulletListIcon.vue'
import { useSettingsStore } from '~~/stores/settings'
import { useGigsStore } from '~~/stores/gigs'


export default {
    components: {
        EditorContent,
        EditorButton,
        BoldIcon,
        ItalicIcon,
        UnderlineIcon,
        ColorPicker,
        OrderedListIcon,
        BulletListIcon
    },
    data() {
        return {
            editor: null,
        }
    },
    setup(props) {
        const color = ref("")

        return { color }
    },
    props: {
        activeGig: {
            type: Object,
            required: false
        }
    },
    mounted() {
        const gigStore = useGigsStore()
        let initialContent = this.activeGig?.description != "" && this.activeGig?.description != undefined ? this.activeGig?.description  : '<p>Describe your <span style="text-decoration=`italic`">Service</span> here</p>';
        watch(this.activeGig?.description, (text) => {
            initialContent = text
        })
        this.editor = new Editor({
            content: initialContent,
            onBlur({ editor }) {
                const description = {description: editor.getHTML()}
                gigStore.updateNewGig(description)
            },
            extensions: [
                Document,
                TextStyle,
                Paragraph,
                Underline,
                Text,
                Bold,
                Italic,
                Color,
                BulletList.configure({
                    HTMLAttributes: {
                        class: "bulletList"
                    }
                }),
                ListItem,
                OrderedList.configure({
                    HTMLAttributes: {
                        class: "orderedList"
                    }
                }), ,
                Heading.configure({
                    HTMLAttributes: {
                        class: "heading"
                    },
                    levels: [4, 5, 6]
                })
            ],
            editorProps: {
                attributes: {
                    class: 'p-8 h-full overflow-y-scroll editorText outline-none rounded-xl bg-white',
                },
            },
        })


    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>