import {
	Directive,
	OnChanges,
	Input,
	Optional,
	SimpleChanges,
} from '@angular/core';
import { ModalRef } from '../components/modal/ModalRef';

@Directive({
	selector: '[modal-title]',
	host: {
		class: 'modal-title',
	},
})
export class ModalTitleDirective {
	constructor() {}
}

@Directive({
	selector: '[modal-content]',
	host: {
		class: 'modal-content',
	},
})
export class ModalContentDirective {
	constructor() {}
}

@Directive({
	selector: '[modal-actions]',
	host: {
		class: 'modal-actions',
	},
})
export class ModalActionsDirective {
	constructor() {}
}

@Directive({
	selector: '[modal-close]',
	host: {
		'class': 'modal-close',
		'(click)': 'close($event)',
		'[attr.type]': 'type',
	},
})
export class ModalCloseDirective implements OnChanges {
	/** Default to "button" to prevents accidental form submits. */
	@Input() type: 'submit' | 'button' | 'reset' = 'button';

	/** Dialog close input. */
	@Input('mat-dialog-close') dialogResult: any;

	@Input('matDialogClose') _matDialogClose: any;

	constructor(
		// The dialog title directive is always used in combination with a `MatDialogRef`.
		// tslint:disable-next-line: lightweight-tokens
		@Optional() public modalRef: ModalRef
	) {}

	ngOnChanges(changes: SimpleChanges) {
		const proxiedChange =
			changes['_matDialogClose'] || changes['_matDialogCloseResult'];

		if (proxiedChange) {
			this.dialogResult = proxiedChange.currentValue;
		}
	}

	close(event: MouseEvent) {
		this.modalRef.close(null);
	}
}
