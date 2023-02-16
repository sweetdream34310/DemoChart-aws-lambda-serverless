import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';

import { State, Action, StateContext } from '@ngxs/store';
import {
	SetLoggedIn,
	SetUser,
	GetUser,
	IncreametRatings24,
} from './user.actions';

import { UserTypes } from '../../../../lib/types/UserTypes';
import { tap } from 'rxjs/operators';
import {IFollowed} from '../types/Followed';
import {GetFollowed, MarkFollowed} from './followed.actions';

export interface FollowedStateModel {
	followedUsers: IFollowed[];
	loaded: boolean;
}
@State<FollowedStateModel>({
	name: 'followed',
	defaults: {
		followedUsers: [],
		loaded: false
	}
})
@Injectable()
export class FollowedState {
	constructor(private http: HttpService) {}

	// @Action(SetUser)
	// setUser(
	// 	{ patchState }: StateContext<IFollowed[]>,
	// 	{ payload }: SetUser
	// ) {
	// 	patchState({ ...payload });
	// }

	@Action(GetFollowed)
	getUser({ patchState }: StateContext<FollowedStateModel>) {
		return this.http.getSavedArtists().pipe(
			tap((res) => {
				patchState({
					followedUsers: res,
					loaded: true
				});
			})
		);
	}

	@Action(MarkFollowed)
	async markUser({patchState}: StateContext<FollowedStateModel>, {uid, add, cb}: MarkFollowed) {
		return this.http.markArtist(uid, add)
			.subscribe(
				(res) => {
					if (add) {
						cb(true, uid, add);
						console.log("added successfully");
					} else {
						cb(true, uid, add);
						console.log("artist removed successfully");
					}
				},
				(err) => {
					// cb(false, uid, add);
					console.error('Error (un)following artist', 'error');
				}
			);
	}
}
