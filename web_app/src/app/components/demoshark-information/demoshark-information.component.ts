import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-demoshark-information',
  templateUrl: './demoshark-information.component.html',
  styleUrls: ['./demoshark-information.component.scss']
})
export class DemosharkInformationComponent implements OnInit {

	@Input() text: string;
	@Input() buttonText: string;
	@Output() buttonClicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
  	this.buttonClicked.emit();
	}
}
