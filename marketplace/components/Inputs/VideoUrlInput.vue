<template>
<div class="flex shrink-0 flex-col-reverse gap-1">
    <input @change="sanitizeUrl($event)" :value="video.mediaUrl" class=" h-max mt-4" type="text" placeholder="Insert Video URL" name="" id="">
    <div v-show="video.mediaUrl != '' && video.mediaUrl != undefined" class="relative">
        <iframe  class=" w-full aspect-video" :src="video.mediaUrl" title="YouTube video player" frameborder="0" allow="accelerometer" allowfullscreen>
        </iframe>
        <button class="text-demo-red absolute top-4 right-4 bg-white/60 rounded-full p-2 " @click="deleteVideo()">
            <trash-icon/>
        </button>
    </div>
</div>
</template>
<script>
import parseYoutubeUrl from '~~/utils/parseYoutubeUrl';
import TrashIcon from '../Icons/TrashIcon.vue';
import Swal from 'sweetalert2';

export default {
    setup(props) {
        const video = ref({
            mediaUrl: ""
        });

        function deleteVideo(){
            props.Gig.gigMedia = props.Gig.gigMedia.filter((el) => {
                return el != video.value.mediaUrl;
            })
            video.value.mediaUrl = "";
        }

        function sanitizeUrl(e) {
            const Url = e.target.value;
            const youtubeUrl = parseYoutubeUrl(Url);
            if (!youtubeUrl) {
                Swal.fire({
                    position: 'bottom-right',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    html: `The url <b>${Url}</b> is not supported`
                })
                deleteVideo()
                return
            }

            video.value.mediaUrl = youtubeUrl;
            props.Gig.gigMedia.push(video);
        }
        return { sanitizeUrl, deleteVideo, video };
    },
    props: {
        Gig: {
            type: Object,
            required: true
        }
    },
    components: { TrashIcon }
}
</script>
<style lang="">
    
</style>