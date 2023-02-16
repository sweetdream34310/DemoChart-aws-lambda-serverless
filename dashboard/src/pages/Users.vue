<template>
	<div>
		<div class="container" style="margin-bottom: 36px">
			<h2>{{ totalUsers }} registered User</h2>
			<h2>{{ totalUsersNewsletter }} newsletter Abos</h2>
		</div>
		<table class="table">
			<thead>
			<tr>
				<th>Link</th>
				<th>First name</th>
				<th>Last name</th>
				<th>E-Mail</th>
				<th>Registered at</th>
				<th>Country</th>
				<th>All</th>
        <th>Seller (actions)</th>
				<th><strong>Scouting</strong><br/>
          <div>Artist/Expert</div>
          <div>Genre/Industry</div>
          Company/Artist Name<br />
          Music/Social<br />
          Approve/Decline
        </th>
        <th></th>
				<th>Credits</th>
			</tr>
			</thead>

			<tbody>
			<tr v-for="user in users" :key="user.uid" style="font-size: 12px">
				<td><a :href="`${appPath}profile/${user.slug}`" target="_blank">Profile</a></td>
				<td>{{user.firstName}} </td>
				<td>{{user.lastName}} </td>
				<td>{{user.email}}</td>
				<td>{{new Date(user.createdAt).toLocaleString()}}</td>
				<td>
					{{
					countries.find(el => el.countryCode === user.countryID )
					&& countries.find(el => el.countryCode === user.countryID ).name
					}}
				</td>
				<td><div v-if="activeShowUser === user.uid"><pre>{{ user }}</pre></div>
					<div @click="activeShowUser !== user.uid ? (activeShowUser = user.uid) : (activeShowUser = undefined)">
						<span v-if="activeShowUser === user.uid">close</span>
						<span v-else>open</span>
					</div>
				</td>
        <td>
<!--          <div>Is Seller? {{ !!user.seller }}</div>-->
          <div v-if="!user.reseller"><button @click="() => createSellerProfile(user)">Create seller profile</button></div>
          <div v-if="user.reseller">{{ user.reseller.approvedByAdmin ? 'approved' : 'not approved'}} <button @click="() => toggleSellerProfile(user, !user.reseller.approvedByAdmin)">toggle</button></div>
        </td>
				<td>
          <div>{{user.userType === 1 ? user.artistName : user.company}}</div>
          <strong>{{user.userType === 1 ? 'artist' + ` [${user.credits}C]` : 'expert'}}</strong>
          {{industries.find(el => el.id === user.industryID) && industries.find(el => el.id === user.industryID).name}}
          {{genres.find(el => el.id === user.genreID) && genres.find(el => el.id === user.genreID).name}}


          <div v-if="user.applicationMusicProfileName">
            {{ user.applicationMusicProfilePlatform }}: {{ user.applicationMusicProfileName }}
          </div>
          <div v-if="user.applicationSocialProfileName">
            {{ user.applicationSocialProfilePlatform }}: {{ user.applicationSocialProfileName }}
          </div>
          
          <button v-if="!user.approvedByAdmin || user.declinedByAdmin" @click="approveUser(user)">approve</button>
					<button v-if="!user.approvedByAdmin && !user.declinedByAdmin" @click="approveUser(user, true)">decline</button>
					<div v-else>{{ user.declinedByAdmin ? `declined since ${declinedSince(user.declinedByAdmin)}` : 'approved'}}</div>
				</td>
        <td>
          <img v-if="user.approvedByAdmin" src="../assets/Demoshark_Talking.png" style="width: 100px; height: 100%"/>
        </td>
				<td>
					<button @click="grantCredits(user.email)">add credits</button>
				</td>
			</tr>
			</tbody>
		</table>

    <button @click="getMoreUsers">load more</button>


		<div style="height: 150px; overflow: scroll">{{ users }}</div>

		<GrantCredits
				v-if="grantCreditProps"
				:emailInput="grantCreditProps.email"
				@onClose="postGrantCredits"
		>
		</GrantCredits>
	</div>
</template>

<script>

import moment from "moment";
import useAuth from "../use/Auth";
import GrantCredits from "../components/GrantCredits.vue";
const auth = useAuth();

const APP_PATH = import.meta.env.VITE_APP_BASE_PATH;


import { COUNTRIES } from '../lib/Countries';
import {INDUSTRIES} from "../lib/Industries";
import {GENRES} from "../lib/Genres";

const basePath = import.meta.env.VITE_API_BASE_PATH;

export default {
	name: 'home',
	components: {
		GrantCredits
	},
	data() {
		return {
			users: [],
			activeShowUser: undefined,
			grantCreditProps: undefined,
			countries: COUNTRIES,
			industries: INDUSTRIES,
			genres: GENRES,
			appPath: APP_PATH,
      page: 0,
      totalUsers: -1,
      totalUsersNewsletter: -1,
		}
	},
	mounted: function () {
    this.getMoreUsers();
	},
	computed: {
		countedUsers() {
			return this.users.length;
		},
		countedUsersNewsletter() {
			return this.users && this.users.filter(user => user.newsletter).length;
		}

	},
	methods: {
		declinedSince(date) {
			return moment(date).format('DD/MM/YY');
		},
		grantCredits(email) {
			this.grantCreditProps = {
				email
			}
		},
		postGrantCredits() {
			this.grantCreditProps = undefined;

      this.page = 0;


      this.page = 0;
      this.getMoreUsers();
		},
    async getMoreUsers() {
      this.fetchMoreUsers().then(res => {
        this.users.push(...res.result)
        this.totalUsers = res.totalResult;
        this.totalUsersNewsletter = res.totalResultNewsletter;
      });
    },
		async fetchMoreUsers(){
      console.log("page", this.page)
			const res = await fetch(basePath + 'dashboard/getUsers', {
				method: "POST",
				headers: auth.getAuthHeader(),
				mode: "cors",
        body: JSON.stringify({
          page: this.page,
        })
			});

      this.page ++;
			return res.json();
		},

    /**
     * Calls updateUser api. don't forget to set a action within your body!
     * @param body
     * @return {Promise<void>}
     */
    async updateUserAction(body) {
      const res = await fetch(basePath + 'dashboard/updateUser', {
        method: "POST",
        headers: auth.getAuthHeader(),
        mode: "cors",
        body: JSON.stringify(body),
      });

      res.json().then(res => {
        const i = this.users.findIndex(el => el.uid === res.user.uid)
        if (i >= 0) {
          this.users[i] = res.user;
        }

      })
    },

		async approveUser(user, declined = false) {
      const body = {
        action: "approve-or-decline",
        uid: user.uid,
        declined
      };
      await this.updateUserAction(body);
		},

    async toggleSellerProfile(user, approved) {
      const body = {
        action: "seller-status",
        uid: user.uid,
        approved
      };
      await this.updateUserAction(body);
    },

    async createSellerProfile(user) {
      const body = {
        action: "create-seller",
        uid: user.uid
      };
      await this.updateUserAction(body);
    },
	}
}
</script>

<style lang="scss" scoped>
	table {
		width: 100%;
	}
</style>