<template>
	<div class="container-survey-start">
		<div class="survey_container_left">
			<img src="@/assets/bg/baby_bundle_1.jpg">
		</div>

		<div class="survey_container_right">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "SurveyWithImage",
}
</script>

<style scoped lang="scss">

.container {
	display: flex;
}

.survey_container_left {
	height: 100vh;
	width: 40%;


	@include respondTo(mobile) {
		width: 100%;
		height: 300px;
	}

}

.survey_container_left > img {
	width: 100%;
	height: 100%;
	object-fit: cover;

	@include respondTo(mobile) {
		object-position: 30% 20%;
	}
}

.survey_container_right {
	display: flex;
	flex-direction: column;
	margin: 200px 0px 0px 40px;
	width: 60%;



	@include respondTo(mobile) {
		width: unset;
		padding-left: 28px;
		margin: 0;
		padding-top: 32px;
		padding-right: 28px;
	}
	/*justify-content: center;*/
}
h1 {
	color: white;
	font-size: 35px;
	line-height: 120%;

}

h1 > span {
	color: red;
}

.survey_start_text {
	color: white;
	margin: 10px 10% 0 0;
}

.survey_start_info {
	margin-top: 10px;
	margin-bottom: 20px;
	justify-content: center;
}

.survey_start_infobox {
	display: flex;
	margin-top: 10px;
	align-items: center;

}

.survey_start_infobox > p {
	color: white;
	margin: 10px 0 0 10px;
	font-weight: bold;

}

.survey_start_infobox > img {
	width: 25px;
}

.container-survey-start {
	min-height: 100vh;
	display: flex;
	padding-bottom: 24px;

	@include respondTo(mobile) {
		display: block;
	}
}


</style>
