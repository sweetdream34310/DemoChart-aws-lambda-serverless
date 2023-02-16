import {
	Component,
	OnInit,
	ViewEncapsulation,
	Input,
	ElementRef,
} from '@angular/core';

@Component({
	selector: 'button[button-prim], button[button-sec], button[button-ter], button[button-kathrin], button[button-kathrin-grey], button[button-accent], button[button-icon]',
	host: { class: 'button' },
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
	@Input() set loading(loading: boolean) {
		this.elRef.nativeElement.disabled = loading;
		this.spinner = loading;
	}

	// @Input() disabled = false;

	spinner = false;

	constructor(private elRef: ElementRef) {
	}

	ngOnInit(): void {
		// this.elRef.nativeElement.disabled = this.disabled;
	}
}
