<template>
    <div v-if="user != undefined">
      <div style="background:yellow">TODO: REMOVE THIS COMPONENT! refactor to personalsettings</div>
        <settings-header @saveSettings="savePersonalSettings" :header="'Personal Settings'"
            :description="'Type in general Information about yourself so our Sellers get to know you better'"
            :showGuidelines="false" />
        <SettingsSubCategory :title="'Name'" :description="`Let's start with the basics`">
            <div class="flex flex-col sm:flex-row w-full gap-4 mt-4 sm:mt-0">
                <input v-model="user.firstName" class="w-full sm:w-1/2 p-2 rounded-xl pl-5" type="text" name="name" placeholder="Name" id="">
                <input v-model="user.name" class="w-full sm:w-1/2 p-2 rounded-xl pl-5" type="text" placeholder="Last name" name="lastName"
                    id="">
            </div>
        </SettingsSubCategory>
        <SettingsSubCategory :title="'Profile Picture'" :description="'Where can we find you online?'">
            <div class="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0 items-center justify-between">
                <img class="rounded-full shrink-0 h-28 sm:h-36 w-28 sm:w-36"
                    :src="user.profileImageSrc"
                    alt="">
                <DdUploader :class="'h-[150px]'" :type="'inline'" v-slot:dropZoneText :maxFiles="1" @deleteFile="deleteProfileImage" @handleInput="setProfileImage">
                    <span class="font-bold text-sm block">
                        Click here to upload or drag and drop
                    </span>
                    <span class="text-sm block">
                        Max Size 3000 x 3000px | .jpg, .png, .eps
                    </span>
                </DdUploader>
            </div>
        </SettingsSubCategory>
        <SettingsSubCategory  :title="'Country'" :description="'Where are you located at?'">
            <select-input :optionKey="'countryCode'" v-model="user.countryID" class="mt-6 sm:mt-0" :placeholder="'Select your Country'" :data="COUNTRIES" />
        </SettingsSubCategory>
        <SettingsSubCategory  :title="'Job Title'" :description="'Let us know about your profession'">
            <input v-model="user.jobTitle" class=" w-full mt-8 sm:mt-0 sm:w-1/2 p-2 rounded-xl pl-5" placeholder="Illustrator" type="text"
                name="projectName" id="">
        </SettingsSubCategory>
        <button @click="uploSeller">save</button>
    </div>
</template>
<script>
import { COUNTRIES } from '~~/../lib/types/Countries';
import ArrowDownIcon from '../Icons/ArrowDownIcon.vue';
import DdUploader from '../Inputs/DropDownUploader/DragDrop.vue';
import SelectInput from '../Inputs/SelectInput.vue';
import SettingsSubCategory from './SettingsSubCategory.vue'
import SaveSettingsButton from '../buttons/SubmitButton.vue'
import { useSellerStore } from '~~/stores/seller';
import { useUserStore } from '~~/stores/user';

export default {
    components: { ArrowDownIcon, DdUploader, SelectInput, SettingsSubCategory, SaveSettingsButton },
    setup() {
        const config = useRuntimeConfig()

        const sellerStore = useSellerStore();
        const userStore = useUserStore();
        const bucket = config.BucketUrl;
        
        const user = computed(() => {
            return userStore.getUser
        })

        const seller = computed(() => {
            return sellerStore.getSeller
        })

        const setProfileImage = (files) => {
            seller.value.profileImageSrc = files.filePreview
        }
  
        const deleteProfileImage = () => {
            seller.value.profileImageSrc = null
        }

        const savePersonalSettings = () => {
            sellerStore.uploadSeller()
        }

        const uploSeller = async() => {
        console.log("seller",seller.value)
        const { $axios } = useNuxtApp();
        const res = await $axios.post(
            "/marketplace/upsertSeller",
            {
                slug: "dj-test",
                experienceYears: 15,
                gigsCompleted: 1,
                activeSeller: true,
                userName: "test",
                approvedByAdmin: true,
                user: {
                    userUid: "090e92e8-7c85-4e2c-8a4b-c20f5f8300a1",
                    firstName: "Second",
                    lastName: "Seller"
                }
            }
        );

        }

        return { 
            COUNTRIES, 
            seller, 
            user, 
            bucket, 
            setProfileImage, 
            deleteProfileImage, 
            savePersonalSettings, 
            uploSeller
        };
    },
}
</script>
