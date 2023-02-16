<template>
	<SurveyWithImage>
		<h1>Welcome to our <br /> <div class="title"> Music Industry Survey 2022 </div> </h1>

		<div class="survey_start_text">
		Be a part of our international music maker survey! Together we create an overview of future trends, expectations and predictions about the global music industry. <br /> <br /> This way we can develop smarter tools for newcomer artists and industry professionals, improve their daily lives and create value.
		</div>

		<div class="survey_start_info">
			<div class="survey_start_infobox">
				<img src="@/assets/bg/Survey_Check.png">
				<p> Duration 2-4 Min </p>
			</div>
			<div class="survey_start_infobox">
				<img src="@/assets/bg/Survey_Check.png">
				<p> No Sign-Up</p>
			</div>
			<div class="survey_start_infobox">
				<img src="@/assets/bg/Survey_Check.png">
				<p> 100% Anonymous </p>
			</div>
		</div>
		<DButton :on-click="() => $emit('start')" primarysolid>
			Start the Survey
		</DButton>
	</SurveyWithImage>
</template>

<script>
import DButton from "@/components/DButton";
import SurveyWithImage from "@/components/survey/SurveyWithImage";
export default {
	name: "SurveyStart",
	components: {SurveyWithImage, DButton}
}
</script>

<style scoped lang="scss">

	.survey_start_infobox {
		margin-bottom: 15px;
	}

	.survey_start_text {
		font-family: 'Open Sans', 'Josefin Sans', 'Sans-Serif';
	}

.title {
	color: #e73939;

	@include respondTo(mobile) {
		font-size: 28px;
		line-height: 30px !important;
		margin-bottom: 8px;
	}

}

</style>
