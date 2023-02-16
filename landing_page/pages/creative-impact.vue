<template>
	<div id="outer-wrapper" class="flex vert">
		<div id="main-wrapper" class="flex vert">
			<span id="heading" class="font">
				AWS Creative Impact? Perfekt.<br /><br />
			</span>

			<span class="font alt"
				>Wir haben da etwas für euch...<br /><br />
				Hier ein 3 Minuten Zusammenschnitt<br />
				vom Democharts Team und unser<br />
				Jahr bei AWS First.<br />
				<br /><br />
				Außerdem: unveröffentlichte Werbespots und mehr</span
			>

			<iframe
				id="youtube-embed"
				width="560"
				height="315"
				src="https://www.youtube-nocookie.com/embed/IM4HfNJ6GsM"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style scoped lang="scss">
#logo {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 20%;
	height: auto;

	display: block;

	margin-top: 64px;
	margin-left: 64px;

	z-index: 1337;

	img {
		width: 100%;
	}
}

#outer-wrapper {
	width: 100vw;
	height: 100vh;
}

#main-wrapper {
	width: 100%;
	height: 100%;

	background-image: url('../assets/lines/huge-lines.svg');
	background-size: cover;
	background-repeat: no-repeat;

	#heading {
		@include font-size(2rem);
	}

	span.font.alt {
		@include font-size(1.125rem);
	}

	#youtube-embed {
		@include margin-top(2rem);
	}

	& > * {
		text-align: center;
	}
}

//----MOBILE STYLEZ----//
@media screen and (max-width: 768px) {
	#logo {
		width: 100%;
		margin-top: 0px;
		margin-left: 0px;

		padding: 12px;

		justify-content: center;

		background-color: #fff;

		display: flex;
		justify-content: flex-start;
		align-items: center;

		img {
			width: 72%;
			max-width: 300px;
		}
	}

	#main-wrapper {
		padding: 0.6rem;
		padding-top: 64px;

		span.font.alt {
			text-align: left;
			@include font-size(1.05rem);
		}

		#youtube-embed {
			width: 100%;
		}
	}
}
</style>
