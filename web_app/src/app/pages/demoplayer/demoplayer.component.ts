import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
	faPause, faPlay,
	faPaperPlane,
	faStar,
	faHeart,
	faUndoAlt
} from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
import { WaveformComponent } from 'src/app/components/waveform/waveform.component';
import { HowlerService } from 'src/app/services/howler.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { IncreametRatings24 } from 'src/app/state/user.actions';
import { IDemoplayerDemo } from 'src/app/types/DemoplayerSong';
import {DOCUMENT} from '@angular/common';
import {IKeyValue} from '../../types/KeyValue';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {SetTitle} from '../../state/upload.actions';
import {ISongFilter} from '../../../../../lib/types/Demoplayer';
import {LogoutModalComponent} from '../../components/logout-modal/logout-modal.component';
import {ModalService} from '../../services/modal.service';
import {UniversalModalComponent} from '../../components/universal-modal/universal-modal.component';
import {SetNavigationTitle} from '../../state/app.actions';
import {MetaData} from 'ng-event-bus/lib/meta-data';
import {NgEventBus} from 'ng-event-bus';

@UntilDestroy()
@Component({
	selector: 'app-demoplayer',
	templateUrl: './demoplayer.component.html',
	styleUrls: ['./demoplayer.component.scss'],
})
export class DemoplayerComponent implements OnInit, OnDestroy {
	@Select((state) => state.app.user.ratings24H)
	ratings24H$: Observable<number>;
	song$: Observable<IDemoplayerDemo>;
	waveform: WaveformComponent;

	faClose = faWindowClose;

	@Select((state) => state.app.genres) genres$: Observable<IKeyValue>;

	faHeart = faHeart;
	faPlay = faPlay;
	faPause = faPause;
	faStar = faStar;
	faPaperPlane = faPaperPlane;
	faUndoAlt = faUndoAlt;
	playing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	loading = false;
	finished = false;
	rating;

	filterOpened = false;

	activeMouseHover: '';

	isFollowedByRequestedUser = false;

	genreFilter = new FormControl('', [Validators.required]);

	allGenres: IKeyValue;
	currentGenreFilter = [];

	currentSong = undefined;

	constructor(
		private http: HttpService,
		private toast: ToastService,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store,
		private modal: ModalService,
		private howler: HowlerService,
		@Inject(DOCUMENT) private document: Document,
		private eventBus: NgEventBus,
	) {

		this.genreFilter.valueChanges.subscribe(value => {
			const elem = this.allGenres.find(el => el[0] === value);
			if (elem && !this.currentGenreFilter.find(el => el[0] === elem[0])){
				this.currentGenreFilter.push(elem);
				this.getNextFilteredSong();
			}

			const newVal = 'Add Tag';
			console.log('IN HERE');
			if (value !== newVal) {
				console.log('FILTER VALUE SET');
				this.genreFilter.setValue(newVal);
			}
			// this.store.dispatch(new SetTitle(value));
		});

		this.genres$.subscribe(genres => {
			this.allGenres = genres;
		});
	}

	ngOnInit(): void {
		this.store.dispatch(new SetNavigationTitle(''));


		this.eventBus.on('navigation:onFilterClicked').subscribe((meta: MetaData) => {
			console.log(meta.data);
			this.filterOpened = true;
		});
		this.eventBus.on('navigation:onReportSongClicked').subscribe((meta: MetaData) => {
			this.reportDemo(this.currentSong);
		});

		this.route.paramMap.subscribe((res) => {
			const songID: string = res.get('songID');
			this.getNextSong({songID});
		});
	}

	waveformInit(waferform: WaveformComponent) {
		this.waveform = waferform;
		this.playing = waferform.playing;
	}

	ngOnDestroy(): void {
		this.waveform?.pause();
		this.howler.pause();
	}

	togglePlay() {
		this.waveform.togglePlay();
	}

	replay() {
		this.waveform.replay();
	}

	rate(rating: number): void {
		// this.howler.loadSong(
		// 	'https://democharts-static.s3.eu-central-1.amazonaws.com/Bruh+Sound+Effect+%232.mp3'
		// );
		this.rating = rating;
	}

	toggleSavedArtist() {
		let demoSong: IDemoplayerDemo;

		this.song$
			.pipe(switchMap((prof) => {
				demoSong = prof;
				return this.http.markArtist(demoSong.artist.uid, !demoSong.artist.isFollowedByRequestedUser);
			}))
			.subscribe(
				(res) => {
					if (!demoSong.artist.isFollowedByRequestedUser) {
						this.toast.addToast('Saved artist to your favorites.');
					} else {
						this.toast.addToast('Removed artist from your favorites.');
					}
					this.isFollowedByRequestedUser = !demoSong.artist.isFollowedByRequestedUser;
				},
				(err) => {
					this.toast.addToast('Error saving artist', 'error');
				}
			);
	}

	next(): void {
		this.loading = true;
		if (this.rating) {
			this.song$
				.pipe(
					first(),
					switchMap((song) =>
						this.http.saveRating({
							songID: song.uid,
							rating: this.rating,
							listenTime: this.waveform.getSeconds(),
						})
					)
				)
				.subscribe((e) => {
					this.store.dispatch(new IncreametRatings24());
					this.getNextFilteredSong();
					this.rating = null;
				});
		} else {
			this.loading = false;
			this.toast.addToast('Please rate the song', 'error');
		}
	}

	getNextFilteredSong() {
		if (this.currentGenreFilter.length > 0) {
			this.getNextSong({filter: {genres: this.currentGenreFilter}});
		} else {
			this.getNextSong();
		}
	}
	getNextSong(songFilter?: ISongFilter) {
		this.song$ = this.http.getNextSong(songFilter).pipe(
			tap((song) => {
				this.isFollowedByRequestedUser = song.artist.isFollowedByRequestedUser;
				this.loading = false;

				this.currentSong = song;
			}),
			catchError((err, cought) => {

				if (err.status === 404) {
					console.log("All songs played.");
					this.finished = true;
				} else {
					console.log(err);
				}

				return EMPTY;
			})
		);
	}

	createChat() {
		this.song$
			.subscribe((song) => {
					this.router.navigate(['messages'], { queryParams: { chat: song.artist.slug } });
				},
			);
	}

	removeFilter(item) {
		this.currentGenreFilter = this.currentGenreFilter.filter(el => el[0] !== item[0]);
		this.getNextFilteredSong();
	}


	reportDemo(song: IDemoplayerDemo) {
		const ref = this.modal.open(UniversalModalComponent, {
			title: 'Why do you want to report this demo?',
			dropdownOptions: [
				'This artist is not the original owner of this song',
				'This is a remix or a cover of another song',
				'Bad audio quality',
				'Other'
			],
			systemTitle: 'ReportDemo',
			feedbackSuccess: 'Thanks for your report!',
			systemInformation: `Cover title: ${song.title}, Artist: ${song.artist.artistName}, ${song.artist.uid}`
		});
		ref.afterClosed$.subscribe((res) => {
			if (res.data) {
				// this.close();
				// this.auth.signOut();
			}
		});
	}
	// getGenre(id) {
	// return this.genres$.filter(el => el.id === id);
	// }

	selectFilter(elem) {

		if (elem && !this.currentGenreFilter.find(el => el[0] === elem[0])){
			this.currentGenreFilter.push(elem);
			this.getNextFilteredSong();
		}

		this.filterOpened = false;
	}

	dropdownLabelFctn() {
		return el => el[1];
	}

}
