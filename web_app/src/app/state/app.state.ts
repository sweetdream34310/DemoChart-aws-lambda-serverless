import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { ChatState } from './chat.state';
import { FollowedState } from './followed.state';
import { UserState } from './user.state';
import { UploadState } from './upload.state';
import {InitApp, AddToast, CloseToast, SetNavigationTitle} from './app.actions';

import { Toast } from '../types/Toast';
import { tap } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { forkJoin } from 'rxjs';
import { IKeyValue } from '../types/KeyValue';

interface ApplicationState {
	navigation: {
		title: string;
	};
}

export interface AppStateModel {
	toasts: Toast[];
	genres: IKeyValue[];
	moods: IKeyValue[];
	countries: IKeyValue[];
	appState: ApplicationState;
}

@State<AppStateModel>({
	name: 'app',
	defaults: {
		toasts: [],
		genres: [],
		moods: [],
		countries: [],
		appState: {
			navigation: {
				title: ''
			}
		},
	},
	children: [ChatState, UserState, UploadState, FollowedState],
})
@Injectable()
export class AppState {
	constructor(private http: HttpService) {}

	@Action(InitApp)
	initApp({ patchState }: StateContext<AppStateModel>) {

		console.log("INIT APP CALLED - GENRES; MOODS; COUNTRIES");

		return forkJoin({
			countries: this.http.getCountries(),
			moods: this.http.getMoods(),
			genres: this.http.getGenres(),
		}).pipe(
			tap((e) => {

				console.log("GENRES; MOODS; COUNTRIES", e);

				patchState({
					countries: e.countries,
					moods: e.moods,
					genres: e.genres,
				});
			})
		);
	}

	@Action(AddToast)
	addToast(
		{ patchState, getState }: StateContext<AppStateModel>,
		{ payload }: AddToast
	) {
		const toasts = getState().toasts;
		patchState({
			toasts: [...toasts, payload],
		});
	}

	@Action(CloseToast)
	removeToast(
		{ patchState, getState }: StateContext<AppStateModel>,
		{ payload }: CloseToast
	) {
		const tempToasts = [...getState().toasts];
		const index = tempToasts.indexOf(payload);
		tempToasts.splice(index, 1);
		patchState({
			toasts: tempToasts,
		});
	}

	@Action(SetNavigationTitle)
	setNavigationTitle(
		{ patchState, getState }: StateContext<AppStateModel>,
		{ title }: SetNavigationTitle
	) {
		patchState({
			appState: {
				navigation: {
					title
				}
			},
		});
	}
}
