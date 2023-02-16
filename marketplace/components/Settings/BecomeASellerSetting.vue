<template>
    <div>

      <settings-header @saveSettings="apply" :header="'Apply as a seller'"
            :description="'Apply as a Democharts seller. Every request will be manually reviewed by our team (1-2 Weeks)'"
                       :button-text="'Apply'"
            :showGuidelines="false" />


      <SettingsSubCategory  :title="'Offer category'" :description="'What service are you providing for your customers?'">
        <select-input :optionKey="'categoryCode'" v-model="application.category1" class="mt-6 sm:mt-0" :placeholder="'Select category'" :data="CATEGORIES" />
        <select-input :optionKey="'categoryCode'" v-model="application.category2" class="mt-6 sm:mt-0" :placeholder="'Select category'" :data="CATEGORIES" />
      </SettingsSubCategory>


      <SettingsSubCategory  :title="'Description'" :description="'Tell us more about the service you offer'">
            <textarea v-model="application.description" rows="5" class="w-full p-2 rounded-xl pl-5" placeholder="Describe your service, your company, add reference links etc."
                      name="projectName" id=""></textarea>
      </SettingsSubCategory>

      <div>
        {{ application }}
      </div>
    </div>
</template>
<script>
import { CATEGORIES } from '~~/../lib/types/Categories';
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
        const bucket = config.BucketUrl;

        const application = ref({});

        const apply = () => {
            sellerStore.applyAsSeller(application.value)
        }

        return { 
            CATEGORIES,
          apply,
          application,
            bucket,
        };
    },
}
</script>
