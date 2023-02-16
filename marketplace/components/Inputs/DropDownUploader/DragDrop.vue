
<template>
    <div :class="type === 'inline' ? 'flex' : type === 'video' ? '' : 'grid grid-cols-1 xl:grid-cols-4 gap-4'">
        <div :class="[results == null || results?.length === 0 ? 'cursor-pointer' : 'cursor-default', {'dragging' : dragging}, small ? ' bg-gray-200' : ' px-4 md:px-6 lg:px-12 py-8 bg-white flex-1']"
            class="drag-drop-upload w-full h-full  rounded-3xl relative  flex justify-center items-center"
            @dragover="handleDragOver" 
            @dragleave="handleDragOver" 
            @drop="handleFileSelect"
            @click="clickInput">
            <label v-if="(type == 'outline' || results == null || results.length == 0 ) && imageSource === undefined" for="file-input"
                class="file-input w-full pointer-events-none mb-0" id="file-input-container">
                <slot name="upload-container" v-if="!dragging">
                    <div class="flex flex-col justify-center items-center gap-1">
                        <span class="block">
                            <upload-icon />
                        </span>
                        <slot name="dropZoneText"></slot>
                    </div>
                </slot>
                <slot name="dragging-container" v-if="dragging">
                    Drop files here to upload
                </slot>
                <input id="file-input" class="hidden" type="file" :multiple="maxFiles > 1" :accept="supportedFile" @change="handleFileInput" ref="fileInput">
            </label>
            <div v-if="type == 'inline' && (imageSource != undefined && imageSource !='')" :class="[small ? 'w-2/3' : 'w-full']"
                class="file-results h-full group shrink-0">
                <div v-if="imageSource != undefined">
                    <DeleteButton @click="deleteFile()" :class="'absolute top-2 right-2 w-12 h-12 transition-all'"/>
                    <div class="image-preview bg-center bg-no-repeat bg-cover  overflow-hidden aspect-square w-full"
                        :style="`background-image: url('${imageSource}')`"> </div>
                </div>
                <div class="w-full h-full" v-for="(result, index) in results">
                    <div class="image-preview bg-center h-full bg-no-repeat bg-cover  overflow-hidden aspect-square w-full"
                        :style="`background-image: url('${imageSource ? imageSource : result.img}')`">
                        <a @click="deleteFile(results, index)" href="javascript:;"
                            class="delete bg-demo-violet border-demo-violet border rounded-full absolute text-white p-3 top-4 right-4">
                            <trash-icon class="delete" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- If images are displaye outside of dropzone -->
        <div v-if="type != 'inline' && imageArray != undefined" :class="[small ? 'w-2/3' : 'w-full col-span-1 xl:col-span-3']"
            class="file-results h-full flex gap-2 overflow-x-scroll no-scrollbar py-4">
            <div v-if="imageArray != undefined" class="w-full h-full relative flex-[25%] grow-0 shrink-0" v-for="(image, index) in imageArray.filter(image => !image.isVideo)">
                <div class="image-preview bg-center bg-no-repeat group bg-cover  overflow-hidden aspect-square w-full"
                    :style="`background-image: url('${image.mediaUrl ? image.mediaUrl : image.img}')`">
                    <a @click="deleteFile(image)" href="javascript:;"
                        class="delete bg-demo-violet hover:scale-105 hover:brightness-105 border-demo-violet border rounded-full absolute text-white p-2 group-hover:p-4 transition-all top-2 right-2">
                        <trash-icon class="delete h-4 w-4 group-hover:h-6 group-hover:w-6" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UploadIcon from "../../Icons/UploadIcon.vue";
import TrashIcon from "~~/components/Icons/TrashIcon.vue";
import Swal from 'sweetalert2'
import DeleteButton from "~~/components/buttons/DeleteButton.vue";
export default {
    name: "DragDropFileUpload",
    props: {
        supportedFile: {
            type: String,
            default: "image/*"
        },
        type: {
            type: String,
        },
        maxFiles: {
            type: Number,
            required: true,
        },
        maxSize: {
            type: Number,
            required: true,
        },
        allowedFiles: {
            type: Array,
            default: ['png', 'jpg', 'jpeg']
        },
        small: {
            type: Boolean,
        },
        imageSource: {
            type: String,
            required: false
        },
        imageArray: {
            type: Object,
        }
    },
    mounted() {
    },
    data() {
        const config = useRuntimeConfig()

        return {
            dragging: false,
            results: null,
            bucket: config.BucketUrl
        };
    },
    methods: {
        deleteFile(result) {
            this.$emit('deleteFile', result)
        },
        handleFileInput(event) {
                if (event.target.files.length > this.maxFiles) {
                    Swal.fire({
                            position: 'bottom-end',
                            toast: true,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 3000,
                            html: `Only <b>${this.maxFiles}</b> files accepted`
                    })
                    this.processFileInput(event.target.files, this.maxFiles);
                    event.target.value = "";
                } else {

                    this.processFileInput(event.target.files);
                    event.target.value = "";
                }
        },
        handleDragOver(event) {
            event.stopPropagation();
            event.preventDefault();
            this.dragging = event.type === "dragover";
            event.dataTransfer.dropEffect = "copy";
        },
        handleFileSelect(event) {
            event.stopPropagation();
            event.preventDefault();
            this.dragging = false;
            this.processFileInput(event.dataTransfer.files);
        },
        processFileInput(files, maxFiles) {
            const limit = maxFiles ? maxFiles : files.length
            const comp = this;

            for (let i = 0; i < limit; i++) {
                let file = files[i];
                const fileType = file.type.split("/")[1];
                const isFileTypeAllowed = comp.allowedFiles.includes(fileType);
                const isFileTooBig = file.size > comp.maxSize;

                let reader = new FileReader();
                reader.onload = function () {
                    console.log("fieltpye   ", comp.allowedFiles)
                    if (isFileTooBig || !isFileTypeAllowed) {
                        let message;
                        if (isFileTooBig) { message = `Image <b>${file.name}</b> is to big <br/> Image Size: <b>${(file.size / 1024 / 1024).toFixed(2)} Mb</b>  <br/> Allowed Size: <b>${(comp.maxSize / 1024 / 1024)} Mb</b>`}
                        else { message = `Filetype <b>${fileType}</b> is not allowed <br/> Allowed Filetypes: <b> ${comp.allowedFiles.join(", ")}`}
                        Swal.fire({
                            position: 'bottom-end',
                            toast: true,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            background: "#d34943",
                            color: "white",
                            timer: 10000,
                            html: message
                        })
                    };
                },
                reader.onloadend = function () {
                    if (this.results === null) this.results = [];
                    let results;
                    if (file.type.match("video/mp4")) {
                        return this.$emit("gotFiles", reader.result)
                    }

                    if (!isFileTooBig && isFileTypeAllowed) {
                        if (comp.imageArray) {
                            results = Object.assign(file, {mediaUrl: reader.result, arrayPosition: comp.imageArray.length})
                            comp.imageArray.push(results) 
                        } else {
                            results =  Object.assign(file, {img: reader.result})
                            this.$emit("handleInput", results)
                        }
                    } else if (comp.maxFiles === 1 && !isFileTooBig && isFileTypeAllowed) {
                        this.results = null
                        const results =  Object.assign(file, {img: reader.result})
                        comp.imageArray ? comp.imageArray.push(results) : this.$emit("handleInput", results); 
                    } else {
                        
                        if (comp.maxFiles === 1) {                            
                            this.results = null
                        } else {
                            this.results = this.results.filter(result => {
                                return result.file.name != file.name
                            })
                        }
                    }
                }.bind(this);
                reader.readAsDataURL(file);
            }
        },
        createVideoPreview(file) {
            const src = URL.createObjectURL(file)
            const video1 = document.getElementById("video1");
            video1.src = src;
            video1.load()
        },  
        clearResults() {
            this.results = null;
        },
        clickInput(e) {
            if (!e.target.classList.contains("delete") && this.$refs.fileInput) {
                this.$refs.fileInput.click();
            }
        },
    },
    components: { UploadIcon, TrashIcon, DeleteButton }
};
</script>

<style scoped>
input {
    display: none;
}

.dragging {
    background-color: #e2e8f0;
    border-color: #667eea;
}
</style>