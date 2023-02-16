import { Component, OnInit } from '@angular/core';
import { ModalRef } from '../modal/ModalRef';

@Component({
	selector: 'app-yes-no-modal',
	templateUrl: './yes-no-modal.component.html',
	styleUrls: ['./yes-no-modal.component.scss'],
})
export class YesNoModalComponent implements OnInit {
	constructor(public modalRef: ModalRef) {}

	ngOnInit(): void {}
}
