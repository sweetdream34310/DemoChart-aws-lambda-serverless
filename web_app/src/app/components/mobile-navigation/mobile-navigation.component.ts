import { Component, OnInit } from '@angular/core';

import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserTypes} from '../../../../../lib/types/UserTypes';
import {Select} from '@ngxs/store';
import {UserStateModel} from '../../state/user.state';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent implements OnInit {
	@Select((state) => state.app.user) user$: Observable<UserStateModel>;

	faHeart = faHeart;
	faStar = faStar;

	showText = false;

	constructor() { }

	ngOnInit(): void {
  }


	get isArtist(): Observable<boolean> {
		return this.user$.pipe(map((e) => e.userType === UserTypes.Artist));
	}

	get isExpert(): Observable<boolean> {
		return this.user$.pipe(map((e) => e.userType === UserTypes.Expert));
	}
}
