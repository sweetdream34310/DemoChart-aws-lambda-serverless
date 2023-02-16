<template>
	<div>
		<div
			id="carousel-wrapper"
			class="p flex"
			:class="{ smallbox: selectedStep === 0 || selectedStep === 1 }"
		>
			<div
				v-if="selectedStep === 0"
				id="invite-code-outer-wrapper"
				class="flex"
			>
				<div id="invite-code" class="flex vert">
					<h1 class="primary semi">
						Got an invite?
					</h1>
					<h1 class="white semi">
						Verify your secret code
					</h1>

					<div>
						<a
							class="grey reg"
							href="mailto:hello@democharts.org?subject=Hey%2C%20I%20want%20to%20join%20Democharts.&body=Dear%20Democharts%20Team%2C%0D%0A%0D%0AIt%20would%20be%20great%20to%20connect%20with%20newcomer%20artists.%0D%0ATherefore%20I%20would%20like%20to%20apply%20as%20industry%20expert%20on%0D%0Ayour%20platform.%0D%0A%0D%0AHere%20is%20some%20information%20about%20myself%3A%0D%0A%0D%0A"
						>
							Don't have a code?
						</a>
					</div>

					<div id="invite-code-wrapper" class="flex l">
						<input
							v-model="inviteCode"
							autocomplete="off"
							type="password"
							class="semi black"
							:class="{ valid: inviteCode.length === 8 }"
							placeholder="X X X X X X X X"
							minlength="8"
							maxlength="8"
							size="8"
						/>

						<transition name="fade">
							<a
								v-if="inviteCode.length === 8"
								id="invite-code-checkmark"
								class="pointer flex"
								@click="checkInviteCode"
							>
								<img
									v-if="!checkInviteCodeLocked"
									src="@/assets/checkmark.svg"
								/>
								<spinner
									v-if="checkInviteCodeLocked"
									class="spinner"
								/>
							</a>
						</transition>
					</div>

					<span class="grey reg">
						{{ inviteCodeErrorMessage }}
					</span>
				</div>
			</div>

			<div
				v-if="selectedStep === 1"
				id="user-type-selector-wrapper"
				class="flex"
			>
				<div id="user-type-selector">
					<h1 class="primary semi">
						Welcome!
					</h1>
					<h1 class="white semi">
						Let's get you started
					</h1>

					<span class="grey reg">
						Who are you?
					</span>

					<div
						v-if="windowWidth > 768"
						id="user-type-button-wrapper"
						class="flex"
					>
						<democharts-button
							text="artist"
							href="#register"
							class="pointer"
							bgColor="#ffffff"
							textColor="#2A276D"
							bgHover="#ffffff"
							textHover="#F15D5C"
							borderColor="#ffffff"
							borderRadius="1rem"
							:filled="true"
							fontSize="30px"
							:fontWeight="600"
							@click="
								setUserMode(0);
								stepUp();
							"
						/>

						<democharts-button
							text="expert"
							href="#register"
							class="pointer"
							bgColor="#ffffff"
							textColor="#2A276D"
							bgHover="#ffffff"
							textHover="#F15D5C"
							borderColor="#ffffff"
							borderRadius="1rem"
							:filled="true"
							fontSize="30px"
							:fontWeight="600"
							@click="
								setUserMode(1);
								stepUp();
							"
						/>
					</div>

					<div
						v-if="windowWidth < 768"
						id="user-type-button-wrapper"
						class="flex"
					>
						<democharts-button
							text="artist"
							href="#register"
							bgColor="#ffffff"
							textColor="#2A276D"
							bgHover="#ffffff"
							textHover="#F15D5C"
							borderColor="#ffffff"
							borderRadius="1rem"
							:filled="true"
							fontSize="20px"
							:fontWeight="600"
							padding="1rem 2rem"
							@click="
								setUserMode(0);
								stepUp();
							"
						/>

						<democharts-button
							text="expert"
							href="#register"
							bgColor="#ffffff"
							textColor="#2A276D"
							bgHover="#ffffff"
							textHover="#F15D5C"
							borderColor="#ffffff"
							borderRadius="1rem"
							:filled="true"
							fontSize="20px"
							:fontWeight="600"
							padding="1rem 2rem"
							@click="
								setUserMode(1);
								stepUp();
							"
						/>
					</div>
				</div>
			</div>

			<div
				v-if="selectedStep !== 0 && selectedStep !== 1"
				id="register-frame"
			>
				<div id="register-wrapper" :style="registerOffset">
					<div class="slide flex vert">
						<div class="header-wrapper flex vert">
							<h1 class="primary">
								Who are you?
							</h1>
						</div>

						<div class="input-wrapper">
							<label for="firstName" class="primary semi"
								>First Name</label
							>
							<input
								v-model="newUser.firstName"
								autocomplete="off"
								:disabled="!matchSelectedStep(2)"
								class="semi black"
								type="text"
								name="firstName"
								placeholder="first name"
							/>
						</div>
						<div class="input-wrapper">
							<label for="lastName" class="primary semi"
								>Last Name</label
							>
							<input
								v-model="newUser.lastName"
								autocomplete="off"
								:disabled="!matchSelectedStep(2)"
								class="semi black"
								type="text"
								name="lastName"
								placeholder="last name"
							/>
						</div>

						<div id="email-input" class="input-wrapper">
							<label for="email" class="primary semi"
								>Email</label
							>
							<input
								v-model="newUser.email"
								autocomplete="off"
								:disabled="!matchSelectedStep(2)"
								class="semi black"
								type="email"
								name="email"
								placeholder="you@example.com"
								@change="userDetailsErrorMessage = ''"
								@focusout="checkIfEmailExists"
							/>
							<img
								v-if="
									!(
										$v.newUser.email.$invalid ||
										!newUserEmailValid
									)
								"
								src="@/assets/checkmark-white.svg"
							/>
						</div>

						<div class="input-wrapper">
							<label for="pass" class="primary semi"
								>password</label
							>
							<input
								v-model="newUser.password"
								autocomplete="off"
								:disabled="!matchSelectedStep(2)"
								class="semi black"
								type="password"
								name="pass"
								placeholder="**********"
								@focusin="userIsInPasswordField = true"
								@focusout="userIsInPasswordField = false"
							/>
							<img
								v-if="!$v.newUser.password.$invalid"
								src="@/assets/checkmark-white.svg"
							/>
						</div>

						<div class="input-wrapper">
							<label for="passcheck" class="primary semi"
								>retype password</label
							>
							<input
								v-model="newUser.repeatPassword"
								autocomplete="off"
								:disabled="!matchSelectedStep(2)"
								class="semi black"
								type="password"
								name="passcheck"
								placeholder="**********"
								@focusin="userIsInPasswordField = true"
								@focusout="userIsInPasswordField = false"
							/>
							<img
								v-if="!$v.newUser.repeatPassword.$invalid"
								src="@/assets/checkmark-white.svg"
							/>
						</div>

						<div id="error-next-wrapper" class="flex">
							<div id="error-next-message">
								<span
									v-if="$v.newUser.password.$invalid"
									class="grey reg"
									:style="userInPassword"
								>
									{{ newUserErrorMessage }}
								</span>
							</div>

							<div
								v-if="
									!this.$v.newUser.validationGroup.$invalid &&
									this.newUserEmailValid
								"
								:class="{
									disabled: this.$v.newUser.validationGroup
										.$invalid,
								}"
								class="flex pointer next"
								@click="stepUp"
							>
								<span class="white bold">
									NEXT
								</span>
								<span class="primary">
									>>
								</span>
							</div>
						</div>
					</div>

					<div class="slide flex vert">
						<div class="header-wrapper flex vert">
							<h1 class="primary">
								Keep it up, {{ newUser.firstName }}!
							</h1>
						</div>

						<div class="input-wrapper">
							<label for="companyName" class="primary semi"
								>{{
									userMode === 0 ? 'Artist' : 'Company'
								}}
								Name</label
							>
							<input
								v-model="userDetails.companyArtistName"
								autocomplete="off"
								:disabled="!matchSelectedStep(3)"
								class="semi black"
								type="text"
								name="companyName"
								placeholder="name"
							/>
						</div>

						<div v-if="userMode === 1" class="input-wrapper">
							<label class="primary semi">Industry</label>
							<v-select
								v-model="userDetails.industry"
								class="v-select"
								:disabled="!matchSelectedStep(3)"
								label="name"
								:options="industryOptions"
								placeholder="select industry"
								autocomplete="off"
								:searchable="false"
								:filterable="false"
							></v-select>
						</div>

						<div class="input-wrapper">
							<label class="primary semi">Country</label>
							<v-select
								v-model="userDetails.country"
								class="v-select"
								:disabled="!matchSelectedStep(3)"
								label="name"
								:options="countryOptions"
								placeholder="select Country"
								autocomplete="off"
								:searchable="true"
								:filterable="true"
							></v-select>
						</div>

						<div class="input-wrapper">
							<label class="primary semi">Genre</label>
							<v-select
								v-model="userDetails.genre"
								class="v-select"
								:disabled="!matchSelectedStep(3)"
								label="name"
								:options="genreOptions"
								placeholder="select Genre"
								autocomplete="off"
								:searchable="true"
								:filterable="true"
							></v-select>
						</div>

						<div class="input-wrapper">
							<label class="primary semi"
								>Newsletter Signup</label
							>
							<input
								id="newsletter"
								type="checkbox"
								name="newsletter"
								tabindex="-1"
							/>
						</div>

						<div id="error-next-wrapper" class="flex">
							<span class="grey reg">
								{{ userDetailsErrorMessage }}
							</span>

							<div
								v-if="
									!this.$v.userDetails.validationGroup
										.$invalid &&
									initRegisterLocked === false
								"
								class="flex pointer next"
								@click="initRegister()"
							>
								<span class="white bold">
									NEXT
								</span>
								<span class="primary">
									>>
								</span>
							</div>

							<div
								v-if="
									!this.$v.userDetails.validationGroup
										.$invalid && initRegisterLocked === true
								"
								class="flex next"
							>
								<spinner class="spinner" />
							</div>
						</div>
					</div>

					<div class="slide flex vert">
						<div class="header-wrapper flex vert">
							<h1 class="primary">
								One last step!
							</h1>
						</div>

						<span class="white reg">
							Please check your Inbox and verify your email
							address.
						</span>

						<span class="grey reg flex l">
							{{ confirmationCodeErrorMessage }}
						</span>

						<div id="error-next-wrapper" class="flex">
							<div
								v-if="confirmationCode.length === 6"
								class="flex r pointer next"
								@click="confirmRegister"
							>
								<span class="white bold">
									CONFIRM
								</span>
								<span class="primary">
									>>
								</span>
							</div>
						</div>
					</div>

					<div class="slide flex vert">
						<div class="header-wrapper flex vert">
							<h1 class="primary">
								Onboarding Completed.
							</h1>
						</div>

						<span id="welcome-banner" class="white">
							Welcome to Democharts
							{{ userDetails.companyArtistName }}
						</span>

						<span class="white reg">
							Your journey will start soon. We will keep you
							updated via email.
						</span>

						<span id="we-believe" class="white">
							We created this platform to give newcomer artists a
							chance to be heard by the right people. We value
							feedback and the exchange of thoughts. We believe in
							a creative community and the power of music.
							<br /><br />
							We believe that using technology to connect artists,
							and industry experts, should feel exciting and fun.
							We believe that there are plenty of unheard hit
							singles and we are here to help you find them.
						</span>
					</div>
				</div>

				<div id="pagination-points" class="flex">
					<div
						:class="{ active: selectedStep === 2 }"
						@click="tryStep(2)"
					></div>
					<div
						:class="{ active: selectedStep === 3 }"
						@click="tryStep(3)"
					></div>
					<div :class="{ active: selectedStep === 4 }"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import DemochartsButton from '@/components/DemochartsButton.vue';
import Spinner from '@/components/Spinner.vue';

// FORM VALIDATION
import Vuelidate from 'vuelidate';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

Vue.use(Vuelidate);

// DROPDOWN MENU
import vSelect from 'vue-select';

Vue.component('VSelect', vSelect);

// COGNITO STUFF
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
	CognitoUserSession,
} from 'amazon-cognito-identity-js';

let userPool;

// USERTYPE, GENRE, COUNTRY
import { INDUSTRIES } from '../../lib/types/Industries';
import { COUNTRIES } from '../../lib/types/Countries';
import { GENRES } from '../../lib/types/Genres';

/*---- CUSTOM PASSWORD VALIDATOR ----*/
function passwordComplexity(password) {
	// Minimum of 1 Uppercase Letter
	if (false === /[A-Z]/.test(password)) return false;

	// Minimum of 1 Number
	if (false === /\d/.test(password)) return false;

	return true;
}

function requiredForManager(input) {
	if (this.userMode === 0) {
		return true;
	}

	if (input === undefined) return false;

	if (input === '') return false;

	return true;
}

export default Vue.extend({
	name: 'RegisterPanel',
	components: {
		DemochartsButton,
		Spinner,
	},
	props: ['selectedStep'],
	data: function () {
		return {
			windowWidth: 0,
			inviteCode: '',
			userMode: undefined,
			userIsInPasswordField: false,
			newUserEmailValid: false,
			newUser: {
				firstName: undefined,
				lastName: undefined,
				email: undefined,
				password: undefined,
				repeatPassword: undefined,
			},
			userDetails: {
				companyArtistName: '',
				industry: undefined,
				country: undefined,
				genre: undefined,
			},
			industryOptions: INDUSTRIES,
			countryOptions: COUNTRIES,
			genreOptions: GENRES,
			confirmationCode: '',
			currentUser: undefined as CognitoUser,
			session: undefined as CognitoUserSession,
			inviteCodeErrorMessage: '',
			newUserErrorMessage:
				'Password must include at least 8 characters, a number and an uppercase letter',
			userDetailsErrorMessage: '',
			confirmationCodeErrorMessage: '',
			checkInviteCodeLocked: false,
			initRegisterLocked: false,
		};
	},
	computed: {
		registerOffset() {
			return {
				'--offset-left': (this.selectedStep - 2) * 100 * -1 + '%',
			};
		},
		userInPassword() {
			return {
				'--text-color': this.userIsInPasswordField
					? '#E1625E'
					: '#C3C1BA',
			};
		},
	},
	beforeMount() {
		userPool = new CognitoUserPool({
			UserPoolId: this.$config.UserPoolId,
			ClientId: this.$config.ClientId,
		});
	},
	mounted() {
		this.$nextTick(function () {
			window.addEventListener('resize', this.getWindowWidth);
			this.getWindowWidth();
		});
	},
	methods: {
		getWindowWidth() {
			this.windowWidth = document.documentElement.clientWidth;
		},
		async checkIfEmailExists() {
			if (this.newUser.email !== '' && !this.$v.newUser.email.$invalid) {
				let res = await fetch(
					`${this.$config.API_BASE_PATH}/signup/userExists`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							mail: this.newUser.email,
						}),
					}
				).then((res) => res.text());

				if (res === 'true') {
					this.newUserEmailValid = false;
					this.newUserErrorMessage =
						'User with this email already exists.';
				} else {
					this.newUserEmailValid = true;
					this.newUserErrorMessage = '';
				}
			} else if (this.$v.newUser.email.$invalid) {
				this.newUserErrorMessage = '';
			}
		},
		checkInviteCode() {
			if (this.checkInviteCodeLocked) return;
			if (this.inviteCode.length !== 8) return;

			this.checkInviteCodeLocked = true;

			// DO SOME SERVER SIDE CHECKS
			let validatePromise = fetch(
				`https://api.democharts.org/apply/validateCode?code=${this.inviteCode}`
			);

			validatePromise
				.then((response: any) => {
					return response.json();
				})
				.then((result: any) => {
					if (result.success) {
						this.inviteCodeErrorMessage = '';
						this.stepUp();
					} else {
						this.inviteCodeErrorMessage =
							'Your code is invalid or was already used';
					}

					this.checkInviteCodeLocked = false;
				});
		},
		setUserMode(mode) {
			this.userMode = mode;
		},
		goToStep(step) {
			this.$emit('goToStep', step);
		},
		stepUp() {
			this.goToStep(this.selectedStep + 1);
		},
		tryStep(step) {
			if (this.selectedStep < step) return;

			if (this.selectedStep === 4 || this.selectedStep === 5) return;

			this.goToStep(step);
		},
		matchSelectedStep(step) {
			if (this.selectedStep === step) {
				return true;
			}

			return false;
		},
		// called by button click
		initRegister() {
			if (this.initRegisterLocked) return;

			this.initRegisterLocked = true;
			this.signUp(this.newUser.email, this.newUser.password, {
				userType: '' + (this.userMode + 1),
				firstName: this.newUser.firstName,
				lastName: this.newUser.lastName,
				country: this.userDetails.country.countryCode.toString(),
				industry:
					this.userMode === 0
						? ''
						: this.userDetails.industry.id.toString(),
				genre: this.userDetails.genre.id.toString(),
				companyArtistName: this.userDetails.companyArtistName.toString(),
			});
		},
		confirmRegister() {
			if (this.confirmationCode.length === 6) {
				if (this.userMode === 0) {
					// ARTIST
					this.confirmSignUp(this.confirmationCode, {
						userType: '' + (this.userMode + 1),
						firstName: this.newUser.firstName,
						lastName: this.newUser.lastName,
						country: this.userDetails.country.countryCode.toString(),
						industry: '',
						genre: this.userDetails.genre.id.toString(),
						companyArtistName: this.userDetails.companyArtistName.toString(),
					});
				} else {
					// MANAGER
					this.confirmSignUp(this.confirmationCode, {
						userType: '' + (this.userMode + 1),
						firstName: this.newUser.firstName,
						lastName: this.newUser.lastName,
						country: this.userDetails.country.countryCode.toString(),
						industry: this.userDetails.industry.id.toString(),
						genre: this.userDetails.genre.id.toString(),
						companyArtistName: this.userDetails.companyArtistName.toString(),
					});
				}
			}
		},
		/*---- COGNITO FUNCTIONS ----*/
		signUp(
			username: string,
			password: string,
			clientMetadata: any,
			attributeList: CognitoUserAttribute[] = [],
			validationData: CognitoUserAttribute[] = []
		) {
			userPool.signUp(
				username.trim(),
				password.trim(),
				attributeList,
				validationData,
				(err, result) => {
					if (err) {
						this.userDetailsErrorMessage =
							'User with this email already exists.';

						return;
					}

					this.currentUser = result.user;
					this.stepUp();
				},
				{
					userType: clientMetadata.userType,
					name: clientMetadata.companyArtistName,
					firstName: clientMetadata.firstName,
					lastName: clientMetadata.lastName,
					countryID: clientMetadata.country,
					industryID: clientMetadata.industry,
					genreID: clientMetadata.genre,
				}
			);

			//this.initRegisterLocked = false;
		},
		confirmSignUp(code: string) {
			this.currentUser.confirmRegistration(code, true, (err, result) => {
				if (err) {
					this.confirmationCodeErrorMessage = err.message;

					return;
				}

				this.stepUp();
				//window.location.href = 'http://app.democharts.org';
			});
		},
		/*resendConfirmationCode() {
			this.currentUser.resendConfirmationCode((err, result) => {
				if (err) {
					alert('Simon mach error handeling');
					console.log(err);
				}
				// mach was mit result
				console.log(result);
			});
		},*/
	},
	/*---- FORM VALIDATION ----*/
	validations: {
		newUser: {
			firstName: {
				required,
				minLength: minLength(3),
			},
			lastName: {
				required,
				minLength: minLength(2),
			},
			email: {
				required,
				email,
				minLength: minLength(4),
			},
			password: {
				required,
				minLength: minLength(8),
				passwordComplexity,
			},
			repeatPassword: {
				required,
				minLength: minLength(8),
				sameAsPassword: sameAs('password'),
				passwordComplexity,
			},
			validationGroup: [
				'newUser.firstName',
				'newUser.lastName',
				'newUser.email',
				'newUser.password',
				'newUser.repeatPassword',
			],
		},
		userDetails: {
			industry: {
				requiredForManager,
			},
			country: {
				required,
			},
			genre: {
				required,
			},
			validationGroup: [
				'userDetails.industry',
				'userDetails.country',
				'userDetails.genre',
			],
		},
	},
});
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';

.vs__dropdown-toggle {
	background-color: transparent;
	border: none;
	border-bottom: 1px solid #70707080;
	border-radius: 0px;

	input {
		color: #70707080;
	}
}

.vs__selected {
	color: white;
}

.vs__clear {
	display: none;
}

.vs__open-indicator {
	fill: $red;
}

.vs__dropdown-option {
	color: white !important;
}

.vs__dropdown-menu {
	background-color: #c0c0c0;

	overflow-x: hidden;

	&::-webkit-scrollbar {
		width: 0px;
	}
}
</style>

<style scoped lang="scss">
// TRANSITIONS
.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s ease-in-out;
	filter: blur(0px);
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
	filter: blur(8px);
}

#carousel-wrapper {
	width: 100%;
	//max-width: 800px;

	height: calc(100vh - 84px);
	min-height: 666px;

	font-family: 'Josefin Sans', sans-serif;

	border-radius: 28px;

	//overflow-y: scroll;

	&.smallbox {
		//height: 50vh !important;
	}
}

#user-type-selector-wrapper {
	width: 100%;
	height: 100%;

	padding: 8px;
}

#invite-code-outer-wrapper {
	width: 100%;
	height: 100%;
}

#invite-code {
	align-items: flex-start;
	@include padding-left(4rem);
	@include padding-right(4rem);

	h1 {
		&.primary {
			@include font-size(3.5rem);
		}

		&.white {
			@include font-size(3.5rem);
			@include margin-top(1rem);
		}
	}

	div {
		@include font-size(1.125rem);
		@include margin-top(2rem);
	}

	div > a {
		text-decoration: none;
	}

	#invite-code-wrapper {
		@include margin-top(3rem);

		input {
			border: none;
			border-radius: 2rem;
			padding: 1rem 2rem;
			text-align: center;

			@include font-size(1.25rem);
		}

		#invite-code-checkmark {
			@include margin-left(2rem);

			background-color: white;
			border-radius: 100%;

			width: 3rem;
			height: 3rem;

			img {
				width: 1.6rem;
				height: 1.6rem;
			}

			.spinner {
				margin-top: 0px;

				width: 80%;
				height: 80%;
			}
		}
	}

	span {
		display: inline-block;

		@include margin-top(1rem);
	}
}

#user-type-selector {
	& > * {
		width: 100%;
	}

	h1 {
		&.primary {
			@include font-size(3rem);
		}

		&.white {
			@include font-size(3rem);
			@include margin-top(1rem);
		}
	}

	span {
		display: inline-block;
		@include margin-top(2rem);
	}

	#user-type-button-wrapper {
		@include margin-top(4rem);
		justify-content: space-evenly;
	}
}

#register-frame {
	height: 100%;
	width: 100%;
	max-width: 800px;

	overflow-x: hidden;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;

	#register-wrapper {
		display: flex;
		flex-direction: row;

		width: 400%;
		height: calc(100% - 32px);

		transition: margin 0.2s cubic-bezier(0.89, 0, 0.87, 1);
		margin-left: var(--offset-left);

		.slide {
			width: calc(100% / 4);
			padding: 40px;

			.next {
				justify-content: flex-end;
				align-items: flex-end;

				margin-right: 20px;
				height: 3rem;

				width: 100%;

				&.disabled > * {
					//color: rgba(112, 112, 112, 1);
				}

				span {
					text-transform: uppercase;
				}

				.primary {
					margin-left: 10px;
				}
			}

			.header-wrapper h1 {
				text-align: center;
			}

			.input-wrapper {
				width: 100%;
				display: grid;
				grid-template-columns: 35% 60% 5%;

				align-self: end;

				label {
					text-transform: uppercase;

					display: flex;
					align-items: flex-end;

					@include font-size(1.25rem);
				}

				input {
					color: white;
					border: none;
					border-bottom: 1px solid #70707080;
					background: transparent !important;

					font-family: 'Josefin Sans', sans-serif !important;
					font-weight: 600;
					@include font-size(1.25rem);
				}

				img {
					height: 12px;
					margin-left: auto;
				}
			}

			#error-next-wrapper {
				justify-content: space-between;
				@include margin-top(2rem);

				width: 100%;
				min-height: 1.25rem;
			}

			#error-next-message {
				width: 100%;

				span {
					color: var(--text-color);
					transition: color 0.5s ease-in-out;
				}
			}

			&:nth-of-type(1) {
				.input-wrapper {
					@include margin-top(1.4rem);

					&:nth-of-type(2) {
						@include margin-top(2rem);
					}

					&:nth-of-type(4) {
						@include margin-top(2.4rem);
					}
				}
			}

			&:nth-of-type(2) {
				.input-wrapper {
					@include margin-top(1.6rem);
				}

				.spinner {
					@include margin-top(1rem);

					height: 3rem;
					width: 3rem;
				}
			}

			&:nth-of-type(3) {
				& > span {
					@include font-size(1.25rem);
					@include margin-top(2rem);

					min-height: 1.25rem;

					width: 100%;
				}

				.input-wrapper {
					@include margin-top(2rem);
				}
			}

			&:nth-of-type(4) {
				align-items: flex-start;

				.header-wrapper {
					align-items: flex-start;

					h1 {
						@include font-size(2.4rem);
					}
				}

				#welcome-banner {
					@include font-size(2rem);
					@include margin-top(2rem);
					@include margin-bottom(1rem);
				}

				& > span {
					line-height: 1.4;
					@include font-size(1.25rem);
					@include margin-top(1rem);
				}
			}
		}
	}

	#pagination-points {
		height: 32px;
		width: 100%;

		align-items: flex-start;

		div {
			width: 14px;
			height: 14px;
			border-radius: 100%;

			background-color: $red;

			margin-left: 28px;

			transition: background-color 0.2s cubic-bezier(0.89, 0, 0.87, 1);

			&:nth-of-type(1) {
				margin-left: 0px;
			}

			&.active {
				background-color: white;
			}

			&:hover {
				cursor: pointer;
			}
		}
	}
}

//----MOBILE STYLEZ----//
@media screen and (max-width: 768px) {
	#carousel-wrapper > * {
		min-height: 420px;
	}

	#carousel-wrapper {
		margin-top: 0px;
		min-height: 420px;

		&.smallbox {
			height: calc(100vh - 16px - 84px) !important;
			min-height: unset;
		}

		#register-frame {
			overflow-y: scroll;
			height: calc(100% - 32px - 84px);

			#register-wrapper {
				height: calc(100% - 32px - 84px);

				.slide {
					padding: 24px;

					.next {
						height: 20px;
					}

					.input-wrapper {
						grid-template-columns: auto 20px;
						grid-template-rows: auto auto;

						label {
							@include font-size(0.8rem);
							grid-area: 1 / 1 / 1 / 2;
						}

						input,
						.v-select {
							@include margin-top(0.2rem);
							@include font-size(1rem);
							grid-area: 2 / 1 / 2 / 1;
						}

						img {
							grid-area: 2 / 2 / 2 / 2;
							align-self: center;
						}
					}

					#error-next-wrapper {
						min-height: 2.5rem;
					}

					.header-wrapper {
						& > h1 {
							@include font-size(1.4rem);
							line-height: 1.4;
						}
					}

					&:nth-of-type(1) {
						.input-wrapper {
							@include margin-top(1rem);

							&:nth-of-type(2) {
								@include margin-top(2rem);
							}

							&:nth-of-type(4) {
								@include margin-top(2rem);
							}
						}
					}

					&:nth-of-type(2),
					&:nth-of-type(3) {
						.input-wrapper {
							grid-template-columns: 100%;
							@include margin-top(3.5rem);
						}
					}

					&:nth-of-type(4) {
						#welcome-banner {
							@include font-size(1.6rem);
						}

						#we-believe {
							display: none;
						}
					}
				}
			}

			#pagination-points {
				height: 32px;
			}
		}
	}
}
</style>
