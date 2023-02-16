<template>
    <div id="gigSettings-3">
        <SettingsHeader @saveSettings="saveMediaSettings" :header="'Media'" :description="'You can upload jpg and mp4'"
            :showGuidelines="true" />
        <div class="mt-12 flex flex-col">
            <div>
                <h3 class="text-2xl font-bold">Images</h3>
                <p class="text-sm font-normal">max. 10 | max. 2Mb</p>
            </div>
            <DdUploader :imageArray="activeGig.gigMedias" class="mt-8 " :type="'outline'" v-slot:dropZoneText @deleteFile="deleteMedia" :maxFiles="10" :maxSize="2097152">
                <span class="font-bold text-sm block">
                    Drag and Drop or
                </span>
                <span class="text-sm block text-demo-violet font-bold">
                    Browse Image
                </span>
            </DdUploader>
        </div>
        <div class="mt-12 flex flex-col">
            <div>
                <h3 class="text-2xl font-bold">Videos</h3>
                <p class="text-sm font-normal">max. 3 | max. 10Mb</p>
            </div>

            <!-- TODO: Uncomment when making feature for uploading video  -->
            <div class="grid gap-4 grid-cols-4 mt-8">
                <DdUploader :allowedFiles="['mp4']" class="col-span-4" :type="'video'" :supportedFile="'video/*'" @gotFiles="setMediaVideo" :maxSize="10485760" v-slot:dropZoneText :maxFiles="3">
                    <span class="font-bold text-sm block">
                        Drag and Drop or
                    </span>
                    <span class="text-sm block text-demo-violet font-bold">
                        Browse Video
                    </span>
                </DdUploader>
                <div class="flex col-span-3  overflow-x-scroll no-scrollbar gap-4" v-if="(activeGig.gigMedias.filter(media => media.isVideo).length > 0 || (activeGig.gigVideos && activeGig.gigVideos.length > 0))">
                    <div class="shrink-0 relative" v-if="activeGig.gigVideos && activeGig.gigVideos.length > 0" v-for="media in activeGig.gigVideos">
                        <div class="absolute w-12 h-12 ">
                            <TrashIcon/>
                        </div>
                        <video controls :src="media.mediaUrl"></video>
                    </div>
                    <div class="shrink-0 group relative" v-for="media in activeGig.gigMedias.filter(media => media.isVideo)">
                        <div @click="deleteMedia(media)" class="bg-demo-violet z-10 cursor-pointer hover:scale-105 hover:brightness-105 border-demo-violet border rounded-full absolute text-white p-2 group-hover:p-4 transition-all top-2 right-2">
                            <TrashIcon class="h-4 w-4 group-hover:h-6 group-hover:w-6"/>
                        </div>
                        <video controls :src="media.mediaUrl"></video>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useGigsStore } from '~~/stores/gigs';
import TrashIcon from '../Icons/TrashIcon.vue';
import DdUploader from '../Inputs/DropDownUploader/DragDrop.vue';
import VideoUrlInput from '../Inputs/VideoUrlInput.vue';
export default {
    setup(props, ctx){
        const gigStore = useGigsStore()
        
        const activeGig = computed(() => {
            return gigStore.getActiveGig;
        })

        const deleteMedia = (results, index) => {
            activeGig.value.gigMedias = activeGig.value.gigMedias.filter(media => {
                if (results.mediaUrl) {
                    return media.mediaUrl != results.mediaUrl
                } else {
                    return media.name != results.name 
                }
            })
        }

        const setMediaVideo = (video) => {
            const imageCount = activeGig.value.gigMedias.filter(media => media.isVideo).length
            activeGig.value.gigMedias.push({mediaUrl: video, arrayPosition: imageCount, isVideo: true})
        }

        const saveMediaSettings = () => {
            gigStore.uploadGig()          
        }

        return { activeGig, saveMediaSettings, deleteMedia, setMediaVideo }
    },
    emits: ["validated"],
    components: { DdUploader, VideoUrlInput, TrashIcon }
}
</script>
<style lang="">
    
</style>