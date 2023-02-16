<template>
    <div class="flex flex-auto flex-col relative bg-white p-4 rounded-3xl">
        <button v-if="index > 1" @click="$emit('deleteReference', index)" class="p-3 bg-gray-200 rounded-full text-demo-red absolute  z-10 left-4 top-4">
            <trash-icon/>
        </button>
        <div class="p-2 rounded-3xl bg-gray-200">
            <!-- TODO: add images that are already in Gig -->
            <DdUploader :imageSource="reference?.img != null && reference?.img != '' ? reference?.img : undefined" :small="true" :type="'inline'" v-slot:dropZoneText @deleteFile="deleteReferenceImage" @handleInput="setReferenceImage" :maxSize="2097152" :maxFiles="1">
                    <span class="font-bold text-sm block">
                        Drag and Drop or
                    </span>
                    <span class="text-sm block text-demo-violet font-bold">
                        Browse Image
                    </span>
            </DdUploader>
        </div>
        <div class="flex flex-col mt-8 p-2">
            <text-input :placeholder="'Name'" :withBorder="true" v-model="reference.name"/>
            <text-input :placeholder="'Role'" :withBorder="true" v-model="reference.description"/>
        </div>
    </div>
</template>
<script>
import DdUploader from '../Inputs/DropDownUploader/DragDrop.vue';
import UploadIcon from '../Icons/UploadIcon.vue';
import PenIcon from '../Icons/PenIcon.vue';
import TrashIcon from '../Icons/TrashIcon.vue';
import TextInput from '../Inputs/TextInput.vue';
export default {
    setup(props){

        function setReferenceImage(files) {
            props.reference.img = files.img
        }

        function deleteReferenceImage() {
            console.log("sisi")
            props.reference.img = ""
        }

        return { setReferenceImage, deleteReferenceImage }
    },
    components: { DdUploader, UploadIcon, PenIcon, TrashIcon, TrashIcon, TrashIcon, TextInput },
    props: {
        reference: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
    }
}
</script>
<style lang="">
    
</style>