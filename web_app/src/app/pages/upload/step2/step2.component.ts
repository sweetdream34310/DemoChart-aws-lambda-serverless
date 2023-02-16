import { CdkStepper } from '@angular/cdk/stepper';
import { HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { EMPTY, interval, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { WaveformComponent } from 'src/app/components/waveform/waveform.component';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { SetDemoClip, SetSongID, SetTitle } from 'src/app/state/upload.actions';
import {UserStateModel} from "../../../state/user.state";
import {IProfile} from "../../../types/Profile";
import {StepperComponent} from "../../../components/stepper/stepper.component";

@UntilDestroy()
@Component({
	selector: 'app-step2',
	templateUrl: './step2.component.html',
	styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements AfterViewInit {
	@Select((state) => state.app.upload.demoFull) demoFull$: Observable<Blob>;

	@Select((state) => state.app.upload.title) title$: Observable<UserStateModel>;

	@Input() stepper: StepperComponent;
	@ViewChild('waveform') waveform: WaveformComponent;

	progress = 0;
	loading = false;
	playing = of(false);
	submitted = false;
	title = new FormControl('', [Validators.required, Validators.maxLength(35)]);

	faPlay = faPlay;
	faPause = faPause;

	constructor(
		private store: Store,
		private http: HttpService,
		private toast: ToastService
	) {

		this.title$.subscribe(el => {
			this.title.setValue(el);
		})

		this.title.valueChanges.subscribe(value => {
			this.store.dispatch(new SetTitle(value));
		});
	}

	ngAfterViewInit(): void {
		this.playing = this.waveform.playing;
	}

	togglePlay() {
		this.waveform.togglePlay();
	}

	encode() {
		this.submitted = true;
		this.waveform.pause();
		if (this.title.valid) {
			// this interval fakes the encoding progress
			// the mp3 encoding does not emit eny progress events so we fake the progress bar
			// we assume that an avearge encoding takes about 10 seconds (100ms * 100 times)
			// the encoding makes up the first 50% of the progress bar
			// the uploading of the file make up the second 50% of the progess bar
			const fakeProgress = interval(100)
				.pipe(take(100))
				.subscribe((_) => {
					this.progress += 90 / 100;
				});

			this.loading = true;
			this.waveform
				.getEncodedBuffer()
				.pipe(
					tap((_) => {
						// when encoding is finished unsubscribe from the interval and set progress to 50%
						fakeProgress.unsubscribe();
						this.progress = 90;
					}),
					switchMap((e) => {
						this.store.dispatch(new SetDemoClip(e));
						this.store.dispatch(new SetTitle(this.title.value));

						if (e) {
							return this.http.uploadSong(e);
						} else {
							return EMPTY;
						}
					}),
					untilDestroyed(this)
				)
				.subscribe(
					(event) => {
						switch (event.type) {
							case HttpEventType.UploadProgress:
								// calculate the upload progress
								this.progress =
									90 +
									Math.round(
										(event.loaded / event.total) * 10
									);
								break;
							case HttpEventType.Response:
								this.store.dispatch(new SetSongID(event.body));
								this.progress = 0;
								this.loading = false;
								this.stepper.goToNext();
						}
					},
					(err) => {
						console.log(err);
						this.toast.addToast('Error during encoding', 'error');
					}
				);
		}
	}
}
