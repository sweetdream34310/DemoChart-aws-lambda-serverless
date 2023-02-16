<template>
	<div
		v-if="showMenu"
		id="navigation"
		class="flex"
		:class="[
			lightMode && isNavTransparent ? 'isOnTop' : '',
			lightMode ? '' : 'dark'
		]"
	>
		<div class="container nav-container">
			<div class="logo-wrapper">
				<nuxt-link id="logo" to="/" class="flex l">
					<img v-if="lightMode" src="@/assets/logo.svg" :class="currentRoute === '/experts' ? 'experts' : ''" />
					<img v-else src="@/assets/logo-white.svg" :class="currentRoute === '/experts' ? 'experts' : ''" />
				</nuxt-link>
			</div>

			<div
				v-if="isNavOpened || (!isMaxTabletScreen && isSetup)"
				class="navigation-items"
			>
				<div class="left">
					<DButton :link="'/'" flat :white="isNavTransparent" :on-click="closeNav">
						FOR ARTISTS
					</DButton>

					<DButton :link="'/experts'" flat :white="isNavTransparent" :on-click="closeNav" :hoverColor="'blue'">
						FOR EXPERTS
					</DButton>
				</div>

				<div class="right">
					<DButton :link="`${$config.APP_BASE_PATH}/login`" external flat :on-click="closeNav" :white="isNavTransparent">
						LOGIN
					</DButton>
					<DButton :link="'/apply'" flat :white="isNavTransparent" :on-click="closeNav">
						APPLY
					</DButton>
				</div>
			</div>

			<div class="toggle-nav" @click="isNavOpened = !isNavOpened">
				<div v-if="isNavOpened" class="close-icon" style="width: 32px; height: 32px; display: flex; align-items: center"><CloseIcon /></div>
				<div v-if="!isNavOpened" style="display: inline-flex"><MorePoints /></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import DButton from "~/components/DButton.vue";
import {DeviceDimensions} from "~/mixins/DeviceDimensions";
import MorePoints from "~/components/icons/MorePoints.vue";
import CloseIcon from "~/components/icons/CloseIcon.vue";
export default Vue.extend({
	name: 'Navigation',
	components: {CloseIcon, MorePoints, DButton},
	data: function () {
		return {
			onRegisterPage: false,
			isScrolledToTop: true,
			showMenu: true,
			isNavOpened: false,
			lightMode: true,
		};
	},
	mixins: [DeviceDimensions],
	computed: {
		currentRoute() {
			return this.$nuxt && this.$nuxt.$route.path
		},
		isNavTransparent() {
			return !this.isMaxTabletScreen && this.isScrolledToTop;
		},
	},
	mounted() {
		window.addEventListener('scroll', this.onScrolled);

		if (this.$route.path === '/register') {
			this.onRegisterPage = true;
		}

		this.$nuxt.$on('show-menu', (bool) => {
			this.showMenu = bool;
		})

		this.$nuxt.$on('set-navigation-color', (mode) => {
			this.lightMode = mode === 'light'
		});
	},
	beforeDestroy() {
		this.$nuxt.$off('show-menu');
		this.$nuxt.$off('set-navigation-color');
	},
	methods: {
		onScrolled() {
			this.isScrolledToTop = window.scrollY < 150;
		},
		closeNav() {
			console.log("TRIGGI")
			this.isNavOpened = false;
		}
	},
});
</script>

<style scoped lang="scss">
.container {
	display: flex;
}

.toggle-nav {
	display: none;
	position: absolute;
	top: 0;
	right: 32px;
	height: 100%;
	align-items: center;
	cursor: pointer;

	@include respondTo(tablet) {
		display: flex;
		right: 16px;
	}
}

#navigation {
	position: fixed;
	transition: 200ms background-color;
	z-index: 100;
	height: 84px;
	width: 100%;
	display: flex;
	top: 0;

	&.dark {
		background: black !important;
	}

	@include respondTo(mobile) {
		height: 64px;
	}

	background-color: #f9fafc;
	justify-content: space-between;

	.navigation-items {
		flex-grow: 1;
		display: flex;
		align-items: center;
		margin-left: 32px;

		.left {
			flex: 1;
		}

		.right {}


		@include respondTo(tablet) {
			flex-direction: column;
			justify-content: right;
			position: absolute;
			background: white;
			right: 0;
			top: 0;
			width: 100%;
			border-radius: 0 0 0 18px;
			box-shadow: $boxShadow;
			padding-top: 32px;

			.left, .right {
				display: contents;

				.button {
					padding: 24px;
				}
			}
		}
	}

	#logo {
		height: 38px;

		@include respondTo(mobile) {
			padding: 0;
		}

		img {
			height: 40px;
		}
	}
}


@include hasMinSize(tablet) {
	.isOnTop {
		&#navigation {
			background: none;
		}

		#logo img {
			width: 40px;
			object-fit: cover;
			object-position: left;
			/*transition: all 1s ease-out;*/
			/*height: 55px !important;*/
			/*filter: brightness(0) invert(1);*/

			&.experts {
				filter: sepia(50%) hue-rotate(224deg) saturate(366%) brightness(0.5);
			}
		}
	}
}

.close-icon {
	text-align: center;

	svg {
		height: 16px;
		width: 16px;
	}
}

.nav-container {
	align-items: center;
}

</style>
