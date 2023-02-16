
import { defineStore } from 'pinia'
import imageToBase64 from '~~/utils/iamgeToBase64'

export const useFilesStore = defineStore('files', {
    state: () => ({
        files: {
            profileImage: [],
            referenceImages: [],
            mediaImages: [],
            mediaVideos: []
        }
    }),
    getters: {
        getAllFiles: (state) => {
            return state.files
        },
        getProfileImage: (state) => {
            return state.files.profileImage
        },
        getReferenceImages: (state) => {
            return state.files.referenceImages
        },
        getMediaImages: (state) => {
            return state.files.mediaImages
        },
        getMediaVideos: (state) => {
            return state.files.mediaVideos
        }
    },
    actions: {
        setProfileImage(files) {
            this.files.profileImage = files
        },
        deleteReferenceImage(fileName) {
            this.files.referenceImages = this.files.referenceImages.filter((obj) => {
                return obj.name != fileName
            })
            console.log(this.files.referenceImages)
        },
        setReferenceImage(files) {
            this.files.referenceImages.push(files)
        },
        setMediaImage(files) {
            this.files.mediaImages.push(files)
        }
    }
})

