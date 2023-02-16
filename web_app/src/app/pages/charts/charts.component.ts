import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HowlerService } from 'src/app/services/howler.service';
import { HttpService } from 'src/app/services/http.service';
import { IKeyValue } from 'src/app/types/KeyValue';
import { ISong } from '../../../../../lib/types/Charts';
import {DOCUMENT} from "@angular/common";
import {SetNavigationTitle} from "../../state/app.actions";

@Component({
	selector: 'app-charts',
	templateUrl: './charts.component.html',
	styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
	@Select((state) => state.app.user.ratings24H)
	ratings24H$: Observable<number>;

	genres: IKeyValue[] = [];
	countries: IKeyValue[] = [];

	colorfulAdded: boolean = false;

	genre = new FormControl(0);
	country = new FormControl(0);
	charts: ISong[];
	chartsFiltered: ISong[];
	faPause = faPause;
	faPlay = faPlay;
	playingUid = '';

	constructor(
		private http: HttpService,
		private howler: HowlerService,
		private store: Store,
		@Inject(DOCUMENT) private document: Document
	) {
		this.store
			.select((state) => state.app.genres)
			.subscribe((genres) => {
				this.genres = [[0, 'All Genres'], ...genres];
			});

		this.store
			.select((state) => state.app.countries)
			.subscribe((countries) => {
				this.countries = [[0, 'All Countries'], ...countries];
			});


		this.store.dispatch(new SetNavigationTitle('Charts'));

	}

	ngOnInit(): void {
		this.http.getCharts(1).subscribe((res) => {
			this.charts = res;
			this.chartsFiltered = res;
		});

		this.ratings24H$.subscribe(el => {
				if (!this.colorfulAdded && el < 10) {
					// this.document.body.classList.add('colorful');
					this.colorfulAdded = true;
				}
			}
		);

		this.country.valueChanges.subscribe((countryID) => {
			const genreID = this.genre.value;
			this.chartsFiltered = this.charts;

			if (countryID !== 0) {
				this.chartsFiltered = this.charts.filter(
					(e) => e.countryID === countryID
				);
			}

			if (genreID !== 0) {
				this.chartsFiltered = this.chartsFiltered.filter(
					(e) => e.genreID === genreID
				);
			}
		});

		this.genre.valueChanges.subscribe((genreID) => {
			const countryID = this.country.value;
			this.chartsFiltered = this.charts;

			if (genreID !== 0) {
				this.chartsFiltered = this.charts.filter(
					(e) => e.genreID === genreID
				);
			}

			if (countryID !== 0) {
				this.chartsFiltered = this.chartsFiltered.filter(
					(e) => e.countryID === countryID
				);
			}
		});
	}

	ngOnDestroy(): void {
		this.howler.pause();
		// this.document.body.classList.remove('colorful');
	}

	togglePlay(song: ISong) {
		if (this.playingUid === song.uid) {
			this.playingUid = '';
			this.howler.pause();
		} else {
			this.howler.loadSong(song.url);
			this.playingUid = song.uid;
		}
	}
}
