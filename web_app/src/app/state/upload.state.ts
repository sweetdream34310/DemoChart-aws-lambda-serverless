import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {
	SetDemoClip,
	SetDemoFull,
	SetSongID,
	SetTitle,
	SetCover,
	SetMood,
	SetGenre, ResetUpload,
} from './upload.actions';

export interface UploadStateModel {
	songID: string;
	demoFull: File;
	demoClip: Blob;
	title: string;
	cover: string;
	moodID: number;
	genreID: number;
}

@State<UploadStateModel>({
	name: 'upload',
})
@Injectable()
export class UploadState {
	constructor() {}

	@Action(SetDemoFull)
	setDemoFull(
		{ patchState }: StateContext<UploadStateModel>,
		{ payload }: SetDemoFull
	) {
		patchState({ demoFull: payload });
	}

	@Action(SetDemoClip)
	setDemoClip(
		{ patchState }: StateContext<UploadStateModel>,
		{ payload }: SetDemoClip
	) {
		patchState({ demoClip: payload });
	}

	@Action(SetTitle)
	setTitle(
		{ patchState }: StateContext<UploadStateModel>,
		{ payload }: SetTitle
	) {
		patchState({ title: payload });
	}

	@Action(SetSongID)
	setSognID(
		{ patchState }: StateContext<UploadStateModel>,
		{ payload }: SetSongID
	) {
		patchState({ songID: payload });
	}

	@Action(SetCover)
	setCover(
		{ patchState }: StateContext<UploadStateModel>,
		{ payload }: SetCover
	) {
		patchState({ cover: payload });
	}

	@Action(SetMood)
	setMood(
		{ patchState }: StateContext<UploadStateModel>,
		{ payload }: SetMood
	) {
		patchState({ moodID: payload });
	}

	@Action(SetGenre)
	setGenre(
		{ patchState }: StateContext<UploadStateModel>,
		{ payload }: SetGenre
	) {
		patchState({ genreID: payload });
	}


	@Action(ResetUpload)
	resetUpload({ patchState }: StateContext<UploadStateModel>) {
		patchState({
			songID: '',
			demoFull: undefined,
			demoClip: undefined,
			title: '',
			cover: '',
			moodID: 0,
			genreID: 0,
		});
	}
}
