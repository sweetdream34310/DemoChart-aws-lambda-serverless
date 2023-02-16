import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IProfile, uploadedSong} from "../../types/Profile";
import {HowlerService} from "../../services/howler.service";

@Component({
	selector: 'app-profile-demos',
	templateUrl: './profile-demos.component.html',
	styleUrls: ['./profile-demos.component.scss']
})
export class ProfileDemosComponent implements OnInit, OnDestroy {

	@Input() demos: uploadedSong[];
	@Input() profile: IProfile;

	currentDemoHover = undefined;
	playingUid = undefined;

	constructor(
		private howler: HowlerService,
	) { }

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.howler.pause();
	}

	blurItem(uid) {
		if (this.currentDemoHover === uid) {
			this.currentDemoHover = uid;
		}
	}

	hoverItem(uid) {
		this.currentDemoHover = uid;
	}


	playToggle(event) {
		const { $event, song } = event;
		console.log("PLAY TOGGLE ", song.uid, this.playingUid, $event)

		$event.stopPropagation();

		if (this.playingUid === song.uid) {
			this.playingUid = '';
			this.howler.pause();
		} else {
			this.howler.loadSong(song.url);
			this.playingUid = song.uid;
		}
	}

}
