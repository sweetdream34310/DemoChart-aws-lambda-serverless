<template>
	<SurveyWithImage>
		<h1>Congratulations 🎉 <br/> <span class="red_content"> You're Done. </span> </h1>

		<div class="survey_start_text">Thank you so much for participating in our survey. You helped us to improve Democharts and thats awesome. Click on the button to claim your well-deserved gift.
		</div>

		<div v-if="page === 'start'" class="survey_start_info">
		<div class="survey_start_infobox">
				<img src="@/assets/bg/Survey_Check.png">
				<p> Anonymous Data Stored Successfully </p>
			</div>
			<!-- 	<div class="survey_start_infobox">
				<img src="@/assets/bg/Survey_Check.png">
				<p> For the survey results contact hello@democharts.org</p>
			</div> -->

			<a target="_blank" href="https://we.tl/t-EwbkyyZuuW" class="button_survey" style="text-decoration:none">Download the free pack</a>

			<!-- <DButton class="button_survey" :on-click="() => page = 'claim_survey_data'" primarysolid>Download the free pack</DButton>
			{{ page }} -->
		</div>

		<div v-else-if="page === 'claim_survey_data'">

			<BasicRegisterStep
				:isValid="user.name && user.company && isEmailFormatValid"
				:button-text="'Submit'"
				@goNext="submitPersonalData"
			>
			<!--	<h1 class="step-title white">Please enter your Data.</h1>
				 <p class="step-description white">Only a few steps to go until you can deploy your loved survey.</p> -->

				<TextRegisterInput
				class="TextRegisterInput"
					darkMode
					v-model="user.name"
					:label="'Your Full Name'"
					:placeholder="'Full Name'"></TextRegisterInput>
				<TextRegisterInput
					darkMode
					v-model="user.company"
					:label="'Company Name'"
					:placeholder="'Company'"></TextRegisterInput>
				<TextRegisterInput
					darkMode
					v-model="user.email"
					:type="'email'"
					:is-valid-custom="isEmailFormatValid"
					:label="'Your E-Mail Address'"
					:placeholder="'E-Mail Address'"
				></TextRegisterInput>
			</BasicRegisterStep>

		</div>
		<div v-if="page === 'personal_data_submitted'" class="thanks">
			<h1>Thanks, data received!</h1>
		</div>
	</SurveyWithImage>
</template>

<script>
import DButton from "@/components/DButton";
import SurveyWithImage from "@/components/survey/SurveyWithImage";
import BasicRegisterStep from "@/components/register/BasicRegisterStep";
import TextRegisterInput from "@/components/register/TextRegisterInput";
export default {
	name: "SurveyStart",
	components: {TextRegisterInput, BasicRegisterStep, SurveyWithImage, DButton},
	data() {
		return {
			page: 'start',
			user: {
				email: '',
				name: '',
				company: ''
			}
		}
	},
	computed: {
		isEmailFormatValid() {
			return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.user.email))
		},
	},
	methods: {
		submitPersonalData() {
			this.page = 'personal_data_submitted';
			this.$emit('submitData', this.user)

		}
	}
}
</script>

<style scoped>

.button_survey {
	color: white;
	padding: 15px 30px 15px 30px !important;
	margin-top: 30px;
	background-color: #e73939;
	border-radius: 100px;
	transition: 200ms ease-in-out;
}

.button_survey:hover {
	transform: scale(1.03);
}

.button {
	margin-top: 20px;
}

.red_content {
	color: #e73939
}

.TextRegisterInput {
	margin-top: 20px;
	line-height: 150%;
}

.thanks {
	margin-top:20%;
}

</style>


