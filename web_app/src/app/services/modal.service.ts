import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ModalRef } from '../components/modal/ModalRef';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	constructor(private overlay: Overlay, private injector: Injector) {}

	open<R = any, T = any>(content: any, data: T): ModalRef<R> {
		const configs = new OverlayConfig({
			positionStrategy: this.overlay
				.position()
				.global()
				.centerHorizontally()
				.centerVertically(),
			hasBackdrop: true,
			panelClass: ['modal', 'is-active'],
			// backdropClass: 'modal-background',
		});

		const overlayRef = this.overlay.create(configs);

		const myOverlayRef = new ModalRef<R, T>(overlayRef, content, data);

		const injector = this.createInjector(myOverlayRef, this.injector);
		overlayRef.attach(new ComponentPortal(ModalComponent, null, injector));

		return myOverlayRef;
	}

	createInjector(ref: ModalRef, inj: Injector) {
		const injectorTokens = new WeakMap([[ModalRef, ref]]);
		return new PortalInjector(inj, injectorTokens);
	}
}
