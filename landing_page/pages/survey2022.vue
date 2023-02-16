<template>
	<div>
		<div class="survey-wrapper">

			<SurveyStart
				v-if="activeQuestionId === -1"
				@start="nextActiveQuestion()"
			></SurveyStart>

			<div v-else-if="activeQuestionId !== -1 && activeQuestionId < survey.length " class="container">

				<Question
					v-for="(question, key) in survey"
					v-if="key === activeQuestionId"
					:question="question.question"
					:is-valid="question.selected.length > 0"
					@on-next="nextActiveQuestion()"
				>
					<SingleChoice
						v-if="question.mode === 'single-choice' || question.mode === 'multiple-choice'"
						v-model="question.selected"
						:is-single-mode="question.mode === 'single-choice'"
						:allowCustomInput="question.allowCustomInput"
						:answers="question.answers"
					></SingleChoice>

					<SurveyDropdown
						v-if="question.mode === 'dropdown'"
						v-model="question.selected"
						:answers="question.answers"
					></SurveyDropdown>

					<SurveyTextarea
						v-if="question.mode === 'textarea'"
						v-model="question.selected"
					></SurveyTextarea>
				</Question>
			</div>

			<SurveyEnd
				v-if="activeQuestionId >= survey.length"
				@submitData="user => submitPersonalData(user.name, user.company, user.email)"
			></SurveyEnd>

		</div>
	</div>
</template>

<script>
import Question from "~/components/survey/question";
import SingleChoice from "~/components/survey/SingleChoice";
import SurveyTextarea from "~/components/survey/SurveyTextarea";
import SurveyDropdown from "~/components/survey/SurveyDropdown";
import SurveyStart from "@/components/survey/SurveyStart";
import SurveyEnd from "@/components/survey/SurveyEnd";
export default {
	name: "survey2021",
	components: {SurveyEnd, SurveyStart, SurveyDropdown, SurveyTextarea, SingleChoice, Question},
	computed: {
	},
	data() {
		return {
			sentToBackend: false,
			activeQuestionId: -1,
			survey: [
				{
					question: 'Describe yourself:',
					mode: 'single-choice',
					allowCustomInput: true,
					answers: [
						'Singer-Songwriter',
						'Music Producer',
						'DJ',
						'Band',
						'Singer',
						'Rapper',
						'Hiphop-Producer',
						'Audio Engineer',
					],
					selected: [],
				},
					{
					question: 'What`s your age again?',
					mode: 'single-choice',
					allowCustomInput: true,
					answers: [
						'0 - 18',
						'19-24',
						'25-30',
						'31-49',
						'50+',
					],
					selected: [],
				},
				{
					question: 'How long have you been making music?',
					mode: 'single-choice',
					answers: [
						'0-3 Years',
						'4-10 Years',
						'11+ Years',
					],
					selected: [],
				},

				{
					question: 'Hobby or professional?',
					mode: 'single-choice',
					answers: [
						'I do it as a hobby',
						'I want to go pro',
						'I work as a professional artist',
					],
					selected: [],
				},
							{
					question: 'Where do you produce your music?',
					mode: 'single-choice',
					allowCustomInput: true,
					answers: [
						'On the go',
						'In my home studio',
						'In a professional studio',
					],
					selected: [],
				},
		
							{
					question: 'How about your team?',
					mode: 'single-choice',
					answers: [
						'I am signed to a label',
						'I have a professional manager',
						'My friends help me to promote my project',
						'Its only me, myself and I',
					],
					selected: [],
				},

				{
					question: 'What do you find most difficult?',
					mode: 'single-choice',
					allowCustomInput: true,
					answers: [
						'Recording',
						'Mixing and Mastering',
						'Getting featured on playlists',
						'Finding other artists to collaborate',
						'Music Promotion',
						'Finding a label',
						'Connecting and networking',
					],
					selected: [],
				},

					{
					question: 'I need help with this: (multi)',
					mode: 'multiple-choice',
					allowCustomInput: true,
					answers: [
						'Song Promotion',
						'Planing Music Videos',
						'Organizing Concerts',
						'Cover Art and Merch Design',
						'Dealmaking',
						'Networking',
						'Social Media',
					],
					selected: [],
				},

						{
					question: 'Pick your most important platform:',
					mode: 'single-choice',
					allowCustomInput: true,
					answers: [
						'Facebook',
						'Instagram',
						'Tiktok',
						'Twitter',
						'I don`t do socials'
					],
					selected: [],
				},

						{
					question: 'What keeps you from reaching the next level as an artist?',
					mode: 'textarea',
					selected: '',
				},

					{
					question: 'Where do you find people who support your project and help you grow?',
					mode: 'textarea',
					selected: '',
				},

					{
					question: 'Your opinion on record labels:',
					mode: 'single-choice',
					answers: [
						'I definitely need support by a record label',
						'100% selfmade - I dont need a label',
						'Im not sure'
					],
					selected: [],
				},

									{
					question: 'How much money do you invest in your music career every month?',
					mode: 'single-choice',
					answers: [
						'0-100$',
						'100-300$',
						'300-600$',
						'600-1.500$',
						'1.500-5.000$',
						'5.000$ +',
					],
					selected: [],
				},

						{
					question: 'What do you spend the money on? (multi)',
					mode: 'multiple-choice',
					allowCustomInput: true,
					answers: [
						'Equipment',
						'Sample Packs',
						'Music Promotion',
						'Graphic Design',
						'Videoproduction', 
						'Mixing and Mastering',
					],
					selected: [],
				},

				{
					question: 'What sources of income do you have as an artist? (multi)',
					mode: 'multiple-choice',
					allowCustomInput: true,
					answers: [
						'Royalties',
						'Live Gigs',
						'Creating Music for TV, Film & Advertising',
						'Merchandise', 
						'Selling Beats',
						'Session Artist',
						'Mixing and Mastering',
						'I dont have any income yet',
					],
					selected: [],
				},
			
		
					{
					question: 'I`m definitely interested in: (multi)',
					mode: 'multiple-choice',
					allowCustomInput: true,
					answers: [
						'NFTs: Letting friends and labels invest my music',
						'Selling song-licenses for TV, movie or advertising',
						'Mentoring other artists to earn money',
						'Matching with other newcomer artists to collaborate', 
					],
					selected: [],
				},

						{
					question: 'I would love to spend some money on: (multi)',
					mode: 'multiple-choice',
					allowCustomInput: true,
					answers: [
						'Mentoring calls with labels and a&rs',
						'Mentoring calls with pro artists',
						'Affordable freelancers for music promotion, A&R, videography or design',
						'Honestly written song feedback from record labels',
					],
					selected: [],
				},

					{
					question: 'What would make your life as a musician easier? ',
					mode: 'textarea',
					selected: '',
				},
					{
					question: 'Last Question: Apart from streaming and social media, what are your most used online platforms as an artist?',
					mode: 'textarea',
					selected: '',
				},
	
		
		






			]
		}
	},
	methods: {
		getSurveyToText() {
			let content = '';

			for (let question of this.survey) {
				const html = `<div><div>${question.question}</div><strong>${question.selected}</strong></div>`
				content += html;
			}

			return content;
		},
		submitSurvey() {

			this.$axios.post('/feedback/anonym', {
				subject: 'New Survey2021 received',
				type: 'Survey2021',
				content: this.getSurveyToText()
			})
		},
		submitPersonalData(fullName, company, email) {

			const content = `` +
				`<div>FullName: ${fullName}</div>` +
				`<div>Company: ${company}</div>` +
				`<div>Email: ${email}</div>` +
				`<div><br /></div>` +
				`<div>Content: (It's likely that you've already received an anonymous email for this)</div>` +
				`<div>${this.getSurveyToText()}</div>`

			this.$axios.post('/feedback/anonym', {
				subject: 'New Survey2021 - Personal Data',
				type: 'Survey2021 - (Personal Data)',
				content: content
			})
		},
		nextActiveQuestion() {
			this.activeQuestionId = this.activeQuestionId + 1;

			if (this.activeQuestionId >= this.survey.length && !this.sentToBackend){
				this.submitSurvey();
				this.sentToBackend = true;
			}
		}
	},
	mounted() {
		this.$nuxt.$emit('set-navigation-color', 'dark');
	},
	beforeDestroy() {
		this.$nuxt.$emit('set-navigation-color', 'light');
	}
}
</script>

<style scoped lang="scss">

.survey-wrapper {
	//padding-top: 200px;
	background: black;
	//min-height: calc( 100vh - 200px);
	width: 100vw;
	align-items: center;
	display: flex;
	min-height: 100vh;


	@include respondTo(mobile) {
		padding-top: 64px;
		display: block;
		box-sizing: border-box;
	}


}

</style>
