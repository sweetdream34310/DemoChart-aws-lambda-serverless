<template>
  <div class="flex items-center h-full justify-center">
    <div class="sm:w-full px-4 py-3 h-full w-screen relative rounded-lg bg-white">
      <div class="overflow-y-scroll no-scrollbar">
        <h4 class="text-2xl leading-tight">
          Are you sure you want to place the following order?
        </h4>
        <hr class="mt-4">
        <div class="bg-gray-200 mt-4 p-3 flex justify-between items-center rounded-lg">
          <div>
            <h5 class="font-bold text-xl">
              {{ activeGig?.name }}
            </h5>
            <div class="flex gap-4 text-sm">
              <div class="flex gap-2">
                <p>
                  Offer:
                </p>
                <p>
                  {{ activeOffer?.offerName }}
                </p>
              </div>
              <div class="flex gap-2">
                <p>
                  Seller:
                </p>
                <p>
                  {{ activeGig?.seller?.slug }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h5 class="font-bold text-demo-violet mr-3">
              {{ activeOffer?.offerPrice }} €
            </h5>
          </div>
        </div>
        <div class="mt-4">
          <h4 class="text-xl">
            Offer Description
          </h4>
            {{activeOffer.offerDescription}}
        </div>
        <div class="mt-4 h-full">
          <h4 class="text-xl">
            Anything you want to tell the seller?
          </h4>
          <div class="mt-4 h-full overflow-hidden">
            <textarea v-model="orderDetails.buyerMessage" placeholder="Message for the seller" name="" id="" class="w-full box-border h-full p-4 rounded-lg"></textarea>          </div>
        </div>
        <div class="mt-4 h-full">
          <h4 class="text-xl">
            Any files you want to send the seller?
          </h4>
          <div class="mt-4 h-full overflow-hidden">
            <input multiple type="file" @change="($event) => handleFileInput($event)" name="" id="">
          </div>
        </div>
      </div>
      <div v-if="!isInModal" class="w-full flex justify-between mt-4">
        <button @click="() => closeOverlay()" class="button bg-demo-red text-white font-bold">Cancel</button>
        <button @click="() => sendOrder()" class="button bg-demo-violet text-white font-bold">Order</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useSettingsStore } from "~/stores/settings";
import { useOrderStore } from "~/stores/orders";

export default defineComponent({
  name: "OrderPlacementModal",
  props: {
    activeGig: {
      type: Object,
      required: true,
    },
    isInModal: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {

    const settingStore = useSettingsStore();
    const orderStore = useOrderStore();
    const uploadedFiles: any[] = []

    const activeOrder = computed(() => {
      return orderStore.currentOrder
    })

    const activeOffer = computed(() => {
      return orderStore.activeOffer
    })

    let orderDetails = ref({
      buyerMessage: "",
      uploadedFiles: [] as any[]
    })

    const resetOrder = () => {
      orderDetails.value = { ...orderDetails.value }
    }

    const closeOverlay = () => {
      emit('close');
    }

    const handleFileInput = (event: any) => {
      const selectedFiles = event.target.files
      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const fileToLoad = selectedFiles[i];
          const fileType = fileToLoad.type

          const fileReader = new FileReader();
          let base64;

          fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target?.result;
            uploadedFiles.push({ mediaUrl: base64, fileType: fileType, arrayPosition: uploadedFiles.length })
          };
          fileReader.readAsDataURL(fileToLoad);
        }
      }
    }

    const sendOrder = () => {
      emit('sendOrder', activeOrder.value)
      // orderDetails.value.uploadedFiles = uploadedFiles;
      // orderStore.placeOrder(orderDetails.value)
      // closeOverlay()
    }

    return {
      sendOrder,
      orderDetails,
      closeOverlay,
      handleFileInput,
      activeOrder,
      activeOffer
    }
  }
})
</script>
