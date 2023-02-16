import { Component, OnInit } from '@angular/core';
import { ModalRef } from '../modal/ModalRef';

@Component({
	selector: 'app-logout-modal',
	templateUrl: './logout-modal.component.html',
	styleUrls: ['./logout-modal.component.scss'],
})
export class LogoutModalComponent implements OnInit {
	constructor(public modalRef: ModalRef) {}

	ngOnInit(): void {}
}
