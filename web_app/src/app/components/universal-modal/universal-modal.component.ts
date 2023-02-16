import { Component, OnInit } from '@angular/core';
import { ModalRef } from '../modal/ModalRef';
import {HttpService} from '../../services/http.service';
import {IFeedbackSubmit} from '../../types/FeedbackSubmit';
import {ToastService} from '../../services/toast.service';
import { observable, computed } from 'mobx-angular';

@Component({
	selector: 'app-universal-modal',
	templateUrl: './universal-modal.component.html',
	styleUrls: ['./universal-modal.component.scss'],
})
export class UniversalModalComponent implements OnInit {

	dropdownOptions: Array<string>;
	inputData: any;

	chosenCheckboxes: Array<string> = [];
	message: string;

	customInputData = '';
	feedbackSuccess = 'Success!';

	showValidationHint = false;

	constructor(
		public modalRef: ModalRef,
		private http: HttpService,
		private toast: ToastService
	) {}

	ngOnInit(): void {
		this.inputData = this.modalRef.inputData;

		this.dropdownOptions = this.modalRef.inputData.dropdownOptions;

		this.message = this.inputData.customInput?.messageValue;

		this.feedbackSuccess = this.inputData.feedbackSuccess ? this.inputData.feedbackSuccess : this.feedbackSuccess;
	}

	submitFeedback(): void {

		if (
			(this.dropdownOptions !== undefined && this.chosenCheckboxes.length === 0) || this.message.length === 0){
			this.showValidationHint = true;
			return;
		}

		const feedback: IFeedbackSubmit = {
			type: this.inputData.systemTitle,
			dropdownOptionsChosen: this.chosenCheckboxes,
			additionalMessage: this.message + (this.inputData.customInput ? '|| E-Mail: ' + this.inputData.customInput.value : ''),
			systemInformation: this.inputData.systemInformation,
		};

		this.http.submitFeedback(feedback).subscribe((res) => {

			this.toast.addToast(this.feedbackSuccess, 'success');
		}, (error) => {
			this.toast.addToast('Unfortunately, there was an error submitting this form', 'error');
		} );
		this.modalRef.close(true);
	}

	toggleOption(toggleItem: string) {
		const found = this.chosenCheckboxes.find(el => el === toggleItem);
		if (found) {
			this.chosenCheckboxes = this.chosenCheckboxes.filter(el => el !== toggleItem);
		} else {
			this.chosenCheckboxes.push(toggleItem);
		}
	}

	@computed get isValid() {

		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return (
			(this.dropdownOptions === undefined || (this.chosenCheckboxes !== undefined && this.chosenCheckboxes.length > 0))
			&& (this.message && this.message.length > 0)
			&& (
				this.inputData.customInput === undefined
				|| (
					this.inputData.customInput.type === 'email'
					&& (re.test(this.inputData.customInput.value.toLowerCase()))
				)
				|| (
					this.inputData.customInput.type !== 'email'
					&& this.inputData.customInput.value.length > 0
				)
			)
		);
	}
}

