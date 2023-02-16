import {HostListener, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subject, fromEvent} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceDimensionsService implements OnDestroy {

	windowWidth = -1;
	windowHeight = -1;

	currentScreen;

	constructor() {
		this.handleResize();

		fromEvent(window, 'resize')
			.subscribe(() => {
				this.handleResize();
			});
	}

	ngOnDestroy(): void {
	}


	calcCurrentScreen() {
		if (this.windowWidth < 750) { return 'mobile'; }
		if (this.windowWidth >= 750 && this.windowWidth < 900) {return 'tablet'; }
		if (this.windowWidth >= 900 && this.windowWidth < 1024) {return 'laptop'; }
		if (this.windowWidth >= 1024) {return 'unlimited'; }
		return undefined;
	}

	handleResize() {
		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;

		this.currentScreen = this.calcCurrentScreen();
	}

	getCurrentScreen() {
		return this.currentScreen;
	}

}
