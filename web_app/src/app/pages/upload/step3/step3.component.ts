import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CropComponent } from 'src/app/modals/crop/crop.component';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
import { SetCover, SetGenre, SetMood } from 'src/app/state/upload.actions';
import { IKeyValue } from 'src/app/types/KeyValue';
import {StepperComponent} from '../../../components/stepper/stepper.component';
import {UserStateModel} from '../../../state/user.state';
import {compressImage, COVER_SIZE, PROFILE_PIC_SIZE} from '../../../helpers/compressBase64Images';

@UntilDestroy()
@Component({
	selector: 'app-step3',
	templateUrl: './step3.component.html',
	styleUrls: ['./step3.component.scss'],
})
export class Step3Component implements OnInit {
	@Select((state) => state.app.upload.cover) cover$: Observable<string>;
	@Select((state) => state.app.upload.songID) songID$: Observable<string>;
	@Select((state) => state.app.genres) genres$: Observable<IKeyValue>;
	@Select((state) => state.app.moods) moods$: Observable<IKeyValue>;
	@Input() stepper: StepperComponent;


	@Select((state) => state.app.upload.moodID) moodID$: Observable<UserStateModel>;
	@Select((state) => state.app.upload.genreID) genreID$: Observable<UserStateModel>;


	step3 = this.fb.group({
		mood: [, [Validators.required]],
		genre: [, [Validators.required]],
	});

	imageSrc = '';
	submitted = false;

	constructor(
		private fb: FormBuilder,
		private modal: ModalService,
		private http: HttpService,
		private store: Store,
		private toast: ToastService
	) {

		this.moodID$.subscribe(el => {
			this.step3.patchValue({mood: el});
		});

		this.genreID$.subscribe(el => {
			this.step3.patchValue({genre: el});
		});

		this.cover$.subscribe(el => {
			this.imageSrc = el;
		});

	}

	ngOnInit(): void {}

	open() {
		let songId;

		const ref = this.modal.open(CropComponent, null);
		combineLatest([ref.afterClosed$, this.songID$])
			.pipe(
				switchMap(([data, songID]) => {

					songId = songID;

					if (data.data) {
						this.imageSrc = data.data;
						this.store.dispatch(new SetCover(data.data));

						return compressImage(data.data, COVER_SIZE, COVER_SIZE);
					}
				}),
				untilDestroyed(this)
			)
			.subscribe(
				async (res) => {
					this.http.uploadCoverPic(songId, res).subscribe();
					console.log(res)
				},
				(err) => {
					console.log(err);
					this.toast.addToast(
						'Error during uploading cover imgage',
						'error'
					);
				}
			);
	}

	onSubmit() {
		this.submitted = true;
		if (this.step3.valid) {
			const { genre, mood } = this.step3.value;
			this.store.dispatch(new SetMood(mood));
			this.store.dispatch(new SetGenre(genre));
			this.stepper.goToNext();
		}
	}
}
