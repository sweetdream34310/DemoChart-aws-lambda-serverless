import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AudioCuttingService } from 'src/app/services/audio-cutting.service';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';

@Component({
	selector: 'app-waveform',
	templateUrl: './waveform.component.html',
	styleUrls: ['./waveform.component.scss'],
})
export class WaveformComponent implements AfterViewInit, OnDestroy {
	@Input() url: string;
	@Input('file') set setFile(file: File | Blob) {
		this.file = file;

		// If file input changes reload waveform
		if (this.wavesurfer) {
			this.loading = true;
			this.pause();
			this.loadSource();
		}
	}
	file: File | Blob;
	@Input() selectable = false;
	@Input() progress = false;
	@Output() component: EventEmitter<WaveformComponent> = new EventEmitter();
	@ViewChild('waveform') waveform: ElementRef;
	playing = new BehaviorSubject<boolean>(false);

	wavesurfer: WaveSurfer;
	region: RegionsPlugin;
	loading = true;

	constructor(private ngZone: NgZone, private cut: AudioCuttingService) {}

	ngOnDestroy(): void {
		this.pause();
	}

	ngAfterViewInit() {
		this.wavesurfer = WaveSurfer.create({
			container: this.waveform.nativeElement,
			// backend: 'MediaElement',
			waveColor: 'white',
			progressColor: '#f15d5c',
			barGap: 6,
			barWidth: 3,
			barHeight: 0.7,
			barRadius: 2,
			responsive: true,
			interact: true,
			hideScrollbar: true,
			plugins: this.selectable ? [RegionsPlugin.create({})] : [],
		});

		if (this.selectable) {
			this.region = this.wavesurfer.addRegion({
				start: 10,
				end: 70,
				resize: false,
				color: '#5aff5da8',
			});

			this.region.on('update-end', () => {
				this.wavesurfer.pause();
				this.playing.next(false);
			});
		}

		this.wavesurfer.on('ready', () => {
			this.ngZone.run(() => (this.loading = false));
		});

		this.wavesurfer.on('finish', () => {
			this.playing.next(false);
		});

		this.loadSource();

		this.component.emit(this);
	}

	private loadSource() {
		if (this.file) {
			this.wavesurfer.loadBlob(this.file);
			// this.wavesurfer.load(URL.createObjectURL(this.file));
		} else if (this.url) {
			this.wavesurfer.load(this.url);
		}
	}

	togglePlay(): boolean {
		if (this.wavesurfer.isPlaying()) {
			this.wavesurfer.pause();
			this.playing.next(false);
			return false;
		} else {
			this.selectable ? this.region.play() : this.wavesurfer.play();
			this.playing.next(true);
			return true;
		}
	}

	pause(): void {
		this.wavesurfer.pause();
		this.playing.next(false);
	}

	play(): void {
		this.selectable ? this.region.play() : this.wavesurfer.play();
		this.playing.next(true);
	}

	replay(): void {
		this.wavesurfer.play(0);
		this.playing.next(true);
	}

	getEncodedBuffer(): Observable<Blob> {
		const { start, end } = this.region;
		const buffer = this.wavesurfer.backend.buffer;
		return this.cut.encodeAudio(buffer, start, end);
	}

	getSeconds(): number {
		return this.wavesurfer.getCurrentTime();
	}
}
