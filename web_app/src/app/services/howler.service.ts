import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { BehaviorSubject } from 'rxjs';
import { interval } from 'rxjs';

export interface StreamState {
	playing: boolean;
	duration: number;
	currentTime: number;
	loaded: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class HowlerService {
	howl: Howl;
	streamState$ = new BehaviorSubject<StreamState>({
		playing: false,
		duration: 0,
		currentTime: 0,
		loaded: false,
	});

	constructor() {}

	loadSong(url: string) {
		this.howl?.pause();
		this.howl = new Howl({
			autoplay: true,
			src: [url],
			html5: true,
		});
		this.howl = this.howl.on('load', () => this.onLoaded());
	}

	togglePlay() {
		if (this.howl.playing()) {
			this.howl.pause();
		} else {
			this.howl.play();
		}
	}

	onLoaded() {
		// this.howl.pause();
		// this.howl.play();
		interval(100).subscribe(() => {
			this.streamState$.next({
				playing: this.howl.playing(),
				duration: this.howl.duration(),
				currentTime: this.howl.seek() as number,
				loaded: true,
			});
		});
	}

	pause() {
		this.howl?.pause();
	}
}
