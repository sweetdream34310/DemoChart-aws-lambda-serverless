import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
	@Input() inDetails = false;
	@Output() inDetailsChange: EventEmitter<boolean> = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	details() {
		this.inDetailsChange.emit(!this.inDetails);
	}
}
