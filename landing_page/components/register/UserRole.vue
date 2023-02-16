<template>
	<div class="role-container">
		<div>
			<h1 class="title">
				<div class="areYou">Are you an</div>
				<div class="expertOrArtist">
					<DButton :onClick="() => setRole('artist')" neutral class="role-button artist-button">artist</DButton>
					<span>or</span>
					<DButton :onClick="() => setRole('expert')" neutral class="role-button">expert</DButton>
					<span>?</span>
				</div>
			</h1>
			<div>Only a few steps to go until you're onboarded.</div>

		</div>
	</div>
</template>

<script>
import DButton from "../DButton";
export default {
	name: "UserRole",
	components: {DButton},
	methods: {
		setRole(role) {
			this.$emit('onRoleSet', role);
		}
	},
}
</script>

<style scoped lang="scss">
	.role-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 32px;
		font-size: 96px;

		@include respondTo(laptop) {
			display: block;
			font-size: 64px;
		}

		@include respondTo(mobile) {
			display: block;
			font-size: 36px;
		}
	}
	.role-button {
		margin: 0 16px;
		font-size: 36px;

		@include respondTo(tablet){
			font-size: 24px;
			margin: 0 12px !important;
		}
	}

	.areYou {
		white-space: nowrap;

		@include respondTo(laptop) {
			display: block;
		}
	}

	.expertOrArtist {
		display: flex;
		align-items: center;
		justify-content: center;

		@include respondTo(mobile) {
			.artist-button {
				margin-left: 0 !important;
			}
		}
	}

</style>
