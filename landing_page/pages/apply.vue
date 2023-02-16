<template>
	<div style="display: flex">
		<div v-if="step !== 'role' && !isMaxMobileScreen" class="image-container">
			<img src="@/assets/bg/6exp.jpg"
				 @load="() => showContent = true"
			/>
		</div>

		<UserRole
			v-if="step === 'role'"
			@onRoleSet="onRoleSet"
		></UserRole>

		<div

			v-if="step !== 'role'"
			v-show="showContent || isMaxMobileScreen"
			class="register-container">

			<div v-if="step !== 'email-confirmation-info'" class="back-container">
				<div class="back-button" @click="() => goBack()">
					<BackIcon></BackIcon>
				</div>
			</div>


			<BasicRegisterStep
				v-if="step === 'description'"
				:isValid="isDescriptionValid"
				@goNext="step = 'description_2'"
			>
				<h1 class="step-title">Nice to meet you!</h1>
				<p class="step-description">Only a few steps to go until you're onboarded.</p>

				<TextRegisterInput
					v-model="user.companyArtistName"
				>
					What is your {{ user.role === 'artist' ? 'artist' : 'company' }} name?
				</TextRegisterInput>

				<SelectRegisterInput
					v-if="user.role === 'expert'"
					v-model="user.industryID"
					:options="INDUSTRIES"
					defaultSelectedText="select type"
				>
					What is your job title?
				</SelectRegisterInput>

			</BasicRegisterStep>


			<BasicRegisterStep
				v-if="step === 'description_2'"
				:isValid="isDescription2Valid"
				@goNext="nextStep()"
			>

				<h1 class="step-title">Describe {{user.companyArtistName}}</h1>
				<p class="step-description">Only a few steps left to apply.</p>

				<SelectRegisterInput
					v-if="user.role === 'artist'"
					v-model="user.genreID"
					:options="GENRES"
					defaultSelectedText="select genre"
				>
					What's the main genre?
				</SelectRegisterInput>

				<SelectRegisterInput
					v-model="user.countryID"
					:options="COUNTRIES"
					:key-fctn="el => el.countryCode"
					defaultSelectedText="select country"
				>
					Where are you located?
				</SelectRegisterInput>
			</BasicRegisterStep>

			<BasicRegisterStep
				v-if="step === 'country'"
				:isValid="isDescription2Valid"
				@goNext="nextStep()"
			>

				<h1 class="step-title">Where are you from, {{user.firstName}}?</h1>

				<SelectRegisterInput
					v-model="user.countryID"
					:options="COUNTRIES"
					:key-fctn="el => el.countryCode"
					defaultSelectedText="select country"
				>
					Where are you located?
				</SelectRegisterInput>
			</BasicRegisterStep>



			<BasicRegisterStep
				v-if="step === 'application_music'"
				:isValid="user.applicationMusicProfilePlatform !== -1 && user.applicationMusicProfileName.length > 0"
				@goNext="nextStep()"
			>
				<h1 class="step-title">Where can we listen<br />to your music, {{user.companyArtistName}}?</h1>
				<p class="step-description">Let us know where we can find you.</p>

				<SelectRegisterInput
					v-model="user.applicationMusicProfilePlatform"
					:is-valid-custom="user.applicationMusicProfilePlatform !== -1"
					:options="MUSIC_PLATFORMS"
					defaultSelectedText="select platform"
				>
					Platform
				</SelectRegisterInput>


				<TextRegisterInput
					v-model="user.applicationMusicProfileName"
					:is-valid-custom="user.applicationMusicProfileName.length > 0"
					:placeholder="'Username'"
				></TextRegisterInput>
			</BasicRegisterStep>

			<BasicRegisterStep
				v-if="step === 'application_social_expert'"
				:isValid="user.applicationSocialProfilePlatform !== -1 && user.applicationSocialProfileName.length > 0"
				@goNext="nextStep()"
			>
				<h1  class="step-title">Where can we find<br />{{user.companyArtistName}} online?</h1>
				<p class="step-description">Let us know where we can find you.</p>

				<SelectRegisterInput
					v-model="user.applicationSocialProfilePlatform"
					:is-valid-custom="user.applicationSocialProfilePlatform !== -1"
					:options="SOCIAL_PLATFORMS_EXPERTS"
					defaultSelectedText="select platform"
				>
					Platform
				</SelectRegisterInput>


				<TextRegisterInput
					v-model="user.applicationSocialProfileName"
					:is-valid-custom="user.applicationSocialProfileName.length > 0"
					:placeholder="'Username or Link'"
				></TextRegisterInput>
			</BasicRegisterStep>

			<BasicRegisterStep
				v-if="step === 'application_social'"
				:isValid="user.applicationSocialProfilePlatform !== -1 && user.applicationSocialProfileName.length > 0"
				@goNext="nextStep()"
			>
				<h1 class="step-title">Where can we find<br />{{ user.companyArtistName }} on social media?</h1>
				<p class="step-description">Let us know your socials.</p>


				<SelectRegisterInput
					v-if="user.role === 'artist'"
					v-model="user.applicationSocialProfilePlatform"
					:is-valid-custom="user.applicationSocialProfilePlatform !== -1"
					:options="SOCIAL_PLATFORMS"
					defaultSelectedText="select platform"
				>
					Platform
				</SelectRegisterInput>

				<TextRegisterInput
					v-model="user.applicationSocialProfileName"
					:is-valid-custom="user.applicationSocialProfileName.length > 0"
					:placeholder="'Username'"
				></TextRegisterInput>

			</BasicRegisterStep>

			<BasicRegisterStep
				v-if="step === 'name'"
				:isValid="isNameValid"
				@goNext="nextStep()"
			>
				<h1 class="step-title">{{ signupMode === 'marketplace' ? 'Nice to meet you!' : 'Final steps.'}}</h1>
				<p class="step-description">Only a few steps to go until you're onboarded.</p>

				<TextRegisterInput
					v-model="user.firstName"
					:label="'Your First Name'"
					:placeholder="'Max'"></TextRegisterInput>
				<TextRegisterInput
					v-model="user.lastName"
					:label="'Your Last Name'"
					:placeholder="'Mustermann'"></TextRegisterInput>
			</BasicRegisterStep>


			<BasicRegisterStep
				v-if="step === 'email'"
				:isValid="isEmailFullyValid"
				@goNext="nextStep()"
				:button-text="'next'"
				:button-loading="emailIsLoading"
			>
				<h1 class="step-title">{{ user.firstName }}, let's create<br />your account.</h1>
				<!--				<template name="description">Nice to see you, {{user.firstName}}!</template>-->
				<TextRegisterInput
					v-model="user.email"
					:type="'email'"
					:label="'Your E-Mail Address'"
					@input="onEmailInputChanged"
					:is-valid-custom="isEmailFullyValid"
					:invalid-hint="{
						show: emailIsFree === false,
						message: 'This e-mail already exists!',
						ctaText: 'Log me in.',
						ctaLink: 'https://app.democharts.org/login'
					}"
					:placeholder="'Your E-Mail Address'"
				></TextRegisterInput>
			</BasicRegisterStep>


			<BasicRegisterStep
				v-if="step === 'password'"
				:isValid="isPasswordValid"
				@goNext="nextStep()"
			>
				<h1 class="step-title">Set a password.</h1>
				<p class="step-description">Make sure your password has at least 8 characters.</p>

				<TextRegisterInput
					v-model="user.password"
					:type="'password'"
					:is-valid-custom="isSinglePasswordValid"
					:placeholder="'Your Password'"
				></TextRegisterInput>

				<TextRegisterInput
					v-model="user.passwordRepeated"
					:type="'password'"
					:is-valid-custom="user.passwordRepeated === user.password && user.password.length > 0"
					:placeholder="'Once again'"
				></TextRegisterInput>
			</BasicRegisterStep>

			<BasicRegisterStep
				v-if="step === 'confirm'"
				:isValid="user.tosConfirmed"
				@goNext="() => apply()"
				:button-text="signupMode === 'marketplace' ? 'Signup now' : 'Apply now'"
				:button-loading="isSubmitting"
			>
				<h1 class="step-title">Last step.</h1>

				<CheckboxRegisterInput
					v-model="user.tosConfirmed"
					:is-valid="user.tosConfirmed"
				>
					I have read and agree the <nuxt-link to="/terms" target="_blank">terms of use</nuxt-link> and the <nuxt-link to="/imprint" target="_blank" >privacy policy</nuxt-link>.
				</CheckboxRegisterInput>

				<CheckboxRegisterInput
					v-model="user.newsletterConfirmation"
				>
					I want democharts to keep me updated (newsletter)
				</CheckboxRegisterInput>


				<div v-if="signupError === 'user_exists'" class="error-hint">Hey! This email already exists.</div>
				<div v-if="signupError === 'error'" class="error-hint">Sorry! An error occurred. Please contact the support.</div>

			</BasicRegisterStep>


			<BasicRegisterStep
				v-if="step === 'email-confirmation-info'"
				:is-valid="true"
				hide-next
			>
				<h1 class="step-title">Check your mail!</h1>
				<p class="step-description">Please check your inbox and verify your email address. </p>

			</BasicRegisterStep>

		</div>

		<div class="exit-container">
			<div class="exit-button" @click="() =>this.$router.push('/')">
				<CloseIcon></CloseIcon>
			</div>
		</div>
	</div>
</template>

<script>

import { debounce } from 'lodash'

import UserRole from "../components/register/UserRole";
import BasicRegisterStep from "../components/register/BasicRegisterStep";
import TextRegisterInput from "../components/register/TextRegisterInput";
import SelectRegisterInput from "../components/register/SelectRegisterInput";
import {GENRES} from "../../lib/types/Genres";
import {INDUSTRIES} from "../../lib/types/Industries";
import {COUNTRIES} from "../../lib/types/Countries";
import CheckboxRegisterInput from "../components/register/CheckboxRegisterInput";
import {RegisterMixin} from "../mixins/RegisterMixin.ts";
import DButton from "../components/DButton";
import CloseIcon from "../components/icons/CloseIcon";
import BackIcon from "../components/icons/BackIcon";
import {DeviceDimensions} from "../mixins/DeviceDimensions";
export default {
	name: "registernew.vue",
	components: {
		BackIcon,
		CloseIcon,
		DButton, CheckboxRegisterInput, SelectRegisterInput, TextRegisterInput, BasicRegisterStep, UserRole},
	mixins: [RegisterMixin, DeviceDimensions],
	data() {
		return {
			user: {
				role: undefined,
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				passwordRepeated: '',
				industryID: undefined,
				genreID: undefined,
				countryID: undefined,
				newsletterConfirmation: false,
				tosConfirmed: false,
				applicationSocialProfileName: '',
				applicationSocialProfilePlatform: -1,
				applicationMusicProfileName: '',
				applicationMusicProfilePlatform: -1,
			},
			signupMode: '',
			userSignedUp: undefined,
			emailIsLoading: false,
			GENRES: GENRES,
			INDUSTRIES: INDUSTRIES,
			COUNTRIES: COUNTRIES,
			SOCIAL_PLATFORMS: [
				{ id: 1, name: 'Instagram'},
				{ id: 2, name: 'Facebook'},
				{ id: 3, name: 'Tik Tok'}
			],
			SOCIAL_PLATFORMS_EXPERTS: [
				{ id: 1, name: 'LinkedIn'},
				{ id: 2, name: 'Xing'},
				{ id: 3, name: 'Facebook'},
				{ id: 4, name: 'Instagram'},
				{ id: 5, name: 'Website'}
			],
			MUSIC_PLATFORMS: [
				{ id: 1, name: 'Spotify'},
				{ id: 2, name: 'Youtube'},
				{ id: 3, name: 'Soundcloud'},
				{ id: 4, name: 'Apple Music'},
				{ id: 5, name: 'Bandcamp'}
			],
			emailIsFree: undefined,
			signupError: undefined,
			showContent: false,
			isSubmitting: false,
			step: 'name',
			redirectTo: undefined,
			stepsScoutingPlattform: [
				{ id: 'role'},
				{ id: 'description'},
				{ id: 'description_2'},
				{ id: 'application_music', artistOnly: true},
				{ id: 'application_social', artistOnly: true},
				{ id: 'application_social_expert', expertOnly: true},
				{ id: 'name'},
				{ id: 'email'},
				{ id: 'password'},
				{ id: 'confirm'},
				{ id: 'email-confirmation-info'},
			],
			stepsMarketplace: [
				{ id: 'name'},
				{ id: 'country'},
				{ id: 'email'},
				{ id: 'password'},
				{ id: 'confirm'},
				{ id: 'email-confirmation-info'},
			],
			steps: [],
		}
	},
	computed: {
		isNameValid() {
			return this.user.firstName.length > 0 && this.user.lastName.length > 0
		},
		isEmailFormatValid() {
			return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.user.email))
		},
		isEmailFullyValid() {
			return this.isEmailFormatValid && this.emailIsFree && !this.emailIsLoading
		},
		isDescriptionValid() {
			return true; // TODO
		},
		isDescription2Valid() {
			return true; // TODO
		},
		isSinglePasswordValid() {
			return this.user.password.length > 7; //&& (/[A-Z]/.test(this.user.password)) && (/[1-9]/.test(this.user.password));
		},
		isPasswordValid() {
			return this.user.password === this.user.passwordRepeated && this.isSinglePasswordValid
		},
		isApplicationSocialValid() {
			return this.user.applicationSocialProfile.length > 0
		},
		isApplicationMusicValid() {
			return this.user.applicationMusicProfile.length > 0
		}
	},
	created() {
		this.$nextTick(function () {
			this.user.email = this.$route.query.email;
			this.onEmailInputChanged();

			const role = this.$route.query.role;
			if (role === 'artist' || role === 'expert'){
				this.user.role = role;
				this.onRoleSet(role);
			}

			if (this.$route.query.origin !== 'marketplace'){
				console.log("NOT MARKETPLACE?")
				this.step = 'role';
				this.steps = this.stepsScoutingPlattform;
				this.signupMode = 'scouting';
			} else {
				this.signupMode = 'marketplace';
				this.steps = this.stepsMarketplace;

				this.redirectTo = this.$route.query.redirectTo;
			}

			this.$router.replace({ query: {} });
		})
	},
	mounted() {
		this.$nuxt.$emit('show-menu', false);
	},
	beforeDestroy() {
		this.$nuxt.$emit('show-menu', true);
	},
	methods: {
		goToStartPage() {
			this.route.push('/');
		},
		onRoleSet(role) {
			this.user.role = role;
			this.nextStep();

		},
		nextStep() {
			const index = this.steps.findIndex((el) => el.id === this.step);
			let found = false;
			let tryIndex = index + 1;

			while(!found && tryIndex < this.steps.length) {
				const stepEl = this.steps[tryIndex];
				if ((!stepEl.artistOnly || this.user.role === 'artist') && (!stepEl.expertOnly || this.user.role === 'expert')) {
					found = true;
					this.step = stepEl.id;
				} else {
					tryIndex ++;
				}
			}
		},
		goBack() {
			const index = this.steps.findIndex((el) => el.id === this.step);
			let found = false;
			let tryIndex = index - 1;
			while(!found && tryIndex >= 0) {
				const stepEl = this.steps[tryIndex];
				if ((!stepEl.artistOnly || this.user.role === 'artist') && (!stepEl.expertOnly || this.user.role === 'expert')) {
					found = true;
					this.step = stepEl.id;
				} else {
					tryIndex --;
				}
			}

			// const index = this.steps.indexOf(this.step);
			// if (index > 0) {
			// 	this.step = this.steps[index-1];
			// }

			// switch (this.step) {
			// 	case 'description' : this.step = 'role'; break;
			// 	case 'description_2' : this.step = 'description'; break;
			// 	case 'application_music' : this.step = 'description_2'; break;
			// 	case 'application_social' : this.step = 'application_music'; break;
			// 	case 'name' : this.step = 'application_social'; break;
			// 	case 'email' : this.step = 'name'; break;
			// 	case 'password' : this.step = 'email'; break;
			// 	case 'confirm' : this.step = 'description'; break;
			// 	case 'email-confirmation-info' : this.step = 'confirm'; break;
			// 	default: this.step = 'role'; break;
			// }
		},
		onEmailInputChanged:  debounce(async function() {
			if (this.isEmailFormatValid) {
				this.emailIsLoading = true;
				this.emailIsFree = await this.__checkIfEmailIsFree(this.user.email);
				this.emailIsLoading = false;
			} else {
				this.emailIsFree = undefined;
			}
		}, 200),
		apply() {
			const _this = this;

			this.isSubmitting = true;
			function callback(err, result) {
				if (err) {
					_this.signupError = 'error';
					console.log(err);
					return;
				}

				gtag('event', 'conversion', {'send_to': 'AW-702295508/xPWWCPqztOoCENTb8M4C'});

				// if (_this.signupMode === 'marketplace' && _this.redirectTo.includes('democharts.org')) {
					// window.location.href = _this.redirectTo;
				// }

				_this.isSubmitting = false;
				_this.userSignedUp = result.user;
				_this.nextStep();
			}

			let socialEl;
			if (this.user.role === 'artist') {
				socialEl = this.SOCIAL_PLATFORMS.find(el => el.id === this.user.applicationSocialProfilePlatform);
			} else {
				socialEl = this.SOCIAL_PLATFORMS_EXPERTS.find(el => el.id === this.user.applicationSocialProfilePlatform);
			}
			const socialPlatform = socialEl && socialEl.name;

			const musicEl = this.MUSIC_PLATFORMS.find(el => el.id === this.user.applicationMusicProfilePlatform);
			const musicPlatform = this.user.role === 'artist' ? (musicEl && musicEl.name) : '';


			console.log({
				userType: (this.user.role === 'artist' ? 1 : 2).toString(),
				name: this.user.companyArtistName,
				firstName: this.user.firstName,
				lastName: this.user.lastName,
				countryID: !this.user.countryID ? '' : this.user.countryID.toString(),
				industryID: !this.user.industryID ? '' : this.user.industryID.toString(),
				genreID: !this.user.genreID ? '' : this.user.genreID.toString(),
				newsletter: this.user.newsletterConfirmation.toString(),
				applicationSocialProfileName: this.user.applicationSocialProfileName,
				applicationSocialProfilePlatform: socialPlatform,
				applicationMusicProfileName: this.user.applicationMusicProfileName,
				applicationMusicProfilePlatform: musicPlatform,
			});


			let metaData = {
				firstName: this.user.firstName,
				lastName: this.user.lastName,
				countryID: !this.user.countryID ? '' : this.user.countryID.toString(),
			}

			if (this.signupMode !== 'marketplace') {
				const scoutingData = {
					userType: (this.user.role === 'artist' ? 1 : 2).toString(),
					name: this.user.companyArtistName,
					industryID: !this.user.industryID ? '' : this.user.industryID.toString(),
					genreID: !this.user.genreID ? '' : this.user.genreID.toString(),
					newsletter: this.user.newsletterConfirmation.toString(),
					applicationSocialProfileName: this.user.applicationSocialProfileName,
					applicationSocialProfilePlatform: socialPlatform,
					applicationMusicProfileName: this.user.applicationMusicProfileName,
					applicationMusicProfilePlatform: musicPlatform,
					origin: 'scouting'
				}
				metaData = { ...metaData, ...scoutingData }
			} else {
				metaData.origin = 'marketplace';
				metaData.redirectTo = _this.redirectTo;
				metaData.userType = '0';
			}

			this.__signUp(
				this.user.email,
				this.user.password.trim(),
				metaData,
				callback
			);
		}
	},
}
</script>

<style scoped lang="scss">
	.register-container {
		/*height: 100vh;*/
		display: flex;
		align-items: center;
		/*padding-top: 20%;*/
		position: relative;

		@include respondTo(tablet) {
			padding-top: 150px;
		}

		@include respondTo(mobile) {
			padding-left: 24px;
			padding-right: 24px;
		}
	}


	.image-container {
		width: 50vw;
		padding: 32px;
		height: 100vh;
		box-sizing: border-box;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	.exit-container, .back-container {
		position: absolute;
		top: 36px;
		right: 36px;

		@include respondTo(mobile) {
			right: 24px;
		}

		.exit-button, .back-button {
			background: $grey-light;
			width: 24px;
			height: 24px;
			border-radius: 50%;
			display: flex;
			cursor: pointer;
			align-items: center;
			justify-content: center;
			fill: white;
			padding: 16px;
		}


		@include respondTo(mobile) {
			.back-button {
				margin-left: 24px;
			}
		}
	}
	.back-container {
		left: 0;
	}

	.step-title {
		margin-bottom: 48px;
		color: $link;

		/*~.step-description {*/
		/*	margin-bottom: 16px;*/
		/*}*/
	}
	.step-description {
		margin-top: -36px;
		margin-bottom: 48px;
	}
</style>
