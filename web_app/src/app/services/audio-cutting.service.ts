import { Injectable } from '@angular/core';
import { fromEvent, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Injectable({
	providedIn: 'root',
})
export class AudioCuttingService {
	worker: Worker;

	constructor(private toast: ToastService) {
		this.worker = new Worker('./audio-cutting.worker', { type: 'module' });
	}

	encodeAudio(
		originalBuffer: AudioBuffer,
		start: number,
		end: number
	): Observable<Blob> {
		const sampleRate = originalBuffer.sampleRate;
		const channels = originalBuffer.numberOfChannels;

		if (channels !== 2) {
			this.toast.addToast(
				'Sorry, we only support audio with 2 channels',
				'error'
			);
			throw throwError('Number of channels is not 2');
		}

		// Create audio buffer for the 60sec segment
		const AudioContext =
			window.AudioContext || (window as any).webkitAudioContext;
		const newBuffer = new AudioContext().createBuffer(
			channels,
			Math.round(end - start) * sampleRate,
			sampleRate
		);

		// Cut the selected region out of the original mp3 and paste it into the new buffer
		for (let i = 0; i < originalBuffer.numberOfChannels; i++) {
			const oldChannelData = originalBuffer.getChannelData(i);
			const newChannelData = newBuffer.getChannelData(i);
			for (let j = 0; j < newChannelData.length; j++) {
				newChannelData[j] =
					oldChannelData[j + Math.round(start * sampleRate)];
			}
		}

		// Send input to worker
		this.worker.postMessage({
			sampleRate: originalBuffer.sampleRate,
			left: this.floatTo16BitPCM(newBuffer.getChannelData(0)),
			right: this.floatTo16BitPCM(newBuffer.getChannelData(1)),
		});

		// Worker has finished mp3 encoding
		return fromEvent<MessageEvent>(this.worker, 'message').pipe(
			map(({ data }) => new Blob(data as [], { type: 'audio/mp3' }))
		);
	}

	// Covert Flaot audio buffer to int buffer (WTF TBH)
	private floatTo16BitPCM(input) {
		const output = new Int16Array(input.length);
		for (let i = 0; i < input.length; i++) {
			const s = Math.max(-1, Math.min(1, input[i]));
			output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
		}
		return output;
	}
}
