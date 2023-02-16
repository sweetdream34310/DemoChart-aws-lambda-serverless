<template>
    <div class="">
        <settings-header @saveSettings="savePersonalSettings" :header="'Personal Settings'"
            :description="'Type in general Information about yourself so our Sellers get to know you better'"
            :showGuidelines="false" />
        <settings-sub-category :title="'Name'" :description="`Let's start with the basics`">
            <div class="flex flex-col sm:flex-row w-full gap-4 mt-4 sm:mt-0">
                <input v-model="user.firstName" class="w-full sm:w-1/2 p-2 rounded-xl pl-5" type="text" name="name" placeholder="Name" id="">
                <input v-model="user.lastName" class="w-full sm:w-1/2 p-2 rounded-xl pl-5" type="text" placeholder="Last name" name="lastName"
                    id="">
            </div>
        </settings-sub-category>
        <settings-sub-category :title="'Sellername'" :description="`How do you want to be found?`">
            <div class="flex flex-col sm:flex-row w-full gap-4 mt-4 sm:mt-0">
                <input v-model="seller.userName" class="w-full p-2 rounded-xl pl-5" type="text" name="name" placeholder="Sellername" id="">
            </div>
        </settings-sub-category>
        <settings-sub-category :title="'Profile Picture'" :description="'Where can we find you online?'">
            <div class="flex w-full flex-col lg:flex-row gap-4 mt-4 sm:mt-0 items-center justify-between">
                <img class="rounded-full shrink-0 h-28 sm:h-36 w-28 sm:w-36"
                    :src="seller.profileImageSrc"
                    alt="">
                <dd-uploader :class="''" :type="'inline'" v-slot:dropZoneText :maxFiles="1" :allowedFiles="['jpg', 'jpeg','png']" :max-size="3145728" @deleteFile="deleteProfileImage" @handleInput="setProfileImage">
                    <span class="font-bold text-sm block">
                        Click here to upload or drag and drop
                    </span>
                    <span class="text-sm block">
                        Max Size 3 Mb | .jpg, .jpeg, .png
                    </span>
                </dd-uploader>
            </div>
        </settings-sub-category>
        <settings-sub-category :title="'Job Title'" :description="'Let us know about your profession'">
            <input v-model="user.jobTitle" class=" w-full mt-8 sm:mt-0 sm:w-1/2 p-2 rounded-xl pl-5" placeholder="Illustrator" type="text"
                name="projectName" id="">
        </settings-sub-category>

        <settings-sub-category :title="'Country'" :description="'Where are you located at?'">
            <select-input :optionKey="'countryCode'" v-model="user.countryID" class="mt-6 sm:mt-0" :placeholder="'Select your Country'" :data="COUNTRIES" />
        </settings-sub-category>
        <div class="mt-8">
            <settings-header 
                :header="'Seller settings'"
                :description="'Type in general Information of your seller account.'"
                :showNothing="true"
                />
        </div>

        <settings-sub-category :title="'About Me'" :description="'Tell us a bit more about you'">
            <textarea v-model="seller.aboutMe" rows="5" class="w-full p-2 rounded-xl pl-5" placeholder="Describe yourself"
                name="projectName" id=""></textarea>
        </settings-sub-category>
        <settings-sub-category :title="'Custom Label'" :description="'Define a custom Label to show on your Gigs'">
            <input v-model="seller.customLabel" class=" w-full mt-8 sm:mt-0 sm:w-1/2 p-2 rounded-xl pl-5" placeholder="Label Title" type="text"
                name="projectName" id="">
            <input v-model="seller.customLabelValue" class=" w-full mt-8 sm:mt-0 sm:w-1/2 p-2 rounded-xl pl-5" placeholder="Label Value" type="text"
                name="projectName" id="">
        </settings-sub-category>
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
import { useSettingsStore } from '~~/stores/settings';

export default {
    components: { ArrowDownIcon, DdUploader, SelectInput, SettingsSubCategory, SaveSettingsButton },
    setup() {
        const config = useRuntimeConfig()

        const sellerStore = useSellerStore();
        const settingsStore = useSettingsStore();
        const userStore = useUserStore();
        const bucket = config.BucketUrl;

        const user = computed(() => {
            return userStore.getUser
        })

        const seller = computed(() => {
            return sellerStore.getSeller
        })

        const setProfileImage = (files) => {
            console.log(files)
            seller.value.profileImageSrc = files.img
        }

        const deleteProfileImage = () => {
            seller.value.profileImageSrc = null
        }

        const savePersonalSettings = () => {
            settingsStore.uploadSettings()
        }

        return {
            COUNTRIES,
            seller,
            user,
            bucket,
            setProfileImage,
            deleteProfileImage,
            savePersonalSettings
        };
    },
}
</script>
