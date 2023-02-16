import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { YesNoModalComponent } from 'src/app/components/yes-no-modal/yes-no-modal.component';
import { HowlerService } from 'src/app/services/howler.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
import { IDemo } from 'src/app/types/Demo';

@Component({
	selector: 'app-mydemos',
	templateUrl: './mydemos.component.html',
	styleUrls: ['./mydemos.component.scss'],
})
export class MydemosComponent implements OnInit, OnDestroy {
	demos$: Observable<IDemo[]> = of([]);

	demos: IDemo[] = [];

	loading = true;
	playingUid = '';

	totalAvgPlaytime: number;
	totalAvgRating: number;
	totalPlaysOfAllSongs: number;

	constructor(
		private http: HttpService,
		private howler: HowlerService,
	) {}

	ngOnInit(): void {
		this.getDemos();


		this.demos$.subscribe(demos => {
			this.demos = demos;
			const totalPlaysOfAllSongs = demos.reduce((a, b) => a + b.totalPlays, 0);
			const totalPlaytimeOfAllSongs = demos.reduce((a, b) => a + b.totalPlays * b.avgPlaytime, 0);
			const totalRatingSum = demos.reduce((a, b) => a + b.totalPlays * b.rating, 0);
			const songsListenedCounted = demos.filter(el => el.avgPlaytime > 0).length;

			this.totalAvgPlaytime = Math.round( totalPlaytimeOfAllSongs / totalPlaysOfAllSongs);
			this.totalAvgRating = Math.round(totalRatingSum / totalPlaysOfAllSongs * 10 ) / 10;
			this.totalPlaysOfAllSongs = totalPlaysOfAllSongs;
		});
	}


	play(demo: IDemo) {
		console.log("PLAY", demo.uid, this.playingUid)
		if (this.playingUid === demo.uid) {
			this.playingUid = '';
			this.howler.pause();
		} else {
			this.howler.loadSong(demo.url);
			this.playingUid = demo.uid;
		}
	}

	ngOnDestroy(): void {
		this.howler.pause();
	}

	getDemos(): void {
		this.demos$ = this.http
			.getDemos()
			.pipe(tap((e) => (this.loading = false)));
	}
}
