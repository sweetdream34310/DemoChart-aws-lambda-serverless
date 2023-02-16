<template>
    <div class="sm:grid mx-auto grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 bg-gray-600 p-4">
        <h1 class="text-white text-center text-3xl col-span-2">Standart Gig Infos</h1>
        <div>

            <input class="w-full" type="text" v-model="gigOptions.name" name="name" placeholder="Gig name" id="">
        </div>
        <div>
            <input class="w-full" type="text" v-model="gigOptions.category" name="gigCategorie"
                placeholder="Gig category" id="">

        </div>
        <label for="active">
            <p class="text-white">
                Active Gig

            </p>

            <input type="checkbox" v-model="gigOptions.active" name="active" id="active">
        </label>
        <input type="number" v-model="gigOptions.price" name="price" placeholder="Gig price" id="">
        <label for="currency">
            <p class="text-white">
                Gig Currency

            </p>
            <select v-model="gigOptions.currency" name="currency" id="currency">
                <option value="€">€</option>
                <option value="$">$</option>
                <option value="£">£</option>
            </select>
        </label>
        <label for="description">
            <p class="text-white">
                Gig Description

            </p>
            <textarea v-model="gigOptions.description" id="description" name="description" rows="4"
                cols="40"></textarea>

        </label>
        <label class="text-white" for="reference1">
            Erste Referenz
            <input @change="($event) => handleFile($event, 0)" type="file" name="" id="reference1">
        </label>
        <label class="text-white" for="reference2">
            Zweite Referenz
            <input @change="($event) => handleFile($event, 1)" type="file" name="" id="reference2">
        </label>

        <!-- <select v-model="gigOptions?.gigGenres?.[0].genreId" name="genre" id="genres">
            <option v-for="(genre, index) in GENRES" :value="genre.id">{{genre.name}}</option>
        </select> -->
        <button @click="() => submitGig()" class="col-span-2 bg-white p-2 rounded-2xl">Submit</button>
    </div>
</template>
<script lang="ts">
import { GENRES } from "../../lib/types/Genres"
export default {
    setup() {
        const { $axios } = useNuxtApp();
        const gigOptions = ref({
            name: "Finalisierungs Gig",
            category: "",
            active: false,
            price: 0,
            currency: "$",
            description: "",
            gigGenres: [{genreId: 3}, {genreId:14}],
            gigFaqs: [{ question: "Hallo?", answer: "Hi" }, { question: "Wie ghets?", answer: "gut" }],
            gigReferences: [
                {
                    imgUrl: "",
                    name: "Coca Cola",
                    description: "Logo Design"
                },
                {
                    imgUrl: "",
                    name: "Figma",
                    description: "UI Design"
                }
            ],
            gigMedia: [
                {
                    mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png"
                },
                {
                    mediaUrl: "https://cdn.dribbble.com/users/3061686/screenshots/17599145/figma-logo-2_4x.png"
                }
            ],
            gigServiceOffers: [
                {
                     uid: "012ad43e-49a8-8491681-8745-cb79cd21bb17",
                    offerName: "neuer Offer",
                    offerDescription: "Coole neue Offer BRAAAAAAAa!",
                    offerPrice: 99,
                    numRevisions: 14,
                    deliveryTime: 1,
                    welcomeMessage: "AMEN MEIN FREUND!",
                    features: [{ name: "tost" }, { name: "tost2" }, { name: "tost3" }]

                },
                {
                    offerName: "ok?",
                    offerDescription: "Waaas geeeht aaaab",
                    offerPrice: 150,
                    numRevisions: 64,
                    deliveryTime: 15,
                    welcomeMessage: "Welcomemessage 2 ",
                    features: [{ name: "tost" }, { name: "tost2" }, { name: "tost3" }]
                },
                {
                    offerName: "Cool",
                    offerDescription: "Pro package yooooooooo",
                    offerPrice: 599,
                    numRevisions: 85,
                    deliveryTime: 400,
                    welcomeMessage: "Ncoh eine Welcomemessage yoooooooo",
                    features: [{ name: "test" }, { name: "test2" }, { name: "test3" }]
                },
            ],

        })
        // console.log(gigOptions.value)
        const data = ref([])
        onMounted(async () => {
            const res4: any = await $axios.post("/marketplace/getGigs", {
                sellerUid: "e07c4df4-d064-4891-a855-ef344b7ef5ca"
            });
            // console.log(res4)
            data.value = res4.data
        })

        function handleFile(e, nr) {
            var imageBase:void|string = getBase64(e.target.files[0], setData)
            // console.log(imageBase)
        }

        function setData(data){
            gigOptions.value.gigReferences[0].imgUrl = data
            gigOptions.value.gigReferences[1].imgUrl = data
        }

        function getBase64(file: any, callback) {
            var reader = new FileReader();
            var res
            reader.readAsDataURL(file);
            reader.onload = function () {
                callback(reader.result)
                res = reader.result
                return res
            };
        }

        async function submitGig() {
            // console.log(gigOptions.value)
            const res4: any = await $axios.post("/marketplace/upsertGig", gigOptions.value);
            // console.log(res4)
            // console.log(gigOptions.value)
        }

        return { submitGig, gigOptions, data, GENRES, handleFile }
    }

}
</script>
<style lang="">
    
</style>