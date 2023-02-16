<template>
	<div>
		<table class="table">
			<thead>
			<tr>
				<th>Erstellt am</th>
				<th>Song Title</th>
				<th>Genre</th>
				<th>Gesamtrating</th>
				<th>Avg. Playtime</th>
				<th>Anzahl der Bewertungen</th>
				<th>Paid?</th>
				<th>Disabled?</th>
				<th>Artist</th>
				<th>Action</th>
			</tr>
			</thead>

			<tbody>
			<tr v-for="song in songs" :key="song.uid" style="font-size: 12px">
				<td>{{ createdAt(song.createdAt) }}</td>
				<td>{{song.title}}</td>
				<td>{{genres.find(el => el.id === song.genreID) && genres.find(el => el.id === song.genreID).name}}</td>
				<td>{{song.rating}}</td>
				<td>{{song.plays}}</td>
				<td>{{song.plays}}</td>
				<td>{{ song.paid }}</td>
				<td>{{ song.disabledByAdmin }}</td>
				<td><a :href="`${APP_PATH}profile/${song.artist.slug}`">{{song.artist.artistName}}</a></td>
				<td>
					<button v-if="!song.disabledByAdmin" @click="disableSong(song)">disable song</button>
					<button v-if="song.disabledByAdmin" @click="disableSong(song, false)">re enable song</button>
				</td>
			</tr>
			</tbody>
		</table>


		<div><pre>{{ songs }}</pre></div>

	</div>
</template>

<script>


import moment from "moment";
import useAuth from "../use/Auth";
import GrantCredits from "../components/GrantCredits.vue";
import Menu from "./Menu.vue";
const auth = useAuth();

const APP_PATH = import.meta.env.VITE_APP_BASE_PATH;

import { COUNTRIES } from '../lib/Countries';
import {INDUSTRIES} from "../lib/Industries";
import {GENRES} from "../lib/Genres";


import { MOODS } from "../lib/Moods";

const basePath = import.meta.env.VITE_API_BASE_PATH;

export default {
	name: 'songs',
	components: {
		Menu,
		GrantCredits
	},
	data() {
		return {
			songs: [],
			activeShowUser: undefined,
			grantCreditProps: undefined,
			moods: MOODS,
			appPath: APP_PATH,
			genres: GENRES,
			countries: COUNTRIES
		}
	},
	mounted: function () {
		this.getSongs().then(res => {
			this.songs = res
		});
	},
	computed: {

	},
	methods: {

		async disableSong(song, disable = true) {

			try {
				const res = await fetch(basePath + 'dashboard/disableSong', {
					method: "POST",
					headers: auth.getAuthHeader(),
					mode: "cors",
					body: JSON.stringify({ songUid: song.uid, disable: disable }),
				});

				this.getSongs().then(res => {
					this.songs = res
				});
			} catch(err){
				console.error(err)
			}


		},
		createdAt(date) {
			return moment(date).format('DD/MM/YY hh:mm');
		},
		async getSongs(){
			const res = await fetch(basePath + 'dashboard/getSongs', {
				method: "GET",
				headers: auth.getAuthHeader(),
				mode: "cors"
			});
			console.log("RECEIVED Songs");
			console.log(res);
			return res.json();
		},
	}
}
</script>

<style lang="scss" scoped>
	table {
		width: 100%;
	}
</style>