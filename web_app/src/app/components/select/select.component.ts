import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewContainerRef,
	TemplateRef,
	forwardRef,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import {
	FormControl,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { IKeyValue } from 'src/app/types/KeyValue';

export const SELET_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => SelectComponent),
	multi: true,
};

@UntilDestroy()
@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [SELET_VALUE_ACCESSOR],
})
export class SelectComponent implements OnInit, ControlValueAccessor {

	@Input() model: number;
	@Input() showValueInInput = true;
	@Input() dark: boolean = false;
	@Input() roundedBlack: boolean = false;
	@Input() placeholder: string = '';
	@Input() visibleOptions = 8;
	@Input('options') set setOptions(options: IKeyValue[]) {
		this.options = options;
		this.originalOptions = [...this.options];
		this.updateInputValue(this.model);
	}
	options: IKeyValue[] = [];

	@Output() closed = new EventEmitter();

	searchControl = new FormControl();

	private originalOptions: IKeyValue[] = [];
	private overlayRef: OverlayRef;

	// Required for ControlValueAccessor
	onChange;
	onTouched;

	constructor(private vcr: ViewContainerRef, private overlay: Overlay) {}

	ngOnInit() {
		if (this.model !== undefined) {
			this.model = this.options.find(
				(currentOption) => currentOption[0] === this.model
			)[0];
		}

		this.searchControl.valueChanges
			.pipe(debounceTime(300), untilDestroyed(this))
			.subscribe((term) => this.search(term));

		// Close dropdown when window looses focus
		window.onblur = () => {
			this.close();
		};
	}

	/**
	 * Searches and fitlers the options array
	 * @param value searchvalue
	 */
	search(value: string) {
		this.options = this.originalOptions.filter((option) =>
			option[1]?.toLocaleLowerCase().includes(value?.toLocaleLowerCase())
		);
		this.visibleOptions = this.options.length || 1;
	}

	/**
	 * Creates a dropdown below the origin element
	 * @param dropdown Template of the dropdown
	 * @param origin Origin HTML element
	 */
	open(origin: HTMLElement, dropdown: TemplateRef<any>) {
		this.searchControl.setValue('');
		this.overlayRef = this.overlay.create({
			scrollStrategy: this.overlay.scrollStrategies.reposition(),
			width: origin.clientWidth,
			hasBackdrop: true,
			height: 32 * 8,
			backdropClass: 'cdk-overlay-transparent-backdrop',
			positionStrategy: this.overlay
				.position()
				.flexibleConnectedTo(origin)
				.withDefaultOffsetY(10)
				.withPositions([
					{
						originX: 'start',
						originY: 'bottom',
						overlayX: 'start',
						overlayY: 'top',
					},
				]),
		});
		const dropdownPortal = new TemplatePortal(dropdown, this.vcr);
		this.overlayRef.attach(dropdownPortal);

		this.overlayRef
			.backdropClick()
			.pipe(untilDestroyed(this))
			.subscribe(() => this.close());
	}

	/**
	 * Called after a option in the dropdown has been selected
	 * @param option selected option
	 */
	select(option: IKeyValue) {
		this.close();
		this.model = option[0];

		if (this.showValueInInput) {
			this.searchControl.setValue(option[1]);
		}

		this.options = this.originalOptions;
		this.onChange(option[0]);
	}

	/**
	 * Closes the dropdown
	 */
	close() {
		this.closed.emit();
		this.overlayRef?.dispose();
	}

	/**
	 * Updates the value that's dispalyed in the input element
	 */
	updateInputValue(key: number) {
		const keyValue = this.originalOptions.find((e) => e[0] === key);
		if (keyValue) {
			this.searchControl.setValue(keyValue[1]);
		}
	}

	isActive(option) {
		if (!this.model) {
			return false;
		}
		return option[0] === this.model[0];
	}

	// Required for ControlValueAccessor
	writeValue(key: number): void {
		this.updateInputValue(key);
		this.model = key;
	}

	// Required for ControlValueAccessor
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	// Required for ControlValueAccessor
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	// Required for ControlValueAccessor
	setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) {
			this.searchControl.disable();
		} else {
			this.searchControl.enable();
		}
	}
}
