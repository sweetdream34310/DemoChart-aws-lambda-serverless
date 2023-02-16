import { Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';

export interface OverlayCloseEvent<R> {
	type: 'backdropClick' | 'close';
	data: R;
}

// R = Response Data Type, T = Data passed to Modal Type
export class ModalRef<R = any, T = any> {
	afterClosed$ = new Subject<OverlayCloseEvent<R>>();

	inputData: T;

	constructor(
		public overlay: OverlayRef,
		public content: any,
		public data: T
	) {
		overlay
			.backdropClick()
			.subscribe(() => this._close('backdropClick', null));

		this.inputData = data;
	}

	close(data?: R) {
		this._close('close', data);
	}

	private _close(type: 'backdropClick' | 'close', data: R) {
		this.overlay.dispose();
		this.afterClosed$.next({
			type,
			data,
		});

		this.afterClosed$.complete();
	}
}
