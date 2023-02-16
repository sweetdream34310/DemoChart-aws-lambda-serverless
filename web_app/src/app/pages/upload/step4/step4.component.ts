import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WaveformComponent } from 'src/app/components/waveform/waveform.component';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { UploadStateModel } from 'src/app/state/upload.state';
import {StepperComponent} from "../../../components/stepper/stepper.component";

@UntilDestroy()
@Component({
	selector: 'app-step4',
	templateUrl: './step4.component.html',
	styleUrls: ['./step4.component.scss'],
})
export class Step4Component implements OnInit {
	@Select((state) => state.app.upload) song$: Observable<UploadStateModel>;
	@Input() stepper: StepperComponent;

	waveform: WaveformComponent;
	submitted = false;
	agreement = false;
	// agreement = new FormControl(false, [
	// 	Validators.required,
	// 	Validators.requiredTrue,
	// ]);
	playing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	faPlay = faPlay;
	faPause = faPause;

	constructor(private http: HttpService, private toast: ToastService) {}

	ngOnInit(): void {}

	waveformInit(waferform: WaveformComponent) {
		this.waveform = waferform;
		this.playing = waferform.playing;
	}

	togglePlay(): void {
		this.waveform.togglePlay();
	}

	next() {
		this.submitted = true;
		if (this.agreement === true) {
			this.song$
				.pipe(
					switchMap((e) => {
						console.log('update song details');
						return this.http.updateSongDetails(
							e.songID,
							e.title,
							e.moodID,
							e.genreID
						);
					}),
					untilDestroyed(this)
				)
				.subscribe(
					(res) => {
						this.stepper.goToNext();
					},
					(err) => {
						this.toast.addToast(
							'Unknown error, please try again later',
							'error'
						);
					}
				);
		} else {
			this.toast.addToast('Please agree to the terms', 'error');
		}
	}
}
