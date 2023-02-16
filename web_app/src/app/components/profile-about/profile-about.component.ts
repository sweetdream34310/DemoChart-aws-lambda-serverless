import {Component, Input, OnInit} from '@angular/core';
import {IProfile} from "../../types/Profile";
import {
	faFacebookF,
	faInstagram,
	faSoundcloud,
	faSpotify
} from '@fortawesome/free-brands-svg-icons';

import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit {

	@Input() profile: IProfile;


	faFacebookF = faFacebookF;
	faSoundcloud = faSoundcloud;
	faSpotify = faSpotify;
	faInstagram = faInstagram;
	faCircle = faCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
