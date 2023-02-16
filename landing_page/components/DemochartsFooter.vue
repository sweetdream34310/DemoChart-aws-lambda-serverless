<template>

	<footer class="container">
		<client-only>
			<CookieBanner />
		</client-only>

		<div class="links">
			<div class="row">
				<a href="/imprint">
					Imprint
				</a>

				<a href="/imprint">
					Disclaimer
				</a>
			</div>

			<div class="row">
				<a href="/imprint">
					Contact & Support
				</a>

				<a href="/investors">
					For investors
				</a>
			</div>

		</div>
		<div class="aws-container">
			<a
				id="aws"
				class="flex vert"
				target="_blank"
				href="https://www.aws.at/aws-first-inkubator/"
			>
				<img src="@/assets/aws.svg" />
				<span class="secondary">
				</span>
			</a>
		</div>
	</footer>
</template>

<script>
import CookieBanner from "~/components/CookieBanner";
export default {
	name: "DemochartsFooter",
	components: {CookieBanner}
}
</script>

<style scoped lang="scss">

	footer {
		display: flex;

		.links {
			display: flex;
			align-items: center;
			font-weight: 900;
			flex: 1;

			a {
				text-decoration: none;
				color: black;
				margin: 16px;
			}

			.row {
				display: contents;
			}
		}
	}


	@include respondTo(tablet) {
		footer {

			display: flex;
			flex-direction: column-reverse;
			margin-bottom: 32px;

			.links {
				display: block;
				a {
					margin: 16px 0px;
				}


				.row {
					display: flex;
					width: 100%;

					a {
						flex: 1;
						text-align: center;
					}
				}
			}
		}
	}

	#aws {
		height: 120px;

		text-decoration: none;

		img {
			height: 80px;
		}

		span {
			margin-top: 10px;
			margin-bottom: 10px;

			font-family: sans-serif;
		}
	}


</style>
