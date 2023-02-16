import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {uploadedSong} from "../../types/Profile";

@Component({
	selector: 'app-profile-song',
	templateUrl: './profile-song.component.html',
	styleUrls: ['./profile-song.component.scss']
})
export class ProfileSongComponent implements OnInit {

	@Input() song: uploadedSong;
	@Input() isHovered;
	@Input() isPlaying;

	@Output() hoverItem: EventEmitter<void> = new EventEmitter();
	@Output() blurItem: EventEmitter<void> = new EventEmitter();
	@Output() playToggle: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setHover() {
  	this.hoverItem.emit();

		// currentDemoHover=song.uid;
	}

	setBlur() {
		this.blurItem.emit();
	}

	play($event) {
		this.playToggle.emit({
			$event,
			song: this.song
		});
	}

}
