<template>
	<Modal
		v-if="showModal"
		@close="closeModal()"
	>
		<div style="text-align: center">
			<h2 style="font-size: 36px">Wanna upload your<br />first demo for free?</h2>

			<p style="margin-top: 48px; margin-bottom: 12px"><strong>Free uploads available:</strong></p>

			<div class="digit-container">
				<div class="digit">{{ currentCounterArr.length > 3 && currentCounterArr[3] ? currentCounterArr[3] : '0' }}</div>
				<div class="digit">{{ currentCounterArr.length > 2 && currentCounterArr[2] ? currentCounterArr[2] : '0' }}</div>
				<div class="digit">{{ currentCounterArr.length > 1 && currentCounterArr[1] ? currentCounterArr[1] : '0' }}</div>
				<div class="digit">{{ currentCounterArr.length > 0 && currentCounterArr[0] ? currentCounterArr[0] : '0' }}</div>
			</div>
		</div>

		<div class="cta-container">
			<DButton primarysolid link="/apply?origin=modal">Apply now</DButton>
		</div>
	</Modal>
</template>

<script>
import Cookies from 'js-cookie';
import Modal from "~/components/Modal";
import DButton from "~/components/DButton";
export default {
	name: "Counter",
	components: {DButton, Modal},
	data() {
		return {
			counter: -1,
			counterMax: -1,
			showModal: false,
			currentCounter: -1,
			interval: undefined,
			currentCounterArr: [],
		}
	},
	methods: {
		async getCount(){
			const res = await fetch(this.$config.API_BASE_PATH + '/dashboard/getAdminConfig', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				mode: "cors",
				body: JSON.stringify({ key: 'landingpage_counter' }),
			});
			return res.json();
		},
		async getCountMax(){
			const res = await fetch(this.$config.API_BASE_PATH + '/dashboard/getAdminConfig', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				mode: "cors",
				body: JSON.stringify({ key: 'landingpage_counter_max' }),
			});
			return res.json();
		},
		countdown() {
			this.currentCounter -= Math.round((this.counterMax - this.counter) / 100);

			if (this.currentCounter <= this.counter) {
				this.currentCounter = this.counter;
				clearInterval(this.interval)
			}

			const str = this.currentCounter.toString().split("").reverse();
			this.currentCounterArr = str.map(x => parseInt(x));

		},
		startCountdown() {
			/**
			 * 100 iterations within 3 seconds
			 */
			console.log("startCountdown");
			this.interval = setInterval(this.countdown, 2*1000 / 100);
		},
		closeModal() {
			Cookies.set('free_uploads_left_popup_shown', true, { expires: 1 });
			this.showModal = false;

		}
	},
	async mounted() {
		const res = await this.getCount();
		const parsed = Number.parseInt(res);
		this.counter = Number.isNaN(parsed) ? -1 : res;

		const resMax = await this.getCountMax();
		const parsedMax = Number.parseInt(resMax);
		this.counterMax = Number.isNaN(parsedMax) ? -1 : resMax;

		this.currentCounter = this.counterMax;

		console.log("----------------------------")
		console.log(resMax)
		console.log(res)
		console.log(typeof res)

		if (!Cookies.get('free_uploads_left_popup_shown')) {
			setTimeout(() => {
				this.showModal = true;
				this.startCountdown();

			}, 60000)
		}
	}
}
</script>

<style scoped lang="scss">

	.digit-container {
		display: flex;
		margin: auto;
		justify-content: center;
	}

	.digit {
		background: #efefef;
		color: black;
		width: 64px;
		height: 64px;
		align-items: center;
		display: flex;
		justify-content: center;
		border-radius: 50%;
		margin: 2px;
		font-size: 36px;
		font-weight: 900;
	}

	.cta-container {
		margin-top: 48px;
		display: flex;
		justify-content: center;
	}

</style>
