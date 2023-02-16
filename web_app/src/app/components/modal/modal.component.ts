import { Component, OnInit } from '@angular/core';
import { ModalRef } from './ModalRef';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
	content: any;
	context;

	constructor(private ref: ModalRef) {}

	close() {
		this.ref.close(null);
	}

	ngOnInit() {
		this.content = this.ref.content;
	}
}
