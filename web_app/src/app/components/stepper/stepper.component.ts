import { Component, Input, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss'],
	providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper implements OnInit {
	@Input() header = false;

	maxLevel = 0;

	ngOnInit(): void {}

	onClick(index: number): void {
		if (index <= this.maxLevel) {
			this.selectedIndex = index;
		}
	}

	public goToNext(): void {
		if (!this.maxLevel || this.maxLevel < this.selectedIndex + 1){
			this.maxLevel = this.selectedIndex + 1;
		}

		this.next();
	}
}
