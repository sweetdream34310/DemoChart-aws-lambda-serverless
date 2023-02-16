import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';

import { State, Action, StateContext } from '@ngxs/store';
import {
	SetLoggedIn,
	SetUser,
	GetUser,
	IncreametRatings24, SetAuthSession,
} from './user.actions';

import { UserTypes } from '../../../../lib/types/UserTypes';
import { tap } from 'rxjs/operators';
import {CognitoUserSession} from "amazon-cognito-identity-js";

export interface UserStateModel {
	uid: string;
	email: string;
	name: string;
	approvedByAdmin: boolean;
	declinedByAdmin: Date;
	firstName: string;
	lastName: string;
	artistName: string;
	profileHeaderSrc: string;
	profileImageSrc: string;
	bio: string;
	jobTitle: string;
	userType: UserTypes;
	industryID: number;
	genreID: number;
	countryID: number;
	createdAt: string;
	updatedAt: string;
	credits: number;
	ratings24H: number;
	profileImg: string;
	profileHeader: string;
	slug: string;

	loggedIn: boolean;
	authSession: CognitoUserSession;
}

@State<UserStateModel>({
	name: 'user',
})
@Injectable()
export class UserState {
	constructor(private http: HttpService) {}

	@Action(SetUser)
	setUser(
		{ patchState }: StateContext<UserStateModel>,
		{ payload }: SetUser
	) {
		patchState({ ...payload });
	}

	@Action(GetUser)
	getUser({ patchState }: StateContext<UserStateModel>) {
		return this.http.getUser().pipe(
			tap((res) => {
				patchState({
					...res,
				});
			})
		);
	}

	@Action(SetLoggedIn)
	setLoggedIn(
		{ patchState }: StateContext<UserStateModel>,
		{ payload }: SetLoggedIn
	) {
		patchState({ loggedIn: payload });
	}

	@Action(SetAuthSession)
	setAuthSession(
		{ patchState }: StateContext<UserStateModel>,
		{ payload }: SetAuthSession
	) {
		patchState({ authSession: payload });
	}


	@Action(IncreametRatings24)
	increametRatings24({ getState, patchState }: StateContext<UserStateModel>) {
		let { ratings24H } = getState();
		patchState({ ratings24H: ++ratings24H });
	}
}
