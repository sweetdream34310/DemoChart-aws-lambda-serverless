export class SetDemoFull {
	static readonly type = '[Upload] set full demo file';
	constructor(public payload: File) {}
}

export class SetDemoClip {
	static readonly type = '[Upload] set 60s demo file';
	constructor(public payload: Blob) {}
}

export class SetTitle {
	static readonly type = '[Upload] set demo title';
	constructor(public payload: string) {}
}

export class SetSongID {
	static readonly type = '[Upload] set songID';
	constructor(public payload: string) {}
}

export class SetCover {
	static readonly type = '[Upload] set cover';
	constructor(public payload: string) {}
}

export class SetMood {
	static readonly type = '[Upload] set mood';
	constructor(public payload: number) {}
}

export class SetGenre {
	static readonly type = '[Upload] set genre';
	constructor(public payload: number) {}
}

export class ResetUpload {
	static readonly type = '[Upload] reset upload state';
	constructor() {}
}
