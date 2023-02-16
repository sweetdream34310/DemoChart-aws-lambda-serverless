import { Injectable } from '@angular/core';
import { Toast } from '../types/Toast';
import { Store } from '@ngxs/store';
import { AddToast } from '../state/app.actions';
import { ToastsComponent } from '../components/toasts/toasts.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(private store: Store, private overlay: Overlay) {
		const positionStrategy = this.overlay
			.position()
			.global()
			.centerHorizontally()
			.bottom();
		const overlayRef = this.overlay.create({
			positionStrategy,
			minWidth: 320,
		});

		const toasts = new ComponentPortal(ToastsComponent);
		overlayRef.attach(toasts);
	}

	addToast(content: string, style?: 'error' | 'info' | 'success'): void {
		this.store.dispatch(new AddToast(new Toast(content, style)));
	}
}
