import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Toast } from 'src/app/types/Toast';
import { CloseToast } from 'src/app/state/app.actions';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import {
	trigger,
	state,
	style,
	transition,
	animate,
} from '@angular/animations';

@UntilDestroy()
@Component({
	selector: 'app-toasts',
	templateUrl: './toasts.component.html',
	styleUrls: ['./toasts.component.scss'],
	animations: [
		trigger('toastState', [
			state('fadeIn', style({ opacity: 1 })),
			transition('* => *', animate('500ms ease-in-out')),
		]),
	],
})
export class ToastsComponent implements OnInit, OnDestroy {
	@Select((state) => state.app.toasts) toasts$: Observable<Toast[]>;

	intervall = null;

	constructor(private store: Store) {}
	ngOnInit(): void {
		this.toasts$.pipe(untilDestroyed(this)).subscribe((res) => {
			clearTimeout(this.intervall);
			this.intervall = setTimeout(
				() => res.forEach((e) => this.dismss(e)),
				4000
			);
		});
	}

	ngOnDestroy(): void {
		clearTimeout(this.intervall);
	}

	dismss(toast: Toast) {
		this.store.dispatch(new CloseToast(toast));
	}
}
